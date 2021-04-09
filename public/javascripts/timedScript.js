const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

let wordsInQuoteArray
let startTime;
let start=0;
let totalWordsTyped=0;
let keystrokeErrors=0;
let wordErrors=0;
var errorMap = new Uint8Array(300);
var wordErrorMap;

quoteInputElement.addEventListener('input' , () =>{
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    let correct = true;
    var wordErrorIndex = 0;
    arrayQuote.forEach((characterSpan,index) =>{
        const character = arrayValue[index]
        if(character == null)
        {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
            errorMap[index]=0;
        }
        else if(character === characterSpan.innerText)
        {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
            if(character === ' ')
            {
                wordErrorIndex++;
            }
            errorMap[index]=0;
        }
        else if(character != characterSpan.innerText)
        {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            if(errorMap[index]===0)
            {
                errorMap[index]=1;
                keystrokeErrors++;
                // console.log(keystrokeErrors);
            }
            if(wordErrorMap[wordErrorIndex]===0)
            {
                wordErrorMap[wordErrorIndex]=1;
                wordErrors++;
            }
            correct = false
        }
    })

    if(correct)
    {
        totalWordsTyped = totalWordsTyped + wordsInQuoteArray.length;
        console.log(totalWordsTyped);
        renderNewQuote();
    }
})

function getRandomQuote(){
return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote(){
    document.getElementById("startButton").style.display = "none";
    const quote = await getRandomQuote()
    quoteDisplayElement.innerText = ''
    quoteInputElement.value = null
    wordsInQuoteArray = quote.split(' ');
    console.log(wordsInQuoteArray);
    wordErrorMap = new Uint8Array(35);
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    });
    if(start===0)
    {
        startTimer()
        start=1
    }
}


function startTimer(){
    timerElement.innerText = 0
    startTime = new Date()
    let time = document.getElementById("timeTaken").innerText;
    var timeInterval = setInterval(()=>{
        timerElement.innerText = getTime();
        if(timerElement.innerText >= 60*time)
        {
            document.getElementById("analysis").style.display = "block";
            document.getElementsByClassName("container")[0].style.display = "none";
            timerElement.style.display = "none";
            totalWordsTyped = totalWordsTyped + quoteInputElement.value.split(' ').length;
            console.log(totalWordsTyped);
            document.getElementById("WPM").innerText = totalWordsTyped/time;
            document.getElementById("wordsTyped").innerText = totalWordsTyped;
            document.getElementById("keystrokeErrors").innerText = keystrokeErrors;
            document.getElementById("wordErrors").innerText = wordErrors;
            document.getElementById("accuracy").innerText =100.00 - ((wordErrors/totalWordsTyped)*100).toFixed(2);
            // console.log('hihihi')
            const wpm = document.getElementById("WPM").innerText
            const accuracy = document.getElementById("accuracy").innerText
            if(time===1)
            {
                $.post('/practice/timed1', { wpm: wpm, accuracy: accuracy });
            }
            else if(time===2) {
                $.post('/practice/timed2', { wpm: wpm, accuracy: accuracy });
            }
            else if(time===5)
            {
                $.post('/practice/timed5', { wpm: wpm, accuracy: accuracy });
            }
            clearInterval(timeInterval);
        }
    },1000)
}

function getTime(){
    return Math.floor((new Date() - startTime)/1000)
}

// renderNewQuote()
// startTimer()