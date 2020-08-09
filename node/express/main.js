const { App, vendor } = require('./index.js');

vendor.set({
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
  'qrcode': require('qrcode'),
  'speakeasy': require('speakeasy'),
});

new App();
