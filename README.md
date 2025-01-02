# mpegh-decoder

[![Downloads](https://img.shields.io/npm/dt/mpegh-decoder.svg)](https://www.npmjs.com/package/mpegh-decoder)

mpegh-decoder is a javascript wrapper for decoding MPEG-H 3D Audio into WAV files

## Installation

Using npm: 

```bash
npm install mpegh-decoder
```

## Getting started

```javascript
const mpeghDecoder = require('mpegh-decoder');

const decodedFilePath = await mpeghDecoder.decode({input: "path/to/input.m4a"}, {cicp: 6});
```

## Options

* `cicp` – CICP index of the desired target layout (default: 6)

## License

MIT