import { useEffect, useState } from "react";

const VPtextanim = (props) => {
  const [displayLetter, setDisplayLetter] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chars = ["/", "-", "&", "$", "#"];
  let current_index = 0;

  useEffect(() => {
    const loop = setInterval(() => {
      if (current_index < props.text.length) {
        setDisplayLetter(props.text.substring(0, current_index));
        current_index += 1;
      } else {
        clearInterval(loop);
      }
      setIsTyping(!isTyping);
    }, 600);
  }, []);
  useEffect(() => {});
  return <span>{displayLetter}</span>;
};

export default VPtextanim;
