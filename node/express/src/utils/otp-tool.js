const vendor = require('../utils/vendor.js');
const speakeasy = vendor('speakeasy');

const OTPTool = {
  algorithm: 'sha256',
  encoding: 'ascii',
  generateSecret: ({ label }) => {
    const { algorithm, encoding } = OTPTool;
    const { [encoding]: secret } = speakeasy.generateSecret(config);
    const otpUrl = speakeasy.otpauthURL({ algorithm, label, secret });

    return { secret, otpUrl };
  },
  generateToken: (secret) => {
    const { algorithm, encoding } = OTPTool;
    return speakeasy.totp({ algorithm, encoding, secret });
  },
  validateToken: (secret, token) => {
    const { algorithm, encoding } = OTPTool;
    return speakeasy.totp.verify({ algorithm, encoding, secret, token });
  },
}

module.exports = OTPTool;
