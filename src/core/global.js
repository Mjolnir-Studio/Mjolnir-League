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
global.analytics = null;
global.analytics_set = {
    width: 10,min_width: 10,
    height: 10,min_height: 10,
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
    icon_data: null,
    id: null,
    name: null,
    level: 0,
    pid: null,
    platformId: null,
    puuid: null,
    summonerId: null,
}
global.selfsummoner_rank = {
    RANKED_SOLO_5x5:{
        icon_icon: null,
        tier: null, // SILVER
        division: null, // IV III II I
        pt: null, // 當前積分分數 0~100 (?)
        l: null,
        w: null,
        total_match: null,
        win_percentage: null,
    },
    RANKED_FLEX_SR:{
        icon_icon: null,
        tier: null,
        division: null,
        pt: null,
        l: null,
        w: null,
        total_match: null,
        win_percentage: null,
    }
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

// select chat
global.select_champion = {
    msg: null,
}