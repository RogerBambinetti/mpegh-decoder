"use strict";
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
  "win32": "../src/mpeghdecoder/mpeghDecoder.exe"
};
var mpeghDecoder = {
  decode: function(IO, options) {
    return __async(this, null, function* () {
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