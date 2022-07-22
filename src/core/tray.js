"use strict";
const {Tray, Menu, shell} = require('electron');
const i = require('./i18n.config');
const unit = require('./unit');
const path = require('path');
const $ = {
    taskbar: async function(window){
        console.log(`[INFO] ${i.__('taskbar tray on')}`);
        let type = (process.platform == "darwin")?'png':'ico';
        taskbar = new Tray(path.join(__dirname,'../resource/img/logo.'+type));
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
                    unit.closeApp();
                }
            }
        ]);
        taskbar.setToolTip(`${appname}`);
        taskbar.setContextMenu(contextmenu);
        taskbar.on('click', async ()=>{
            window.show(); 
        });
    },
    refresh_taskbar: function(){
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
                    unit.closeApp();
                }
            }
        ]);
        taskbar.setContextMenu(contextmenu);
    }
}
module.exports = $;