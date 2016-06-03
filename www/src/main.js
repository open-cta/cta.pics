import _ from 'underscore'
import page from 'page'
import getGifAndUpdateDOM from 'src/gif.js'
import * as api from 'src/api.js'
import tubular from 'src/tubular.js'

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

function randomVideo(){
    videoIds = ['UQ7oTzKTJpY', 'XoLTf7Yamzo', 'n6xJFpPY_7s', 'aWj3YetNJM4', 'fJzhNPKtR0Q', 'xGKSNvcO2VI', 
                'xqMH6eMO', 'KK5YH5Kwshg', 'OEDho3XlN6M', '5Z49yrl5G2Q', 'ec0RRd88nN0', '_r8nFIuBRQA', 
                'I-GkHVNwhY0', 'ctQkoQ_F7C4', 'n0zZlij52oc', 'MdkW1cpHpn0', 'dtHZgaFXAws', 'vU95BeDL2gE',
                '70vcWVzRQRc', 'Kw_BbQoDv8o', 'VderjGmJljQ']
   return _.sample(videoIds)
}

$('#wrapper').tubular({
    videoId: randomVideo(),
    repeat: true,
    mute: false,
    start: 60
});

//$('#tubular-container').hide();
// $(function() {
//     $('body').hover(function() {
//         $('.fullscreen-bg').fadeTo('slow', 0.7);
//       },
//       function(){
//         $('.fullscreen-bg').fadeTo('slow', 1);
//       }
//    );
// });

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