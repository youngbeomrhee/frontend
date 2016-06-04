/**
 * Created by yblee on 2016-06-03.
 * Module.js: 모듈과 네임스페이스 유틸리티
 *
 * 다음은 모듈과 관련된 유틸리티 함수들의 모듈이며 JSAN 타입의 모듈과 호환된다.
 * 이 모듈은 Module이라는 네임스페이스를 정의한다.
 */

var Module;
if(Moduel && (typeof Module !== 'object' || Module.NAME)) {
    throw new Error("Namespace 'Module' already exists");
}

Module = {};

Module.NAME = "Module";
Module.VERSION = 0.1;

Module.EXPORT = ["require", "importSymbols"];

Module.EXPORT_OK = ["createNamespace", "isDefined", "registerInitializationFunction", "runInitializationFunctions", "modules", "globalNamespace"];

Module.globalNamespace = this;
Module.modules = {"Module": Module};

Module.createNamespace = function (name, version) {
    if(!name) {
        throw new Error("Module.createNamespace(): name required");
    }
    if(name.charAt(0) == '.' || name.charAt(name.length-1) == '.' || name.indexOf("..") != -1) {
        throw new Error("Module.createNamespace(): illegal name: " + name);
    }

    var parts = name.split('.');

    var container = Module.globalNamespace;
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if(!container[part]) {
            container[part] = {};
        } else if(typeof container[part] !== "object") {
            var n = parts.slice(0, i).join('.');
            throw new Error(n + " already exists and is not an object");
        }
        container = container[part];
    }

    var namespace = container;

    if(namespace.NAME) {
        throw new Error("Module " + name + " has already defined");
    }

    namespace.NAME = name;
    if(version) {
        namespace.VERSION = version;
    }

    Module.modules[name] = namespace;

    return namespace;
};

Module.require = function (name, version) {
    if(!(name in Module.modules)) {
        throw new Error("Module " + name + " is not defined");
    }

    if(!version) {
        return;
    }

    if(!n.VERSION || n.VERSION < version) {
        throw new Error("Module " + name + " has version " + n.VERSION + " but version " + version + " or greater is required");
    }
};

Module.importSymbols = function (from) {
    if(typeof from === "string") {
        from = Module.modules[from];
    }
    if(!from || typeof from !== "object") {
        throw new Error("Module.importSymbols(): " + " namespace object required");
    }

    var to = Module.globalNamespace;
    var symbols = [];
    var firstsymbol = 1;

    if(arguments.length > 1 && typeof arguments[1] === "object") {
        if(arguments[1] != null) {
            to = arguments[1];
        }
        firstsymbol = 2;
    }

    for (var a = fistsymbol; a < arguments.length; a++) {
        symbols.push(arguments[a]);

        // 치다가 포기... 안해!
    }

};
