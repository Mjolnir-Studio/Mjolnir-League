'use strict';
const request = require('request');

const $ = {
    accept_matchmaking: function(){
        // for(let x = 0; x<10; x++){
        //     let dd = setTimeout(() => {
        //         request.post({
        //             url: url_prefix + '/lol-matchmaking/v1/ready-check/accept',
        //             strictSSL: false,
        //             headers:{
        //                 'Accept': 'application/json',
        //                 'Authorization': client_lockfile.lockfile_token
        //             }
        //         });
        //     }, 500); 
        // }
    }
}
module.exports = $;