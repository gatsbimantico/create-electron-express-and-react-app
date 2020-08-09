const vendor = require('../utils/vendor.js');
const qrcode = vendor('qrcode');

const QRTool = {
  generateDataUrl: (str) => new Promise((res, rej) => {
    qrcode.toDataURL(str, (err, url) => {
      if (err) rej(err);
      res(url);
    });
  }),
};

module.exports = QRTool;
