import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Problem = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const waveformRef = useRef<SVGPathElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const waveform = waveformRef.current;
    const scanLine = scanLineRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;

    if (!section || !waveform || !scanLine || !headline || !body) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        waveform,
        { scaleX: 0.75, opacity: 0.6 },
        { scaleX: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        scanLine,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        headline,
        { y: '22vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.06
      );

      scrollTl.fromTo(
        body,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headline,
        { y: 0, opacity: 1 },
        { y: '-16vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        body,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        waveform,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        scanLine,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.77
      );

      // Ambient waveform animation during settle
      gsap.to(waveform, {
        scaleY: 1.02,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="section-pinned bg-[#0B0F17] flex items-center justify-center z-20"
    >
      <div className="relative w-full max-w-[980px] mx-auto px-6 text-center">
        {/* Waveform SVG with scan line */}
        <div className="relative mb-12">
          <svg
            className="w-full max-w-[min(72vw,980px)] h-[140px] mx-auto"
            viewBox="0 0 800 140"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              ref={waveformRef}
              d="M0,70 Q50,70 80,70 T140,70 Q160,70 180,50 T220,90 Q240,110 260,70 T320,30 Q360,10 400,70 T480,110 Q520,130 560,70 T640,30 Q680,10 720,70 T800,70"
              fill="none"
              stroke="#22D3D3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transformOrigin: 'center' }}
            />
          </svg>
          
          {/* Scan line and dot */}
          <div
            ref={scanLineRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="w-px h-[160px] bg-gradient-to-b from-transparent via-[#22D3D3]/30 to-transparent" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#22D3D3]/50" />
          </div>
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-['Space_Grotesk'] text-[clamp(28px,4vw,56px)] font-semibold text-[#F4F7FB] mb-8 max-w-[800px] mx-auto leading-[1.1]"
        >
          Your body sends signals before your mind notices.
        </h2>

        {/* Body text */}
        <p
          ref={bodyRef}
          className="text-[clamp(15px,1.3vw,19px)] text-[#A9B3C2] max-w-[720px] mx-auto leading-relaxed"
        >
          Skin conductance. Heart rate. Micro-movements. We turn those signals into an early warning—private, continuous, and calm.
        </p>
      </div>
    </section>
  );
};

export default Problem;
