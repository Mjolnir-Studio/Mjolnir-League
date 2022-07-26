"use strict";
const request = require('./post_client');
const i = require('../i18n.config');

const $ = {
    post: function(body){
        let data = JSON.parse(body);
        // console.log(data.length); 初始化出來的訊息為 4 ， 後面 callback 都是 3
        
        if(data.length == 4){
            console.log(data[3] == "WAMP-1.0-RiotRemoting" ? "WAMP1.0初始化完成!(RiotRemoting)" : console.log(`我沒有遇過的四個長度:"${body}`));
        }else if(data[1] == "OnJsonApiEvent"){
            // uri
            if(data[2].uri == "/lol-chat/v1/me"){
                gameQueueType = data[2].data.lol.gameQueueType;
                gameStatus = data[2].data.lol.gameStatus;
                selfsummoner.icon = data[2].data.icon;
                selfsummoner.level = data[2].data.lol.level;
                // main.webContents.send('gameQueueType', `gameQueueType:${gameQueueType}`);
                // main.webContents.send('gameStatus', `gameStatus:${gameStatus}`);
                main.webContents.send('homepage-summoner_lv', `${selfsummoner.level}`);
                request.get_summoner_assets();
            }else if(data[2].uri == "/lol-gameflow/v1/gameflow-phase"){
                body = data[2].data;
                gameflowphase = body.replace(/[^A-Z0-9]/ig,"");
                if(gameflowphase == "None"){
                    console.log("狀態:你目前尚未建立或加入對戰房間");
                    $.cleanmsgdata();
                }else if(gameflowphase == "Lobby"){
                    console.log("狀態:你目前在對戰房間");
                    $.cleanmsgdata();
                }else if(gameflowphase == "Matchmaking"){
                    console.log("狀態:你目前在匹配");
                    $.cleanmsgdata();
                }else if(gameflowphase == "ReadyCheck"){ // 自動接受
                    console.log("狀態:你目前在等待接受配對...");
                    ReadyCheck = true;
                    if(settings.accept_checkbox){
                        request.accept_matchmaking();
                    }
                }else if(gameflowphase == "ChampSelect"){ // 選擇英雄
                    console.log("狀態:你目前在選擇英雄...");
                }else if(gameflowphase == "InProgress"){ // 遊戲中
                    console.log("狀態:你目前在遊戲中...");
                }else if(gameflowphase == "Reconnect"){ // 等待重新連接中
                    console.log("狀態:你目前遊戲還在進行中...請盡快連接回去!");
                }else if(gameflowphase == "PreEndOfGame"){ // 遊戲結束(選誰Carry)...
                    console.log("狀態:誰 Carry 這場 或是 態度佳的隊友給他一個選項吧!");
                    $.cleanmsgdata();
                }else if(gameflowphase == "EndOfGame"){ // 遊戲正式結束...
                    console.log("狀態:遊戲結束...下一場吧!");
                }else{
                    $.cleanmsgdata();
                }
                // main.webContents.send('gameflowphase', `gameflowphase:${gameflowphase}`);
            }else if(data[2].uri == "/lol-service-status/v1/ticker-messages"){ // debug uri
                console.log("ticker-messages"); // 目前沒有用到
            }else if(data[2].uri == "/lol-lobby/v2/lobby/countdown"){ // debug uri
                console.log(`countdown`);
                // main.webContents.send('chatpage-sc-disable', `${i.__('battle chat waiting text default')}`);
            }else if(data[2].uri.match(/^(\/lol-chat\/v1\/conversations\/)([0-9a-zA-Z~\-]+)(%40champ-select.pvp.net\/messages)$/ig)){ // 選擇英雄召喚師訊息
                console.log(data[2].uri);
                request.get_sc_chat_data(data[2].uri);
            }else if(data[2].uri.match(/^(\/lol-chat\/v1\/conversations\/)([0-9a-zA-Z~\-]+)(%40champ-select.pvp.net\/messages\/)([0-9a-zA-Z_]+)$/ig)){ // 選擇英雄系統訊息
                // console.log(data[2].uri);
                let prodata = data[2].uri?.split('/');
                let resultdata = `/${prodata[1]}/${prodata[2]}/${prodata[3]}/${prodata[4]}/${prodata[5]}`;
                console.log(resultdata);
                request.get_sc_chat_data(resultdata);
            }else{
                // console.log(`[!wss! - Not have filter data]${body}`); // don't want show it up because nah want let console have lot of  trash info
                // console.log(`[!wss! - Not have filter data]${body}`);
            }
        }else if(data[1] == "GetSelfSummoner"){
            selfsummoner.icon = data[2].icon;
            selfsummoner.id = data[2].id;
            selfsummoner.name = data[2].name;
            selfsummoner.level = data[2].lol.level;
            selfsummoner.pid = data[2].pid;
            selfsummoner.platformId = data[2].platformId;
            selfsummoner.puuid = data[2].puuid;
            selfsummoner.summonerId = data[2].summonerId;
            gameQueueType = data[2].lol.gameQueueType;
            gameStatus = data[2].lol.gameStatus;
            // console.log(`連線帳號: ${selfsummoner.name}`);
            if(selfsummoner.name){
                console.log(`連線帳號: ${selfsummoner.name}`);
                // request.get_summoner(); // debug
                main.webContents.send('homepage-summoner_icon', selfsummoner.icon_data);
                main.webContents.send('homepage-summoner_name', selfsummoner.name);
                main.webContents.send('homepage-summoner_lv', selfsummoner.level);
                request.get_summoner_assets();
                request.get_summoner_rank();
            }else{
                // console.log(`連線帳號: ${selfsummoner.name} (No Output)`);
                console.log("重新獲取當前玩家召喚師資料中....");
                request.get_summoner();
            }

        }
    },
    cleanmsgdata: function(){
        console.log("第一次觸發清理訊息功能");
        ReadyCheck = false;
        main.webContents.send('chatpage-sc-disable', `${i.__('battle chat waiting text default')}`);
        let cleanmsgdataTimer = setTimeout(() => {
            console.log("第二次觸發(延遲)清理訊息功能");
            ReadyCheck = false;
            main.webContents.send('chatpage-sc-disable', `${i.__('battle chat waiting text default')}`);
        }, 3000);
    }
}
module.exports = $;