'use strict';
const exec = require('child_process').exec;
const i = require('./i18n.config');
const unit = require('./unit');

const $ = {
    check_permission: function(){
        return new Promise((resolve,reject)=>{
            console.log(`[INFO] ${i.__('check permission')}`);
            exec('NET SESSION', function(err,so,se) {
                if(se.length === 0){
                    console.log(`[INFO] ${i.__('Run as admin')}`);
                    main.webContents.send("appver", appver);
                    main.webContents.send("admin_permission", "管理員權限");
                    permission = true;
                }else{
                    console.warn(`[WARN] ${i.__('Not run as admin')}`);
                    console.log(`[ERROR] you not have pass permission check... please check are you have give app admin permission.`);
                    unit.showMessage(main, `${appname} - Error`, "error", "Why did it happen... This can't happen!", `${i.__('Not run as admin')}`, false);
                    unit.closeApp();
                    permission = false;
                }
            });
            resolve(true);
        });
    }
}
module.exports = $;