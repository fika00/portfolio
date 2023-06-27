import React, { useEffect, useState } from "react";
import "../App.css";
const TextEffect = (props) => {
  const [text, setText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let delay = props.delay

  useEffect(() => {
    const typedText = props.input_text; // Replace with your desired text
    const characters = "▏▎▍▌";
    let currentIndex = 0;

    if (isLoading) {
      return; // Exit early if isLoading is true
    }

    const typingInterval = setInterval(() => {
      if (currentIndex < typedText.length) {
        setDisplayText((prevText) => prevText + typedText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
        console.log("Done");
      }
    }, delay);

    const matrixInterval = setInterval(() => {
      let randomText = "";
      for (let i = 0; i < typedText.length; i++) {
        if (i < currentIndex) {
          randomText += typedText[i];
        } else {
          randomText += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }
      }
      if (!isTypingComplete) {
        setDisplayText(randomText);
      }
    }, delay / 2);

    return () => {
      clearInterval(typingInterval);
      clearInterval(matrixInterval);
    };
  }, [isLoading]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after the specified duration
    }, 1000); // Adjust the duration (in milliseconds) for the Matrix effect
  }, []);

  useEffect(() => {
    if (isTypingComplete) {
      props.startScroll()
    }
  },[isTypingComplete])

  return (
    <div>
      {isLoading ? (
        console.log() // Display a loading message while the component is initializing
      ) : isTypingComplete ? (
        <p>{displayText}</p>
      ) : (
        <p>
          {displayText}
          <span className="text" />
        </p>
      )}
    </div>
  );
};

export default TextEffect;
