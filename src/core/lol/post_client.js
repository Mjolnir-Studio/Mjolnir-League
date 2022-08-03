'use strict';
const request = require('request');
const fs = require('fs-extra');
const $ = {
    accept_matchmaking: function(){
        let ReadyCheckTimer = setInterval(()=>{
            if(ReadyCheck){
                // console.log(`[ReadyCheck] Post ReadyCheckTimer | ReadyCheck布林:${ReadyCheck}`);
                request.post({
                    url: url_prefix + '/lol-matchmaking/v1/ready-check/accept',
                    strictSSL: false,
                    headers:{
                        'Accept': 'application/json',
                        'Authorization': client_lockfile.httptoken
                    }
                });
            }else{
                // console.log(`[ReadyCheck] Cancel ReadyCheckTimer | ReadyCheck布林:${ReadyCheck}`);
                clearInterval(ReadyCheckTimer); 
            }
        }, 500);
    },
    get_summoner: function(url){
        request.get({
            url: url_prefix + `/lol-chat/v1/me`,
            strictSSL: false,
            headers:{
                'Accept': 'application/json',
                'Authorization': client_lockfile.httptoken
            }
        },
            function(err, httpResponse, body){
                try{
                    let data = JSON.parse(body);
                    selfsummoner.icon = data.icon;
                    selfsummoner.id = data.id;
                    selfsummoner.name = data.name;
                    selfsummoner.level = data.lol.level;
                    selfsummoner.pid = data.pid;
                    selfsummoner.platformId = data.platformId;
                    selfsummoner.puuid = data.puuid;
                    selfsummoner.summonerId = data.summonerId;
                    gameQueueType = data.lol.gameQueueType;
                    gameStatus = data.lol.gameStatus;
                    if(selfsummoner.name){
                        console.log(`連線帳號(request get): ${selfsummoner.name}`);
                        main.webContents.send('homepage-summoner_lv', `${selfsummoner.level}`);
                    }else{
                        // console.log(`連線帳號: ${selfsummoner.name} (No Output)`);
                        console.log("Request 提取失敗再次重新獲取當前玩家召喚師資料中....");
                        $.get_summoner();
                    }
                }catch(error){
                    console.warn(error);
                }
            }
        ); 
    },
    get_summoner_assets: function(){
        request.get({
            url: url_prefix + `/lol-game-data/assets/v1/profile-icons/${selfsummoner.icon}.jpg`,
            strictSSL: false,
            encoding: null,
            headers:{
                'Accept': 'application/json',
                'Authorization': client_lockfile.httptoken
            }
        },
            function(err, httpResponse, body){
                try{
                    let imgBuffer  = Buffer.from(body);
                    let imgBase64  = imgBuffer.toString('base64');
                    let imgDataUrl = "data:image/jpeg;base64, "+imgBase64;
                    // console.log(imgDataUrl);
                    selfsummoner.icon_data = imgDataUrl;
                    main.webContents.send('homepage-summoner_icon', selfsummoner.icon_data);
                }catch(error){
                    console.warn(error);
                }
            }
        );
    }
}
module.exports = $;