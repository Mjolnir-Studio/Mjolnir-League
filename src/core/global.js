"use strict";
// app basic data
global.appname = "Mjolnir League";
global.appver = null;
global.pid = 0, // process pid
global.permission = false;
global.log_dir = null;
// app i18n
global.UserLocale = null;
global.UserLastLocale = null;
// app tray
global.taskbar = null;
// app windows
global.window_ico = './src/resource/img/logo.ico';
global.window_BackgroundColor = '#2e2c29';
global.rewindow = false;
global.splash = null;
global.splashWindowReady = false;
global.splash_set = {
    width: 300,min_width: 300,max_width: 300,
    height: 400,min_height: 400,max_height: 400,
    // general
    title: appname + " Loading"
}
global.main = null;
global.mainWindowReady = false;
global.main_set = {
    width: 816,min_width: 816,
    height: 639,min_height: 639,
    // general
    title: appname
}
// app log storage
global.logstorage = { // log calc storage
    storage: null,
    type: null
}

// websocket
global.ws = null;
global.ws_status = false;

// lol client (http / wss)

global.client_lockfile = {
    method: null,
    ip: null,
    port: null,
    username: null,
    passwd: null,
    httptoken: null
}
// wss
global.client_connect_status = false;
global.client_ws = null;
// http
global.url_prefix = null;

// lol api data
// gameQueueType
global.selfsummoner = {
    icon: 0,
    id: null,
    name: null,
    pid: null,
    platformId: null,
    puuid: null,
    summonerId: null,
}
// game status
global.gameQueueType = null;
global.gameStatus = null;
global.gameflowphase = null;

// app user setting
global.settings = {
    accept_checkbox: false
}

// app unit
global.ReadyCheck = false;