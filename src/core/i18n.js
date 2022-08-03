"use strict";
const i18n = require('./i18n.config');
const Store = require('electron-store');
const store = new Store();
const $ = {
    check: function(){
        return new Promise((resolve,reject)=>{
            // store.set('UserLastLocaleData', 'tw');
            console.log(`[INFO] app have "${i18n.getLocales()}" language for display language`);
            UserLastLocale = store.get('UserLastLocale');
            if(UserLastLocale){
                console.log(`[INFO] Last time User Locale Choose is:${UserLastLocale}`);
                if(UserLastLocale == "tw"){
                    console.log(`[INFO] Set up language:${UserLastLocale}`);
                    i18n.setLocale('tw');
                }else{
                    console.log(`[INFO] Set up language is:en(default)`);
                    i18n.setLocale('en'); 
                }
            }else{
                console.warn(`[WARN] Not have data about last time user locale chioose...`);
                console.log(`[INFO] Use default locale ${UserLocale}`);
                if(UserLocale == "zh-TW"){
                    i18n.setLocale('tw');
                    store.set('UserLastLocale', 'tw');
                    settings.accept_checkbox = true;
                }else{
                    console.warn(`[WARN] Not have this ${UserLocale} Language file use default lang... If you want change Display Language please wait software open complete. Go setting>Display Language> Change you prefer display language.`);
                    i18n.setLocale('en');
                    store.set('UserLastLocale', 'en');
                    settings.accept_checkbox = true;
                }
            }
            console.log(`[INFO] Now i18n Display Language file is:${i18n.getLocale()}.json`);
            // client_status = [`${i18n.__('client_status0')}`,`${i18n.__('client_status1')}`];
            resolve(true);
        });
    }
}

module.exports = $;