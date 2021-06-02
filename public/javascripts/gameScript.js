const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

let words;
let correctWords=0;
let tillNowCorrect=1;
let start=0;
let end=0;
// let correctWordMap = new Uint8Array(100);
let wordIndex;
var spaceIndex = [];

spaceIndex.push(0);

quoteInputElement.addEventListener( 'keydown' , (e) => {
    if(e.keyCode == 8 && (quoteInputElement.value.length === spaceIndex[correctWords] + 1))
    {
        e.preventDefault();
    }
    if(e.key === ' ' && (quoteInputElement.value.length === spaceIndex[correctWords+1]) && tillNowCorrect===1)
    {
        var temp = ((55/words)*(correctWords+1));
        temp += 10;
        var tempstr = temp.toFixed(2);
        tempstr = tempstr + "rem";
        console.log(tempstr);
        document.getElementsByClassName("car1")[0].style.left = tempstr;
    }
} )

quoteInputElement.addEventListener( "input" , () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll("span");
    const arrayValue = quoteInputElement.value.split('');
    // console.log(quoteInputElement.value.length)
    let correct = true;
    let checker = 0;
    tillNowCorrect=1;
    arrayQuote.forEach((characterSpan,index) => {
        const character = arrayValue[index];
        if(character == null)
        {
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
            correct = false;
        }
        else if(character === characterSpan.innerText)
        {
            if(arrayValue[index] === ' ' && correct)
            {
                checker++;
            }
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");
        }
        else if(character !== characterSpan.innerText)
        {
            characterSpan.classList.add("incorrect");
            characterSpan.classList.remove("correct");
            correct = false;
            tillNowCorrect = 0;
        }
    })
    if(checker>correctWords)
    {
        correctWords=checker;
    }
    if(correct)
    {
        end=1;
        document.getElementsByClassName("car1")[0].style.left = "65rem";
    }
})
    
async function renderNewQuote(){
    document.getElementById("startButton").style.display = "none";
    let quote = "Feel the bumps on the letters 'F' and 'J' (at the bottom of the key). In the beginning, you will be practicing with letters that don't make sense but eventually you will type real words and sentences. That is the only way to really be successful when learning to type."
    let i;
    for(i=0 ; i<quote.length ; i++)
    {
        if(quote[i] == ' ')
        {
            spaceIndex.push(i);
        }
    }
    console.log(spaceIndex);
    words = quote.split(' ').length;
    console.log(words);
    quoteDisplayElement.innerText = ''
    quoteInputElement.value = null
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    });
    startTimer();
    }

function startTimer(){
    timerElement.innerText=0;
    let cpuWPM = document.getElementById('speed2').innerText;
    startTime = new Date();
    var temp1 = ((55*cpuWPM)/(60*words));
    var index=1;
    var timeInterval = setInterval(()=>{
        timerElement.innerText = getTime();
        temp1 *= index;
        temp1 += 10;
        var tempstr1 = temp1.toFixed(2);
        tempstr1 = tempstr1 + "rem";
        console.log(tempstr1);
        document.getElementsByClassName("car2")[0].style.left = tempstr1;
        temp1 = ((55*cpuWPM)/(60*words));
        index++;
        if(end === 1 || getTime() === 3000/cpuWPM)
        {
            let timeDone = getTime();
            timeDone /=60;
            document.getElementById('speed1').innerText = (correctWords/timeDone).toFixed(0);
            clearInterval(timeInterval);
        }
    }, 1000)
}

function getTime(){
    return Math.floor((new Date() - startTime)/1000)
}