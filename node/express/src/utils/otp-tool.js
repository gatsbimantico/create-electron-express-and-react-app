const DB = require('../data/db.js');
const vendor = require('../utils/vendor.js');
const speakeasy = vendor('speakeasy');

const OTPTool = {
  get configuration() {
    const {
      'otp.label': label,
      'otp.algorithm': algorithm,
      'otp.encoding': encoding,
    } = DB.get(DB.CONF);

    return { algorithm, encoding, label };
  },
  generateSecret: () => {
    const { algorithm, encoding, label } = OTPTool.configuration;
    const { [encoding]: secret } = speakeasy.generateSecret();
    const otpUrl = speakeasy.otpauthURL({ algorithm, label, secret });

    return { secret, otpUrl };
  },
  generateToken: (secret) => {
    const { algorithm, encoding } = OTPTool.configuration;
    return speakeasy.totp({ algorithm, encoding, secret });
  },
  validateToken: (secret, token) => {
    const { algorithm, encoding } = OTPTool.configuration;
    return speakeasy.totp.verify({ algorithm, encoding, secret, token });
  },
}

module.exports = OTPTool;
