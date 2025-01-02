# mpegh-decoder

[![Version](https://img.shields.io/npm/v/mpegh-decoder.svg)](https://www.npmjs.com/package/mpegh-decoder)
[![License](https://img.shields.io/npm/l/mpegh-decoder.svg)](https://www.npmjs.com/package/mpegh-decoder)
[![Downloads](https://img.shields.io/npm/dt/mpegh-decoder.svg)](https://www.npmjs.com/package/mpegh-decoder)

mpegh-decoder is a JavaScript wrapper for decoding MPEG-H 3D Audio into WAV files using Fraunhofer's [mpeghdec](https://github.com/Fraunhofer-IIS/mpeghdec).

## Installation

Using npm: 

```bash
npm install mpegh-decoder
```

## Getting started

```javascript
const mpeghDecoder = require('mpegh-decoder');

mpeghDecoder.decode({input: "path/to/input.m4a"}, {cicp: 6});
```

## Options

* `cicp` – CICP index of the desired target layout (default: 6)

## License

MIT