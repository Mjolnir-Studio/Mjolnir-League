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
    }
}
module.exports = $;