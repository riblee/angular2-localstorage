import {WebStorageUtility} from "../utility/webstorage.utiltiy";

export type LocalStorageType = "array";

export function LocalStorage(key?: string, type?: LocalStorageType) {
    return WebStorage(localStorage, key, type);
}

export function SessionStorage(key?: string, type?: LocalStorageType) {
    return WebStorage(sessionStorage, key, type);
}

// initialization cache
let cache = {};

export let WebStorage = (webStorage: Storage, key?: string, type?: LocalStorageType) => {
    return (target: Object, propertyName: string): void => {
        key = key || propertyName;

        let storageKey = WebStorageUtility.generateStorageKey(key);
        let storedValue = WebStorageUtility.get(webStorage, key);

        Object.defineProperty(target, propertyName, {
            get: function() {
                let value = WebStorageUtility.get(webStorage, key);

                if (type === "array" && Array.isArray(value)) {
                    value.push = function() {
                        let ret = Array.prototype.push.apply(this, arguments);
                        WebStorageUtility.set(webStorage, key, value);
                        return ret;
                    };
                    value.unshift = function() {
                        let ret = Array.prototype.unshift.apply(this, arguments);
                        WebStorageUtility.set(webStorage, key, value);
                        return ret;
                    };
                }

                return value;
            },
            set: function(value: any) {
                if (!cache[key]) {
                    // first setter handle
                    if (storedValue === null) {
                        // if no value in localStorage, set it to initializer
                        WebStorageUtility.set(webStorage, key, value);
                    }

                    cache[key] = true;
                    return;
                }

                WebStorageUtility.set(webStorage, key, value);
            },
        });
    }
}
