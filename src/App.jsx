import React, { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingRef = useRef(null);
  const growingSpan = useRef(null);
  const cursorRef = useRef(null);

  useGSAP(() => {
    headingRef.current.addEventListener("click", (e) => {
      setShowCanvas(!showCanvas);
      gsap.set(growingSpan.current, {
        top: e.clientY,
        left: e.clientX,
      });

      const newColor = showCanvas ? "#000" : "red";
      const newTextColor = showCanvas ? "#fff" : "#000";

      gsap.to("body", {
        backgroundColor: newColor,
        color: newTextColor,
        duration: 0.5,
        ease: "power2.inOut",
      });

      if (showCanvas) {
        gsap.to(growingSpan.current, {
          scale: 0,
          duration: 1,
          ease: "power4.inOut",
        });
      } else {
        gsap.to(growingSpan.current, {
          scale: 1000,
          duration: 1,
          ease: "power4.inOut",
          onComplete: () => {
            gsap.set(growingSpan.current, {
              scale: 0,
              clearProps: "all",
            });
          },
        });
      }
    });
  }, [showCanvas]);

  useEffect(() => {
    new LocomotiveScroll();

    const handleMouseMove = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 1,
        ease: "power4.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <span ref={growingSpan} className="growing block fixed top-[-20px] left-[-20px] h-5 w-5 rounded-full"></span>
      <div ref={cursorRef} className="cursor-circle fixed top-0 left-0 h-5 w-5 rounded-full bg-red-600 pointer-events-none z-50"></div>
      <div className="w-full relative min-h-screen font-[Helvetica_Now_Display]">
        {showCanvas && data[0].map((canvasdets) => <Canvas details={canvasdets} />)}

        <div className="w-full h-screen relative z-[1]">
          <nav className="w-full p-8 flex justify-between z-50">
            <div className="brand text-2xl font-md">thirtysixstudio</div>
            <div className="links flex gap-10">
              {[
                "What we do",
                "Who we are",
                "How we give back",
                "Talk to us",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-md hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textContainer w-full px-[20%]">
            <div className="text w-[55%]">
              <h3 className="text-3xl leading-[1.4]">
                At thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-lg w-[80%] mt-10 font-semibold">
                We're a boutique production studio focused on design, animation,
                and technology, constantly rethinking what digital craft can do
                for present-day ads and campaigns.
              </p>
              <p className="text-lg mt-10 font-regular">Scroll</p>
            </div>
          </div>
          <div className="w-full absolute bottom-20 left-0">
            <h1 ref={headingRef} className="text-[15rem] font-normal leading-none cursor-pointer ml-10">
              thirtysixstudio
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full relative h-screen mt-32 mb-32 px-10 flex flex-col items-center justify-center">
        {showCanvas && data[1].map((canvasdets) => <Canvas details={canvasdets} />)}

        <h1 className="text-4xl tracking-tighter mt-40">About the website</h1>
        <p className="text-2xl leading=[1.8] w-[80%] mt-10 font-regular text-center">
          This is a practice clone project, all the rights belong to the
          original creator and brand "thirtysixstudio".
        </p>
      </div>
    </>
  );
}

export default App;
