'use strict';
const request = require('request');

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
                        main.webContents.send('homepage-summoner_icon', selfsummoner.icon_data);
                        main.webContents.send('homepage-summoner_name', selfsummoner.name);
                        main.webContents.send('homepage-summoner_lv', selfsummoner.level);
                        $.get_summoner_assets();
                        $.get_summoner_rank();
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
    },
    get_summoner_rank: function(){
        // 
        request.get({
            url: url_prefix + `/lol-ranked/v1/ranked-stats/${selfsummoner.puuid}`,
            strictSSL: false,
            encoding: null,
            headers:{
                'Accept': 'application/json',
                'Authorization': client_lockfile.httptoken
            }
        },
            function(err, httpResponse, body){
                try{
                    let data = JSON.parse(body);
                    selfsummoner_rank.RANKED_SOLO_5x5.tier = data.queueMap.RANKED_SOLO_5x5.tier;
                    selfsummoner_rank.RANKED_SOLO_5x5.division = data.queueMap.RANKED_SOLO_5x5.division;
                    selfsummoner_rank.RANKED_SOLO_5x5.pt = data.queueMap.RANKED_SOLO_5x5.leaguePoints;
                    let RANKED_SOLO_5x5_name = selfsummoner_rank.RANKED_SOLO_5x5.tier.toLowerCase();
                    $.get_summoner_rank_icon(RANKED_SOLO_5x5_name, "RANKED_SOLO_5x5");
                    // console.log("單雙積分");
                    // console.log(selfsummoner_rank.RANKED_SOLO_5x5.tier);
                    // console.log(selfsummoner_rank.RANKED_SOLO_5x5.division);
                    // console.log(selfsummoner_rank.RANKED_SOLO_5x5.pt);
                    selfsummoner_rank.RANKED_FLEX_SR.tier = data.queueMap.RANKED_FLEX_SR.tier;
                    selfsummoner_rank.RANKED_FLEX_SR.division = data.queueMap.RANKED_FLEX_SR.division;
                    selfsummoner_rank.RANKED_FLEX_SR.pt = data.queueMap.RANKED_FLEX_SR.leaguePoints;
                    // console.log("彈性積分");
                    // console.log(selfsummoner_rank.RANKED_FLEX_SR.tier);
                    // console.log(selfsummoner_rank.RANKED_FLEX_SR.division);
                    // console.log(selfsummoner_rank.RANKED_FLEX_SR.pt);
                    let RANKED_FLEX_SR_name = selfsummoner_rank.RANKED_FLEX_SR.tier.toLowerCase();
                    $.get_summoner_rank_icon(RANKED_FLEX_SR_name, "RANKED_FLEX_SR");
                }catch(error){
                    console.warn(error);
                }
            }
        );
    },
    get_summoner_rank_icon: function(data, mode){
        return new Promise((resolve,reject)=>{
            request.get({
                url: `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${data}.png`,
                // strictSSL: false,
                encoding: null,
                headers:{
                    'Accept': 'application/json',
                    'Authorization': client_lockfile.httptoken
                }
            },
                function(err, httpResponse, body){
                    try{
                        let filter_name = mode;
                        let imgBuffer  = Buffer.from(body);
                        let imgBase64  = imgBuffer.toString('base64');
                        let imgDataUrl = "data:image/jpeg;base64, "+imgBase64;
                        // console.log(imgDataUrl);
                        if(filter_name == "RANKED_SOLO_5x5"){
                            // console.log("單雙圖片下載完成");
                            selfsummoner_rank.RANKED_SOLO_5x5.icon_data = imgDataUrl;
                            main.webContents.send('homepage-RANKED_SOLO_5x5_icon', selfsummoner_rank.RANKED_SOLO_5x5.icon_data);
                        }else{
                            // console.log("彈性圖片下載完成");
                            selfsummoner_rank.RANKED_FLEX_SR.icon_data = imgDataUrl;
                            main.webContents.send('homepage-RANKED_FLEX_SR_icon', selfsummoner_rank.RANKED_FLEX_SR.icon_data);
                        }
                        // main.webContents.send('homepage-summoner_icon', selfsummoner.icon_data);
                        resolve(true);
                    }catch(error){
                        console.warn(error);
                    }
                }
            );
        });
    },
    get_sc_chat_data: function(url){
        request.get({
            url: url_prefix + `${url}`,
            strictSSL: false,
            encoding: null,
            headers:{
                'Accept': 'application/json',
                'Authorization': client_lockfile.httptoken
            }
        },
        async function(err, httpResponse, body){
                try{
                    let data = JSON.parse(body);
                    for (let i = 0; i< data.length; i++){
                        let tick_timestamp = new Date(data[i].timestamp); // timestamp
                        var x = `[${tick_timestamp.toLocaleString()}]`;
                        // var x = `[${tick_timestamp.toLocaleString()}] ${obj.displayName}: ${data[i].body}`;
                        // console.log(`${data[i].fromSummonerId}`);
                        let summoner_name = await $.get_sc_chat_summonername(`${data[i].fromSummonerId}`);
                        x += ` ${summoner_name}:${data[i].body}`;
                        // console.log(x);
                        if(i != 0){
                            select_champion.msg = select_champion.msg + x + "\n";
                        }else{
                            select_champion.msg = x + "\n";
                        }
                        // select_champion.msg = x + "\n";
                        // console.log(`選擇英雄聊天對話:${select_champion.msg}`);
                        // main.webContents.send('chatpage-sc-enable', `${select_champion.msg}`);
                    }
                    console.log(`選擇英雄聊天對話:${select_champion.msg}`);
                    main.webContents.send('indexpage-sc-enable', `${select_champion.msg}`);
                    main.webContents.send('chatpage-sc-enable', ``);
                }catch(error){
                    console.warn(error);
                }
            }
        );
    },
    get_sc_chat_summonername: function(getdata){
        return new Promise((resolve,reject)=>{
            request.get({
                url: url_prefix + `/lol-summoner/v1/summoners/${getdata}`,
                strictSSL: false,
                headers:{
                    'Accept': 'application/json',
                    'Authorization': client_lockfile.httptoken
                }
            },
            function(err, httpResponse, body){
                try{
                    let obj = JSON.parse(body);
                    resolve(obj.displayName);
                }catch(error){
                    console.warn(error);
                }
            });
        });
    }
}
module.exports = $;