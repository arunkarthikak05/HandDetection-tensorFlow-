const joints={
    thumb:[0,1,2,3,4],
    indexFinger:[0,5,6,7,8],
    middleFinger:[0,9,10,11,12],
    ringFinger:[0,13,14,15,16],
    pinky:[0,17,18,19,20]
}
export const drawHand = (predicitions,ctx)=>{
    if( predicitions.length>0){
        predicitions.forEach((prediction)=>{
            const landmarks = prediction.landmarks;

            for(let j=0;j<Object.keys(joints).length;j++){

                let finger = Object.keys(joints)[j];
                console.log(finger)

                for( let k=0;k<joints[finger].length-1;k++){
                    const first = joints[finger][k];
                    const second = joints[finger][k+1];

                    ctx.beginPath();
                    ctx.moveTo(landmarks[first][0],landmarks[first][1]);
                    ctx.lineTo(landmarks[second][0],landmarks[second][1]);
                    ctx.strokeStyle = "plum"
                    ctx.lineWidth = 4

                    ctx.stroke()
                }
            }

            for( let i=0;i<landmarks.length;i++){
                const x = landmarks[i][0]
                const y = landmarks[i][1]

                ctx.beginPath();
                ctx.arc(x,y,5,0,3*Math.PI)
                ctx.fillStyle = "aqua"
                ctx.fill()
            }
        })
    }
}