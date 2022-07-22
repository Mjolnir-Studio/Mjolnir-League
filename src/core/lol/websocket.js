"use strict";
// const { Websocket } = require('lcu-connector-extra');

// const WebSocket = require('ws');
const { Websocket } = require('lcu-connector-extra');
// client_ws = `wss://${client_lockfile.username}:${client_lockfile.passwd}@${client_lockfile.ip}:${client_lockfile.port}/`;
// console.log(client_ws);
// console.log("wss://riot:Vb4qOZdKanoA-9UB9gAN_Q@localhost:60588/");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;

// const ws = new WebSocket(`wss://${client_lockfile.username}:${client_lockfile.passwd}@${client_lockfile.ip}:${client_lockfile.port}/`);
// const ws = new WebSocket(`wss://${client_lockfile.username}:${client_lockfile.passwd}@${client_lockfile.ip}:${client_lockfile.port}/lol-gameflow/v1/gameflow-phase`, { 
/** HOW TO USE */
// const ws = new RiotWSProtocol(`wss://${client_lockfile.username}:${client_lockfile.passwd}@localhost:${client_lockfile.port}/`);

// ws.on('open', () => {
//     ws.subscribe('OnJsonApiEvent', console.log);
// });



// const ws = new Websocket('wss://riot:Vb4qOZdKanoA-9UB9gAN_Q@localhost:60588/');

// const ws = new WebSocket(`wss://${client_lockfile.ip}:${client_lockfile.port}, { rejectUnauthorized: false });

console.log(`wss://${client_lockfile.username}:${client_lockfile.passwd}@localhost:${client_lockfile.port}/`);
// const ws = new Websocket(`ws://${client_lockfile.username}:${client_lockfile.passwd}@localhost:${client_lockfile.port}/`, { rejectUnauthorized: false });
const ws = new Websocket(`ws://${client_lockfile.username}:${client_lockfile.passwd}@localhost:${client_lockfile.port}/`, { rejectUnauthorized: false });