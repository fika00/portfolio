import {
  OrbitControls,
  Environment,
  Stats,
  PerspectiveCamera,
  CameraControls,
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
function App() {
  const dispatch = useDispatch();
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  const dispatch_false = () => {
    dispatch(setPlay(false));
  };
  const dispatch_true = () => {
    dispatch(setPlay(true));
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

  // To detailed
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
      duration: 1.5, // Duration of the animation in seconds
    });

    gsap.to(camRef.current.rotation, {
      x: rot[0],
      y: rot[1],
      z: rot[2],
      duration: 1.5, // Duration of the animation in seconds
    });
    dispatch_false();
  };

  // From Detailed
  const handleBackButton = (e) => {
    isScrollableRef.current = true;
    currentPointRef.current = -10;
    document.getElementById("backbtn").style.opacity = 0;
    document.getElementById("contentwrap_all").style.opacity = 1;
    document.getElementById("contentwrap_all").style.filter = "blur(0px)";

    dispatch_true();
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
    // console.log(
    //   "POS: ",
    //   positionRef.current.toFixed(1),
    //   "CURR: ",
    //   currentPointRef.current
    // );
    const sliceright = document.getElementById("sliceright");
    const sliceleft = document.getElementById("sliceleft");

    if (isScrollableRef) {
      if (
        positionRef.current <= -0.35 &&
        positionRef.current >= -1.45 &&
        currentPointRef.current != 1
      ) {
        currentPointRef.current = 1;
        sliceright.style.opacity = 1;
        sliceleft.style.opacity = 0;
        // Use GSAP to animate the camera's position and rotation
        gsap.to(camRef.current.position, {
          x: point1_pos[0],
          y: point1_pos[1],
          z: point1_pos[2],
          duration: 2, // Duration of the animation in seconds
        });

        gsap.to(camRef.current.rotation, {
          x: point1_rot[0],
          y: point1_rot[1],
          z: point1_rot[2],
          duration: 2, // Duration of the animation in seconds
        });
      } else if (
        positionRef.current >= -0.55 &&
        positionRef.current <= 0 &&
        currentPointRef.current != 0
      ) {
        currentPointRef.current = 0;
        sliceright.style.opacity = 0;
        sliceleft.style.opacity = 0;

        // Use GSAP to animate the camera's position and rotation
        gsap.to(camRef.current.position, {
          x: start_pos[0],
          y: start_pos[1],
          z: start_pos[2],
          duration: 2, // Duration of the animation in seconds
        });

        gsap.to(camRef.current.rotation, {
          x: start_rot[0],
          y: start_rot[1],
          z: start_rot[2],
          duration: 2, // Duration of the animation in seconds
        });
      } else if (
        positionRef.current <= -1.55 &&
        positionRef.current >= -2.25 &&
        currentPointRef.current != 2
      ) {
        currentPointRef.current = 2;
        sliceright.style.opacity = 0;

        sliceleft.style.opacity = 1;

        gsap.to(camRef.current.position, {
          x: point2_pos[0],
          y: point2_pos[1],
          z: point2_pos[2],
          duration: 2, // Duration of the animation in seconds
        });

        gsap.to(camRef.current.rotation, {
          x: point2_rot[0],
          y: point2_rot[1],
          z: point2_rot[2],
          duration: 2, // Duration of the animation in seconds
        });
      }
    }
  }

  if (!eventStart.current) {
    console.log(eventStart);
    window.addEventListener("wheel", (e) => {
      // e.stopImmediatePropagation();
      speedRef.current += e.deltaY * 0.0005;
      console.log("DeltaY: ", e.deltaY);
    });

    window.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      lastTouchY = touch.pageY;
    });

    window.addEventListener("touchmove", (e) => {
      if (lastTouchY !== null) {
        const touch = e.touches[0];
        const deltaY = touch.pageY - lastTouchY;
        speedRef.current -= deltaY * 0.0007;
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
      positionRef.current -= speedRef.current;
      speedRef.current *= 0.8;
      console.log(positionRef.current);

      if (positionRef.current > 0) {
        roundedRef.current = 0;
        diff.current = roundedRef.current - positionRef.current;
        positionRef.current += diff.current * 0.1;
      } else {
        roundedRef.current = Math.round(positionRef.current);
        diff.current = roundedRef.current - positionRef.current;
        positionRef.current += diff.current * 0.03;
      }
    }
    if (pos_last != positionRef.current.toFixed(3)) {
      dispatch(setPosition(positionRef.current.toFixed(3)));
    }
    pos_last = positionRef.current.toFixed(3);

    document.getElementById("text").style.transform = `translateY(${
      positionRef.current * rate
    }px)`;
    console.log("Speed ", speedRef.current.toFixed(3));

    icoRef.current.position.y = -positionRef.current * 10;
    animate();
    window.requestAnimationFrame(raf);
  }
  // setTimeout(() => {
  //   setIsLoaded(true);
  //   console.log("SAD");
  // }, 2000);
  // useEffect(() => {
  //   if (isLoaded) {
  //     raf();
  //   }
  // }, [isLoaded]);
  setTimeout(() => {
    raf();
    document.getElementById("contentwrap_all").style.opacity = 1;
  }, 2000);

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
      >
        {/* <Scrollbar /> */}
      </div>
      <Canvas
        gl={{ toneMapping: LinearToneMapping, gammaOutput: true }}
        style={{
          objectFit: "cover",
        }}
      >
        <PerspectiveCamera
          ref={camRef}
          makeDefault
          position={[1.25, -0.02, 2.55]}
          rotation={[0.015, 0.625, -0.0053]}
        />
        <color attach="background" args={[bgcolor]} />
        <Suspense fallback={null}>
          <Experience bgcolor={bgcolor} position={[0, 0, 0]} />
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
            {/* <mesh position={[2, -9.5, 0]}>
              <sphereGeometry args={[1, 12]} />
              <meshStandardMaterial
                wireframe
                emissive={"red"}
                emissiveIntensity={10}
                envMap
              />
            </mesh> */}
          </group>

          <EffectComposer>
            <Noise
              premultiply
              blendFunction={BlendFunction.MULTIPLY}
              opacity={0.75}
            />
            <Bloom
              intensity={0.65}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.45}
              height={250}
            />
            <ChromaticAberration offset={[0.001, 0]} />
            <ToneMapping middleGrey={0.4} />
            <Vignette darkness={0.3} />
          </EffectComposer>
          {/* <OrbitControls /> */}
        </Suspense>
        {/* <Stats /> */}
      </Canvas>
      {/* <Navbar /> */}
      <div
        id="text"
        className="text"
        style={{
          position: "absolute",
          overflow: "hidden",
        }}
      >
        <TextEffect input_text="FILIP" delay={150} />
      </div>
      <div className="wrappercontent" id="contentwrap_all">
        <div id="content1" className="containerContent">
          <div className="column">
            <p className="para right">
              <RandomTextAnimation
                text={`I would currently consider myself an experienced junior programmer.
              Through collage and self interest I have aquired a nice vocabulary
              in various programming languages.`}
                delay={3}
                cl={1}
              />
            </p>

            <hr id="sliceright" className="slice right" />
            <div
              style={{
                zIndex: 5000,
              }}
              onClick={handleBack}
            >
              <AnimatedText text={"SOFTWARE DEVELOPER"} cl={1} />
            </div>
          </div>
        </div>

        <div id="content2" className="containerContent2">
          <div className="column">
            <p className="para">
              <RandomTextAnimation
                text={`I've been producing video and photo since I was a kid. Mostly implementing the knowladge into webdesign, but I do some projects on the side.`}
                delay={3}
                cl={2}
              />
            </p>
            <hr id="sliceleft" className="slice left" />
            <div onClick={handleBack}>
              <AnimatedText text={"Video Production"} cl={2} />
            </div>
          </div>
        </div>
      </div>

      <div id="detailedcontent" className="detailedcontent">
        <div
          id="backbtn"
          style={{
            position: "absolute",
            left: 10,
            top: 10,
            zIndex: 1000,
            opacity: 0,
            transition: "1s",
          }}
          onClick={handleBackButton}
        >
          Back
        </div>
        <SDcontent />
      </div>
    </div>
  );
}

export default App;