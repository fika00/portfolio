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
  const detailed = useRef(false);

  useEffect(() => {
    if (currentIndex == 0) {
      document.getElementById("po1").style.transform = "scale(3)";
    } else {
      document.getElementById("po1").style.transform = "scale(1)";
    }
    if (currentIndex == 1) {
      document.getElementById("po2").style.transform = "scale(3)";
    } else {
      document.getElementById("po2").style.transform = "scale(1)";
    }
    if (currentIndex == 2) {
      document.getElementById("po3").style.transform = "scale(3)";
    } else {
      document.getElementById("po3").style.transform = "scale(1)";
    }
  }, [currentIndex]);
  useEffect(() => {
    if (isOn) {
      document.getElementById("img").style.transform = "scale(1.05)";

      const intv = setInterval(() => {
        displacediv.setAttribute("scale", `${Math.random() * 30}`);
      }, 2);
      setTimeout(() => {
        clearInterval(intv);
        displacediv.setAttribute("scale", "0");
      }, 600);
    } else {
      document.getElementById("img").style.filter =
        "drop-shadow(0px 0px 0px #0049525C)";
      document.getElementById("img").style.transform = "scale(1)";
    }
  }, [isOn]);
  // Click for Details
  const handleClick = () => {
    const increment = setInterval(() => {
      const scalerat = Math.random() * (60 - -60) + -60;

      displacediv.setAttribute("scale", `${scalerat}`);
    }, Math.random() * 12);
    if (!detailed.current) {
      document.getElementById("img").style.opacity = 0;
      document.getElementById("paragraph").style.opacity = 1;
      detailed.current = true;
    } else {
      document.getElementById("img").style.opacity = 1;
      document.getElementById("paragraph").style.opacity = 0;
      detailed.current = false;
    }
    setTimeout(() => {
      clearInterval(increment);
      displacediv.setAttribute("scale", `0`);
    }, 800);
  };
  const handleNext = () => {
    if (currentIndex < titles.length - 1) {
      //Animating the displacement
      const increment = setInterval(() => {
        const scalerat = Math.random() * (30 - -30) + -30;

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
        const scalerat = Math.random() * (15 - -15) + -15;

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
        const scalerat = Math.random() * (30 - -30) + -30;

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
        const scalerat = Math.random() * (30 - -30) + -30;

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
    if (play == 1) {
      document.getElementById("contentwrapper").style.opacity = 1;
      document.getElementById("contentwrapper").style.zIndex = 9999;
    } else {
      document.getElementById("contentwrapper").style.opacity = 0;
      document.getElementById("contentwrapper").style.zIndex = 0;
    }
  }, [play]);

  return (
    <div id="contentwrapper" className="contentwrapper">
      <div className="contentcontainer">
        <div className="items">
          <div className="point" id="po1"></div>
          <hr className="slash" />
          <div className="point" id="po2"></div>
          <hr className="slash" />
          <div className="point" id="po3"></div>
        </div>
        <div className="title" id="title">
          <h1 className="title_text">{titles[currentIndex]}</h1>
        </div>

        <div
          className="imgcont"
          id="imgcont"
          style={{
            zIndex: 1000,
          }}
        >
          <img
            onMouseEnter={() => setIsOn(true)}
            onMouseLeave={() => setIsOn(false)}
            // onClick={handleClick}
            id="img"
            src={logos[currentIndex]}
            alt=""
            style={{
              transition: "1s",
              zIndex: 15,
            }}
          />
          <div id="paragraph" className="paratext">
            <p className="paragraph_text">{paras[currentIndex]}</p>
            <div className="tools">
              {tools[currentIndex].map((tool) => (
                <div className="lang">
                  <h2 className="actualtext">{tool}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>

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
          <div
            className="arrow left"
            onClick={() => {
              props.onPressNav();
              handleBack();
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
              handleNext();
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
    </div>
  );
};
export default SDcontent;
