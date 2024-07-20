let btn=document.querySelector("button");
let speed=document.getElementById("speed");
// let sizeImg1=237640;
// let sizeImg2=1917448;
let sizeImg4=8224768;
// let sizeImg5=66890744;
// let url1="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Strigeria_Centipede_guarding_eggs.jpg/330px-Strigeria_Centipede_guarding_eggs.jpg?";
// let url2="https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png?";
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
    console.log(currentSize, time);
    let speed_bps = currentSize/time;//size of Image is in bits
    let speed_kbps= speed_bps/1024;//in kilobits per second
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
    // if(time>1.5){
    //     currentURL=url2;
    //     currentSize=sizeImg2;
    // }
    return speed_kbps;
}
async function mentionSpeed(){
    let sum=0;
    for(let i=1; i<=3; i++){
        let intSpeed=await getInternetSpeed();
        sum+=intSpeed;
    }
    let avgSpeed=sum/3; 
    speed.innerText=`${(avgSpeed/1024).toFixed(2)} Mbps`;
}
function changeColor(clr){
    btn.style.color=clr;
}
let intervalId=null;
let alreadyclicked=false;
btn.addEventListener("click", async function() {
        if(alreadyclicked==false)
        {
            alreadyclicked=true;
            changeColor(`red`);
            btn.innerText=`Stop`;
            clearInterval(intervalId);
            intervalId = setInterval(mentionSpeed, 5000);
            setTimeout(() => {
                clearInterval(intervalId);
                changeColor(`darkblue`);
                btn.innerText=`Check Speed`;
                alreadyclicked=false;
            }, 60000);
        }
        else{
            alreadyclicked=false;
            clearInterval(intervalId);
            changeColor(`darkblue`);
            btn.innerText=`Check Speed`;
        }
});


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

