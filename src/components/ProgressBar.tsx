

import React, { useEffect, useRef } from "react";
import { IStoryItem } from "../types";

export default function ProgressBar({
  items,
  currentIndex,
  paused,
  duration = 3000, 
}: {
  items: IStoryItem[];
  currentIndex: number;
  paused: boolean;
  duration?: number;
}) {
  const activeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeRef.current) {
     
      activeRef.current.style.animation = "none";
        void activeRef.current.offsetWidth; 
      activeRef.current.style.animation = `fillAnim ${duration}ms linear forwards`;
      activeRef.current.style.animationPlayState = paused
        ? "paused"
        : "running";
    }
  }, [currentIndex, paused, duration]);

  return (
    <div className="progress-container">
      {items.map((item, index) => (
        <div key={item.id} className="segment">
          <div
            ref={index === currentIndex ? activeRef : null}
            className={`fill ${
              index < currentIndex
                ? "done"
                : index === currentIndex
                ? "active"
                : ""
            }`}
            style={{
              animationPlayState: paused ? "paused" : "running",
            }}
          />
        </div>
      ))}

      <style jsx>{`
        .progress-container {
          display: flex;
          gap: 6px;
          align-items: center;
          width: 100%;
          padding: 8px 0;
        }

        .segment {
          flex: 1;
          height: 3.5px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }

        .fill {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          transform-origin: left;
          transform: scaleX(0);
          background: white;
        }

        .fill.done {
          transform: scaleX(1);
          transition: transform 0.25s linear;
        }

        /* Active item animation */
        .fill.active {
          animation: fillAnim linear forwards;
        }

        @keyframes fillAnim {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
}
