import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Scrollbar.css";

const Scrollbar = (props) => {
  const position = useSelector((state) => state.position.value);

  useEffect(() => {
    if (Math.round(position) == -1) {
      document.getElementById("p1").style.transform = "scale(4)";
    } else {
      document.getElementById("p1").style.transform = "scale(1)";
    }
    if (Math.round(position) == -2) {
      document.getElementById("p2").style.transform = "scale(4)";
    } else {
      document.getElementById("p2").style.transform = "scale(1)";
    }
    if (Math.round(position) == -3) {
      document.getElementById("p3").style.transform = "scale(4)";
    } else {
      document.getElementById("p3").style.transform = "scale(1)";
    }
  }, [position]);
  return (
    <div className="scrollbar_wrapper">
      <div id="p1" className="point"></div>
      <hr className="line" />
      <div id="p2" className="point"></div>
      <hr className="line" />
      <div id="p3" className="point"></div>
    </div>
  );
};
export default Scrollbar;
