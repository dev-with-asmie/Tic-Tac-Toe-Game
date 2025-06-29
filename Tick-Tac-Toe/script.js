let boxes = document.querySelectorAll(".boxes");
let turn1= document.querySelector(".turn1");
let turn2= document.querySelector(".turn2");
let msg = document.querySelector('.msg');
let span = document.querySelector('#result');  
let reset=document.getElementById("reset");
let ng=document.getElementById("ng");  
let turnX = true;
let clickSound = new Audio("mixkit-sci-fi-click-900.wav"); 
let winnerSound=new Audio("mixkit-video-game-win-2016.wav");
let drawSound=new Audio("mixkit-player-losing-or-failing-2042.wav");
let winnerFound = false; 

let WinnerCondition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
reset.addEventListener('click',()=>{
boxes.forEach(box=>{
    box.innerText="";
   box.disabled=false;
   box.classList.add("hover"); 
   msg.classList.add("hide"); 
   box.classList.remove("b-s");
});
msg.classList.add("hide");
    turnX = true; // 
    turn1.classList.add("b-s");
    turn2.classList.remove("b-s");
})
ng.addEventListener('click',()=>{
boxes.forEach(box=>{
   box.innerText="";
   box.disabled=false;
   box.classList.add("hover"); 
    msg.classList.add("hide"); 
})
msg.classList.add("hide");
    turnX = true; // 
    turn1.classList.add("b-s");
    turn2.classList.remove("b-s"); 
})
boxes.forEach(box =>{
    box.addEventListener('click', () => {
        box.classList.remove("x-color","o-color"); 
       clickSound.play();

        if (turnX) {
           box.innerText = "X";
           box.classList.add("x-color");
           turn2.classList.add("b-s");  
            turn1.classList.remove("b-s");  
            turnX = false;
        } else {
            box.innerText = "O";
            box.classList.add("o-color");
              turn1.classList.add("b-s");   
              turn2.classList.remove("b-s");  
              turnX = true;
       }
        checkWinner();
   });
});

function checkWinner(){
    let isDraw=true;
    for(let condition of WinnerCondition){
         let box1=boxes[condition[0]].innerText;
         let box2=boxes[condition[1]].innerText;
         let box3=boxes[condition[2]].innerText;
         if(box1!=="" && box2!=="" && box3!==""){
            if(box1===box2 && box2===box3){
                showResult(box1);
              winnerSound.play();
                boxes.forEach(box=>{
                box.classList.add("b-s");

           })
            boxes[condition[0]].classList.remove("b-s");
            boxes[condition[1]].classList.remove("b-s");
            boxes[condition[2]].classList.remove("b-s"); 
            return;
        } 
    } 
        
        
} 
//check for draw
boxes.forEach(box =>{
    if(box.innerText === ""){
        isDraw = false;
    }
});
 if(isDraw){
    showResult("Draw");
    drawSound.play(); 
 }
        
} 

function showResult(result){
  boxes.forEach(box=>{
       box.disabled=true;
       box.classList.remove("hover");
});
msg.classList.remove("hide");
span.innerText=result;
if(result==="Draw"){
    span.innerText="It's a Draw!";
    span.style.color="Yellow";
    
}
else {
    span.innerText=`Winner ${result}`;
    span.style.color=(result=="X")? "rgb(206,23,23)":"rgb(18, 87, 224)";
   
}
}   

