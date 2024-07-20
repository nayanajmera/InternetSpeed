let btn=document.querySelector("button");
let speed=document.getElementById("speed");
let sizeImg=3153018;
let TEST_COUNT=5;
async function loadImg(){
    return new Promise(
        (resolve, reject)=>{
            let img= new Image();
            img.src="./3mb-jpg-example-file.jpg?"+ parseInt(Math.random()*1000);//added random things so that image is not cached
            let startTime=Date.now();
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
async function getInternetSpeed(){
    let time=await loadImg();//in milliseconds
    if(time<1){
        time=1;
    }
    time=time/1000;
    let speed_bps = sizeImg*8/time;//size of Image is UNDEFINED
    let speed_kbps= speed_bps/1024;//in kilobits per second
    return speed_kbps;
}
btn.addEventListener("click", async function(){
    let sumtestResults=0;
    for(let i=0; i<TEST_COUNT; i++){
        let intSpeed=await getInternetSpeed();
        sumtestResults+=intSpeed;
    }
    let avgSpeed=sumtestResults/TEST_COUNT;
    speed.innerText=`${avgSpeed} KBPS`;
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

