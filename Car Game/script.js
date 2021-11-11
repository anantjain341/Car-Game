const scoreboard = document.querySelector(".scoreboard");
const score = document.querySelector('.score');
const hScore = document.querySelector('.hScore');
const gameArea = document.querySelector(".gameArea");
const startScreen = document.querySelector(".startScreen");
let road = gameArea.getBoundingClientRect();


let player={speed : 5};

let keys={ArrowUp : false, ArrowDown : false, ArrowLeft : false, ArrowRight : false};
// console.log(keys);
 
startScreen.addEventListener('click',()=>{
    startScreen.classList.add('hidden');    
    // gameArea.classList.remove('hidden');  
    gameArea.innerHTML="";

    window.requestAnimationFrame(gameplay); 

    player.start = true;
    player.score = 0;
    // white road lines created
    for(let i=0;i<6;i++){
        let roadLine = document.createElement('div');
        roadLine.classList.add('roadLine');
        roadLine.x=i*150;
        roadLine.style.top = roadLine.x + 'px';
        gameArea.appendChild(roadLine);
    }
    // 3 enemy cars created
    for(let i=0;i<3;i++){
        let eCar = document.createElement('div');
        eCar.classList.add('eCar');
        eCar.x=i*440*-1;
        eCar.style.backgroundColor='blue';
        eCar.style.top = eCar.x + 'px';
        eCar.style.left = Math.trunc(Math.random() * 324) + 'px';
        gameArea.appendChild(eCar);
    }   
    //playing car created
    let car=document.createElement('div');
    car.classList.add('car');   
    gameArea.appendChild(car);

    player.x=car.offsetTop;
    player.y=car.offsetLeft;


});

function gameplay(){
    if(player.start === true){
    console.log(road);
    let car=document.querySelector('.car');
    let roadLines = document.querySelectorAll('.roadLine');
    let eCars = document.querySelectorAll('.eCar');
      
    roadLines.forEach((item)=>{
        item.x += player.speed ;
        item.style.top = item.x + 'px';

        if(item.x >= 850)
        item.x -= 900;
    })

    eCars.forEach((item)=>{
        item.x += player.speed -1;
        item.style.top = item.x + 'px';

        if(item.x >= 850){ 
            item.x -= 1250;
            item.style.left = Math.trunc(Math.random() * 324) + 'px';
        }

        // if(isCollide(car,item)){
        // console.log('BOOM HIT');}

        let a=car.getBoundingClientRect();
        let b=item.getBoundingClientRect();
        // console.log('car',car.getBoundingClientRect());
        // console.log('eCar',item.getBoundingClientRect());

        if(!(a.top > b.bottom || a.right < b.left || a.bottom < b.top || a.left > b.right)){
            console.log('CRASH');
            player.start = false;
        }

    })
    if(player.start === false){
        if(Number(hScore.textContent) < Number(score.textContent))
        hScore.textContent = Number(score.textContent) +1;
        startScreen.classList.remove('hidden');
        startScreen.innerHTML = `game over <br> Click to Restart <br> your score is ${(player.score + 1) } `;
    } 

    if(keys.ArrowUp && player.x >road.top+200) player.x -= player.speed;
    else if(keys.ArrowDown && player.x < road.height-115) player.x += player.speed;
    else if(keys.ArrowLeft && player.y > 5) player.y -= player.speed;
    else if(keys.ArrowRight && player.y < road.width-60-16-5) player.y += player.speed;

    car.style.top = player.x +'px';
    car.style.left = player.y +'px';
    
    window.requestAnimationFrame(gameplay);
    
    player.score++;
    // player.score=player.score -1;
    score.textContent=player.score;
}
};

document.addEventListener('keydown',(e)=>{
    // e.preventDefault();
    keys[e.key] = true;
    // console.log(keys);  
});

document.addEventListener('keyup',(e)=>{
    // e.preventDefault();
    keys[e.key] = false;
    // console.log(keys);
});

// function isCollide(car,eCar){
//     let a=car.getBoundingClientRect();
//     let b=eCar.getBoundingClientRect();

//     if(!((a.top > b.bottom) || (a.left > b.right) || (a.bottom < b.top) || (a.right < b.left)))
//     return (    console.log(a,b)
//     )
// }