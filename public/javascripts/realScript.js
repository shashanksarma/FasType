const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

let start=0;
let timeEnd=0;
let inputIndex=0;
let wrongKeystrokes=0;
let rightKeystrokes=0;
let totalKeystrokes=0;

quoteInputElement.addEventListener('keydown', (e) => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    if(e.key !== arrayQuote[inputIndex].innerText)
    {
        wrongKeystrokes++;
        document.getElementById("keystrokeErrors").innerText = wrongKeystrokes;
        e.preventDefault();
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
    if(inputIndex === 150)
    {
        document.getElementsByClassName("container")[0].style.display = "none";
        timeEnd=1;
    }
})

function renderNewQuote(quoteBefore){
    document.getElementById("startButton").style.display = "none";
    let quote = "A few tips for efficient and correct use of the program. Do not look at the keyboard not even a quick peek! Look only at the screen. You can easily type without looking at the keyboard - feel the bumps on the letters 'F' and 'J' (at the bottom of the key). In the beginning, you will be practicing with letters that don't make sense but eventually you will type real words and sentences. That is the only way to really be successful when learning to type. Be sure to measure your typing speed periodically with our tool you can check your progress in both speed and accuracy as you learn."
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