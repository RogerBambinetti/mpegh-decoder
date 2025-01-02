"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_node_child_process = require("child_process");
var import_node_util = require("util");

// src/error/Errors.ts
var PlatformNotSupported = class extends Error {
  constructor() {
    super("Platform not supported");
  }
};

// src/index.ts
var execFilePromise = (0, import_node_util.promisify)(import_node_child_process.execFile);
var paths = {
  "win32": "./src/mpeghdecoder/mpeghDecoder.exe"
};
var mpeghdecode = {
  decode: (IO, options) => __async(void 0, null, function* () {
    try {
      if (!paths[process.platform]) {
        throw new PlatformNotSupported();
      }
      const args = ["-if", IO.input, "-of", IO.output];
      if (options == null ? void 0 : options.cicp) {
        args.push("-tl");
        args.push(options.cicp);
      }
      const { stdout } = yield execFilePromise(paths[process.platform], args);
      return stdout;
    } catch (error) {
      throw error;
    }
  }),
  bulkDecode: (IO, options) => __async(void 0, null, function* () {
    const promises = IO.map((io) => mpeghdecode.decode(io, options));
    return yield Promise.all(promises);
  })
};
var index_default = mpeghdecode;
//# sourceMappingURL=index.js.map