"use strict";
const { app, dialog, shell } = require("electron");
const i = require('./i18n.config');
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
}
module.exports = $;