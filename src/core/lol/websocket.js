"use strict";
const Websocket = require('ws');
const filter = require('./filter');
// welcome: 0,
// prefix: 1,
// call: 2, // 單次 request
// callresult: 3,
// callerror: 4,
// subscribe: 5,
// unsubscribe: 6,
// publish: 7,
// event: 8

const $ = {
    connect: function(){
        return new Promise((resolve,reject)=>{
            if(ws != null) return;
            ws = new Websocket(
                `wss://${client_lockfile.username}:${client_lockfile.passwd}@localhost:${client_lockfile.port}/`,
                'wamp',
                {
                    rejectUnauthorized: false,
                    timeout: 1000
                }
            );
            ws.on('open', function open() {
                console.log(`[wss]成功建立連線 wss://[Hide]:[Hide]@localhost:${client_lockfile.port}/ `);
                // sned ws data
                ws.send(`[5, "OnJsonApiEvent"]`); // 聽取所有 lol 的資料 但不是我要的東西都會被逆滲透過濾網給擋下來
                ws.send(`[2, "GetSelfSummoner", "GetLolChatV1Me"]`);
                resolve(ws);
            });
            
            ws.on('message', function message(data) {
                filter.post(data);
            });
            
            ws.on('close', function (event) {
                console.warn(`[wss]成功中斷連線 wss://[Hide]:[Hide]@localhost:${client_lockfile.port}/ Code: ${event}`);
                ws = null
                ws_status = false;
                setTimeout(function() {
                    if(client_connect_status){
                        resolve($.connect());
                        console.warn(`[wss]嘗試重新連線...`);
                    }
                }, 2000);
            });
            
            ws.on('error', function (event) {
                console.warn(`[wss]錯誤訊息: ${event}`);
            });
        }) 
    }
}
module.exports = $;