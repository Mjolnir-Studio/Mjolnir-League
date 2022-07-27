'use strict';
const LCUConnector = require('lcu-connector-extra').default;
const lcu = new LCUConnector();

const i = require('../i18n.config');
const ws = require('./websocket');

const $ = {
    start: function(){
        console.log(`[INFO] ${i.__('call lcu start')}`);
        lcu.start();
    },
    stop: function(){
        console.log(`[INFO] ${i.__('call lcu stop')}`);
        lcu.stop();
    }
}
module.exports = $;

lcu.on('connect', async (data) => {
    if(client_lockfile.method != null) return; // 只是拿來判斷而已
    let json = JSON.stringify(data);
    let connect_data = JSON.parse(json);
    client_lockfile.method =  connect_data['protocol'];
    client_lockfile.ip =  connect_data['address'];
    client_lockfile.port =  connect_data['port'];
    client_lockfile.username =  connect_data['username'];
    client_lockfile.passwd =  connect_data['password'];
    console.log(`[INFO] ${i.__('lol client connect')}`);
    // console.log(`${client_lockfile.method} ${client_lockfile.ip} ${client_lockfile.port} ${client_lockfile.username} ${client_lockfile.passwd}`); // Only Debug to show
    console.log(`${client_lockfile.method}://${client_lockfile.ip}:${client_lockfile.port}/`); // Only Debug to show
    console.log(`${client_lockfile.username} : ${client_lockfile.passwd}`); // Only Debug to show
    url_prefix = `${client_lockfile.method}://${client_lockfile.ip}:${client_lockfile.port}/` // send to http
    client_connect_status = true;
    main.webContents.send('lcustatus', `${i.__('lol client connect')}`);
    await ws.connect();
    // ws.send(5,"GetLolGameflowV1GameflowPhase");
});

lcu.on('disconnect', () => {
    console.log(`[INFO] ${i.__('lol client disconnect')}`);
    console.log("[INFO] lockfile is remove. disconnect...");
    client_lockfile.method =  null;
    client_lockfile.ip =  null;
    client_lockfile.port =  null;
    client_lockfile.username =  null;
    client_lockfile.passwd =  null;
    client_connect_status = false;
    main.webContents.send('lcustatus', `${i.__('lol client disconnect')}`);
});