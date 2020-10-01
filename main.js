const electron = require('electron')

const app = electron.app

const BrowserWindow = electron.BrowserWindow

const { App: ExpressApp, vendor: expressDependencies } = require('./node/express/index.js');

expressDependencies.set({
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

new ExpressApp({}, {
  preConfigure(config, DB, expressApp) {
    var io = require('socket.io')(expressApp.server);
    
    io.on('connection', function (socket) {
      socket.broadcast.emit('USER_CONNECTED');
    
      socket.on('CHAT_MESSAGE', function (data) {
        io.emit('CHAT_MESSAGE', data);
      });
    
      socket.on('SHARE_MESSAGE_HISTORY', function (data) {
        io.emit('MESSAGE_HISTORY', data);
      });
    
      socket.on('disconnect', function () {
        socket.broadcast.emit('USER_DISCONNECTED');
      });
    });
  },
  postStart(config, DB, expressApp) {
    let mainWindow;

    function createWindow () {
      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: 'hidden',
        trafficLightPosition: {
          x: 0,
          y: -20,
        },
        webPreferences: {
          nodeIntegration: true,
          nodeIntegrationInWorker: true,
          nodeIntegrationInSubFrames: true,
          allowRunningInsecureContent: false,
        },
      });
    
      mainWindow.loadURL('http://localhost:27123/');
    
      mainWindow.webContents.openDevTools();
    
      mainWindow.on('closed', function () {
        mainWindow = null
      });
    }
    
    app.on('ready', createWindow);
    
    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
    
    app.on('activate', function () {
      if (mainWindow === null) {
        createWindow();
      }
    });    
  }
});
