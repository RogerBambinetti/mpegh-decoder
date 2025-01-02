var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// src/error/Errors.ts
var PlatformNotSupported;
var init_Errors = __esm({
  "src/error/Errors.ts"() {
    "use strict";
    PlatformNotSupported = class extends Error {
      constructor() {
        super("Platform not supported");
      }
    };
  }
});

// src/index.ts
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
var require_index = __commonJS({
  "src/index.ts"(exports, module) {
    init_Errors();
    var execFilePromise = promisify(execFile);
    var paths = {
      "win32": "../src/mpegh-decoder/mpeghDecoder.exe"
    };
    var mpeghDecoder = {
      decode: function(IO, options) {
        return __async(this, null, function* () {
          try {
            if (!paths[process.platform]) {
              throw new PlatformNotSupported();
            }
            if (!IO.output) {
              IO.output = IO.input.replace(path.extname(IO.input), ".wav");
            }
            const args = ["-if", IO.input, "-of", IO.output];
            if (options == null ? void 0 : options.cicp) {
              args.push("-tl");
              args.push(options.cicp);
            }
            const { stdout } = yield execFilePromise(path.resolve(__dirname, paths[process.platform]), args);
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
  }
});
export default require_index();
//# sourceMappingURL=index.mjs.map