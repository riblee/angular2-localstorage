export declare type LocalStorageType = "array";
export declare function LocalStorage(key?: string, type?: LocalStorageType): (target: Object, propertyName: string) => void;
export declare function SessionStorage(key?: string, type?: LocalStorageType): (target: Object, propertyName: string) => void;
export declare let WebStorage: (webStorage: Storage, key?: string, type?: "array") => (target: Object, propertyName: string) => void;
