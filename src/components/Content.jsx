import "./Content.css";
import React, { useContext, useEffect, useState } from "react";

import TextEffect from "./TextEffect";
import RandomTextAnimation from "./RandomTextAnimation";
import { connect, useSelector } from "react-redux";

const Content = ({ h1, p, point }) => {
  const position = useSelector((state) => state.position.value);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (position <= -point + 0.2 && position >= -point - 0.2) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [position]);

  return (
    <div>
      <div className="h1">
        {isReady && <TextEffect input_text={h1} delay={20}></TextEffect>}
      </div>

      <div>
        {isReady && (
          <RandomTextAnimation text={p} delay={5}></RandomTextAnimation>
        )}
      </div>
    </div>
  );
};
export default Content;
