import React, { useEffect, useState, useRef } from "react";
import "./VPcontent.css";

import AnimatedText from "./AnimatedText";
import TextEffect from "./TextEffect";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";

import displacement from "/imgs/glitch3.jpg";
import arrow from "/imgs/arrow.svg";
import video1 from "/vids/video1.mp4";

const VPcontent = (props) => {
  const play = useSelector((state) => state.position.play);
  useEffect(() => {
    if (play == 2) {
      document.getElementById("contentwrapper2").style.opacity = 1;
      document.getElementById("contentwrapper2").style.zIndex = 9999;
    } else {
      document.getElementById("contentwrapper2").style.opacity = 0;
      document.getElementById("contentwrapper2").style.zIndex = 0;
    }
  }, [play]);
  return (
    <div id="contentwrapper2" className="contentwrapper2">
      <div className="videoplayer">
        <ReactPlayer
          url={video1} // Replace with your video URL
          playing={true} // Set playing to true
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
          <div className="arrow left">
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
          <div className="arrow right">
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
