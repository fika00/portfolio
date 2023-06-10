import React, { useEffect, useState, useRef } from "react";
import "./SDcontent.css";
import phone1 from "/imgs/phone1.png";
import phone2 from "/imgs/phone2.png";
import AnimatedText from "./AnimatedText";
import TextEffect from "./TextEffect";
import { useSelector } from "react-redux";
import id from "/imgs/iDetect.png";
import sg from "/imgs/sg.png";
import sg2 from "/imgs/sg2.png";
import sg3 from "/imgs/sg3.png";
import rip from "/imgs/rip.jpg";
import displacement from "/imgs/glitch3.jpg";
import arrow from "/imgs/arrow.svg";

const SDcontent = (props) => {
  const titles = ["Machine Learning", "Arduino/Iot", "WebDev"];
  const logos = [id, sg3, sg];
  const tools = [
    ["Python", "Mediapipe"],
    ["Php", "Arduino"],
    ["React", "Flask"],
  ];
  const paras = [
    "Through a project I made for verifying the identity of a person on an ID card and their selfie I have learned a lot about machine learning.",
    "Another interesting topic that I was always into is internet of things. Using code and engineering to solve lazy tasks.",
    "Using React opened new doors for my creation needs ",
  ];
  const [next, setNext] = useState(false);
  const [back, setBack] = useState(false);
  const play = useSelector((state) => state.position.play);
  const [currentIndex, setCurrentIndex] = useState(0);
  const displacediv = document.getElementById("displace");
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (isOn) {
      document.getElementById("imgcont").style.height = "100%";
      const intv = setInterval(() => {
        displacediv.setAttribute("scale", `${Math.random() * 30}`);
      }, 2);
      setTimeout(() => {
        clearInterval(intv);
        displacediv.setAttribute("scale", "0");
      }, 500);
    } else {
      document.getElementById("imgcont").style.height = "90%";
    }
  }, [isOn]);

  const handleNext = () => {
    if (currentIndex < titles.length - 1) {
      //Animating the displacement
      const increment = setInterval(() => {
        const scalerat = Math.random() * (60 - -60) + -60;

        displacediv.setAttribute("scale", `${scalerat}`);
      }, Math.random() * 12);

      document.getElementById("img").style.filter = "blur(10px)";
      setTimeout(() => {
        document.getElementById("img").style.filter = "blur(0px)";

        setCurrentIndex(currentIndex + 1);
        //Closing the animation of the displacement

        setTimeout(() => {
          clearInterval(increment);
          displacediv.setAttribute("scale", `${0}`);
        }, 700);
      }, 500);
    } else {
      document.getElementById("img").style.filter = "blur(10px)";
      //Animating the displacement
      const increment = setInterval(() => {
        const scalerat = Math.random() * (60 - -60) + -60;

        displacediv.setAttribute("scale", `${scalerat}`);
      }, Math.random() * 12);
      setTimeout(() => {
        document.getElementById("img").style.filter = "blur(0px)";

        setCurrentIndex(0);
        //Closing the animation of the displacement

        setTimeout(() => {
          clearInterval(increment);
          displacediv.setAttribute("scale", `${0}`);
        }, 700);
      }, 500);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      //Animating the displacement
      const increment = setInterval(() => {
        const scalerat = Math.random() * (60 - -60) + -60;

        displacediv.setAttribute("scale", `${scalerat}`);
      }, Math.random() * 12);
      document.getElementById("img").style.filter = "blur(10px)";
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        //Closing the animation of the displacement

        setTimeout(() => {
          clearInterval(increment);
          displacediv.setAttribute("scale", `${0}`);
        }, 700);

        document.getElementById("img").style.filter = "blur(0px)";
      }, 500);
    } else {
      //Animating the displacement
      const increment = setInterval(() => {
        const scalerat = Math.random() * (60 - -60) + -60;

        displacediv.setAttribute("scale", `${scalerat}`);
      }, Math.random() * 12);
      document.getElementById("img").style.filter = "blur(10px)";
      setTimeout(() => {
        setCurrentIndex(titles.length - 1);
        document.getElementById("img").style.filter = "blur(0px)";
        //Closing the animation of the displacement

        setTimeout(() => {
          clearInterval(increment);
          displacediv.setAttribute("scale", `${0}`);
        }, 700);
      }, 500);
    }
  };

  useEffect(() => {
    if (!play) {
      document.getElementById("contentwrapper").style.opacity = 1;
      document.getElementById("contentwrapper").style.zIndex = 9999;
    } else {
      document.getElementById("contentwrapper").style.opacity = 0;
      document.getElementById("contentwrapper").style.zIndex = 0;
    }
  });

  return (
    <div id="contentwrapper" className="contentwrapper">
      <div className="contentcontainer">
        <div className="title" id="title">
          <AnimatedText text={titles[currentIndex]} delay={100} cl={7} />
        </div>

        <div
          className="imgcont"
          id="imgcont"
          style={{
            filter: "url(#displacementFilter)",
            // backgroundColor: "black",
            zIndex: 1000,
          }}
        >
          <img
            onMouseEnter={() => setIsOn(true)}
            onMouseLeave={() => setIsOn(false)}
            id="img"
            src={logos[currentIndex]}
            alt=""
            style={{
              transition: "1s",
              height: "100%",
            }}
          />
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
          <defs>
            <filter id="displacementFilter">
              <feImage
                xlinkHref={displacement}
                result="displacementMap"
                scale={0.1}
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
        {/* <img
          src={rip}
          alt=""
          className="rip"
          style={{
            position: "absolute",
            left: 0,
          }}
        /> */}

        <div className="arrows">
          <div className="arrow" onClick={handleBack}>
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
          <div className="arrow" onClick={handleNext}>
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
export default SDcontent;
