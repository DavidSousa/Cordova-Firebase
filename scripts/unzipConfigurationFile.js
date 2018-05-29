"use strict";

var path = require("path");
var fs = require("fs");
var AdmZip = require("adm-zip");

var constants = {
    platforms: "platforms",
    android: {
        platform: "android",
        wwwFolder: "assets/www"
    },
    ios: {
        platform: "ios",
        wwwFolder: "www"
    },
    googleServices: "google-services",
    zip: ".zip",
};

function fileIsZip(file) {
    return file.match(/\.zip$/);
}

function getResourcesFolderPath(context) {
    var platform = context.opts.plugin.platform;
    var platformPath = path.join(context.opts.projectRoot, constants.platforms, platform);

    if (platform === constants.android.platform) {
        return path.join(platformPath, constants.android.wwwFolder);
    } else if (platform === constants.ios.platform) {
        return path.join(platformPath, constants.ios.wwwFolder);
    } else {
        return;
    }
}

function getZipFile(folder, zipFileName) {
    try {
        var files = fs.readdirSync(folder);
        for (var i = 0; i < files.length; i++) {
            if (fileIsZip(files[i])) {
                var fileName = path.basename(files[i], constants.zip);
                if (fileName === zipFileName) {
                    return path.join(folder, files[i]);
                }
            }
        }
    } catch (e) {
        console.error(e.message);
        return;
    }
}

function unzip(zipFile, folder, zipFileName) {
    var zip = new AdmZip(zipFile);
    var targetPath = path.join(folder, zipFileName);
    zip.extractAllTo(targetPath, true);
    return targetPath;
}

function getAppId(context) {
  console.log('projectRoot: ' + context.opts.projectRoot);
  var config_xml = path.join(context.opts.projectRoot, 'config.xml');
  var et = context.requireCordovaModule('elementtree');
  var data = fs.readFileSync(config_xml).toString();
  var etree = et.parse(data);
  return etree.getroot().attrib.id;
}

module.exports = function(context) {
    var defer = context.requireCordovaModule("q").defer();

    var wwwPath = getResourcesFolderPath(context);
    if (!wwwPath) {
        console.error("Invalid platform");
        defer.reject();
    }

    var folderName = "firebase." + getAppId(context);

    // var googleServicesPath = path.join(wwwPath, constants.googleServices);
    var googleServicesPath = path.join(wwwPath, folderName);
    var googleServicesZipFile = getZipFile(googleServicesPath, constants.googleServices);

    if (!googleServicesZipFile) {
        console.error("No zip file found containing google services configuration file");
        defer.reject();
    }

    unzip(googleServicesZipFile, wwwPath, constants.googleServices);

    defer.resolve();
    return defer.promise;
}