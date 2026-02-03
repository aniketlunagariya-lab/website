import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, VolumeX } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EarlyWarning = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const waveformRef = useRef<SVGPathElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const bulletRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const image = imageRef.current;
    const waveform = waveformRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const bullet = bulletRef.current;

    if (!section || !card || !image || !waveform || !label || !headline || !body || !bullet) return;

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
      // Left card from left
      scrollTl.fromTo(
        card,
        { x: '-50vw', opacity: 0, rotate: -1 },
        { x: 0, opacity: 1, rotate: 0, ease: 'none' },
        0
      );

      // Right image from right
      scrollTl.fromTo(
        image,
        { x: '50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.06
      );

      // Card text stagger
      scrollTl.fromTo(
        label,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      scrollTl.fromTo(
        headline,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.16
      );

      scrollTl.fromTo(
        body,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      scrollTl.fromTo(
        bullet,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.24
      );

      // Waveform overlay
      scrollTl.fromTo(
        waveform,
        { scaleX: 0.2, opacity: 0 },
        { scaleX: 1, opacity: 0.35, ease: 'none' },
        0.1
      );

      // SETTLE (30% - 70%) - hold with ambient drift

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        card,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        image,
        { x: 0, opacity: 1 },
        { x: '20vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        waveform,
        { opacity: 0.35 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      // Ambient waveform drift
      gsap.to(waveform, {
        x: 12,
        duration: 5,
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
      className="section-pinned bg-[#0B0F17] flex items-center z-40"
    >
      <div className="w-full px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-[1200px] mx-auto relative">
          {/* Waveform overlay */}
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[140px] pointer-events-none z-10"
            viewBox="0 0 800 140"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              ref={waveformRef}
              d="M0,70 Q50,70 80,70 T140,70 Q160,70 180,50 T220,90 Q240,110 260,70 T320,30 Q360,10 400,70 T480,110 Q520,130 560,70 T640,30 Q680,10 720,70 T800,70"
              fill="none"
              stroke="#22D3D3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transformOrigin: 'center' }}
            />
          </svg>

          {/* Left feature card */}
          <div
            ref={cardRef}
            className="card-dark w-full lg:w-[min(34vw,460px)] min-h-[380px] p-8 lg:p-10 flex flex-col justify-center relative z-20"
          >
            <span
              ref={labelRef}
              className="label-mono block mb-6"
            >
              EARLY WARNING
            </span>

            <h3
              ref={headlineRef}
              className="font-['Space_Grotesk'] text-[clamp(24px,3vw,40px)] font-semibold text-[#F4F7FB] mb-6 leading-[1.1]"
            >
              Catch the rise before it becomes a spiral.
            </h3>

            <p
              ref={bodyRef}
              className="text-[clamp(14px,1.2vw,17px)] text-[#A9B3C2] mb-8 leading-relaxed"
            >
              Real-time biosignal processing detects changes in seconds—so you can ground yourself early, not after.
            </p>

            <div
              ref={bulletRef}
              className="flex items-center gap-2 text-sm text-[#22D3D3]"
            >
              <Shield className="w-4 h-4" />
              <span>Private alerts</span>
              <span className="mx-2">•</span>
              <VolumeX className="w-4 h-4" />
              <span>No audio, no screens</span>
            </div>
          </div>

          {/* Right image */}
          <div
            ref={imageRef}
            className="w-full lg:w-[min(38vw,560px)] h-[min(52vh,380px)] relative z-20"
          >
            <img
              src="/person_glasses.jpg"
              alt="Person wearing Sixth Lab glasses"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyWarning;
