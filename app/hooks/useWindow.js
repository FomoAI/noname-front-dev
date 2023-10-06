import { useState, useEffect } from "react";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({});

  useEffect(() => {
    if (window !== undefined) {
      setWindowDimensions(getWindowDimensions());
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener("resize", handleResize);
      screen.orientation?.addEventListener("change", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        screen.orientation?.removeEventListener("change", handleResize);
      };
    }
  }, []);



  return windowDimensions;
};

export default useWindowDimensions;