'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string; // Optional video URL - falls back to placeholder if not provided
}

export function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Reset video state when modal opens/closes
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    } else if (!isOpen) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [isOpen]);

  const togglePlay = () => {
    if (!videoRef.current || !videoUrl) {
      // For placeholder, just toggle the state
      setIsPlaying(!isPlaying);
      return;
    }

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      setIsLoading(true);
      videoRef.current.play().finally(() => setIsLoading(false));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current || !videoUrl) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current || !videoUrl) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !videoUrl) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickRatio = clickX / rect.width;
    const newTime = clickRatio * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    if (!videoUrl) {
      // For placeholder, simulate progress
      return isPlaying ? 35 : 0;
    }
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  };

  const getTimeDisplay = () => {
    if (!videoUrl) {
      // For placeholder, show simulated time
      return isPlaying ? '1:23 / 3:45' : '0:00 / 3:45';
    }
    return `${formatTime(currentTime)} / ${formatTime(duration)}`;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        backgroundColor: 'hsl(0 0% 0% / 0.75)', /* Dark overlay with transparency */
        backdropFilter: 'blur(4px)'
      }}
      onClick={onClose} // Close when clicking overlay
    >
      {/* Modal Content */}
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{
          border: '2px solid hsl(158, 65%, 45%)',
          boxShadow: '0 20px 40px hsl(0 0% 0% / 0.3), 0 0 0 1px hsl(158, 65%, 45% / 0.2)'
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{
            borderColor: 'hsl(158, 65%, 45% / 0.2)',
            background: 'linear-gradient(135deg, hsl(158, 30%, 95%), hsl(0, 0%, 100%))'
          }}
        >
          <div>
            <h3
              className="text-xl font-heading font-semibold"
              style={{ color: 'hsl(160 15% 15%)' }}
            >
              Splinter Demo Video
            </h3>
            <p
              className="text-sm text-muted-foreground mt-1"
              style={{ color: 'hsl(160 10% 45%)' }}
            >
              Discover how AI transforms physiotherapy patient onboarding
            </p>
          </div>
          
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-red-50 hover:text-red-600 transition-colors rounded-full p-2"
            style={{
              color: 'hsl(160 10% 45%)'
            }}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Video Player Area */}
        <div className="relative">
          {videoUrl ? (
            /* Real Video Player */
            <div className="relative w-full h-[400px] lg:h-[500px] bg-black">
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onWaiting={() => setIsLoading(true)}
                onCanPlay={() => setIsLoading(false)}
                controls={false} // We'll use custom controls
                poster="" // You can add a poster image URL here
              >
                <source src={videoUrl} type="video/mp4" />
                <source src={videoUrl} type="video/webm" />
                <source src={videoUrl} type="video/ogg" />
                Your browser does not support the video tag.
              </video>

              {/* Video Overlay Controls */}
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer group bg-transparent hover:bg-black/10 transition-all duration-300"
                onClick={togglePlay}
              >
                {!isPlaying && (
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300"
                    style={{
                      backgroundColor: 'hsl(158, 65%, 45%)',
                      boxShadow: '0 8px 32px hsl(158, 65%, 45% / 0.4)'
                    }}
                  >
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                )}
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div
                      className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"
                    ></div>
                    <p className="text-sm">Loading video...</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Video Placeholder */
            <div
              className="w-full h-[400px] lg:h-[500px] flex items-center justify-center relative"
              style={{
                background: 'linear-gradient(135deg, hsl(158, 65%, 8%), hsl(158, 65%, 15%))',
                backgroundImage: 'radial-gradient(circle at 30% 30%, hsl(158, 65%, 45% / 0.1) 0%, transparent 50%)'
              }}
            >
              {/* Play Button Overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={togglePlay}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300"
                  style={{
                    backgroundColor: 'hsl(158, 65%, 45%)',
                    boxShadow: '0 8px 32px hsl(158, 65%, 45% / 0.4)'
                  }}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white ml-0" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </div>
              </div>

              {/* Video Preview Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/90 px-8">
                  <div
                    className="text-2xl lg:text-3xl font-heading font-semibold mb-4"
                    style={{
                      background: 'linear-gradient(135deg, hsl(158, 65%, 80%), hsl(158, 65%, 95%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    See Splinter in Action
                  </div>
                  <p className="text-lg text-white/80 max-w-md mx-auto">
                    Watch how our AI assistant transforms the patient onboarding experience
                  </p>
                </div>
              </div>

              {/* Simulated Loading State when playing */}
              {isPlaying && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div
                      className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"
                    ></div>
                    <p className="text-sm">Loading video...</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Video Controls */}
          <div
            className="flex items-center justify-between p-4 border-t"
            style={{
              borderColor: 'hsl(158, 65%, 45% / 0.2)',
              backgroundColor: 'hsl(158, 30%, 97%)'
            }}
          >
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlay}
                className="hover:bg-white/80"
                style={{ color: 'hsl(158, 65%, 45%)' }}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="hover:bg-white/80"
                style={{ color: 'hsl(158, 65%, 45%)' }}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>

            <div className="flex-1 mx-4">
              {/* Progress Bar */}
              <div
                className="w-full h-2 rounded-full overflow-hidden cursor-pointer"
                style={{ backgroundColor: 'hsl(158, 65%, 45% / 0.2)' }}
                onClick={handleProgressClick}
              >
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: 'hsl(158, 65%, 45%)',
                    width: `${getProgressPercentage()}%`
                  }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className="text-sm font-mono"
                style={{ color: 'hsl(160 10% 45%)' }}
              >
                {getTimeDisplay()}
              </span>
              
              {videoUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="hover:bg-white/80"
                  style={{ color: 'hsl(158, 65%, 45%)' }}
                >
                  <Maximize className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="p-6 border-t text-center"
          style={{
            borderColor: 'hsl(158, 65%, 45% / 0.2)',
            backgroundColor: 'hsl(158, 30%, 98%)'
          }}
        >
          <p
            className="text-sm font-body mb-3"
            style={{ color: 'hsl(160 10% 45%)' }}
          >
            Ready to transform your physiotherapy practice?
          </p>
          <Button
            size="default"
            className="shadow-lg hover:shadow-xl transition-all duration-300 text-cta-primary cursor-pointer"
            style={{
              backgroundColor: 'hsl(158, 65%, 45%)',
              color: 'hsl(0 0% 100%)',
              letterSpacing: '-0.005em'
            }}
            onClick={() => {
              onClose();
              // Scroll to contact section
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            Start Free 30-Day Trial
          </Button>
        </div>
      </div>
    </div>
  );
}