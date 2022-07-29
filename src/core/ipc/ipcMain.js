const {ipcMain} = require('electron');
const i = require('../i18n.config');
const unit = require('../unit');
// modules
const exec = require('child_process').exec;
const fs = require('fs-extra');
const path = require('path');

// ipcMain
ipcMain.on("toMain", async (event, args) => {
    // console.log('[ipcMain] ' + args + ' 事件已觸發');
    console.log(`[ipcMain] ${args} ${i.__('ipcMain event')}`);
    if(args == "closeapp"){
        unit.closeApp();
    }else if(args == "appver"){
        main.webContents.send('appver', `${appver}`);
    }else if(args == "lcustatus"){
        let status = client_connect_status ? `${i.__('lol client connect')}` : `${i.__('lol client disconnect')}`;
        main.webContents.send('lcustatus', `${status}`);
    }else if(args == "sidebardisplaylang-home"){
        main.webContents.send('sidebardisplaylang-home', `${i.__('sidebar links home')}`);
    }else if(args == "sidebardisplaylang-summoner"){
        main.webContents.send('sidebardisplaylang-summoner', `${i.__('sidebar links summoner')}`);
    }else if(args == "sidebardisplaylang-battle"){
        main.webContents.send('sidebardisplaylang-battle', `${i.__('sidebar links battle')}`);
    }else if(args == "sidebardisplaylang-chat"){
        main.webContents.send('sidebardisplaylang-chat', `${i.__('sidebar links chat')}`);
    }else if(args == "sidebardisplaylang-exit"){
        main.webContents.send('sidebardisplaylang-exit', `${i.__('sidebar links exit')}`);
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
    }
});