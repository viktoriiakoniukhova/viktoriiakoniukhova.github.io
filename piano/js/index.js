const whiteCodes = ["KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ"];
const blackCodes = ["KeyW", "KeyE", "KeyT", "KeyY", "KeyU"];

const whiteColor = "#ffffff";
const greyColor = "#626262";

const whiteGrad = "linear-gradient(180deg, rgba(252,252,252,1) 0%, rgba(227,226,226,1) 46%, rgba(185,183,183,1) 100%)";
const greyGrad = "linear-gradient(180deg, rgba(98,98,98,1) 0%, rgba(0,0,0,1) 100%)";

let whiteKeys = document.querySelectorAll(".white-keys kbd");
let blackKeys = document.querySelectorAll(".black-keys kbd");

//Event when keyboard key is pressed
document.addEventListener("keypress", (ev => {
    if(whiteCodes.includes(ev.code))
    {
        createAudioAndPrint('white_keys', ev.key.toUpperCase());
        changeColorDown(ev.key.toUpperCase(), whiteKeys, whiteGrad);
    }
    else if(blackCodes.includes(ev.code))
    {
        createAudioAndPrint('black_keys', ev.key.toUpperCase());
        changeColorDown(ev.key.toUpperCase(), blackKeys, greyGrad);
    }
    else
        console.log("Warning! Wrong key is pressed.");
}))

//Event when keyboard key is up
document.addEventListener("keyup", (ev => {
    if(whiteCodes.includes(ev.code))
        changeColorUp(ev.key.toUpperCase(), whiteKeys,  whiteColor);
    else if(blackCodes.includes(ev.code))
        changeColorUp(ev.key.toUpperCase(), blackKeys, greyColor);
}))

//Event when element is mouse downed
for(let i = 0; i < whiteKeys.length; i++){
    whiteKeys[i].addEventListener("mousedown", (ev =>{
        createAudioAndPrint('white_keys', ev.target.innerText);
        changeColorDown(ev.target.innerText, whiteKeys, whiteGrad);
    }))
    whiteKeys[i].addEventListener("mouseup", (ev => {
        changeColorUp(ev.target.innerText, whiteKeys, whiteColor);
    }))
}
for(let i = 0; i < blackKeys.length; i++){
    blackKeys[i].addEventListener("mousedown", (ev =>{
        createAudioAndPrint('black_keys', ev.target.innerText);
        changeColorDown(ev.target.innerText, blackKeys, greyGrad);
    }))
    blackKeys[i].addEventListener("mouseup", (ev => {
        changeColorUp(ev.target.innerText, blackKeys, greyColor);
    }))
}

//Function that creates Audio object and prints action to console
function createAudioAndPrint(folder, key) {
    let audio = new Audio(`${folder}/${key}.mp3`);
    audio.preload = "auto";
    audio.play();
    console.log(`The '${key}' key is pressed.`);
}

function changeColorDown(key, keys, color) {
    for(let i = 0; i < keys.length; i++){
        if(keys[i].innerHTML === `${key}`)
            keys[i].style.background = color;
    }
}
function changeColorUp(key, keys, color) {
    for(let i = 0; i < keys.length; i++){
        if(keys[i].innerHTML === `${key}`)
            keys[i].style.background = color;
    }
}