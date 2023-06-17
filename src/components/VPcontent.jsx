import React, { useEffect, useState, useRef } from "react";
import "./VPcontent.css";

import AnimatedText from "./AnimatedText";
import TextEffect from "./TextEffect";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";

import displacement from "/imgs/glitch3.jpg";
import arrow from "/imgs/arrow.svg";
import video1 from "/vids/video1.mp4";
import video2 from "/vids/pol_site.mp4";
import { current } from "@reduxjs/toolkit";

const VPcontent = (props) => {
  const play = useSelector((state) => state.position.play);
  const [start_play, setStart_play] = useState(false);
  const [current_index, setCurrentIndex] = useState(0);
  const videolist = [video1, video2];
  useEffect(() => {
    if (play == 2) {
      document.getElementById("contentwrapper2").style.opacity = 1;
      document.getElementById("contentwrapper2").style.zIndex = 9999;
      setStart_play(true);
    } else {
      document.getElementById("contentwrapper2").style.opacity = 0;
      document.getElementById("contentwrapper2").style.zIndex = 0;
      setStart_play(false);
    }
  }, [play]);
  const handleGoNext = () => {
    if (current_index < videolist.length - 1) {
      setCurrentIndex(current_index + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  const handleGoBack = () => {
    if (current_index > 0) {
      setCurrentIndex(current_index - 1);
    } else {
      setCurrentIndex(videolist.length - 1);
    }
  };
  return (
    <div id="contentwrapper2" className="contentwrapper2">
      <div className="videoplayer">
        <ReactPlayer
          url={videolist[current_index]} // Replace with your video URL
          playing={start_play} // Set playing to true
          loop={true} // Set loop to true
          muted={true}
          preload="auto"
          // controls={true}
          width={"100%"}
          height={"100%"}
          playsinline={true}
        />
        {/* <div className="darken"></div> */}
      </div>
      <div className="contentcontainer">
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
          <defs>
            <filter id="displacementFilter">
              <feImage
                xlinkHref={displacement}
                result="displacementMap"
                scale={1}
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="displacementMap"
                scale="0"
                xChannelSelector="R"
                yChannelSelector="A"
                id="displace"
              />
            </filter>
          </defs>
        </svg>
        <div className="arrows">
          <div className="arrow left" onClick={handleGoBack}>
            <h1
              style={{
                fontSize: "15px",
                width: "100%",
                textAlign: "center",
              }}
            >
              {"<"}
            </h1>
          </div>
          <div className="arrow right" onClick={handleGoNext}>
            <h1
              style={{
                fontSize: "15px",
                width: "100%",
                textAlign: "center",
              }}
            >
              {">"}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VPcontent;
