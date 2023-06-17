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
  // const [currentPoint, setcurrentPoint] = useState(0);
  const { nodes, materials, animations } = useGLTF("./models/eye3.glb");
  const { actions } = useAnimations(animations, group);
  const play = useSelector((state) => state.position.play);

  nodes.eye.morphTargetInfluences[0] = 0.5;

  useEffect(() => {
    console.log(play);
    if (play != 0) {
      actions.action_upper.stop();
      actions.action_lower.stop();
    } else {
      actions.action_upper.play();
      actions.action_lower.play();
    }
  }, [play]);

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

  //   movingMaterial.onBeforeCompile = (shader) => {
  //     shader.uniforms.uTime = { value: 1 };
  //     shader.fragmentShader =
  //       `
  //     uniform float uTime;
  //     mat4 rotationMatrix(vec3 axis, float angle) {
  //       axis = normalize(axis);
  //       float s = sin(angle);
  //       float c = cos(angle);
  //       float oc = 1.0 - c;

  //       return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
  //                   oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
  //                   oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
  //                   0.0,                                0.0,                                0.0,                                1.0);
  //   }

  //   vec3 rotate(vec3 v, vec3 axis, float angle) {
  //     mat4 m = rotationMatrix(axis, angle);
  //     return (m * vec4(v, 1.0)).xyz;
  //   }
  //   ` + shader.fragmentShader;
  //     shader.fragmentShader.replace(
  //       `#include <envmap_physical_pars_fragment>`,
  //       `#ifdef USE_ENVMAP

  //       vec3 getIBLIrradiance( const in vec3 normal ) {

  //         #ifdef ENVMAP_TYPE_CUBE_UV

  //           vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

  //           vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );

  //           return PI * envMapColor.rgb * envMapIntensity;

  //         #else

  //           return vec3( 0.0 );

  //         #endif

  //       }

  //       vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {

  //         #ifdef ENVMAP_TYPE_CUBE_UV

  //           vec3 reflectVec = reflect( - viewDir, normal );

  //           // Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.
  //           reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );

  //           reflectVec = inverseTransformDirection( reflectVec, viewMatrix );

  //           reflectVec = rotate(reflectVec, vec3(0.0, 1.0, 0.0), uTime * 0.3);
  //           vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );

  //           return envMapColor.rgb * envMapIntensity;

  //         #else

  //           return vec3( 0.0 );

  //         #endif

  //       }

  //       #ifdef USE_ANISOTROPY

  //         vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {

  //           #ifdef ENVMAP_TYPE_CUBE_UV

  //             // https://google.github.io/filament/Filament.md.html#lighting/imagebasedlights/anisotropy
  //             vec3 bentNormal = cross( bitangent, viewDir );
  //             bentNormal = normalize( cross( bentNormal, bitangent ) );
  //             bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );

  //             return getIBLRadiance( viewDir, bentNormal, roughness );

  //           #else

  //             return vec3( 0.0 );

  //           #endif

  //         }

  //       #endif

  //     #endif
  // `
  //     );
  //     movingMaterial.userData.shader = shader;
  //   };

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          scale={0.65}
          name="clipper_upper"
          // castShadow
          // receiveShadow
          geometry={nodes.clipper_upper.geometry}
        >
          <meshBasicMaterial color={eyelidcol} />
        </mesh>

        <mesh
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
