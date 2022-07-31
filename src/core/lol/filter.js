"use strict";
const post = require('./post_client');

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
                main.webContents.send('gameQueueType', `gameQueueType:${gameQueueType}`);
                main.webContents.send('gameStatus', `gameStatus:${gameStatus}`);
            }else if(data[2].uri == "/lol-gameflow/v1/gameflow-phase"){
                gameflowphase = data[2].data;
                main.webContents.send('gameflowphase', `gameflowphase:${gameflowphase}`);

                if(gameflowphase == "ReadyCheck"){ // 自動接受
                    ReadyCheck = true;
                    if(settings.accept_checkbox){
                        post.accept_matchmaking();
                    }
                }else{
                    ReadyCheck = false;
                }
                
            }else if(data[2].uri == "/lol-service-status/v1/ticker-messages"){ // debug uri
                console.log("ticker-messages");
            }
        }else if(data[1] == "GetSelfSummoner"){
            selfsummoner.icon = data[2].icon;
            selfsummoner.id = data[2].id;
            selfsummoner.name = data[2].name;
            selfsummoner.pid = data[2].pid;
            selfsummoner.platformId = data[2].platformId;
            selfsummoner.puuid = data[2].puuid;
            selfsummoner.summonerId = data[2].summonerId;
            console.log(`連線帳號: ${selfsummoner.name}`);
        }else{
            // console.log(`[!wss! - Not have filter data]${body}`); // don't want show it up because nah want let console have lot of  trash info
            console.log(`[!wss! - Not have filter data]${body}`);
        }
    }
}
module.exports = $;