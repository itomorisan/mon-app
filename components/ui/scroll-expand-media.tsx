'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc?: string;
  background?: ReactNode;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  autoExpand?: boolean;
  onExpandComplete?: () => void;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  background,
  title,
  date,
  scrollToExpand,
  textBlend,
  autoExpand = false,
  onExpandComplete,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  // Auto-expansion animée (transition automatique sans scroll)
  useEffect(() => {
    if (!autoExpand) return;
    const duration = 1000; // ms - rapide
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeInOut
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setScrollProgress(eased);
      if (t >= 1) {
        setMediaFullyExpanded(true);
        setShowContent(true);
        if (onExpandComplete) setTimeout(onExpandComplete, 200);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoExpand]);

  useEffect(() => {
    if (autoExpand) return; // pas de contrôle scroll en mode auto
    const handleWheel = (e: Event) => {
      const we = e as unknown as WheelEvent;
      if (mediaFullyExpanded && we.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = we.deltaY * 0.0009;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (newProgress < 0.75) { setShowContent(false); }
      }
    };

    const handleTouchStart = (e: Event) => {
      const te = e as unknown as TouchEvent;
      setTouchStartY(te.touches[0].clientY);
    };

    const handleTouchMove = (e: Event) => {
      const te = e as unknown as TouchEvent;
      if (!touchStartY) return;
      const touchY = te.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (newProgress < 0.75) { setShowContent(false); }
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);
    const handleScroll = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0); };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = () => setIsMobileState(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div ref={sectionRef} className='transition-colors duration-700 ease-in-out overflow-x-hidden'>
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          {background ? (
            <div className='fixed inset-0 z-0 h-full pointer-events-none'>
              {background}
            </div>
          ) : bgImageSrc ? (
            <motion.div
              className='absolute inset-0 z-0 h-full'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 - scrollProgress }}
              transition={{ duration: 0.1 }}
            >
              <Image src={bgImageSrc} alt='Background' width={1920} height={1080}
                className='w-screen h-screen' style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
              <div className='absolute inset-0 bg-black/10' />
            </motion.div>
          ) : null}

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl'
                style={{ width: `${mediaWidth}px`, height: `${mediaHeight}px`, maxWidth: '95vw', maxHeight: '85vh', boxShadow: '0px 0px 50px rgba(0,0,0,0.3)' }}
              >
                <div className='relative w-full h-full'>
                  <Image src={mediaSrc} alt={title || 'Soirée'} width={1280} height={720}
                    className='w-full h-full object-cover rounded-xl' />
                  <motion.div className='absolute inset-0 bg-black/50 rounded-xl'
                    initial={{ opacity: 0.7 }} animate={{ opacity: 0.7 - scrollProgress * 0.3 }} transition={{ duration: 0.2 }} />
                </div>

                {date && !autoExpand && (
                  <div className='flex flex-col items-center text-center relative z-10 mt-4 transition-none'>
                    <p className='text-2xl text-blue-200' style={{ transform: `translateX(-${textTranslateX}vw)` }}>{date}</p>
                    {scrollToExpand && (
                      <p className='text-blue-200 font-medium text-center' style={{ transform: `translateX(${textTranslateX}vw)` }}>{scrollToExpand}</p>
                    )}
                  </div>
                )}
              </div>

              {title && !autoExpand && (
                <div className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${textBlend ? 'mix-blend-difference' : 'mix-blend-normal'}`}>
                  <motion.h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-blue-200 transition-none'
                    style={{ transform: `translateX(-${textTranslateX}vw)` }}>{firstWord}</motion.h2>
                  <motion.h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-center text-blue-200 transition-none'
                    style={{ transform: `translateX(${textTranslateX}vw)` }}>{restOfTitle}</motion.h2>
                </div>
              )}
            </div>

            <motion.section data-content className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
              initial={{ opacity: 0 }} animate={{ opacity: showContent ? 1 : 0 }} transition={{ duration: 0.4 }}>
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
