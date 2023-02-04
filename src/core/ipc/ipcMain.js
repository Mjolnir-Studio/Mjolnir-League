const {ipcMain, clipboard, shell} = require('electron');
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
    }else if(args == "Chinese"){
      i.setLocale('tw');
      store.set('UserLastLocale', 'tw');
    }else if(args == "lcustatus"){
      let status = client_connect_status ? `${i.__('lol client connect')}:true` : `${i.__('lol client disconnect')}:false`;
      main.webContents.send('lcustatus', `${status}`);
    }else if(args == "sidebardisplaylang"){
      main.webContents.send('sidebardisplaylang-home', `${i.__('sidebar links home')}`);
      main.webContents.send('sidebardisplaylang-summoner', `${i.__('sidebar links summoner')}`);
      main.webContents.send('sidebardisplaylang-battle', `${i.__('sidebar links battle')}`);
      main.webContents.send('sidebardisplaylang-chat', `${i.__('sidebar links chat')}`);
      main.webContents.send('sidebardisplaylang-exit', `${i.__('sidebar links exit')}`);
      main.webContents.send('sidebardisplaylang-profile', `${i.__('sidebar links profile')}`);
    }else if(args == "settingspage"){
      main.webContents.send('settingspage-title', `${i.__('settingspage title')}`);
      main.webContents.send('settingspage-title_lang', `${i.__('settingspage title lang')}`);
      main.webContents.send('settingspage-accept_checkbox', `${i.__('settingspage accept checkbox')}`);
      main.webContents.send('settingspage-delete_button', `${i.__('settingspage delete button text')}`);
      main.webContents.send('settingspage-refresh_button', `${i.__('settingspage refresh button text')}`);
      main.webContents.send('settingspage-dev_button', `${i.__('settingspage dev button text')}`);
      main.webContents.send('settingspage-appver', `${i.__('settingspage appver title')}`);
      main.webContents.send('settingspage-appdev', `${i.__('settingspage appdev title')}`);
      main.webContents.send('settingspage-appdev_text', `${i.__('settingspage appdev text')}`);
    }else if(args == "watinglolpage"){
      main.webContents.send('watinglolpage-title', `${i.__('watinglolpage title')}`);
      main.webContents.send('watinglolpage-disconnect', `${i.__('watinglolpage disconnect')}`);
    }else if(args == "onDisconnect"){
      main.webContents.send('indexpage-disconnect');
    }else if(args == "title_banner"){
      main.webContents.send('homepage-summoner_icon', selfsummoner.icon_data);
      main.webContents.send('homepage-summoner_name', selfsummoner.name);
      main.webContents.send('homepage-summoner_lv', selfsummoner.level);
      main.webContents.send('homepage-RANKED_SOLO_5x5_icon', selfsummoner_rank.RANKED_SOLO_5x5.icon_data);
      main.webContents.send('homepage-RANKED_SOLO_5x5_icon_title', `Tier: ${selfsummoner_rank.RANKED_SOLO_5x5.division} \nLP:${selfsummoner_rank.RANKED_SOLO_5x5.pt}`);
      main.webContents.send('homepage-RANKED_SOLO_5x5_icon_wl', `W:${selfsummoner_rank.RANKED_SOLO_5x5.w} \nL:${selfsummoner_rank.RANKED_SOLO_5x5.l}`);
      main.webContents.send('homepage-RANKED_SOLO_5x5_icon_wl_title', `Total Match:${selfsummoner_rank.RANKED_SOLO_5x5.total_match}`);
      main.webContents.send('homepage-RANKED_SOLO_5x5_win_percentage', `Win%:${selfsummoner_rank.RANKED_SOLO_5x5.win_percentage}`);
      main.webContents.send('homepage-RANKED_FLEX_SR_icon', selfsummoner_rank.RANKED_FLEX_SR.icon_data);
      main.webContents.send('homepage-RANKED_FLEX_SR_icon_title', `Tier: ${selfsummoner_rank.RANKED_FLEX_SR.division} \nLP:${selfsummoner_rank.RANKED_FLEX_SR.pt}`);
      main.webContents.send('homepage-RANKED_FLEX_SR_icon_wl', `W:${selfsummoner_rank.RANKED_FLEX_SR.w} \nL:${selfsummoner_rank.RANKED_FLEX_SR.l}`);
      main.webContents.send('homepage-RANKED_FLEX_SR_icon_wl_title', `Total Match:${selfsummoner_rank.RANKED_FLEX_SR.total_match}`);
      main.webContents.send('homepage-RANKED_FLEX_SR_win_percentage', `Win%:${selfsummoner_rank.RANKED_FLEX_SR.win_percentage}`);
    }else if(args == "ondev"){
      // main.shell.openExternal(`https://mjolnir.yomisana.xyz/wiki/docs/mjolnir-league/patchnote/${appver}`);
      shell.openExternal(`https://mjolnir.yomisana.xyz/wiki/docs/mjolnir-league/patchnote/${appver}`);
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

      if(args[0] == "chatpage"){
        if(args[1]){
          main.webContents.send('indexpage-sc-enable', `${args[1]}`);
          main.webContents.send('chatpage-sc-enable');
        }else{
          main.webContents.send('indexpage-sc-disable');
          main.webContents.send('chatpage-sc-disable', `${i.__('battle chat waiting text default')}`);
        }
      }
      
      if(args[0] == "summoner_name_copy"){
        if(args[1]){
          // console.log("複製聊天室內容成功");
          console.log(`[INFO] ${i.__('ipcMain summoner name copy success')}`);
          // 複製聊天室文字
          // clipboard.writeText(`${i.__('My summoner name')}${args[1].replace(/^(\r\n|\n|\r|\t| )+/gm, "")}`);
          clipboard.writeText(`${args[1].replace(/^(\r\n|\n|\r|\t| )+/gm, "")}`);
        }else{
          clipboard.writeText(args[1]);
        }
      }

      if(args[0] == "cs_chat_copy"){
        if(args[1]){
          // console.log("複製聊天室內容成功");
          console.log(`[INFO] ${i.__('ipcMain champselect chat copy success')}`);
          // 複製聊天室文字
          clipboard.writeText(`${args[1].replace(/^(\r\n|\n|\r|\t| )+/gm, "")}[Mjolnir League]`);
        }else{
          clipboard.writeText(args[1]);
        }
      }
    }
});