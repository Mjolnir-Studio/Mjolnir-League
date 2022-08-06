"use strict";
const { contextBridge,ipcRenderer } = require("electron");


// 要發送渲染端的 js => preload => src\resource\plugin\render => ml_main
// 要接收渲染端的 ml_main => preload => src\core\index => 要處理的 js
contextBridge.exposeInMainWorld(
    "api", {
        // 後端傳送值所屬的頻道 (由前端瀏覽器傳送) - (渲染端 => 主程序)
        send: (channel, data) => {
            let validChannels = ["toMain"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        // 前端接收值所屬的頻道(主程序 => 渲染端)
        receive: (channel, func) => {
            let validChannels = [
                "update_percent",
                "update_status",
                "appver",
                "lcustatus",
                "gameQueueType",
                "gameStatus",
                "gameflowphase",
                // index
                "indexpage-disconnect",
                // Sidebar
                "sidebardisplaylang-home",
                "sidebardisplaylang-summoner",
                "sidebardisplaylang-battle",
                "sidebardisplaylang-chat",
                "sidebardisplaylang-exit",
                "sidebardisplaylang-profile",
                // Settings
                "settingspage-title",
                "settingspage-title_lang",
                "settingspage-accept_checkbox",
                "settingspage-delete_button",
                "settingspage-refresh_button",
                "settingspage-dev_button",
                "settingspage-appver",
                "settingspage-appdev",
                "settingspage-appdev_text",
                // waitinglol
                "watinglolpage-title",
                "watinglolpage-disconnect",
                // home
                "homepage-summoner_icon",
                "homepage-summoner_name",
                "homepage-summoner_lv",
                "homepage-RANKED_SOLO_5x5_icon",
                "homepage-RANKED_SOLO_5x5_icon_title",
                "homepage-RANKED_FLEX_SR_icon",
                "homepage-RANKED_FLEX_SR_icon_title",
                // Chat
                "chatpage-sc-active",
                "chatpage-sc-enable",
                "chatpage-sc-disable",
            ];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);