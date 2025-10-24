import React from "react";
import heroVideo from "../assets/Video/PIXELEGANT.mp4";

function Hero() {
  return (
    // Calculate height as viewport minus navbar (64px)
    <section
      className="w-full"
      style={{ height: "calc(100vh - 64px)" }} // <-- change 64px to your navbar height
    >
      <video
        className="w-full h-full object-cover block"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />
    </section>
  );
}

export default Hero;
