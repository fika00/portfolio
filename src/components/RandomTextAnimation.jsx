import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const RandomTextAnimation = ({ text, delay, cl }) => {
  const [visibleText, setVisibleText] = useState([]);
  const position = useSelector((state) => state.position.value);
  const [point, setPoint] = useState(false);

  useEffect(() => {
    if (!point) {
      const words = text.split(" ");
      setVisibleText(words.map((word) => ({ word, opacity: 0, blur: 10 })));
    }
  }, [text, point]);
  useEffect(() => {
    if (Math.abs(position) - 0.3 <= cl && Math.abs(position) + 0.3 >= cl) {
      setPoint(true);
    } else {
      setPoint(false);
    }
  }, [position]);
  useEffect(() => {
    if (point) {
      const timeoutId = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * visibleText.length);

        setVisibleText((prevVisibleText) => {
          const newVisibleText = [...prevVisibleText];
          newVisibleText[randomIndex].opacity = 1;
          newVisibleText[randomIndex].blur = 0;
          return newVisibleText;
        });
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [visibleText, delay, point]);

  useEffect(() => {
    setVisibleText(
      text.split(" ").map((word) => ({ word, opacity: 0, blur: 10 }))
    );
  }, [text]);

  return (
    <div className="random-text-animation">
      {visibleText.map(({ word, opacity, blur }, index) => (
        <span
          key={index}
          className="random-text-animation__word"
          style={{ opacity, filter: `blur(${blur}px)` }}
        >
          {word}{" "}
        </span>
      ))}
    </div>
  );
};

export default RandomTextAnimation;
