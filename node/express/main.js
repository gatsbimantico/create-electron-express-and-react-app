const express = require('./index.js');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

express.vendor.set({
  'fs': require('fs'),
  'path': require('path'),
  'glob': require('glob'),
  'express': require('express'),
  'http': require('http'),
  'body-parser': require('body-parser'),
  'cookie-parser': require('cookie-parser'),
  'object-merger': require('lodash.merge'),
  'fetch': require('cross-fetch'),
  'uuid': require('uuid').v4,
  'qr-tool': {
    generateDataUrl: (str) => new Promise((res, rej) => {
      qrcode.toDataURL(str, (err, url) => {
        if (err) rej(err);
        res(url);
      });
    }),
  },
  'f2a-tool': {
    generateSecret: (config) => {
      const {
        base32: secret,
        otpauth_url: otpUrl,
      } = speakeasy.generateSecret(config);

      return { secret, otpUrl };
    },
    validateToken: async (secret, token) => {
      return await speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token,
      });
    },
  },
});
new express.App();
