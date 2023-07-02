import React, { useEffect, useState, useRef } from "react";
import { useImperativeHandle, forwardRef } from "react";
// GlitchyText component
const GlitchyText = (props, ref) => {
  const [displayText, setDisplayText] = useState("");
  //   const [indexes, setIndexes] = useState([]);
  const canStart = useRef(false);
  const [glitched, setGlitched] = useState([]);
  const [probability, setProbability] = useState(0.08);
  const intervalRef = useRef();

  let letters = props.text.split("");
  let gl = [...letters];
  let indexes = [];
  useImperativeHandle(ref, () => ({
    handleCanStart,
    startAnim,
  }));
  //   setGlitched(letters)
  const getRandomCharacter = () => {
    const characters = "qwertyuiopasdfghjklzxcvbnm?!#";
    return characters.charAt(Math.floor(Math.random() * characters.length));
  };
  const handleCanStart = () => {
    canStart.current = false;

    setTimeout(() => {
      canStart.current = true;
      console.log(canStart);
    }, 1000);
    console.log(canStart);
  };
  const handleProbability = () => {
    if (probability == 0) {
      setProbability(0.08);
    } else {
      setProbability(0);
    }
  };
  const loop = () => {
    for (let i = 0; i < gl.length; i++) {
      if (letters[i] == " " && !indexes.includes(i)) {
        indexes.push(i);
        gl[i] = " ";
      }
      if (canStart.current) {
        if (Math.random() < 0.05 && !indexes.includes(i)) {
          indexes.push(i);
          gl[i] = letters[i];
        }
      }
      if (!indexes.includes(i)) {
        gl[i] = `${getRandomCharacter()}`;
      }
    }

    console.log("Da");
    if (indexes.length == letters.length) {
      clearInterval(intervalRef.current);
      console.log("Trebalo bi da je done");
    }
    setDisplayText(gl.join(""));
  };

  const startAnim = () => {
    clearInterval(intervalRef.current);

    indexes = [];
    intervalRef.current = setInterval(() => {
      loop();
    }, 10);
  };

  return <span>{displayText}</span>;
};

export default forwardRef(GlitchyText);
