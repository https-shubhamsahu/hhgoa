import React, { useEffect, useRef } from 'react';
import { BuilderData } from '../types';
import { drawPfpFrame, drawBuilderIdCard, drawTeamFrame } from '../lib/canvas/renderers';

interface FrameCanvasProps {
  data: BuilderData;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isTeamMode?: boolean;
  debugMode?: boolean;
}

export const FrameCanvas: React.FC<FrameCanvasProps> = ({
  data,
  canvasRef,
  isTeamMode = false,
  debugMode = false,
}) => {
  const leaderImgRef = useRef<HTMLImageElement | null>(null);
  const teammateImagesRef = useRef<Map<string, HTMLImageElement>>(new Map());

  useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      // 1. Load Leader Photo
      if (data.photoUrl) {
        await new Promise<void>((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            if (isMounted) leaderImgRef.current = img;
            resolve();
          };
          img.onerror = () => resolve();
          img.src = data.photoUrl!;
        });
      } else {
        leaderImgRef.current = null;
      }

      // 2. Load Teammate Photos
      const newMap = new Map<string, HTMLImageElement>();
      await Promise.all(
        data.teammates.map((tm) => {
          if (!tm.photoUrl) return Promise.resolve();
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
              if (isMounted) newMap.set(tm.id, img);
              resolve();
            };
            img.onerror = () => resolve();
            img.src = tm.photoUrl!;
          });
        })
      );
      teammateImagesRef.current = newMap;

      if (isMounted) {
        renderCanvas();
      }
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, [data, isTeamMode, debugMode]);

  const renderCanvas = () => {
    if (!canvasRef.current) return;

    if (isTeamMode || data.format === 'CREW') {
      drawTeamFrame(canvasRef.current, data, leaderImgRef.current, teammateImagesRef.current, debugMode);
    } else if (data.format === 'PFP') {
      drawPfpFrame(canvasRef.current, data, leaderImgRef.current);
    } else {
      drawBuilderIdCard(canvasRef.current, data, leaderImgRef.current, debugMode);
    }
  };

  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="relative border-4 border-black rounded-3xl overflow-hidden shadow-card-solid-pink bg-black max-w-lg w-full">
        <canvas
          ref={canvasRef}
          className="w-full h-auto block rounded-2xl"
          style={{
            aspectRatio:
              isTeamMode || data.format === 'CREW'
                ? '2048 / 1362'
                : data.format === 'PFP'
                ? '1 / 1'
                : '1024 / 1536',
          }}
        />
      </div>
    </div>
  );
};
