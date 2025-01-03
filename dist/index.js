"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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
var import_node_path = __toESM(require("path"));
var import_node_child_process = require("child_process");
var import_node_util = require("util");

// src/error/Errors.ts
var PlatformNotSupported = class extends Error {
  constructor() {
    super("Platform not supported");
  }
};
var InvalidInput = class extends Error {
  constructor() {
    super("Invalid input path");
  }
};
var InvalidOutput = class extends Error {
  constructor() {
    super("Invalid output path");
  }
};

// src/index.ts
var execFilePromise = (0, import_node_util.promisify)(import_node_child_process.execFile);
var paths = {
  "win32": "../src/mpegh-decoder/mpeghDecoder.exe"
};
function validateIO(IO) {
  if (!paths[process.platform]) {
    throw new PlatformNotSupported();
  }
  if (!import_node_path.default.extname(IO.input)) {
    throw new InvalidInput();
  }
  IO.output = IO.output || IO.input.replace(import_node_path.default.extname(IO.input), ".wav");
  if (!IO.output.endsWith(".wav")) {
    throw new InvalidOutput();
  }
}
var mpeghDecoder = {
  decode: function(IO, options) {
    return __async(this, null, function* () {
      try {
        validateIO(IO);
        const args = ["-if", IO.input, "-of", IO.output];
        if (options == null ? void 0 : options.cicp) {
          args.push("-tl");
          args.push(options.cicp);
        }
        yield execFilePromise(import_node_path.default.resolve(__dirname, paths[process.platform]), args);
        return import_node_path.default.resolve(__dirname, IO.output);
      } catch (error) {
        throw error;
      }
    });
  },
  bulkDecode: function(IO, options) {
    return __async(this, null, function* () {
      const promises = IO.map((io) => mpeghDecoder.decode(io, options));
      return yield Promise.all(promises);
    });
  }
};
module.exports = mpeghDecoder;
//# sourceMappingURL=index.js.map