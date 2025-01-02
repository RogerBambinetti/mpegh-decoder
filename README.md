# mpegh-decoder

[![Downloads](https://img.shields.io/npm/dt/play-sound.svg)](https://npmjs.org/package/play-sound)

mpegh-decoder is a javascript wrapper for decoding MPEG-H 3D Audio into WAV files

## Installation

```bash
npm install mpegh-decoder
```

## Usage

```javascript
const mpeghDecoder = require('mpegh-decoder');

await mpeghDecoder.decode({input: "path/to/input.m4a"}, {cicp: 6});
```

## Options

* `cicp` – |Target layout for decoding

## License

MIT