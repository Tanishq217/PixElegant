import React from "react";
import PIXELEGANT from "../assets/Video/PIXELEGANT.mp4";

function Hero() {
  return (
    <div className="w-full relative overflow-hidden">
      <video
        src={PIXELEGANT}
        autoPlay
        loop
        muted
        className="w-full h-auto max-h-screen object-contain"
        style={{ display: "block" }}
      />
    </div>
  );
}

export default Hero;
