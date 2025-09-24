
"use client";

import React from "react";

const Spinner: React.FC = () => (
  <>
    <style jsx>{`
      .spinner {
        width: 16px; /* Matches w-4 (4 * 4px = 16px) for consistency with RefreshCcw */
        height: 16px; /* Matches h-4 */
        animation: spinner-y0fdc1 2s infinite ease;
        transform-style: preserve-3d;
        position: relative;
      }
      .spinner > div {
        background-color: rgba(255, 255, 255, 0.2);
        height: 100%;
        position: absolute;
        width: 100%;
        border: 1px solid #fff; /* Reduced border thickness for smaller size */
      }
      .spinner div:nth-of-type(1) {
        transform: translateZ(-8px) rotateY(180deg); /* Adjusted for smaller size */
      }
      .spinner div:nth-of-type(2) {
        transform: rotateY(-270deg) translateX(50%);
        transform-origin: top right;
      }
      .spinner div:nth-of-type(3) {
        transform: rotateY(270deg) translateX(-50%);
        transform-origin: center left;
      }
      .spinner div:nth-of-type(4) {
        transform: rotateX(90deg) translateY(-50%);
        transform-origin: top center;
      }
      .spinner div:nth-of-type(5) {
        transform: rotateX(-90deg) translateY(50%);
        transform-origin: bottom center;
      }
      .spinner div:nth-of-type(6) {
        transform: translateZ(8px); /* Adjusted for smaller size */
      }
      @keyframes spinner-y0fdc1 {
        0% {
          transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
        }
        50% {
          transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
        }
        100% {
          transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
        }
      }
    `}</style>
    <div className="spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </>
);

export default Spinner;
