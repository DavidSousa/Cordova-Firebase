"use strict";

var path = require("path");
var fs = require("fs");

var constants = {
  platforms: "platforms",
  android: {
    platform: "android",
    wwwFolder: "assets/www",
    fileExtension: ".json",
  },
  ios: {
    platform: "ios",
    wwwFolder: "www",
    fileExtension: ".plist",
  },
  googleServices: "google-services",
  stringsXml: {
    path1: "platforms/android/app/src/main/res/values/strings.xml",
    path2: "platforms/android/res/values/strings.xml",
  },
};

function fileExists(path, fs) {
  try {
    return fs.statSync(path).isFile();
  } catch (e) {
     return false;
  }
}

function updateStringsXml(contents) {
  var json = JSON.parse(contents);
  var stringsXmlPath = fileExists(constants.stringsXml.path1) ? constants.stringsXml.path1 : constants.stringsXml.path2;
  var strings = fs.readFileSync(stringsXmlPath).toString();
  var search = "</resources>";

  strings = strings.substr(0, strings.indexOf(search));
  
  // add google app id
  strings = strings + '<string name="google_app_id">' + json.client[0].client_info.mobilesdk_app_id + '</string>';
  
  // add google api key
  strings = strings + '<string name="google_api_key">' + json.client[0].api_key[0].current_key + '</string>';
  
  strings = strings + search;
  
  fs.writeFileSync(stringsXmlPath, strings);
}

function getResourcesFolderPath(context, platform, platformConfig) {
  var platformPath = path.join(context.opts.projectRoot, constants.platforms, platform);
  return path.join(platformPath, platformConfig.wwwFolder);
}

function getGoogleServicesFileExtension(platform) {
  if (platform === constants.android.platform) {
    return constants.android.fileExtension;
  } else if (platform === constants.ios.platform) {
    return constants.ios.fileExtension;
  } else {
    return;
  }
}

function getPlatformConfigs(platform) {
  if (platform === constants.android.platform) {
    return constants.android;
  } else if (platform === constants.ios.platform) {
    return constants.ios;
  } else {
    return;
  }
}

module.exports = function (context) {
  var defer = context.requireCordovaModule("q").defer();
  
  var platform = context.opts.plugin.platform;
  var platformConfig = getPlatformConfigs(platform);
  if (!platformConfig) {
    console.error("Invalid platform");
    defer.reject();
    return;
  }

  var googleServicesPath = path.join(getResourcesFolderPath(context, platform, platformConfig), constants.googleServices);

  fs.readdir(googleServicesPath, function(err, files) {
    if (err) {
        console.error("Error copying files");
        defer.reject();
        return;
    }

    var filename = files.find(function(name) {
      return name.endsWith(platformConfig.fileExtension);
    });

    if (!filename) {
      console.error("No file found");
      defer.reject();
      return;
    }

    var srcFilePath = path.join(googleServicesPath, filename);
    var destFilePath = path.join(context.opts.plugin.dir, filename);

    fs.createReadStream(srcFilePath)
    .pipe(fs.createWriteStream(destFilePath))
    .on("error", function(err){
      defer.reject();
    })
    .on("close", function(){
      defer.resolve();
    });

    if (platform === constants.android.platform) {
      var contents = fs.readFileSync(srcFilePath).toString();
      updateStringsXml(contents);
    }
  });

  return defer.promise;
};