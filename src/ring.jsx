import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { animated, useSpring, config } from "react-spring";

const styledRing = Ring => styled(Ring)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  height: min-content;
  width: min-content;
  will-change: height, width;
  //background-image: linear-gradient(
  //  116.4deg,
  //  rgba(255, 104, 192, 1) 11.1%,
  //  rgba(104, 84, 249, 1) 81.3%
  //);
  //filter: blur(1px);
  //background: rgba(255, 255, 255, 0.15);
`;

const closedRadius = 25;
const openRadius = 75;

const Ring = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [{ diameter: radius }, set] = useSpring(() => ({
    diameter: closedRadius
  }));

  useEffect(() => {
    set({ diameter: isOpen ? closedRadius : openRadius });
  }, [isOpen, set]);

  const rotation = radius.interpolate(
    [closedRadius, openRadius],
    ["rotate(116.4deg)", "rotate(676.4deg)"]
  );

  const color1 = radius.interpolate(
    [closedRadius, openRadius],
    ["rgba(255, 104, 192, 1)", "rgba(255, 255, 255, 0.15)"]
  );

  const color2 = radius.interpolate(
    [closedRadius, openRadius],
    ["rgba(104, 84, 249, 1)", "rgba(255, 255, 255, 0.15)"]
  );

  return (
    <animated.svg
      className={className}
      onClick={() => setIsOpen(val => !val)}
      style={{ transform: rotation }}
    >
      <defs>
        <animated.linearGradient id="ringGradient">
          <animated.stop offset="11.1%" stopColor={color1} />
          <animated.stop offset="81.3%" stopColor={color2} />
        </animated.linearGradient>
      </defs>

      <mask id="ringMask">
        <circle cx="50%" cy="50%" r="150" fill="white" />
        <animated.circle
          cx="50%"
          cy="50%"
          r={radius.interpolate(
            [closedRadius, openRadius],
            [0, openRadius * 0.95]
          )}
        />
      </mask>

      <animated.circle
        className={className}
        r={radius}
        cy="50%"
        cx="50%"
        fill="url(#ringGradient)"
        mask="url(#ringMask)"
      />
    </animated.svg>
  );
};

export default styledRing(Ring);
