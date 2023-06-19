import React, { useEffect, useState, useRef } from "react";
import "./VPcontent.css";

import AnimatedText from "./AnimatedText";
import TextEffect from "./TextEffect";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";

import displacement from "/imgs/glitch3.jpg";
import arrow from "/imgs/arrow.svg";
import loading from "/loading.svg";
import video1 from "/vids/video1.mp4";
import video2 from "/vids/pol_site.mp4";
import video3 from "/vids/halls.mp4";
import Loader from "./Loader";

const VPcontent = (props) => {
  const titles = ["My mind.", "Pages of Life.", "Between the walls."];
  const text = [
    "My mind is a movie directed by my friend for which I've done this transition.",
    "Pages of Life tells a story about the importance of memories. For this movie I've done the special effects in the intro.",
    "A video I made for a music track of mine. I love mixing real and CGI elemnts to tell a story.",
  ];
  const platforms = ["After Effects", "Premiere", "Blender", "FL Studio"];
  const play = useSelector((state) => state.position.play);
  const [start_play, setStart_play] = useState(false);
  const [current_index, setCurrentIndex] = useState(0);
  const videolist = [video1, video2, video3];
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
  const darkenIt = () => {
    const darkenDiv = document.getElementById("darken");
    const loader = document.getElementById("loader");

    darkenDiv.style.backgroundColor = "#000000";
    loader.style.opacity = 1;
  };
  const handleGoNext = () => {
    darkenIt();
    setTimeout(() => {
      if (current_index < videolist.length - 1) {
        setCurrentIndex(current_index + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 500);
  };
  const handleGoBack = () => {
    darkenIt();
    setTimeout(() => {
      if (current_index > 0) {
        setCurrentIndex(current_index - 1);
      } else {
        setCurrentIndex(videolist.length - 1);
      }
    }, 500);
  };
  const handleReady = () => {
    const darkenDiv = document.getElementById("darken");
    const loader = document.getElementById("loader");

    darkenDiv.style.backgroundColor = "#00000000";
    loader.style.opacity = 0;
  };
  return (
    <div id="contentwrapper2" className="contentwrapper2">
      <div className="videotextwrap">
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
            onReady={handleReady}
          />
          <div id="darken" className="darken"></div>
          <div id="loader" className="loader">
            <Loader />
          </div>
        </div>
        <div className="videodetail">
          <h1 className="vidtitle">{titles[current_index]}</h1>
          <p>{text[current_index]}</p>
        </div>
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
