import { forwardRef, useImperativeHandle } from "react";
const TextTransitionSlide = (props, ref) => {
  const text = props.text.split(" ");

  useImperativeHandle(ref, () => ({
    bringIn,
    scatter,
  }));
  const generateRandomSide = () => {
    if (Math.random() < 0.5) {
      return "-100%";
    } else {
      return "100%";
    }
  };
  const bringIn = () => {
    const letters = document.querySelectorAll(".TextTransitionSlide");

    for (let i = 0; i < letters.length; i++) {
      setTimeout(() => {
        letters[i].style.transform = "translateX(0%)";
        letters[i].style.opacity = 1;
        letters[i].style.filter = "blur(0px)";
      }, Math.random() * 200);
    }
  };
  const scatter = () => {
    const letters = document.querySelectorAll(".TextTransitionSlide");
    for (let i = 0; i < letters.length; i++) {
      setTimeout(() => {
        letters[i].style.transform = `translateX(${generateRandomSide()})`;
        letters[i].style.opacity = 0;
        letters[i].style.filter = "blur(10px)";
      }, Math.random() * 200);
    }
  };
  return (
    <div className="transitionslidewrapper">
      {text.map((word, index_w) => {
        return (
          <div className="eachword" key={word + index_w}>
            {word.split("").map((letter, index_l) => {
              return (
                <span
                  key={letter + index_l}
                  className="TextTransitionSlide"
                  style={{
                    transform: `translateX(${generateRandomSide()})`,
                    opacity: 0,
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default forwardRef(TextTransitionSlide);
