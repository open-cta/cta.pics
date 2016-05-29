import _ from 'underscore'
import $ from 'jquery'
import r from 'browser-request'
import promise from 'bluebird'

var request = promise.promisify(r) 

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
export async function getGifAndUpdateDOM(stationName){
    let url = await getGif(stationName)
    updateDOM(url)   
}
