import { useEffect, useRef } from 'react';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';

const SENSITIVITY = 0.8;

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const prevXRef = useRef<number | null>(null);
  const seekingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const seekIfIdle = () => {
      if (!seekingRef.current && Math.abs(video.currentTime - targetTimeRef.current) > 0.05) {
        video.currentTime = targetTimeRef.current;
        seekingRef.current = true;
      }
    };

    const onLoadedMetadata = () => {
      targetTimeRef.current = 0;
      video.currentTime = 0;
    };

    const onSeeked = () => {
      seekingRef.current = false;
      // Queue the next seek if targetTime moved while we were seeking,
      // preventing seek-flooding from rapid mousemove events.
      seekIfIdle();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (prevXRef.current !== null && video.duration > 0 && !Number.isNaN(video.duration)) {
        const delta = e.clientX - prevXRef.current;
        const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
        targetTimeRef.current = Math.min(
          Math.max(targetTimeRef.current + offset, 0),
          video.duration
        );
        seekIfIdle();
      }
      prevXRef.current = e.clientX;
    };

    window.addEventListener('mousemove', onMouseMove);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('seeked', onSeeked);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('seeked', onSeeked);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={VIDEO_SRC}
      muted
      playsInline
      preload="auto"
      className="fixed inset-0 z-0 h-full w-full"
      style={{ objectFit: 'cover', objectPosition: '70% center' }}
    />
  );
}
