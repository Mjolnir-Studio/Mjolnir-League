const {ipcMain} = require('electron');
const i = require('../i18n.config');
const unit = require('../unit');
// modules
const exec = require('child_process').exec;
const fs = require('fs-extra');
const path = require('path');
const Store = require('electron-store');
const store = new Store();
// ipcMain
ipcMain.on("toMain", async (event, args) => {
    // console.log('[ipcMain] ' + args + ' 事件已觸發');
    console.log(`[ipcMain] ${args} ${i.__('ipcMain event')}`);
    if(args == "closeapp"){
        unit.closeApp();
    }else if(args == "appver"){
        main.webContents.send('appver', `${appver}`);

    }else if(args == "English"){ // 顯示語言
      i.setLocale('en');
      store.set('UserLastLocale', 'en');
      unit.showMessagelite(main, appname, "info", ":o", `Restart ${appname} will show you click display language`, false);
    }else if(args == "Chinese"){
      i.setLocale('tw');
      store.set('UserLastLocale', 'tw');
      unit.showMessagelite(main, appname, "info", ":o", `重啟 ${appname} 後將顯示你點擊顯示語言`, false);
    }else if(args == "lcustatus"){
      let status = client_connect_status ? `${i.__('lol client connect')}` : `${i.__('lol client disconnect')}`;
      main.webContents.send('lcustatus', `${status}`);
    }else if(args == "sidebardisplaylang"){
      main.webContents.send('sidebardisplaylang-home', `${i.__('sidebar links home')}`);
      main.webContents.send('sidebardisplaylang-summoner', `${i.__('sidebar links summoner')}`);
      main.webContents.send('sidebardisplaylang-battle', `${i.__('sidebar links battle')}`);
      main.webContents.send('sidebardisplaylang-chat', `${i.__('sidebar links chat')}`);
      main.webContents.send('sidebardisplaylang-exit', `${i.__('sidebar links exit')}`);
      main.webContents.send('sidebardisplaylang-profile', `${i.__('sidebar links profile')}`);
    }else if(args == "kill_lolrender"){
        exec('taskkill /f /im LeagueClientUxRender.exe',function (error, stdout, stderr) {
          console.log(`[INFO] ${i.__('ipcMain kill lolrender')}`)
          if(error)
            console.error("[ERROR] " + error);
        });
    }else if(args == "Clean_log"){
        fs.readdir(path.join(log_dir), (err, files) => {
          if (err) {
            console.error("[ERROR - Clean log] "+err);
          }
          for (const file of files) {
            fs.unlink(path.join(log_dir, file), err => {
              if (err) {
                console.error("[ERROR - Ready Clean log] "+err);
              }
            });
          }
        });
    }else if(Array.isArray(args)){
      if(args[0] == "accept_checkbox"){
        if(args[1]){
          // console.log("啟用自動接受");
          console.log(`[INFO] ${i.__('ipcMain accept checkbox enable')}`);
          settings.accept_checkbox = true;
        }else{
          // console.warn("禁用自動接受");
          console.warn(`[WARN] ${i.__('ipcMain accept checkbox disable')}`);
          settings.accept_checkbox = false;
        }
      }
    }
});