"use strict";
var webstorage_utiltiy_1 = require("../utility/webstorage.utiltiy");
function LocalStorage(key, type) {
    return exports.WebStorage(localStorage, key, type);
}
exports.LocalStorage = LocalStorage;
function SessionStorage(key, type) {
    return exports.WebStorage(sessionStorage, key, type);
}
exports.SessionStorage = SessionStorage;
var cache = {};
exports.WebStorage = function (webStorage, key, type) {
    return function (target, propertyName) {
        key = key || propertyName;
        var storageKey = webstorage_utiltiy_1.WebStorageUtility.generateStorageKey(key);
        var storedValue = webstorage_utiltiy_1.WebStorageUtility.get(webStorage, key);
        Object.defineProperty(target, propertyName, {
            get: function () {
                var value = webstorage_utiltiy_1.WebStorageUtility.get(webStorage, key);
                if (type === "array" && Array.isArray(value)) {
                    value.push = function () {
                        var ret = Array.prototype.push.apply(this, arguments);
                        webstorage_utiltiy_1.WebStorageUtility.set(webStorage, key, value);
                        return ret;
                    };
                    value.unshift = function () {
                        var ret = Array.prototype.unshift.apply(this, arguments);
                        webstorage_utiltiy_1.WebStorageUtility.set(webStorage, key, value);
                        return ret;
                    };
                }
                return webstorage_utiltiy_1.WebStorageUtility.get(webStorage, key);
            },
            set: function (value) {
                if (!cache[key]) {
                    if (storedValue === null) {
                        webstorage_utiltiy_1.WebStorageUtility.set(webStorage, key, value);
                    }
                    cache[key] = true;
                    return;
                }
                webstorage_utiltiy_1.WebStorageUtility.set(webStorage, key, value);
            },
        });
    };
};
//# sourceMappingURL=webstorage.js.map