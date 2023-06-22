import {
  BoxGeometry,
  MeshNormalMaterial,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Scene,
  TextureLoader,
  PMREMGenerator,
  Color,
  Group,
  ShaderMaterial,
} from "three";

import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { gsap } from "gsap";
import {
  useGLTF,
  useAnimations,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useSelector } from "react-redux";

const Experience = (props) => {
  const group = useRef();
  const pupilRef = useRef();
  const camRef = useRef();
  const caminfo = useRef();
  const startup = useRef(true);
  const clipup = useRef();
  const clipdown = useRef();
  const { nodes, materials, animations } = useGLTF("./models/eye3.glb");
  const { actions } = useAnimations(animations, group);
  const play = useSelector((state) => state.position.play);
  nodes.eye.morphTargetInfluences[0] = 0.5;

  useEffect(() => {
    if (startup.current) {
      setTimeout(() => {
        gsap.to(clipup.current.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.95, // Duration of the animation in seconds
          ease: "Power2.easeInOut",
        });
        gsap.to(clipdown.current.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.95, // Duration of the animation in seconds
          ease: "Power2.easeInOut",
        });
      }, 1500);
      setTimeout(() => {
        startup.current = false;
        // setStartup(false);
        actions.action_upper.play();
        actions.action_lower.play();
      }, 3500);
    }
  }, []);
  useEffect(() => {
    console.log(play);
    if (play != 0) {
      actions.action_upper.stop();
      actions.action_lower.stop();
    } else {
      if (!startup.current) {
        actions.action_upper.play();
        actions.action_lower.play();
      }
    }
  }, [play, startup]);

  let speed = 0.04;

  useEffect(() => {
    const generateRandomEndValues = () => {
      const minRotation = -0.3;
      const maxRotation = 0.3;

      const endRotationX =
        Math.random() * (maxRotation - minRotation) + minRotation;
      const endRotationY =
        Math.random() * (maxRotation - minRotation) + minRotation;

      rotateTo(endRotationX, endRotationY);
    };
    const rotateTo = (endRotationX, endRotationY) => {
      let currentRotationX = pupilRef.current.rotation.x;
      let currentRotationY = pupilRef.current.rotation.y;

      const start_pos = [1.25, -0.02, 2.55];
      const start_rot = [0.015, 0.625, -0.0053];
      const point1_rot = [
        0.4022880492376307, -0.7288169058458661, 0.2761337058605759,
      ];
      const point1_pos = [
        -0.5188029373630827, -0.36398080094788654, 1.430866559943374,
      ];

      const updateRotation = () => {
        currentRotationX += (endRotationX - currentRotationX) * speed;
        currentRotationY += (endRotationY - currentRotationY) * speed;

        nodes.eye.morphTargetInfluences[0] =
          (currentRotationY * (1 - 0.2) + 0.2) * 1.4;
        pupilRef.current.rotation.x = currentRotationX;
        pupilRef.current.rotation.y = currentRotationY;

        if (
          Math.abs(endRotationX - currentRotationX) < 0.01 &&
          Math.abs(endRotationY - currentRotationY) < 0.01
        ) {
          speed = Math.random() * (0.1 - 0.02) + 0.02;

          generateRandomEndValues();
        } else {
          requestAnimationFrame(updateRotation);
        }
      };

      updateRotation();
    };

    generateRandomEndValues();
  }, []);

  const { gl, scene } = useThree();
  const pmrem = new PMREMGenerator(gl);
  const texture = useLoader(TextureLoader, "./models/1_2_2.png");

  const envMap = pmrem.fromEquirectangular(texture).texture;
  const eyelidcol = new Color(props.bgcolor);

  const movingMaterial = new MeshStandardMaterial({
    envMap: envMap,
    roughness: 0.1,
    metalness: 1,
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          ref={clipup}
          scale={0.65}
          name="clipper_upper"
          rotation={[0.785398, 0, 0]}
          // castShadow
          // receiveShadow
          geometry={nodes.clipper_upper.geometry}
        >
          <meshBasicMaterial color={eyelidcol} />
        </mesh>

        <mesh
          ref={clipdown}
          rotation={[-0.785398, 0, 0]}
          scale={0.65}
          name="clipper_lower"
          // castShadow
          // receiveShadow
          geometry={nodes.clipper_lower.geometry}
        >
          <meshBasicMaterial color={eyelidcol} />
        </mesh>
        <mesh
          name="eye"
          ref={pupilRef}
          castShadow
          receiveShadow
          geometry={nodes.eye.geometry}
          material={movingMaterial}
          morphTargetDictionary={nodes.eye.morphTargetDictionary}
          morphTargetInfluences={nodes.eye.morphTargetInfluences}
        ></mesh>
      </group>
      <group position={[-0.3, 0, 0]} ref={camRef}>
        {/* <OrbitControls /> */}
      </group>
    </group>
  );
};

export default Experience;
useGLTF.preload("./models/eye3.glb");
