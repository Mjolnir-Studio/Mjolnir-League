const {ipcMain} = require('electron');
const i = require('../i18n.config');
const unit = require('../unit');

// ipcMain
ipcMain.on("toMain", async (event, args) => {
    // console.log('[ipcMain] ' + args + ' 事件已觸發');
    console.log(`[ipcMain] ${args} ${i.__('ipcMain event')}`);
    if(args == "closeapp"){
        unit.closeApp();
    }else if(args == "appver"){
        main.webContents.send('appver', `App Version:${appver}`);
    }else if(args == "lcustatus"){
        let status = client_connect_status ? `${i.__('lol client connect')}` : `${i.__('lol client disconnect')}`;
        main.webContents.send('lcustatus', `${status}`);
    }
});