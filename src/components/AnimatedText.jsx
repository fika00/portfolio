import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const AnimatedText = ({ text, cl }) => {
  const [animatedText, setAnimatedText] = useState("");
  const position = useSelector((state) => state.position.value);
  const [start, setStart] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (Math.round(position) == -cl || cl > 5) {
      setStart(true);
    } else {
      setStart(false);
    }
  });
  useEffect(() => {
    const animateText = () => {
      const animationDelay = 100; // Adjust this value to control the animation speed
      const textArray = text.split("");
      let animatedText = "";

      const getRandomSide = () => {
        const sides = [" ", "-"];
        return sides[Math.floor(Math.random() * sides.length)];
      };

      const getRandomOffset = () => {
        const offsetRange = 400; // Adjust this value to control the offset range

        return `${Math.floor(Math.random() * offsetRange) - offsetRange / 2}px`;
      };

      const animateLetter = (index) => {
        setTimeout(() => {
          animatedText += textArray[index];
          setAnimatedText(animatedText);
        }, animationDelay * index);
      };

      for (let i = 0; i < textArray.length; i++) {
        const offset = getRandomOffset();
        const offsetout = offset / 2;
        animateLetter(i);
        const letterEl = document.getElementById(`letter-${i}-${cl}`);
        if (start) {
          letterEl.style.opacity = 0;
          letterEl.style.filter = "blur(10px)";
          letterEl.style.transform = `translateX(${offset})`;

          setTimeout(() => {
            letterEl.style.transform = "translate(0)";
            letterEl.style.filter = "blur(0px)";

            letterEl.style.opacity = 1;
          }, animationDelay * i);
          setTimeout(() => {
            setIsDone(true);
          }, 850);
        } else {
          letterEl.style.opacity = 0;
          letterEl.style.filter = "blur(10px)";
          letterEl.style.transform = `translateX(${offset})`;
          setIsDone(false);
        }
      }
    };

    animateText();
  }, [text, start]);
  useEffect(() => {
    console.log(cl);

    if (cl == 1) {
      if (isDone) {
        document.getElementById(`slice-${cl}`).style.opacity = 1;
        document.getElementById(`slice-${cl}`).style.width = `47%`;
      } else {
        document.getElementById(`slice-${cl}`).style.width = "0%";
        document.getElementById(`slice-${cl}`).style.opacity = 0;
      }
    } else if (cl == 2) {
      if (isDone) {
        document.getElementById(`slice-${cl}`).style.opacity = 1;
        document.getElementById(`slice-${cl}`).style.width = `30%`;
      } else {
        document.getElementById(`slice-${cl}`).style.width = "0%";
        document.getElementById(`slice-${cl}`).style.opacity = 0;
      }
    } else if (!cl) {
      document.getElementById(`slice-${cl}`).style.opacity = 1;
      document.getElementById(`slice-${cl}`).style.width = `100%`;
    } else {
      document.getElementById(`slice-${cl}`).style.width = "0%";
      document.getElementById(`slice-${cl}`).style.opacity = 0;
    }
  }, [isDone]);
  return (
    <div
      style={{
        position: "relative",
        display: "inline",
      }}
    >
      {text.split("").map((letter, index) => (
        <span className="headeranim" key={index} id={`letter-${index}-${cl}`}>
          {letter}
        </span>
      ))}
      <hr
        id={`slice-${cl}`}
        style={{
          width: "0%",
          opacity: 0,
          position: "absolute",
          bottom: -10,
          left: 0,
          transition: "1s",
        }}
      ></hr>
    </div>
  );
};
export default AnimatedText;
