'use strict';
const LCUConnector = require('lcu-connector-extra').default;
const lcu = new LCUConnector();

const i = require('../i18n.config');

const $ = {
    start: function(){
        console.log(`[INFO] ${i.__('call lcu start')}`);
        lcu.start();
    }
}
module.exports = $;

lcu.on('connect', (data) => {
    let json = JSON.stringify(data);
    var connect_data = JSON.parse(json);
    client_lockfile.method =  connect_data['protocol'];
    client_lockfile.ip =  connect_data['address'];
    client_lockfile.port =  connect_data['port'];
    client_lockfile.username =  connect_data['username'];
    client_lockfile.passwd =  connect_data['password'];
    console.log(`[INFO] ${i.__('lol client connect')}`);
    console.log(`${client_lockfile.method} ${client_lockfile.ip} ${client_lockfile.port} ${client_lockfile.username} ${client_lockfile.passwd}`);
    client_connect_status = true;
    require('./websocket');
});

lcu.on('disconnect', () => {
    console.log(`[INFO] ${i.__('lol client disconnect')}`);
    console.log("[INFO] lockfile is remove. disconnect...");
    client_connect_status = false;
});