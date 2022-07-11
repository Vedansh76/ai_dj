song="";
leftWrist_x=0;
leftWrist_y=0;
rightWrist_x=0;
rightWrist_y=0;
scoreLeftwrist=0;
scoreRightwrist=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log('PoseNet is initalized');
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftwrist=results[0].pose.keypoints[9].score;
        scoreRightwrist=results[0].pose.keypoints[10].score;
        console.log("right wrist score ="+scoreRightwrist);
        console.log("left wrist score ="+scoreLeftwrist);
        leftWrist_x=results[0].pose.leftWrist.x;
        leftWrist_y=results[0].pose.leftWrist.y;
        rightWrist_x=results[0].pose.rightWrist.x;
        rightWrist_y=results[0].pose.rightWrist.y;
        console.log("leftWrist_x ="+leftWrist_x+"leftWrist_Y ="+leftWrist_y);
        console.log("rightWrist_x ="+rightWrist_x+"rightWrist_Y ="+rightWrist_y);
    

    }

}

function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("violet");
    if(scoreLeftwrist > 0.2){
    circle(leftWrist_x,leftWrist_y,20);
    InNumberleftWristY=Number(leftWrist_y);
    remove_decimal=floor(InNumberleftWristY);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML="volume = "+volume;
    song.setVolume(volume);
    }
    if(scoreRightwrist >0.2){
        circle(rightWrist_x,rightWrist_y,20);
        if(rightWrist_y>0 && rightWrist_y <100){
            document.getElementById("speed").innerHTML="speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightWrist_y>100 && rightWrist_y <200){
            document.getElementById("speed").innerHTML="speed = 1x";
            song.rate(1);
        }
        else if(rightWrist_y>200 && rightWrist_y <300){
            document.getElementById("speed").innerHTML="speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWrist_y>300 && rightWrist_y <400){
            document.getElementById("speed").innerHTML="speed = 2x";
            song.rate(2);
        }
        else if(rightWrist_y>400 && rightWrist_y <500){
            document.getElementById("speed").innerHTML="speed = 2.5x";
            song.rate(2.5);
        }
        
    }
    
}
function preload(){
    song=loadSound("music.mp3");
}
function play(){
    song.play();
    song.setVolume(0.5);
    song.rate(2);
}

