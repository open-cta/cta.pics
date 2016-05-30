import _ from 'underscore'
import page from 'page'
import getGifAndUpdateDOM from 'src/gif.js'
import * as api from 'src/api.js'

var wssurl = 'wss://wss-cta-mcbvfhypni.now.sh/'
var connection = new WebSocket(wssurl)
var previousData = {}

// page-specific methods
page('/follow/*', async function(ctx, next){
    if(connection.readyState !== 1){
        connection.onopen = function () {
            console.log('connected!')
            api.follow(ctx, connection)
        }
    } else{ 
        api.follow(ctx, connection)
    }
});


page('/*', function(ctx, next){
    if(connection.readyState !== 1){
        connection.onopen = function () {
            console.log('connected!')
            api.iterate(ctx, connection)
        }
    } else { 
        api.iterate(ctx, connection)
    } 
});


// global websocket methods 
connection.onerror = function (error) {
    console.log(error)
};

connection.onmessage = function (message) {
    // try to decode json (I assume that each message from server is json)
    try {
        var data = JSON.parse(message.data);
        if(previousData.nextStaNm !== data.nextStaNm) {
            console.log(data.nextStaNm);
            getGifAndUpdateDOM(data)
        }
        
        previousData = data
    } catch (error) {
        console.log(error);
        return;
    }
};

// start the router
page();