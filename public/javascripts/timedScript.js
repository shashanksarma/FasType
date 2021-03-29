const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

let wordsInQuoteArray
let startTime;
let start=0;
let totalWordsTyped=0;

quoteInputElement.addEventListener('input' , () =>{
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    let correct = true
    arrayQuote.forEach((characterSpan,index) =>{
        const character = arrayValue[index]
        if(character == null)
        {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }
        else if(character === characterSpan.innerText)
        {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }
        else if(character != characterSpan.innerText)
        {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
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
            clearInterval(timeInterval);
        }
    },1000)
}

function getTime(){
    return Math.floor((new Date() - startTime)/1000)
}

// renderNewQuote()
// startTimer()