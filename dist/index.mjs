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
import { execFile } from "node:child_process";
import { promisify } from "node:util";

// src/error/Errors.ts
var PlatformNotSupported = class extends Error {
  constructor() {
    super("Platform not supported");
  }
};

// src/index.ts
var execFilePromise = promisify(execFile);
var paths = {
  "win32": "../src/mpeghdecoder/mpeghDecoder.exe"
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
export {
  index_default as default
};
//# sourceMappingURL=index.mjs.map