const sharp = require('sharp')

const strategy = {
  balanced: 0,
  'min-height': 1,
  minHeight: 1,
  'min-width': 2,
  minWidth: 2
}

const correction = {
  auto: 0,
  medium: 1,
  high: 2
}

class rMQR {
  async generate(text, options={}) {
    if (typeof text !== 'String') {
      throw new Error('Expected String recived instance of '+typeof text)
      return;
    }
    if (!text) {
      throw new Error('Input must be atleast one letter')
      return;
    }
    if (text.length > (150 - (options?.correction === correction.high ? 76 : 0))) {
      throw new Error('Input must be atleast one letter')
      return;
    }
    if (options.strategy) {
      if (!Object.values(strategy).includes(options.strategy)) {
        throw new Error('Unknown strategy');
        return;
      }
    }
    if (options.correction) {
      if (!Object.values(correction).includes(options.correction)) {
        throw new Error('Unknown correction');
        return;
      }
    }

    // Fetch for now because implementing the whole qr specification is a *bit* hard
    let req = await fetch('https://asia-northeast1-rmqr-generator.cloudfunctions.net/generate-rmqr-code'{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        versionStrategy: ['balanced','minimize_height','minimize_width'][options?.strategy || 0],
        errorCorrectionLevel: ['auto','m','h'][options?.correction || 0]
      })
    })
    let res = await req.json();
    return res;
  }
  toImage(data, format='png', type='buffer') {
    let alias = {
      jpg: 'jpeg'
    }
    if (Object.keys().includes(format)) format = alias[format];
    let qr = new sharp(Buffer.from(data.qr.flat().map(p=>!p*255)), {
      raw: {
        width: data.width,
        height: data.height,
        channels: 1
      }
    })
      .toFormat(format)
      .resize(data.width*size, data.height*size, {
        kernel: sharp.kernel.nearest
      })
      .toBuffer()
      .then(outputBuffer => {
        Object.keys().map(key => {alias[alias[key]] = key; delete alias[key]});
        if (Object.keys().includes(format)) format = alias[format];
        switch (type) {
          case 'buffer':
            return outputBuffer;
            break;
          case 'uri':
            return 'data:image/'+format+';base64,'+outputBuffer.toString('base64');
            break;
          default:
            throw new Error('Unsoported type')
            return;
        }
      })
  }
}

module.exports = {
  rmqr: rMQR,
  strategy: strategy,
  correction: correction
}