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
async function updateDOM(url, p){
    if (url != undefined) {
        $(".fullscreen-bg").append('<a href="/follow/?rn=' + p.rn + '&ts=' + p.prdt + '"><video loop muted autoplay poster="" class="fullscreen-bg__video"><source src="' + url + '" type="video/mp4"></source></video></a>');
        if ($('.fullscreen-bg').find('video').length > 2) { 
            $('.fullscreen-bg').find('a').first().remove();
        }
    }
}

// get the URL and update the dom
export default async function getGifAndUpdateDOM(prediction){
    let gifUrl = await getGif(prediction.nextStaNm)
    updateDOM(gifUrl, prediction)   
}
