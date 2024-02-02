import React, { useRef } from 'react';
import './App.css';
import * as tf from "@tensorflow/tfjs-backend-webgl"
import * as handpose from "@tensorflow-models/handpose";
import { drawHand } from './utils';
import Webcam from 'react-webcam';

function App(){
  const webcamRef = useRef(null);
  const canvasRef = useRef(null); 


  const detect = async (net) => {
  if( typeof webcamRef.current !== undefined &&
       webcamRef.current !== null &&
       webcamRef.current.video.readyState === 4){
        const video = webcamRef.current.video
        const videoWidth = webcamRef.current.video.videoWidth
        const videoHeight = webcamRef.current.video.videoHeight

        webcamRef.current.video.width = videoWidth
        webcamRef.current.video.height = videoHeight

        canvasRef.current.width = videoWidth
        canvasRef.current.height = videoHeight

        const hand = await net.estimateHands(video)
        console.log(hand)

        const ctx = canvasRef.current.getContext("2d")
        drawHand(hand,ctx)
       }
  }

  const runHandpose = async () => {
    try {
      const net = await handpose.load();
      console.log(net);
      setInterval(() => {
        detect(net);
      },100)
    } catch (error) {
      console.error('Error loading handpose:', error);
    }
  }; 
  
  runHandpose();
  return(
    <div className="App">
      <header>
        <Webcam
        ref={webcamRef}
        style={{
          position: 'absolute',
          marginLeft:'auto',
          marginRight:'auto',
          left:0,
          right:0,
          top:100,
          textAlign:'center',
          zindex:9,
          width:640,
          height:480,
        }}
        />
        <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          marginLeft:'auto',
          marginRight:'auto',
          left:0,
          right:0,
          top:100,
          textAlign:'center',
          zindex:9,
          width:640,
          height:480,
        }}
        />
      </header>
    </div>
  )
}

export default App;
