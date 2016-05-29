import $ from 'jquery'
import r from 'browser-request'
import promise from 'bluebird'

var request = promise.promisify(r) 

function bootstrap() {
    // http://usualcarrot.com/nodejs-and-websocket-simple-chat-tutorial
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    var connection = new WebSocket('wss://wss-cta-baajkuhmym.now.sh');

    connection.onopen = function () {
        console.log('connected!');
        connection.send('1460808468');
    };

    connection.onerror = function (error) {
        console.log(error)
    };

    connection.onmessage = function (message) {
        // try to decode json (I assume that each message from server is json)
        try {
            var json = JSON.parse(message.data);
            getGifAndUpdateDOM(json.nextStaNm)
            console.log(json.nextStaNm);
        } catch (error) {
            console.log(error);
            return;
     }
        // handle incoming message
    };
}

async function getGif(term){
    let giphyUrl = 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + term
    try{
        let results = await request(giphyUrl)
        let response = JSON.parse(results.response) 
        if (response.data.image_mp4_url != null) {
            let url = await securify(response.data.image_mp4_url)
            return url
        } else {
            return null
        }
       
      } catch(error){
        return null
    }
}

async function securify(url){
    var parser = document.createElement('a')
    parser.href = url
    parser.protocol = 'https'
    
    return parser.href
}

// inject the vide into the dom
async function updateDOM(url){
    if (url != undefined) {
        $(".fullscreen-bg").append('<video loop muted autoplay poster="" class="fullscreen-bg__video"><source src="' + url + '" type="video/mp4"></source></video>');
        if ($('.fullscreen-bg').find('video').length > 2) { 
            $('.fullscreen-bg').find('video').first().remove();
        }
    }
}

// get the URL and update the dom
async function getGifAndUpdateDOM(stationName){
    let url = await getGif(stationName)
    updateDOM(url)   
}

bootstrap()