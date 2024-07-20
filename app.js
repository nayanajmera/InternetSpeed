let btn=document.querySelector("button");
let speed=document.getElementById("speed");
let sizeImg=38591904;
let TEST_COUNT=1;
async function loadImg(){
    return new Promise(
        (resolve, reject)=>{
            let img= new Image();
            img.src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Tokyo_Sky_Tree_2012_%E2%85%A3.JPG?"+ parseInt(Math.random()*1000);//added random things so that image is not cached
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
    let speed_bps = sizeImg/time;//size of Image is UNDEFINED
    let speed_kbps= speed_bps/1024;//in kilobits per second
    return speed_kbps;
}
btn.addEventListener("click", async function(){
    let intSpeed=await getInternetSpeed();
    speed.innerText=`${(intSpeed/1024).toFixed(2)} Mbps`;
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

