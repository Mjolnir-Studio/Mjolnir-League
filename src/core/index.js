"use strict";
require('./logger');
require('./global');
require('./ipc/ipcMain');
const {app} = require('electron');
const i = require('./i18n.config');
const i18n_user = require('./i18n');
const tray = require('./tray');
const permission = require('./permission');
const unit = require('./unit');
const electronLogger = require('electron-log');
const {autoUpdater} = require("electron-updater");
const lolclient = require('./lol/get_client');
//basic app info
appname = app.getName();
appver = app.getVersion();
log_dir = app.getPath('userData') + '\\logger';

const $ = {
    UserLocale: function(){
        return new Promise(async (resolve,reject)=>{
            UserLocale = app.getLocale();
            console.log(`[SYSTEM] Get User Locale is:${UserLocale}`);
            await i18n_user.check();
            resolve(true);
        });
    },
    run: async function(){
      console.warn("開始檢查權限然後執行主程式!");
      await permission.check_permission();
      let starterTimer = setInterval(()=>{
          if(mainWindowReady && permission){
            console.warn("檢查完畢顯示主視窗");
            clearInterval(starterTimer);
            main.show();
            tray.taskbar(main);
            splash.close();
            lolclient.start();
          }
      },100);
    }
}

app.whenReady().then(async () => {
    console.warn("App Ready Active");
    await $.UserLocale();
    console.log(`[INFO] ${i.__('app basic info')}\n${i.__('appname')}: ${appname}\n${i.__('appver')}: ${appver}`);
    console.log(`[INFO] ${i.__('app pre-work')}`);
    require('./windows');
    splash.once('ready-to-show', async () => {
        console.log(`[INFO] ${i.__('splashwindow ready to show')}`);
        splashWindowReady = true;
        splash.show();
        if(app.isPackaged){
            console.log("[INFO] 開始檢查是否有可用更新");
            autoUpdater.checkForUpdatesAndNotify();
        }else{
          console.warn("[INFO] Debug模式下...略過檢查更新");
          $.run();
        }
    });

    main.once('ready-to-show', async () => {
      console.log(`[INFO] ${i.__('Mainwindow ready to show')}`);
      mainWindowReady = true;
    });
});



// autoUpdater
autoUpdater.logger = electronLogger;
autoUpdater.logger.transports.file.level = 'info';

autoUpdater.on('checking-for-update', () => {
  console.log(`[INFO] ${i.__('Checking for update...')}`);
  splash.webContents.send('update_status',`${i.__('Checking for update... webContents')}`);
});

autoUpdater.on('update-available', (info) => {
  console.log(`[INFO] ${i.__('Update available.')}`);
  splash.webContents.send('update_status',`${i.__('Update available webContents')}`);
});

autoUpdater.on('update-not-available', (info) => {
  console.log(`[INFO] ${i.__('Update is latest.')}`);
  splash.webContents.send('update_status',`${i.__('Update is latest.')}`);
  splash.webContents.send('update_status',`${i.__('Update is latest. webContents')}`);
  $.run();
});

autoUpdater.on('error', (err) => {
  console.warn(`[WARN] ${i.__('Update Error')} ${err}`);
  splash.webContents.send('update_status',`${i.__('Update Error webContents')}`);
  //Error in auto-updater. HttpError: 500 When repo server error.
  let reg = RegExp(/HttpError: 500/);
  if(reg.exec(err)){
    unit.showMessage(splash,"Updater Error 500 - Github have some issue\n Tips: This time Update is skip.","error", appname + " - Updater error");
  }
});

autoUpdater.on('download-progress', (progressObj) => {
  let percent = progressObj.percent.toFixed(0);
  console.log(`[INFO] ${i.__('Download progress: %s %',percent)}`);
  splash.webContents.send('update_status',`${i.__('Downloading... %s %',percent)}`);
  splash.webContents.send('update_percent',percent);
});

autoUpdater.on('update-downloaded', (info) => {
  console.log(`[INFO] ${i.__('Update downloaded')}`);
  splash.webContents.send('update_status',`${i.__('Update downloaded webContents')}`);
  autoUpdater.quitAndInstall(false, true); // isSilent: false, isForceRunAfter: true
});