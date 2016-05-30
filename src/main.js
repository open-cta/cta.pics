import _ from 'underscore'
import page from 'page'
import getGifAndUpdateDOM from 'vis/gif.js'

var api = 'ws://localhost:4200'
var connection = new WebSocket(api);

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


page('/follow/*', function(ctx, next){
        console.log("follow")
        let params = {
              'type': 'follow',
              'payload': {
                  'rn': '226',
                  'prdt': '1461466085'
              }
          }
          
          console.log(JSON.stringify(params))
          connection.send(JSON.stringify(params));
});


page('/*', function(context, next){
    // http://usualcarrot.com/nodejs-and-websocket-simple-chat-tutorial
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    console.log(context)
    connection.onopen = function () {
        console.log('connected!');
        console.log(context)
        if (context.params[0]) {
            let params = {
                'type': 'iterate',
                'payload': {
                    'timestamp': context.params[0]
                }
            }
            connection.send(JSON.stringify(params));
        } else {
            let params = {
                'type': 'random'
            }
            connection.send(JSON.stringify(params));
        }
     };
 

    connection.onerror = function (error) {
        console.log(error)
    };

    connection.onmessage = function (message) {
        console.log(message.data)
        // try to decode json (I assume that each message from server is json)
        try {
            var json = JSON.parse(message.data);
            if(json.length){
                var old_json = {}
                _.each(json, function(new_json) {
                    console.log(new_json.arrT)
                    if(new_json.nextStaNm !== old_json.nextStaNm)
                    {
                        //let new_arr_t = json.arrT
                        console.log(new_json.nextStaNm)
                    }
                    //getGifAndUpdateDOM(json)
                    old_json = new_json
                })
            } else{ 
                getGifAndUpdateDOM(json)
            }
            //history.replaceState(null, null, json.prdt);
           // console.log(json.nextStaNm);
        } catch (error) {
            console.log(error);
            return;
     }
    };
});


page();