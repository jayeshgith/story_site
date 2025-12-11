
"use client";

import React, { useEffect, useState } from "react";
import { IStoryItem } from "../types";
import { getViewedMap } from "../lib/session";

export default function ViewersList({ item }: { item: IStoryItem }) {
  const [youViewed, setYouViewed] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const viewed = getViewedMap();
    setYouViewed(!!viewed[item.id]);
  }, [item.id]);

  
  if (!mounted) {
    return (
      <div className="viewers">
        <div className="count">{item.viewers?.length || 0} views</div>
      </div>
    );
  }

  const totalViews = (item.viewers?.length || 0) + (youViewed ? 1 : 0);

  return (
    <div className="viewers">
      <div className="count">{totalViews} views</div>

      <div className="list">
        {item.viewers?.map((id) => (
          <div key={id} className="viewer">
            <div className="dot" />
            <span className="name">{id}</span>
          </div>
        ))}

        {youViewed && (
          <div className="viewer">
            <div className="dot you" />
            <span className="name">You</span>
          </div>
        )}
      </div>

      <style jsx>{`
        .viewers {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .count {
          font-size: 14px;
        }
        .list {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .viewer {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
        }
        .dot.you {
          background: linear-gradient(45deg, #ff758c, #ff7eb3);
        }
        .name {
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}
