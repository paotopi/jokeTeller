
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const programmingButton = document.getElementById('programming');
const darkButton = document.getElementById('dark');
const nsfwButton = document.getElementById('nsfw');

let currentApiUrl = 
'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart';

// disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}


// passing joke to VoiceRSS API
function tellMe(joke){
    VoiceRSS.speech({
        key: 'e3d510c0a0074b0eaa9e13e9682d1e9cp',/*Api*/
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
    });
}


// get jokes from joke api // https://sv443.net/jokeapi/v2/
async function getJokes() {
    let joke = ''; 
     // const apiUrl1 = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single';
    
 
    try {
        const response = await fetch(currentApiUrl);
        console.log("response: ", response);

        const data = await response.json();
        console.log("DATA: ", data);
        
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`; 
            console.log(joke, 'hey paola');
        } else {
            joke = data.joke;
        }

          // Text-to-Speach
        tellMe(joke);

          // Disable Button
        toggleButton();
    } catch (error) {
        console.log("whoops", error);
    }
}

//in click button start audio, 
button.addEventListener('click', () => {
    getJokes();
});
audioElement.addEventListener('ended', toggleButton);


// These are to let the user switch between different joke types.
programmingButton.addEventListener('click', () => {
    darkButton.disabled = false;
    nsfwButton.disabled = false;
    programmingButton.disabled = true;
    currentApiUrl =
      'https://sv443.net/jokeapi/v2/joke/Programming,Dark?blacklistFlags=nsfw,religious,political,racist,sexist';
  });
  darkButton.addEventListener('click', () => {
    darkButton.disabled = true;
    nsfwButton.disabled = false;
    programmingButton.disabled = false;
    currentApiUrl =
      'https://sv443.net/jokeapi/v2/joke/Dark?blacklistFlags=nsfw,religious,political,racist,sexist';
  });
  nsfwButton.addEventListener('click', () => {
    darkButton.disabled = false;
    nsfwButton.disabled = true;
    programmingButton.disabled = false;
    currentApiUrl =
      'https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=religious,political,racist,sexist';
  });