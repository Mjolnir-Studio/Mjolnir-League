"use strict";
const unit = require('./unit');
const { app, BrowserWindow } = require("electron");
const instanceLock = app.requestSingleInstanceLock();
const Store = require('electron-store');
const store = new Store();
const i = require('./i18n.config');
// Basic app data
rewindow = store.get('rewindow');

// 區域宣告
let isQuiting;

// Create some window settings
splash = new BrowserWindow
({
    title: splash_set.title,
    icon: window_ico,
    autoHideMenuBar: true,
    resizable: false,
    backgroundColor: window_BackgroundColor,
    width: splash_set.width, height: splash_set.height,
    minWidth: splash_set.min_width, minHeigh: splash_set.min_width,
    maxWidth: splash_set.max_width, maxHeight: splash_set.max_height,
    transparent: true,
    titleBarStyle: 'hiddenInset',
    frame: false,
    show: false,
    webPreferences:{
        devTools: false,
        // devTools: true,
        fullscreenBoolean: false,
        fullscreenableBoolean: false,
        simpleFullscreenBoolean: false,
        preload: __dirname + "/preload.js"
    }
});
splash.loadFile('src/resource/html/splash.html');
splash.setMenu(null);
splash.center();

// Main 視窗是否有原本使用者最後設定的位置與大小
if(rewindow){
    
}

main = new BrowserWindow
({
    title: main_set.title,
    icon: window_ico,
    autoHideMenuBar: true,
    // resizable: false,
    width: main_set.width, height: main_set.height,
    minWidth: main_set.min_width,
    minHeight: main_set.min_height,
    titleBarStyle: 'hiddenInset',
    frame: true,
    show: false,
    webPreferences: {
        devTools: false,
        fullscreenBoolean: false,
        fullscreenableBoolean: false,
        simpleFullscreenBoolean: false,
        nodeIntegration: true,
        contextIsolation: true,
        enableRemoteModule: false, // turn off remote
        preload: __dirname + "/preload.js" // use a preload script
    }
});

main.setMenu(null);
main.loadFile('src/resource/html/index.html');

// 主畫面將要關閉時，工具列圖示隱藏
main.on('close', (event) => {
    if (!isQuiting) {
      event.preventDefault();
      main.hide();
      event.returnValue = false;
    }
});

// 單一處理程序鎖定，有兩個以上的處理程序時，強制關閉最後開啟的那個
if(!instanceLock)
    unit.closeApp();
else{
    app.on('second-instance', (event, commandLine, workingDirectory) => {
      // 如果啟動第二個處理程序，則將原先啟動的那個彈出來並聚焦
      console.log(`[INFO] ${i.__('second instance')}`);
      unit.showMessage(main, appname, "info", "Hmmm... Need any help?", `${i.__('second instance')}`, false);
      if (main) {
        if (main.isMinimized()) main.restore();
        main.focus();
      }
    });
}
