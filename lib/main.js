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
    let giphyUrl = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + term
    try{
        let results = await request(giphyUrl)
        let response = JSON.parse(results.response)
        return response.data.image_mp4_url
      } catch(error){
        console.log(error);
        return null
    }
}

// inject the vide into the dom
async function updateDOM(url){
    $(".fullscreen-bg__video").html('<source src="' + url + '" type="video/mp4"></source>' );
    $(".fullscreen-bg__video")[0].load();
}

// get the URL and update the dom
async function getGifAndUpdateDOM(stationName){
    let url = await getGif(stationName)
    updateDOM(url)   
}

bootstrap();