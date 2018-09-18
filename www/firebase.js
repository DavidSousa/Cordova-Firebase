var exec = require('cordova/exec');

var PLUGIN_NAME = 'FirebasePlugin';

exports.getVerificationID = function(number, success, error) {
    exec(success, error, PLUGIN_NAME, "getVerificationID", [number]);
};


//
// Cloud Messaging FCM
//
exports.getInstanceId = function(success, error) {
    exec(success, error, PLUGIN_NAME, "getInstanceId", []);
};

exports.getId = function(success, error) {
    exec(success, error, PLUGIN_NAME, "getId", []);
};

exports.getToken = function(success, error) {
    exec(success, error, PLUGIN_NAME, "getToken", []);
};

exports.onNotificationOpen = function(success, error) {
    exec(success, error, PLUGIN_NAME, "onNotificationOpen", []);
};

exports.onTokenRefresh = function(success, error) {
    exec(success, error, PLUGIN_NAME, "onTokenRefresh", []);
};

exports.grantPermission = function(success, error) {
    exec(success, error, PLUGIN_NAME, "grantPermission", []);
};

exports.hasPermission = function(success, error) {
    exec(success, error, PLUGIN_NAME, "hasPermission", []);
};

exports.setBadgeNumber = function(number, success, error) {
    exec(success, error, PLUGIN_NAME, "setBadgeNumber", [number]);
};

exports.getBadgeNumber = function(success, error) {
    exec(success, error, PLUGIN_NAME, "getBadgeNumber", []);
};

exports.subscribe = function(topic, success, error) {
    exec(success, error, PLUGIN_NAME, "subscribe", [topic]);
};

exports.unsubscribe = function(topic, success, error) {
    exec(success, error, PLUGIN_NAME, "unsubscribe", [topic]);
};

exports.unregister = function(success, error) {
    exec(success, error, PLUGIN_NAME, "unregister", []);
};

//
// Analytics
//
exports.enableAnalytics = function (enable, success, error) {
    exec(success, error, PLUGIN_NAME, "enableAnalytics", [enable]);
};

exports.logEvent = function(name, params, success, error) {
    exec(success, error, PLUGIN_NAME, "logEvent", [name, params]);
};

exports.setScreenName = function(name, success, error) {
    exec(success, error, PLUGIN_NAME, "setScreenName", [name]);
};

exports.setUserId = function(id, success, error) {
    exec(success, error, PLUGIN_NAME, "setUserId", [id]);
};

exports.setUserProperty = function(name, value, success, error) {
    exec(success, error, PLUGIN_NAME, "setUserProperty", [name, value]);
};

//
// Crashlytics
//
exports.logError = function(message, success, error) {
    exec(success, error, PLUGIN_NAME, "logError", [message]);
};

exports.forceCrashlytics = function(message, success, error) {
    exec(success, error, PLUGIN_NAME, "forceCrashlytics", [message]);
};

//
// Performance
//
exports.startTrace = function(name, success, error) {
    exec(success, error, PLUGIN_NAME, "startTrace", [name]);
};

exports.incrementCounter = function(name, counterNamed, success, error) {
    exec(success, error, PLUGIN_NAME, "incrementCounter", [name, counterNamed]);
};

exports.stopTrace = function(name, success, error) {
    exec(success, error, PLUGIN_NAME, "stopTrace", [name]);
};

exports.enablePerformanceMonitoring = function(enable, success, error) {
    exec(success, error, PLUGIN_NAME, "enablePerformanceMonitoring", [enable]);
};

exports.isPerformanceMonitoringEnabled = function(success, error) {
    exec(success, error, PLUGIN_NAME, "isPerformanceMonitoringEnabled", []);
};

exports.addTraceAttribute = function(traceName, attribute, value, success, error) {
    exec(success, error, PLUGIN_NAME, "addTraceAttribute", [traceName, attribute, value]);
};

//
// Remote configuration
//
exports.activateFetched = function(success, error) {
    exec(success, error, PLUGIN_NAME, "activateFetched", []);
};

exports.fetch = function(cacheExpirationSeconds, success, error) {
    var args = [];
    if (typeof cacheExpirationSeconds === 'number') {
        args.push(cacheExpirationSeconds);
    } else {
        error = success;
        success = cacheExpirationSeconds;
    }
    exec(success, error, PLUGIN_NAME, "fetch", args);
};

exports.getByteArray = function(key, namespace, success, error) {
    var args = [key];
    if (typeof namespace === 'string') {
        args.push(namespace);
    } else {
        error = success;
        success = namespace;
    }
    exec(success, error, PLUGIN_NAME, "getByteArray", args);
};

exports.getValue = function(key, namespace, success, error) {
    var args = [key];
    if (typeof namespace === 'string') {
        args.push(namespace);
    } else {
        error = success;
        success = namespace;
    }
    exec(success, error, PLUGIN_NAME, "getValue", args);
};

exports.getInfo = function(success, error) {
    exec(success, error, PLUGIN_NAME, "getInfo", []);
};

exports.setConfigSettings = function(settings, success, error) {
    exec(success, error, PLUGIN_NAME, "setConfigSettings", [settings]);
};

exports.setDefaults = function(defaults, namespace, success, error) {
    var args = [defaults];
    if (typeof namespace === 'string') {
        args.push(namespace);
    } else {
        error = success;
        success = namespace;
    }
    exec(success, error, PLUGIN_NAME, "setDefaults", args);
};

//
// Dynamic Links
//
exports.onDynamicLink = function(success, error) {
    exec(success, error, PLUGIN_NAME, "onDynamicLink", []);
};

exports.dynamicLinkCallback = function(dynamicLink) {
    var ev = document.createEvent('HTMLEvents');
    ev.dynamicLink = dynamicLink;
    ev.initEvent('dynamic-link', true, true, arguments);
    document.dispatchEvent(ev);
};


exports.setAnalyticsCollectionEnabled = function(enabled, success, error) {
    exec(success, error, PLUGIN_NAME, "setAnalyticsCollectionEnabled", [enabled]);
};

exports.verifyPhoneNumber = function(number, timeOutDuration, success, error) {
    if (typeof timeOutDuration === 'function') {
      // method being called with old signature: function(number, success, error)
      // timeOutDuration is the success callback, success is the error callback
      exec(timeOutDuration, success, PLUGIN_NAME, "verifyPhoneNumber", [number]);
    } else {
      // method being called with new signature: function(number, timeOutDuration, success, error)
      // callbacks are correctly named
      exec(success, error, PLUGIN_NAME, "verifyPhoneNumber", [number, timeOutDuration]);
    }
};