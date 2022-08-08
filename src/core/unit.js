"use strict";
const { app, dialog, Menu, shell } = require("electron");
const i = require('./i18n.config');
const Store = require('electron-store');
const store = new Store();
// module
const fs = require('fs-extra');
const path = require('path');
const fsutil = require("nodejs-fs-utils");

const $ = {
    closeApp: function(){
        if(pid){
            process.kill(pid);
            pid = 0;
        }
        app.quit(); //沒有真的退出
        process.exit();
    },
    showMessage: function(window, title, type, message, detail,nolink){
        dialog.showMessageBox(window, {
            title: title,
            type: type,
            message: message,
            detail: detail,
            noLink: nolink,
            buttons: [`${i.__('Go Discord to Report this issue')}`, "OK"],
            cancelId:1
        }).then((index) => {
            if(index.response === 0){
                shell.openExternal("http://mjolnirdc.yomisana.xyz/");
            }
        });
    },
    showMessagelite: function(window, title, type, message, detail,nolink){
        dialog.showMessageBox(window, {
            title: title,
            type: type,
            message: message,
            detail: detail,
            noLink: nolink,
            cancelId:1
        });
    },
    showMessage_ga: function(window, title, type, message, detail,nolink){
        dialog.showMessageBox(window, {
            title: title,
            type: type,
            message: message,
            detail: detail,
            noLink: nolink,
            buttons: [`${i.__('I agree and continue')}`,`${i.__('I disagree and quit')}`],
        }).then((index) => {
            if(index.response === 0){
                // shell.openExternal("http://mjolnirdc.yomisana.xyz/");
                console.log("同意軟體啟用軟體分析模塊");
                store.set('initialization', false);
                require('./analytics');
            }else if(index.response === 1){
                console.log("不同意軟體啟用軟體分析模塊");
                $.closeApp();
            }
        });
    },
    calculatestorage:function(){
        return new Promise((resolve,reject)=>{
          fsutil.fsize(path.join(log_dir), {
            countFolders: false
          }, function (err, size) {
              // console.log(size); // bytes : 1024 bytes = 1KB
              logstorage.storage = (size / 1024).toFixed();
              logstorage.type = "KB";
              if(logstorage.storage >= 1024){ // 1024 KB
                let kbtomb = logstorage.storage
                logstorage.storage = (kbtomb / 1024).toFixed();
                logstorage.type = "MB";
                if(logstorage.storage >= 1024){ // 1024 KB
                  let mbtogb = logstorage.storage
                  logstorage.storage = (mbtogb / 1024).toFixed();
                  logstorage.type = "GB";
                }
              }
              console.log(`[INFO] ${i.__('log folder size')} ${logstorage.storage} ${logstorage.type}`);
              resolve(true);
          });
        });
    },
    cleanlog: function(){
        fs.readdir(path.join(log_dir), async (err, files) => {
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
            // update tray contextMenu
            await $.calculatestorage();
            const contextmenu = Menu.buildFromTemplate([
                {
                    icon: path.join(__dirname,'../resource/img/logo-taskbar.png'),
                    label: `${appname} v.${appver}`,
                    enabled: false
                },{type: 'separator'},
                {
                    label: 'Github', click: function () {
                        shell.openExternal("https://github.com/Yomisana/Mjolnir-League");
                    }
                },{type: 'separator'},
                {
                    label: `Clean log (${logstorage.storage} ${logstorage.type})`, click: function () {
                        $.cleanlog();
                        console.log(`[INFO] ${i.__('log has clean', logstorage.storage + logstorage.type)}`);
                    }
                },{type: 'separator'},
                {
                    label: `Quit ${appname}`, click: function () {
                        $.closeApp();
                    }
                }
            ]);
            taskbar.setContextMenu(contextmenu);
        });
    },
    cleanlasttimedata: function(){
        main.webContents.send('indexpage-sc-disable', ``);
    } 
}
module.exports = $;