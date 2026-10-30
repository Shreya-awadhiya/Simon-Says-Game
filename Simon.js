// //     btn.addEventListener("keydown" , function(event){
// //          if(event.code == "Enter"){
// //             let item = document.createElement("li");
// //    item.innerText = inp.value; 
// //     ul.appendChild(item);
// //          }
// //     });

//simon game
let btns = ["yellow","purple","green","red"];
let gameSeq=[];
let userSeq =[];

let started = false;
let level = 0;
let difficulty = "medium"; // Default difficulty level
let speed = 600;

let h3 = document.querySelector("h3");
let soundOn = true;
// SOUND EFFECT
let audioCtx;

function playSound(frequency) {
    if(!soundOn) return;
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }

    let oscillator = audioCtx.createOscillator();
    let gain = audioCtx.createGain();

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
        0.01, audioCtx.currentTime + 0.2
    );

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2);
}


//code
document.addEventListener("keypress",function(){
    if(started == false){
        console.log("game is started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn){
        btn.classList.add("flash");
        playSound(600);
    setTimeout(function(){
        btn.classList.remove("flash");
    },100);
    }
    
    function userF(btn){
        btn.classList.add("userF");
        playSound(400);

    setTimeout(function(){
        btn.classList.remove("userF");
    },250);
    }

function levelUp(){
    userSeq = [];
    level++;
    h3.innerText =`Level ${level}`;

    let randomIdx = Math.floor(Math.random()*4);
    let randColor = btns[randomIdx];

    let randBtn = document.querySelector(`.${randColor}`);

gameSeq.push(randColor);
console.log(gameSeq);
  gameFlash(randBtn);
}
function check(idx){
    console.log("curr level :" , level);
    

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp , speed);
            // levelUp();
        }
        console.log("same value");
    }
    else{
        playSound(150);
        h3.innerHTML = ` <span class="game-over" > Game Over! </span>
        <br> </b>Press Any key to Restart <br> <br>
        <span style="color: #4B267D;"> Your Score ${level} </span>`;
        
      document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
           document.querySelector("body").style.backgroundColor = "white";
        },150);   
        
        reset();
    }
}

function reset(){
    started = false;
    gameSeq =[]
    userSeq = [];
level = 0;
}

function btnPress(){
 
    let btn = this;
    userF(btn);

    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    check(userSeq.length-1);

}
let allBtn = document.querySelectorAll(".btn");
for(btn of allBtn){
    btn.addEventListener("click" , btnPress);
    let soundBtn = document.querySelector("#sound-btn");

    soundBtn.addEventListener("click" , function(){
        if(soundOn){
            soundBtn.innerText = "Sound ON";
            soundOn = false;
        } else {
            soundBtn.innerText = "Sound OFF";
            soundOn = true;
        }
    })
}

// DIFFICULTY BUTTONS

document.querySelector("#easy").addEventListener("click", function () {
    difficulty = "easy";
    speed = 1000;
});

document.querySelector("#medium").addEventListener("click", function () {
    difficulty = "medium";
    speed = 600;
});

document.querySelector("#hard").addEventListener("click", function () {
    difficulty = "hard";
    speed = 300;
});