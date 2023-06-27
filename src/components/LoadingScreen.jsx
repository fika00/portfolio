import loadingsvg from "/imgs/eye_load.svg";
import "./LoadingScreen.css";
import { useProgress } from "@react-three/drei";
const LoadingScreen = (props) => {
  const { active, progress, errors, item, loaded, total } = useProgress();

  return (
    <div className="loadingscreen">
      <div className="progress_container" id="progresswhite">
        <img src={loadingsvg} alt="" id="clipping" />
        <div className="progressbar"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
