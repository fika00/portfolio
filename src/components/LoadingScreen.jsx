import loadingsvg from "/imgs/eye_load2.svg";
import "./LoadingScreen.css";
import { useProgress } from "@react-three/drei";
import { useEffect } from "react";
const LoadingScreen = (props) => {
  const { active, progress, errors, item, loaded, total } = useProgress();

  useEffect(() => {
    const wholething = document.getElementById("wholething");
    if (progress == 100) {
      setTimeout(() => {
        wholething.style.opacity = 0;
        setTimeout(() => {
          wholething.style.display = "none";
        }, 600);
      }, 300);
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
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="800px"
          height="800px"
          viewBox="0 0 100.000000 100.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
            fill="#FFFFFF"
            stroke="none"
          >
            <clipPath id="clipper">
              <path
                d="M387 744 c-97 -23 -210 -89 -295 -171 l-77 -73 78 -75 c143 -137 322
-203 480 -177 110 18 240 87 336 179 l76 73 -77 73 c-158 152 -346 214 -521
171z m239 -44 c46 -16 69 -63 69 -141 0 -54 -5 -72 -27 -106 -41 -63 -90 -88
-169 -88 -54 0 -72 5 -106 27 -74 49 -108 139 -84 223 16 58 34 76 88 91 54
15 179 12 229 -6z m-356 -74 c-51 -134 78 -306 230 -306 96 0 204 81 229 173
13 46 11 113 -5 151 -7 18 -4 17 34 -4 51 -29 172 -128 172 -141 0 -15 -150
-129 -212 -160 -32 -16 -87 -37 -121 -46 -148 -37 -324 21 -477 158 l-55 49
45 40 c51 46 161 122 167 117 2 -3 -1 -16 -7 -31z"
              />
              <path
                d="M451 646 c-87 -48 -50 -186 49 -186 51 0 100 49 100 99 0 75 -83 124
-149 87z"
              />
            </clipPath>
          </g>
        </svg>
      </div>
    </div>
  );
};
export default LoadingScreen;