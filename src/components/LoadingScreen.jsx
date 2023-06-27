import loadingsvg from "/imgs/eye_load.svg";
import "./LoadingScreen.css";
import { useProgress } from "@react-three/drei";
import { useEffect } from "react";
const LoadingScreen = (props) => {
  const { active, progress, errors, item, loaded, total } = useProgress();

  useEffect(() => {
    if (progress == 100) {
      setTimeout(() => {
        document.getElementById("wholething").style.opacity = 0;
      }, 5000);
    }
  }, [progress]);
  return (
    <div className="loader_div" id="wholething">
      <div className="loader_wrap">
        <div className="progress" id="progress_bar">
          <div
            className="progressitself"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
        <svg
          fill="#000000"
          height="800px"
          width="800px"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          enable-background="new 0 0 512 512"
        >
          <g>
            <clipPath id="clipper">
              <path d="m494.8,241.4l-50.6-49.4c-50.1-48.9-116.9-75.8-188.2-75.8s-138.1,26.9-188.2,75.8l-50.6,49.4c-11.3,12.3-4.3,25.4 0,29.2l50.6,49.4c50.1,48.9 116.9,75.8 188.2,75.8s138.1-26.9 188.2-75.8l50.6-49.4c4-3.8 11.7-16.4 0-29.2zm-238.8,84.4c-38.5,0-69.8-31.3-69.8-69.8 0-38.5 31.3-69.8 69.8-69.8 38.5,0 69.8,31.3 69.8,69.8 0,38.5-31.3,69.8-69.8,69.8zm-195.3-69.8l35.7-34.8c27-26.4 59.8-45.2 95.7-55.4-28.2,20.1-46.6,53-46.6,90.1 0,37.1 18.4,70.1 46.6,90.1-35.9-10.2-68.7-29-95.7-55.3l-35.7-34.7zm355,34.8c-27,26.3-59.8,45.1-95.7,55.3 28.2-20.1 46.6-53 46.6-90.1 0-37.2-18.4-70.1-46.6-90.1 35.9,10.2 68.7,29 95.7,55.4l35.6,34.8-35.6,34.7z" />
            </clipPath>
          </g>
        </svg>
      </div>
    </div>
  );
};
export default LoadingScreen;
