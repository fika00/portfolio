import {
  BoxGeometry,
  MeshNormalMaterial,
  MeshStandardMaterial,
  Scene,
  TextureLoader,
} from "three";
import Eyeball from "./eyeball";
import Eyeclip from "./eyeclip";
import { useRef, useLayoutEffect, useEffect, useState } from "react";
import {
  Geometry,
  Base,
  Addition,
  Subtraction,
  Intersection,
  Difference,
} from "@react-three/csg";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { PMREMGenerator, Matrix4 } from "three";

const Experience = (props) => {
  const group = useRef();
  const csg = useRef();
  const pupilRef = useRef();

  const { nodes, materials, animations } = useGLTF("./models/eye1.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions.action_upper.play();
    actions.action_lower.play();
  }, []);
  useFrame(() => {
    csg.current.update();
  });
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

      const updateRotation = () => {
        currentRotationX += (endRotationX - currentRotationX) * speed;
        currentRotationY += (endRotationY - currentRotationY) * speed;

        pupilRef.current.rotation.x = currentRotationX;
        pupilRef.current.rotation.y = currentRotationY;

        if (
          Math.abs(endRotationX - currentRotationX) < 0.01 &&
          Math.abs(endRotationY - currentRotationY) < 0.01
        ) {
          speed = Math.random() * (0.1 - 0.03) + 0.03;

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

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        {}
        <mesh>
          <meshStandardMaterial envMap={envMap} roughness={0.1} metalness={1} />
          <Geometry ref={csg}>
            <Base
              computeVertexNormals
              ref={pupilRef}
              name="eye"
              castShadow
              receiveShadow
              material={nodes.eye.material}
              geometry={nodes.eye.geometry}
            ></Base>
            <Subtraction
              name="clipper_upper"
              castShadow
              receiveShadow
              material={nodes.clipper_upper.material}
              geometry={nodes.clipper_upper.geometry}
            />
            <Subtraction
              name="clipper_lower"
              castShadow
              receiveShadow
              material={nodes.clipper_lower.material}
              geometry={nodes.clipper_lower.geometry}
            />
          </Geometry>
        </mesh>
      </group>
    </group>
  );
};

export default Experience;
useGLTF.preload("./models/eye1.glb");
