import {
  BoxGeometry,
  MeshNormalMaterial,
  MeshStandardMaterial,
  Scene,
  TextureLoader,
  PMREMGenerator,
  Color,
} from "three";

import { useRef, useLayoutEffect, useEffect, useState } from "react";

import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useControls } from "leva";

const Ico = (props) => {
  const icoRef = useRef();
  const { gl, scene } = useThree();
  const pmrem = new PMREMGenerator(gl);
  const texture = useLoader(TextureLoader, "./models/1_4.png");

  const envMap = pmrem.fromEquirectangular(texture).texture;
  const { nodes, materials } = useGLTF("./models/ico.glb");
  let rotX = 0;
  let rotY = 0;
  let rate = Math.random() * (0.00002 - 0.00001) + 0.00001;
  // icoRef.current.rotation.x += Math.random() * (100 - 30) + 30;
  // icoRef.current.rotation.y += Math.random() * (100 - 30) + 30;

  for (let i = 0; i < nodes.Icosphere.morphTargetInfluences.length; i++) {
    nodes.Icosphere.morphTargetInfluences[i] =
      Math.random() * (0.8 - 0.2) + 0.21;
  }

  let way = 1;
  useFrame(() => {
    icoRef.current.rotation.x += rate * 230;
    icoRef.current.rotation.y += rate * 230;
    if (way == 1) {
      nodes.Icosphere.morphTargetInfluences[0] += 1 * rate;
      nodes.Icosphere.morphTargetInfluences[1] += 1 * rate;
      nodes.Icosphere.morphTargetInfluences[2] += 1 * rate;
      nodes.Icosphere.morphTargetInfluences[3] += 1 * rate;
      nodes.Icosphere.morphTargetInfluences[4] += 1 * rate;
      nodes.Icosphere.morphTargetInfluences[5] += 1 * rate;
    } else if (way == 0) {
      nodes.Icosphere.morphTargetInfluences[1] -= 1 * rate;
      nodes.Icosphere.morphTargetInfluences[0] -= 1 * rate;
      nodes.Icosphere.morphTargetInfluences[2] -= 1 * rate;
      nodes.Icosphere.morphTargetInfluences[3] -= 1 * rate;
      nodes.Icosphere.morphTargetInfluences[4] -= 1 * rate;
      nodes.Icosphere.morphTargetInfluences[5] -= 1 * rate;
    }
    if (nodes.Icosphere.morphTargetInfluences[0] >= 1) {
      way = 0;
    } else if (nodes.Icosphere.morphTargetInfluences[0] <= 0) {
      way = 1;
    }
  }, []);

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={icoRef}
        name="Icosphere"
        castShadow
        receiveShadow
        geometry={nodes.Icosphere.geometry}
        morphTargetDictionary={nodes.Icosphere.morphTargetDictionary}
        morphTargetInfluences={nodes.Icosphere.morphTargetInfluences}
      >
        <meshStandardMaterial envMap={envMap} metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
};
export default Ico;
useGLTF.preload("./models/ico.glb");
