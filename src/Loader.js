import { useEffect } from "react";
import gsap from 'gsap';



const Loader = ({ onLoaded }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        gsap.to(".loader", { y: -100, opacity: 0, duration: 1, onComplete: onLoaded });
      }, 2500);
      return () => clearTimeout(timer);
    }, [onLoaded]);
  
    return (
      <div className="loader">
        <img src="./alpaka1.jpg" alt="Loading..." />
      </div>
    );
  };

  export default Loader;