const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
// const dot = document.getElementsByClassName('redDot');

let start=0;
let timeEnd=0;
let inputIndex=0;
let wrongKeystrokes=0;
let rightKeystrokes=0;
let totalKeystrokes=0;
var errorMap = new Uint8Array(300);

quoteInputElement.addEventListener('keydown', (e) => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    if(e.key !== arrayQuote[inputIndex].innerText)
    {
        wrongKeystrokes++;
        document.getElementById("keystrokeErrors").innerText = wrongKeystrokes;
        e.preventDefault();
        if(arrayQuote[inputIndex].innerText === 'f')
        {
            errorMap[5]++;
            document.getElementById('fWrong').innerText = errorMap[5];
            document.getElementById('r4').style.display = "inline";
            setTimeout(function(){ document.getElementById('r4').style.display = "none"; }, 1000);
        }
        else if(arrayQuote[inputIndex].innerText === 'j')
        {
            errorMap[6]++;
            document.getElementById('jWrong').innerText = errorMap[6];
            document.getElementById('r5').style.display = "inline";
            setTimeout(function(){ document.getElementById('r5').style.display = "none"; }, 1000);
        }
    }
    else if(e.key === arrayQuote[inputIndex].innerText)
    {
        rightKeystrokes++;
        document.getElementById("rightKeystrokes").innerText = rightKeystrokes;
        arrayQuote[inputIndex].classList.add('correct');
        // arrayQuote[inputIndex+1].classList.add('toBeTyped');
        inputIndex++;
    }
    totalKeystrokes++;
    document.getElementById("accuracy").innerText = ((rightKeystrokes/totalKeystrokes)*100).toFixed(2);
    if(inputIndex === 100)
    {
        document.getElementsByClassName("container")[0].style.display = "none";
        document.getElementsByClassName('tabled')[0].style.left = "42rem";
        timeEnd=1;
    }
})

function getRandomString(randomString ,length) {
    var result = '';
    var tempChar;
    for ( var i = 0; i < length-1; i++ ) {
        tempChar = randomString.charAt(Math.floor(Math.random() * randomString.length));
        if(tempChar === ' ' && (i === 0 || result.charAt(i-1) === ' '))
        {
            tempChar = randomString.charAt(Math.floor(Math.random() * (randomString.length-1)));
        }
        result += tempChar ; 
    }
    result += 'j';
    return result;
}

function renderNewQuote(quoteBefore){
    document.getElementById("startButton").style.display = "none";
    let quote = getRandomString(quoteBefore , 100);
    console.log(quote.length);
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    });
    if(start === 0)
    {
        start=1;
        startTimer();
    }
}

function startTimer(){
    timerElement.innerText = 0
    startTime = new Date()
    var timeInterval = setInterval(() => {
        timerElement.innerText = getTime();
        if(timeEnd===1)
        {
            clearInterval(timeInterval);
        }
    },1000)
}

function getTime(){
    return Math.floor((new Date() - startTime)/1000)
}