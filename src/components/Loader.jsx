import { useEffect, useState } from "react";
import "./loader.css";
const Loader = (props) => {
  const [display_text, setDisplay_text] = useState("/");
  const [current_index, setCurrentIndex] = useState(0);
  const chars = ["/", "I", "\\", "--"];
  useEffect(() => {
    setTimeout(() => {
      if (current_index < chars.length - 1) {
        setCurrentIndex(current_index + 1);
      } else {
        setCurrentIndex(0);
      }
      setDisplay_text(chars[current_index]);
    }, 100);
  }, [display_text, current_index]);
  return <span className="load">{display_text}</span>;
};
export default Loader;
