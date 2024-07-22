let btn=document.querySelector("button");
let speed=document.getElementById("num-speed");
let avgSpeed=document.getElementById("avgSpeed");
// slider code
let btnSlider=document.querySelector(".slider-container");
let slider=document.getElementById("slider");
let body=document.querySelector("body");
let img=document.querySelector("img");
let h1=document.querySelector("h1");
let lightMode=document.getElementById("light-m");
let darkMode=document.getElementById("dark-m");
lightMode.classList.add("invisible");
//slider code
let allSpeeds=[];
//SIZES ARE IN BITS
let sizeImg1=32768*8; //32KB
let sizeImg2=159744*8;//156KB
let sizeImg4=8224768;//0.98mb or 1003.52KB
// let sizeImg5=66890744;
let url1="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Strigeria_Centipede_guarding_eggs.jpg/330px-Strigeria_Centipede_guarding_eggs.jpg?";
let url2="https://upload.wikimedia.org/wikipedia/commons/f/f8/Chinta_Wrong_Direction.jpg?";
// let url4="https://upload.wikimedia.org/wikipedia/commons/5/53/Panorama_of_3mb.jpg?";
let url4="https://upload.wikimedia.org/wikipedia/commons/7/7a/2017-05-23_GuentherZ_Wien11_Zentralfriedhof_Gruppe97_Soldatenfriedhof_Wien_%28Zweiter_Weltkrieg%29_%28001%29.jpg?";
// let url5="https://upload.wikimedia.org/wikipedia/commons/9/90/Teruel_overview_size_8MB_%2825441803782%29.jpg?";
async function loadImg(currentURL){
    return new Promise(
        (resolve, reject)=>{
            let startTime=Date.now();
            let img= new Image();
            img.src=currentURL+parseInt(Date.now());//added random things so that image is not cached
            console.log(img.src);
            img.onload=function(){
                let endTime=Date.now();
                resolve(endTime-startTime);
            }
            img.onerror=function(err){
                reject(err);
            }
        }
    );
}
let currentURL=url4;
let currentSize=sizeImg4;
async function getInternetSpeed(){
    let time=await loadImg(currentURL);//in milliseconds
    if(time<1){
        console.log("Hit a bad situation!");
        time=1;
    }
    time=time/1000;
    time=94*time/100;//considering delay from urls
    if(currentURL!=url1){
        time=85*time/100;
    }
    console.log(currentSize, time);
    let speed_bps = currentSize/time;//size of Image is in bits
    let speed_kbps= speed_bps/1024;//in kilobits per second
    //If I am using URL4 then I am assuming that the speed is above 500KBPS or 4000Kbps 
    // if(time<0.9){
    //     currentURL=url2;//bigger url //around 200kb
    //     currentSize=sizeImg2;
    // }
    // if(time<0.5){
    //     currentURL=url3; //even bigger url //around 700kb
    //     currentSize=sizeImg3;
    // }
    // if(time<0.2){
    //     currentURL=url4; //even bigger url //around 4mb
    //     currentSize=sizeImg4;
    // }
    // if(time<0.05){
    //     currentURL=url5; //the biggest // around 7mb
    //     currentSize=sizeImg5;
    // }
    // if(time>0.95){
    //     currentURL=url4;
    //     currentSize=sizeImg4;
    // }
    // if(time>1){
    //     currentURL=url3;
    //     currentSize=sizeImg3;
    // }
    if(speed_kbps<1500){
        currentURL=url1;
        currentSize=sizeImg1;
    }
    else if(speed_kbps<5000){
        currentURL=url2;
        currentSize=sizeImg2;
    }
    else if(speed_kbps>7500){
        currentURL=url4;
        currentSize=sizeImg4;
    }
    //I am still assumiing that user should have a speed of at least 115KBps
    return speed_kbps;
}
async function mentionSpeed()
{
        let sum=0;
        for(let i=1; i<=3; i++){
            let intSpeed= await getInternetSpeed();
            sum+=intSpeed;
        }
        let avgSpeed=sum/3;
        allSpeeds.push(avgSpeed);
        speed.innerText=`${(avgSpeed/1024).toFixed(2)}`;
}
function changeColor(clr){
    btn.style.color=clr;
}
function calculateAvgOfAll(){
    let AvgOfAll=0;
    for(let i=0; i<allSpeeds.length; i++){
        AvgOfAll+=allSpeeds[i];
    }
    AvgOfAll=AvgOfAll/allSpeeds.length;
    avgSpeed.innerText=`Average Speed = ${(AvgOfAll/1024).toFixed(2)} Mbps`;
}
let intervalId=null;
let alreadyclicked=false;
let timeout=null;
btn.addEventListener("click", async function() {
        if(alreadyclicked==false)
        {
            allSpeeds=[];
            avgSpeed.innerText="";
            alreadyclicked=true;
            changeColor(`red`);
            btn.innerText=`Stop`;
            clearInterval(intervalId);
            intervalId = setInterval(mentionSpeed, 3000);
            if(alreadyclicked==true)
            {
                timeout=setTimeout(() => {
                    clearInterval(intervalId);
                    calculateAvgOfAll();
                    changeColor(`rgb(0,200,0)`);
                    btn.innerText=`Check Speed`;
                    alreadyclicked=false;
                }, 30000);
            }
        }
        else{
            alreadyclicked=false;
            clearTimeout(timeout);
            clearInterval(intervalId);
            changeColor(`rgb(0,200,0)`);
            btn.innerText=`Check Speed`;
            calculateAvgOfAll();
        }
});
function darkmode(){
    slider.classList.add("active");
    btnSlider.classList.add("white");
    body.style.backgroundColor="#2b2b2b";
    img.setAttribute("src", "./OIG2-removebg-preview-modified.png");
    h1.style.color="white";
    btn.classList.add("dark-mode");
    lightMode.classList.remove("invisible");
    darkMode.classList.add("invisible");
    lightMode.style.color="white";
    darkMode.style.color="white";
    let speedWhole=document.getElementById("speed");
    speedWhole.style.color="rgb(171,166,166)";
}
function lightmode(){
    slider.classList.remove("active");
    btnSlider.classList.remove("white");
    body.style.backgroundColor="white";
    img.setAttribute("src", "./OIG2-removebg-preview.png");
    h1.style.color="black";
    btn.classList.remove("dark-mode");
    darkMode.classList.remove("invisible");
    lightMode.classList.add("invisible");
    lightMode.style.color="black";
    darkMode.style.color="black";
    let speedWhole=document.getElementById("speed");
    speedWhole.style.color="violet";
}
btnSlider.addEventListener("click", function(){
    if(slider.classList.length==0)//dark mode
    {
        darkmode();
    }
    else{
        lightmode();
    }
});
// Handling icon stuff:-
function updateFaviconChangeMode(){
    let isDarkMode=window.matchMedia('(prefers-color-scheme: dark)').matches;
    let favicon=document.getElementById("favicon");
    favicon.href= isDarkMode ? "./OIG2-removebg-preview-modified.png" : "./OIG2-removebg-preview.png";
    if(isDarkMode){
        darkmode();
    }
    else{
        lightmode();
    }
}
updateFaviconChangeMode();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", updateFaviconChangeMode);
//FALTU STUFF JUST FOR CHECKING CONCEPTS
// async function timepass(){
//    return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             resolve();
//         }, 5000);
//    });
// }
// let a =Date.now();

// async function aa()
// {
//     await timepass();
//     let b=Date.now();
//     console.log(b-a);
// }
// aa();

