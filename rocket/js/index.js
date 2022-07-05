const inputsRangeCheckbox = document.querySelectorAll('input[type="range"], input[type="checkbox"]');
const passwordInput = document.querySelector('input[type="password"]');

const okButton = document.querySelector('input[type="button"][value="OK"]');
const launchButton = document.querySelector('input[type="button"][value="LAUNCH"]');

const rocket = document.querySelector('.rocket');

const password = "TrustNo1";
let isChecked = false;
let intervalId;

passwordInput.value = password;
inputsRangeCheckbox.forEach((element) => element.disabled = true);
launchButton.disabled = true;

okButton.addEventListener('click', () => checkPassword());

inputsRangeCheckbox.forEach(elem =>{
    elem.addEventListener('change', () => {
        checkSystems(inputsRangeCheckbox)
        launchButton.disabled = !(isChecked);
    })
})

launchButton.addEventListener('click', () => {
    intervalId = setInterval(moveRocket, 50);
})

function checkPassword() {

    if(passwordInput.value === password) {
        passwordInput.disabled = true;
        okButton.disabled = true;

        inputsRangeCheckbox.forEach((element) => element.disabled = false);
    }
}

function checkSystems(input) {
    let empty = [].filter.call( input, function( el ) {
        if(el.type === "checkbox")
            return el.checked
        else if(el.type === "range")
            // return el.value === el.max;
            return true;
    });

    isChecked = input.length === empty.length;
}

let marginL = Number(rocket.style.marginLeft.replace(/px$/, ''));
let marginB = Number(rocket.style.marginBottom.replace(/px$/, ''));

let spaceAreaWidth = document.querySelector('.space').clientWidth;
let spaceAreaHeight = document.querySelector('.space').clientHeight;


function moveRocket() {
    if(spaceAreaWidth*0.55 > marginL && spaceAreaHeight > marginB){
        marginL += document.querySelector('input[type="range"]:nth-child(1)').value/10;
        marginB += document.querySelector('input[type="range"]:nth-child(2)').value/10;

        rocket.style.marginLeft = marginL + "px";
        rocket.style.marginBottom = marginB + "px";
    }
    else{
        stopIntervalFunction();
        rocket.style.marginLeft = 0 + "px";
        rocket.style.marginBottom = 0 + "px";
        location.reload()
    }
}

function stopIntervalFunction(){
    clearInterval(intervalId);
}


