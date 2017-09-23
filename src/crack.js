/*
* crack
*/

const Jimp = require("jimp");

const brickWidth = 50;
const brickHeight = 50;

const groundWidth = 260;
const groundHeight = 90;

const decodeBase64DataUri = (dataString) => {
  const matches = dataString.match(/^data:([^;]+);([^,]+),(.+)$/);
  const type = matches[1];
  const encoding = matches[2];
  const bufferStr = matches[3];
  if (!type || !encoding || !bufferStr) {
    throw new Error('Invalid input string');
  }
  return {
    type,
    encoding,
    buffer: new Buffer(bufferStr, encoding),
  };
};

const crack = async ({ groundDataString, brickDataString, brickTop }) => {
  let groundBuf;
  try {
    groundBuf = decodeBase64DataUri(groundDataString).buffer;
  } catch (ex) {
    groundBuf = new Buffer(groundDataString, 'base64');
  }

  let brickBuf;
  try {
    brickBuf = decodeBase64DataUri(brickDataString).buffer;
  } catch (ex) {
    brickBuf = new Buffer(brickDataString, 'base64');
  }

  const ground = await Jimp.read(groundBuf);
  const brick = await Jimp.read(brickBuf);

  brick.crop(0, 0, 1, brickHeight);

  let left = null;
  let confidence = -1;

  for (let x = 0; x < groundWidth; x++) {
    const clone = ground.clone();
    clone.crop(x, brickTop, 1, brickHeight);
    const diff = Jimp.diff(brick, clone, 0.1);
    if (confidence < diff.percent) {
      confidence = diff.percent;
      left = x;
    }
  }

  return {
    x: left,
    confidence,
  };
};

module.exports = crack;
