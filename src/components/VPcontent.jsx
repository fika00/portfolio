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
import video4 from "/vids/video4.mp4";

import Loader from "./Loader";
import playicon from "/imgs/play.svg";
import next from "/imgs/next.svg";
import { Image } from "@react-three/drei";

import GlitchyText from "./GlitchyText";
import TextTransitionSlide from "./TextTransitionSlide";

const VPcontent = (props) => {
  const titles = ["My mind.", "Pages of Life.", "Halls.", "Society."];
  const text = [
    "My mind is a movie directed by my friend for which I've done this transition.",
    "Pages of Life tells a story about the importance of memories.",
    "A video I made for a music track of mine.",
    "One of my Uni projects.",
  ];
  const links = [
    "https://youtu.be/X1m5gAosXm4",
    "https://youtu.be/6nyHdtMY9e0",
    "https://youtu.be/tyneTw5aDio",
    "#",
  ];
  const platforms = ["After Effects", "Premiere", "Blender", "FL Studio"];
  const play = useSelector((state) => state.position.play);
  const [start_play, setStart_play] = useState(false);
  const [current_index, setCurrentIndex] = useState(0);
  const videolist = [video1, video2, video3, video4];
  const videoStoryRef = useRef();

  useEffect(() => {
    if (play == 2) {
      document.getElementById("contentwrapper2").style.opacity = 1;
      document.getElementById("contentwrapper2").style.zIndex = 9999;
      handleTransition();
      setStart_play(true);
    } else {
      document.getElementById("contentwrapper2").style.opacity = 0;
      document.getElementById("contentwrapper2").style.zIndex = 0;
      handleScatter();
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
    handleScatter();

    setTimeout(() => {
      if (current_index < videolist.length - 1) {
        setCurrentIndex(current_index + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 750);
  };
  const handleGoBack = () => {
    darkenIt();
    handleScatter();

    setTimeout(() => {
      if (current_index > 0) {
        setCurrentIndex(current_index - 1);
      } else {
        setCurrentIndex(videolist.length - 1);
      }
    }, 750);
  };
  const handleReady = () => {
    const darkenDiv = document.getElementById("darken");
    const loader = document.getElementById("loader");

    darkenDiv.style.backgroundColor = "#00000000";
    loader.style.opacity = 0;
  };
  const handleTransition = () => {
    videoStoryRef.current.bringIn();
  };
  const handleScatter = () => {
    videoStoryRef.current.scatter();
  };

  useEffect(() => {
    const link = document.getElementById("linkel");
    if (current_index == 3) {
      link.target = "_self";
      link.style.opacity = 0;
    } else {
      link.target = "_blank";

      link.style.opacity = 1;
    }
    setTimeout(() => {
      handleTransition();
    }, 300);
  }, [current_index]);

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
          <div className="topside">
            <a
              id="linkel"
              className="anchorlink"
              href={links[current_index]}
              target="_blank"
            >
              <img src={playicon} alt="View on YouTube" />
            </a>
            <h1 className="vidtitle">{titles[current_index]}</h1>
          </div>
          <hr className="vpslash" />

          <p className="videostory">
            <TextTransitionSlide
              ref={videoStoryRef}
              text={text[current_index]}
            />
          </p>
          <div className="toolsvp">
            {platforms.map((tool) => (
              <div className="platform" key={tool}>
                <p className="platformtxt"> {tool}</p>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="itemsvp">
          <div className="point" id="poi1"></div>
          <hr className="slash" />
          <div className="point" id="poi2"></div>
          <hr className="slash" />
          <div className="point" id="poi3"></div>
        </div> */}
      </div>

      <div className="arrows">
        <div
          className="arrow left"
          onClick={() => {
            props.onPressNav();
            handleGoBack();
          }}
        >
          <h1
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {"<"}
          </h1>
        </div>
        <div
          className="arrow right"
          onClick={() => {
            props.onPressNav();
            handleGoNext();
          }}
        >
          <h1
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {">"}
          </h1>
        </div>
      </div>
    </div>
  );
};
export default VPcontent;
