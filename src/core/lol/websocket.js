"use strict";
const Websocket = require('ws');

const msg_type = {
    welcome: 0,
    prefix: 1,
    call: 2,
    callresult: 3,
    callerror: 4,
    subscribe: 5,
    unsubscribe: 6,
    publish: 7,
    event: 8
};
function connect(){
    const ws = new Websocket(
        `wss://${client_lockfile.username}:${client_lockfile.passwd}@localhost:${client_lockfile.port}/`,
        'wamp',
        {
            rejectUnauthorized: false,
            timeout: 1000
        }
    );
    
    
    ws.on('open', function open() {
        console.log(`[wss] 成功完整與 wss://[Hide]:[Hide]@localhost:${client_lockfile.port}/ 建立連線...`);
        // ws.send('something');
        ws.send(`[${msg_type.call}, "GetData:GetLolSummonerV1CurrentSummoner","GetLolSummonerV1CurrentSummoner"]`);
    });
      
    ws.on('message', function message(data) {
      console.log(`[wss]收到訊息: ${data}`);
    });
    
    ws.on('close', function (event) {
        console.warn(`[wss]會話已關閉: ${event}`);
        setTimeout(function() {
            if(client_connect_status){
                connect();
                console.warn(`[wss]lol client still working... wss嘗試重新連線...`);
            }
        }, 2000);
    });
    
    ws.on('error', function (event) {
        console.warn(`[wss]錯誤訊息: ${event}`);
    });
}
connect(); // active once
