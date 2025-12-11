


"use client";

import React, { useEffect, useRef, useState } from "react";
import { IUserStories, IStoryItem } from "../types";
import { ensureSessionViewer, markViewed } from "../lib/session";
import ProgressBar from "./ProgressBar";
import ViewersList from "./ViewersList";

interface Props {
  story: IUserStories;
}

export default function StoryViewer({ story }: Props) {
  const items = story.items;
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  
  useEffect(() => {
    ensureSessionViewer();
  }, []);

  
  useEffect(() => {
    const item = items[index];
    
    markViewed(item.id);
    setLoaded(false);

    if (item.mediaType === "image") {
      startProgress(item.durationSec || 5);
    }

    return () => stopProgress();
   
  }, [index]);

  
  useEffect(() => {
    const item = items[index];
    if (item.mediaType === "video") {
      if (!isPaused) {
        videoRef.current?.play().catch(() => {});
      } else {
        videoRef.current?.pause();
      }
    }
  }, [isPaused, index, items]);

  function startProgress(sec: number) {
    stopProgress();
    
    timerRef.current = window.setTimeout(() => next(), sec * 1000);
  }

  function stopProgress() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function prev() {
    if (index === 0) return;
    setIndex((s) => Math.max(0, s - 1));
  }

  function next() {
    if (index >= items.length - 1) return;
    setIndex((s) => Math.min(items.length - 1, s + 1));
  }

  function onPointerDown() {
    setIsPaused(true);
  }

  function onPointerUp() {
    setIsPaused(false);
  }

 
  function onClickArea(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) prev();
    else next();
  }

  const current = items[index];

  return (
    <div className="story-overlay">
      <div className="story-top">
        <div className="progress-row">
          <ProgressBar items={items} currentIndex={index} paused={isPaused} />
        </div>
        <div className="meta-row">
          <img
            src={story.user.avatarUrl}
            alt={story.user.name}
            className="avatar"
          />
          <div className="meta-text">
            <strong>{story.user.name}</strong>
            <div className="small">
             
              {new Date(current.timestamp).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div
        className="story-media"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onClick={onClickArea}
      >
        {!loaded && <div className="loader">Loading…</div>}

        {current.mediaType === "image" ? (
          <img
            src={current.mediaUrl}
            alt={current.caption || "story image"}
            onLoad={() => setLoaded(true)}
            style={{ display: loaded ? "block" : "none" }}
          />
        ) : (
          <video
            ref={videoRef}
            src={current.mediaUrl}
            muted
            playsInline
            controls={false}
            onLoadedMetadata={(e) => {
              setLoaded(true);
              if (!isPaused) e.currentTarget.play().catch(() => {});
            }}
            onEnded={() => next()}
            style={{ display: loaded ? "block" : "none" }}
          />
        )}

        <div className="bottom-bar">
          <div className="caption">{current.caption}</div>
          <ViewersList item={current} />
        </div>
      </div>

      <style jsx>{`
        .story-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .story-top {
          width: 100%;
          padding: 12px;
        }
        .progress-row {
          margin-bottom: 8px;
        }
        .meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        .meta-text {
          display: flex;
          flex-direction: column;
        }
        .small {
          font-size: 12px;
          opacity: 0.8;
        }
        .story-media {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          position: relative;
        }
        img,
        video {
          max-height: 80vh;
          max-width: 100%;
          object-fit: cover;
          border-radius: 6px;
        }
        .loader {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bottom-bar {
          position: absolute;
          left: 12px;
          bottom: 12px;
          right: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .caption {
          max-width: 60%;
        }
        @media (min-width: 800px) {
          img,
          video {
            max-width: 720px;
          }
        }
      `}</style>
    </div>
  );
}
