'use strict';
const ua = require('universal-analytics');
const { v4:uuidv4, validate:uuidValidate }= require('uuid');
const Store = require('electron-store');
const store = new Store();

console.warn('Analytics Active');

const userId = store.get('userid') || uuidv4();
console.log(`使用者的特徵碼: ${userId}`);
console.log(`使用者特徵碼驗證: ${uuidValidate(userId)}`);


// console.warn('analytics send data final check');
// console.warn(`userId: ${userId}`);
// console.warn(`screen: ${sr_screen}`); // screen: 1920x1080..etc
// console.warn(`window: ${vp_screen}`); // windows: 800x600..etc
// console.warn(`userlocal: ${UserLastLocale}`); // User local
// var visitor = ua('UA-236747929-1');

// var visitor = ua('UA-236747929-1', userId, { // UA-236747929-1 is Client Id 
//     strictCidFormat: false,
//     // uid: 'as8eknlll', // User ID
//     aip: 1, // 對於 IP address 進行匿名處理
//     ds: "app", // 指定此發送資訊為 app  數據來源
//     sr: sr_screen, // 當前物理螢幕的解析度是多少?
//     vp: vp_screen, // 當前軟體視窗的解析度是多少?
//     ul: UserLastLocale, // 當前軟體的顯示語言
// });

// 正常的
var visitor = ua('UA-236747929-1', userId);

// 原版
visitor.pageview("/Startapp", function (err) {
    if (err) {
        console.warn(err);
    }
    // Handle the error if necessary.
    // In case no error is provided you can be sure
    // the request was successfully sent off to Google.
});


// debug
// visitor.pageview({
//     dp: "/Startapp",
//     // dt: "Starting Using Electron app(Mjolnir League)",
//     dr: "Desktop App(Electron)",
//     an: "Mjolnir League(Electron)",
//     av: `${appver}`,
// }).send();

const $ = {
    send: function (url) {
        // visitor.pageview(`/${url}`, function (err) {
        //     if (err) {
        //         console.warn(`analytics error: ${err}`);
        //     }
        // });
    }
}
module.exports = $;
// GP4 - Not working