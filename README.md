# rMQR
This package allows you to create rMQRs (Rectangular Micro QR)

## Usage
Some basic usage of the package.
```js
const { rmqr } = require('rmqr');

console.log(rmqr.generate('Some text'))
```
This will return an object with a width, height and a 2d array.

You can also generate a image and adjust some settings
```js
const { rmqr, strategy, correction } = require('rmqr');

let data = rmqr.generate('Other text', {
  strategy: strategy.minHeight, // Options: balanced, min-height, minHeight, min-width, minWidth
  correction: correction.high // Options: auto, medium, high (high has a lower max characters)
})

console.log(rmqr.toImage(data, 'jpg', 'uri', 10))
/*
1st the object from the generate
2nd argument is a image extension (png, jpg, jpeg, webp, tiff...)
3rd is the way the data will be presented (buffer or uri)
4th number of pixels per color
*/
```
