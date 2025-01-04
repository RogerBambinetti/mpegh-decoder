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
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

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
var execFilePromise = promisify(execFile);
var paths = {
  "win32": "../src/mpegh-decoder/mpeghDecoder.exe"
};
function validateIO(IO) {
  if (!paths[process.platform]) {
    throw new PlatformNotSupported();
  }
  if (!path.extname(IO.input)) {
    throw new InvalidInput();
  }
  IO.output = IO.output || IO.input.replace(path.extname(IO.input), ".wav");
  if (!IO.output.endsWith(".wav")) {
    throw new InvalidOutput();
  }
}
function decode(IO, options) {
  return __async(this, null, function* () {
    try {
      validateIO(IO);
      const args = ["-if", IO.input, "-of", IO.output];
      if (options == null ? void 0 : options.cicp) {
        args.push("-tl");
        args.push(options.cicp);
      }
      const { stdout } = yield execFilePromise(path.resolve(__dirname, paths[process.platform]), args);
      return {
        outputFilePath: path.resolve(__dirname, IO.output),
        stdout
      };
    } catch (error) {
      throw error;
    }
  });
}
function bulkDecode(IO, options) {
  return __async(this, null, function* () {
    const promises = IO.map((io) => decode(io, options));
    return yield Promise.all(promises);
  });
}
export {
  bulkDecode,
  decode
};
//# sourceMappingURL=index.mjs.map