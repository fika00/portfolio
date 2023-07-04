import {
  OrbitControls,
  Environment,
  Stats,
  PerspectiveCamera,
  CameraControls,
  Html,
  useVideoTexture,
  useTexture,
  PositionalAudio,
  Loader,
  Sparkles,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import "./App.css";
import Experience from "./components/Experience_test";
import Ico from "./components/Ico";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
  ToneMapping,
  ChromaticAberration,
  Outline,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useControls } from "leva";
import TextEffect from "./components/TextEffect";
import { Camera, LinearToneMapping, PointLight } from "three";
import Content from "./components/Content";
import Scrollbar from "./components/Scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { setPosition, setPoint, setPlay } from "./components/slice";
import { gsap } from "gsap";
import RandomTextAnimation from "./components/RandomTextAnimation";
import AnimatedText from "./components/AnimatedText";
import Navbar from "./components/navbar";
import SDcontent from "./components/SDcontent";
import VPcontent from "./components/VPcontent";
import nav_sound from "/audio/nav_sound.mp3";
import soundIcon from "/imgs/sound.png";
import background_audio from "/audio/Gamela.mp3";
import LoadingScreen from "./components/LoadingScreen";
import ScrollHint from "./components/ScrollHint";
import GlitchyText from "./components/GlitchyText";
import TextTransitionSlide from "./components/TextTransitionSlide";

function App() {
  const dispatch = useDispatch();
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  const dispatch_it = (value) => {
    dispatch(setPlay(value));
  };

  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const isLoadedRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [point, setPoint] = useState(0);
  const [offset, setOffset] = useState([0.01, 0]);
  const icoRef = useRef();
  const camRef = useRef();
  const isScrollableRef = useRef(true); // Use useRef to create a mutable reference
  const positionRef = useRef(0);
  const currentPointRef = useRef(0);
  const speedRef = useRef(0);
  const roundedRef = useRef(0);
  const eventStart = useRef(false);
  const diff = useRef(0);
  const detail_dir = useRef(0);
  const videoscale = useRef(0.1);
  const audioRef = useRef();
  const EyeRef = useRef();
  const bloomRef = useRef();
  const middleGrey = useRef(0.6);
  const chromAb = useRef();
  const isScrolling = useRef(false);
  const isPlayingBGAudio = useRef(false);
  const textRef = useRef();
  const testRef = useRef();

  const ready = useRef(false);
  const isRotating = useRef(false);

  const start_pos = [1.25, -0.02, 2.55];
  const start_rot = [0.015, 0.625, -0.0053];
  const point1_rot = [0.302, -0.638, 0.176];
  const point1_pos = [-0.519, -0.364, 1.601];
  const point2_rot = [0.442, 0.392, -0.179];
  const point2_pos = [0.184, -0.588, 1.967];

  //Detailed content

  // Scroll

  // let speed = 0;
  // let position = 0;
  // let diff = 0;
  // let rounded = 0;

  let lastTouchY = 0; // Declare lastTouchY outside the event listener
  let pos_last = 0;
  let point_last = 0;
  let currentScrollPoint = 0;

  // To detailed

  useEffect(() => {
    if (screenSize.width > screenSize.height) {
      videoscale.current = 0.01;
    } else {
      videoscale.current = 0.007;
    }
  }, []);

  const playSound = () => {
    const audioPlayer = document.querySelector("#audioPlayer audio");
    audioPlayer.src = nav_sound;
    audioPlayer.play();
  };
  const playBGAudio = () => {
    const slash = document.getElementById("audiomutedslash");
    if (!isPlayingBGAudio.current) {
      audioRef.current.play();
      isPlayingBGAudio.current = true;
      slash.style.width = "0%";
    } else {
      audioRef.current.stop();
      isPlayingBGAudio.current = false;
      slash.style.width = "100%";
    }
  };
  const handlePostEffects = () => {
    gsap.to(bloomRef.current, {
      luminanceThreshold: 0.8,
      luminanceSmoothing: 0.4,
      intensity: 1,

      duration: 1, // Duration of the animation in seconds
      ease: "Power1.easeInOut",
    });
    gsap.to(middleGrey.current, {
      middleGrey: 0.5,

      duration: 1, // Duration of the animation in seconds
      ease: "Power1.easeInOut",
    });
    gsap.set(chromAb.current, {
      offset: [0.00015, 0],

      duration: 1,
      ease: "Power1.easeInOut",
    });

    // bloomRef.current.luminanceThreshold = 0.9;
  };
  const handlePostEffectsDefault = () => {
    gsap.to(bloomRef.current, {
      luminanceThreshold: 0.2,
      luminanceSmoothing: 0.45,
      intensity: 0.65,

      duration: 1, // Duration of the animation in seconds
      ease: "Power1.easeInOut",
    });
    gsap.to(middleGrey.current, {
      middleGrey: 0.65,

      duration: 1, // Duration of the animation in seconds
      ease: "Power1.easeInOut",
    });
    gsap.set(chromAb.current, {
      offset: [0.001, 0],

      duration: 1,
      ease: "Power1.easeInOut",
    });
    // bloomRef.current.luminanceThreshold = 0.9;
  };

  const handleBack = (e) => {
    isScrollableRef.current = false;
    const pos = [0.85, -0.05, 0.79];
    document.getElementById("contentwrap_all").style.opacity = 0;
    document.getElementById("contentwrap_all").style.filter = "blur(10px)";

    document.getElementById("backbtn").style.opacity = 1;

    const rot = [0.19, 1.04, -0.163];
    gsap.to(camRef.current.position, {
      x: pos[0],
      y: pos[1],
      z: pos[2],
      duration: 2, // Duration of the animation in seconds
    });

    gsap.to(camRef.current.rotation, {
      x: rot[0],
      y: rot[1],
      z: rot[2],
      duration: 2, // Duration of the animation in seconds
    });
    dispatch_it(1);
    EyeRef.current.handleAnims();

    detail_dir.current = 1;
  };

  const handleBackVP = (e) => {
    isScrollableRef.current = false;
    document.getElementById("contentwrap_all").style.opacity = 0;
    document.getElementById("contentwrap_all").style.filter = "blur(10px)";

    document.getElementById("backbtn").style.opacity = 1;

    const pos = [-0.78, -0.12, 0.99];
    const rot = [0.19, -0.63, 0.12];
    gsap.to(camRef.current.position, {
      x: pos[0],
      y: pos[1],
      z: pos[2],
      duration: 2, // Duration of the animation in seconds
    });

    gsap.to(camRef.current.rotation, {
      x: rot[0],
      y: rot[1],
      z: rot[2],
      duration: 2, // Duration of the animation in seconds
    });
    dispatch_it(2);
    EyeRef.current.handleAnims();
    detail_dir.current = 2;
  };

  // POS {x: -0.7767235553875571, y: -0.11857755762746436, z: 0.9814089152224994}
  // ROT x: 0.193411614647997, _y: -0.6309042787969638, _z: 0.11502297980563952

  // From Detailed
  const handleBackButton = (e) => {
    isScrollableRef.current = true;
    currentPointRef.current = -10;
    document.getElementById("backbtn").style.opacity = 0;
    document.getElementById("contentwrap_all").style.opacity = 1;
    document.getElementById("contentwrap_all").style.filter = "blur(0px)";

    dispatch_it(0);
    detail_dir.current = 0;
    EyeRef.current.handleAnims();
    playSound();
  };

  let rate = 700;

  function randomRotation() {
    let axis = [];
    for (let i = 0; i < 3; i++) {
      axis.push(Math.floor(Math.random() * 360));
    }
    return axis;
  }
  // Scroll camera

  // let currentPoint = 0;
  function animate() {
    const cont1 = document.getElementById("content1");
    const cont2 = document.getElementById("content2");

    if (isScrollableRef.current) {
      if (currentScrollPoint == -1 && currentPointRef.current != 1) {
        cont1.style.zIndex = 10;
        cont1.style.opacity = 1;
        cont2.style.zIndex = 0;
        cont2.style.opacity = 0;

        document.getElementById("scrollhintelement").style.display = "none";

        EyeRef.current.triggerUVEffect();
        handlePostEffects();

        currentPointRef.current = 1;

        gsap.to(camRef.current.position, {
          x: point1_pos[0],
          y: point1_pos[1],
          z: point1_pos[2],
          duration: 2, // Duration of the animation in seconds
          ease: "Power2.easeInOut",
        });

        gsap.to(camRef.current.rotation, {
          x: point1_rot[0],
          y: point1_rot[1],
          z: point1_rot[2],
          duration: 2, // Duration of the animation in seconds
          ease: "Power2.easeInOut",
        });
      } else if (currentScrollPoint == 0 && currentPointRef.current != 0) {
        cont2.style.zIndex = 0;
        cont1.style.zIndex = 0;
        cont2.style.opacity = 0;
        cont1.style.opacity = 0;

        currentPointRef.current = 0;

        console.log("NULTI");

        EyeRef.current.stopUVEffect();
        handlePostEffectsDefault();

        // Use GSAP to animate the camera's position and rotation
        gsap.to(camRef.current.position, {
          x: start_pos[0],
          y: start_pos[1],
          z: start_pos[2],
          duration: 2, // Duration of the animation in seconds
          ease: "Power1.easeInOut",
        });

        gsap.to(camRef.current.rotation, {
          x: start_rot[0],
          y: start_rot[1],
          z: start_rot[2],
          duration: 2, // Duration of the animation in seconds
          ease: "Power2.easeInOut",
        });
      } else if (currentScrollPoint == -2 && currentPointRef.current != 2) {
        cont2.style.zIndex = 10;
        cont1.style.zIndex = 0;
        cont2.style.opacity = 1;
        cont1.style.opacity = 0;

        console.log("DRUGi");

        currentPointRef.current = 2;

        gsap.to(camRef.current.position, {
          x: point2_pos[0],
          y: point2_pos[1],
          z: point2_pos[2],
          duration: 2, // Duration of the animation in seconds
          ease: "Power2.easeInOut",
        });

        gsap.to(camRef.current.rotation, {
          x: point2_rot[0],
          y: point2_rot[1],
          z: point2_rot[2],
          duration: 2, // Duration of the animation in seconds
          ease: "Power2.easeInOut",
        });
      }
    }
  }

  if (!eventStart.current) {
    window.addEventListener("wheel", (e) => {
      // e.stopImmediatePropagation();
      speedRef.current += e.deltaY * 0.0005;
    });

    window.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      lastTouchY = touch.pageY;
    });

    window.addEventListener("touchmove", (e) => {
      if (lastTouchY !== null) {
        const touch = e.touches[0];
        const deltaY = touch.pageY - lastTouchY;
        speedRef.current -= deltaY * 0.001;
        lastTouchY = touch.pageY;
      }
    });

    window.addEventListener("touchend", () => {
      lastTouchY = null;
    });
    eventStart.current = true;
  }
  function raf() {
    if (isScrollableRef.current) {
      speedRef.current *= 0.8;
      if (
        speedRef.current > 0.08 &&
        !isScrolling.current &&
        currentScrollPoint > -2
      ) {
        isScrolling.current = true;
        speedRef.current = 0;
        currentScrollPoint -= 1;
        gsap.to(positionRef, {
          current: currentScrollPoint,

          duration: 2, // Duration of the animation in seconds
          ease: "Power2.easeInOut",
        });
        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      } else if (
        speedRef.current < -0.08 &&
        !isScrolling.current &&
        currentScrollPoint < 0
      ) {
        isScrolling.current = true;
        currentScrollPoint += 1;
        speedRef.current = 0;

        gsap.to(positionRef, {
          current: currentScrollPoint,
          duration: 2, // Duration of the animation in seconds
          ease: "Power2.easeInOut",
        });
        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      }
    }

    if (pos_last != positionRef.current.toFixed(3)) {
      dispatch(setPosition(positionRef.current.toFixed(3)));
    }
    pos_last = positionRef.current.toFixed(3);

    document.getElementById("text").style.transform = `translateY(${
      positionRef.current * rate
    }px)`;

    icoRef.current.position.y = -positionRef.current * 10;

    if (audioRef.current) {
      audioRef.current.position.z = -positionRef.current * 10;
    }

    // console.log("Position: ", camRef.current.position);
    // console.log("Rotation: ", camRef.current.rotation);
    const scrollb = document.getElementById("scrollbar");
    if (currentPointRef.current != 0 && isScrollableRef.current) {
      scrollb.style.opacity = 1;
    } else {
      scrollb.style.opacity = 0;
    }
    animate();
    window.requestAnimationFrame(raf);
  }

  const handleStartScroll = () => {
    setTimeout(() => {
      raf();
      document.getElementById("contentwrap_all").style.opacity = 1;
      ready.current = true;
    }, 750);
  };

  // const bgcolor = "rgb(97, 75, 92)";
  const bgcolor = 0x343873;

  return (
    <div
      style={{
        width: "100%",
        height: screenSize.height,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: "2vh",
          zIndex: 200,
        }}
      ></div>
      <Canvas
        gl={{ toneMapping: LinearToneMapping, gammaOutput: true }}
        style={{
          objectFit: "cover",
        }}
      >
        <PerspectiveCamera
          ref={camRef}
          makeDefault
          fov={55}
          position={[1.25, -0.02, 2.55]}
          rotation={[0.015, 0.625, -0.0053]}
        />
        <color attach="background" args={[bgcolor]} />
        <Suspense fallback={null}>
          <Experience ref={EyeRef} bgcolor={bgcolor} position={[0, 0, 0]} />
          <group ref={icoRef}>
            <Ico
              rotation={randomRotation()}
              scale={0.7}
              position={[-20, 0, -20]}
            />
            <Ico rotation={randomRotation()} position={[-30, -6, -20]} />
            <Ico
              rotation={randomRotation()}
              scale={0.3}
              position={[-20, 2, -10]}
            />
            <Ico rotation={randomRotation()} position={[-30, -6, -10]} />
            <Ico
              rotation={randomRotation()}
              scale={0.7}
              position={[7, 4, -30]}
            />
            <Ico rotation={randomRotation()} position={[4, -2, -10]} />

            <Ico
              rotation={randomRotation()}
              scale={0.7}
              position={[-20, -30, -20]}
            />
            <Ico rotation={randomRotation()} position={[-30, -50, -20]} />
            <Ico
              rotation={randomRotation()}
              scale={0.3}
              position={[-20, -30, -10]}
            />
            <Ico rotation={randomRotation()} position={[-30, -20, -10]} />
            <Ico
              rotation={randomRotation()}
              scale={0.4}
              position={[-20, -2, -17]}
            />
            <Ico
              rotation={randomRotation()}
              scale={0.2}
              position={[-20, -8, -20]}
            />
            <Ico
              rotation={randomRotation()}
              scale={0.2}
              position={[-15, -9.5, -20]}
            />

            <Ico
              rotation={randomRotation()}
              scale={0.4}
              position={[-17, 9, -17]}
            />
            <Ico
              rotation={randomRotation()}
              scale={0.25}
              position={[-14, 13, -25]}
            />

            <Ico
              rotation={randomRotation()}
              scale={0.7}
              position={[-2, -30, -30]}
            />
            <Ico rotation={randomRotation()} position={[4, -12, -10]} />

            <Sparkles count={60} noise={1} scale={5} speed={0.3} />
            <Sparkles
              position={[0, -10, 0]}
              count={100}
              noise={16}
              scale={5}
              speed={1.5}
            />
            <Sparkles
              position={[0, -20, 0]}
              count={100}
              noise={5}
              scale={5}
              speed={0.75}
            />
          </group>

          {/* <group>
            <mesh
              position={[-0.64, -0.08, 0.8]}
              scale={0.02}
              rotation={[0, degToRad(-40), 0]}
            >
              <planeGeometry args={[16, 9]} />
              <VideoMaterial url={"vids/video1.mp4"} />
            </mesh>
          </group> */}
        </Suspense>

        <EffectComposer>
          <Noise
            premultiply
            blendFunction={BlendFunction.MULTIPLY}
            opacity={0.75}
          />
          <Bloom
            ref={bloomRef}
            intensity={0.65}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.45}
            height={250}
          />
          <ChromaticAberration ref={chromAb} offset={[0.001, 0]} />
          <ToneMapping ref={middleGrey} middleGrey={1} />
          <Vignette darkness={0.3} />
          <Outline />
        </EffectComposer>
        {/* <OrbitControls /> */}
        <group position={[0, 0, -5]}>
          <PositionalAudio
            ref={audioRef}
            url={background_audio}
            distance={0.7}
          />
        </group>
        {/* <Stats /> */}
      </Canvas>
      {/* <Loader /> */}
      <LoadingScreen />
      <div id="scrollbar" className="scrollbar">
        <Scrollbar />
      </div>
      <div
        id="text"
        className="text"
        style={{
          position: "absolute",
          overflow: "hidden",
        }}
      >
        <TextEffect
          input_text="FILIP"
          delay={150}
          startScroll={handleStartScroll}
        />
      </div>
      <div className="wrappercontent" id="contentwrap_all">
        <div id="content1" className="containerContent">
          <div className="column">
            {/* <div className="para right">
              <RandomTextAnimation
                text={`I would currently consider myself an experienced junior programmer.
              Through collage and self interest I have aquired a nice vocabulary
              in various programming languages.`}
                delay={3}
                cl={1}
              />
            </div>

            <hr id="sliceright" className="slice right" /> */}
            <div
              style={{
                zIndex: 5000,
                cursor: "pointer",
              }}
              className="sdheader"
              onClick={handleBack}
            >
              <AnimatedText text={"SOFTWARE DEVELOPER"} cl={1} />
            </div>
          </div>
        </div>

        <div id="content2" className="containerContent2">
          <div className="column">
            {/* <div className="para">
              <RandomTextAnimation
                text={`I've been producing video and photo since I was a kid. Mostly implementing the knowladge into webdesign, but I do some projects on the side.`}
                delay={3}
                cl={2}
              />
            </div>
            <hr id="sliceleft" className="slice left" /> */}
            <div
              style={{
                cursor: "pointer",
              }}
              className="vpheader"
              onClick={handleBackVP}
            >
              <AnimatedText key={"video"} text={"Video Prod."} cl={2} />
            </div>
          </div>
        </div>
      </div>
      <div id="detailedcontentSD" className="detailedcontent">
        <div
          id="backbtn"
          style={{
            position: "absolute",
            left: 10,
            top: 10,
            zIndex: 999999,
            opacity: 0,
            transition: "1s",
          }}
          onClick={handleBackButton}
        >
          X
        </div>
        <SDcontent onPressNav={playSound} />
      </div>
      <div id="detailedcontentVP" className="detailedcontent">
        <VPcontent onPressNav={playSound} />
      </div>
      <div
        id="audioPlayer"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          backgroundColor: "white",
        }}
      >
        <audio id="audio" src="/audio/nav_sound.mp3"></audio>
      </div>
      <div id="scrollhintelement" className="scrollhintcontainer">
        <ScrollHint />
      </div>

      <div className="audiocontroller" onClick={playBGAudio}>
        <img src={soundIcon} alt="" />
        <hr className="audiomutedslash" id="audiomutedslash" />
      </div>
      {/* <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          zIndex: 999999,
        }}
      >
        <TextTransitionSlide ref={testRef} text={"Testiram ovo govno"} />
        <button onClick={handleTransition}>BringIn</button>
        <button onClick={handleScatter}>Scatter</button>
      </div> */}
    </div>
  );
}

export default App;
