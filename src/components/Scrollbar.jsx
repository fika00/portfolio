import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Scrollbar.css";

const Scrollbar = (props) => {
  const position = useSelector((state) => state.position.value);

  useEffect(() => {
    // console.log(position);
    const point = Math.abs((Math.round(position) - 0) / (4 - 0)) * 100;
    if (point != 0) {
      document.getElementById("whole").style.opacity = 1;
    } else {
      document.getElementById("whole").style.opacity = 0;
    }

    document.getElementById("progress").style.height = `${point}%`;
  }, [position]);

  return (
    <div className="wrapper">
      <div className="scroll" id="whole">
        <div className="progress" id="progress"></div>
      </div>
      <div className="point1"></div>
    </div>
  );
};
export default Scrollbar;
