import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const waveformRef = useRef<SVGPathElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const waveform = waveformRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;
    const label = labelRef.current;

    if (!section || !waveform || !headline || !subheadline || !cta || !label) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Waveform entrance
      loadTl.fromTo(
        waveform,
        { opacity: 0, scaleX: 0.92 },
        { opacity: 1, scaleX: 1, duration: 0.9 },
        0
      );

      // Label entrance
      loadTl.fromTo(
        label,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.3
      );

      // Headline entrance - split by words
      const words = headline.querySelectorAll('.word');
      loadTl.fromTo(
        words,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.04 },
        0.4
      );

      // Subheadline entrance
      loadTl.fromTo(
        subheadline,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.7
      );

      // CTA entrance
      loadTl.fromTo(
        cta,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.85
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back
            gsap.set([waveform, headline, subheadline, cta, label], {
              opacity: 1,
              y: 0,
              x: 0,
            });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        headline,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        subheadline,
        { y: 0, opacity: 1 },
        { y: '-14vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        cta,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        waveform,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        label,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.76
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProblem = () => {
    const element = document.getElementById('problem');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-[#0B0F17] flex items-center justify-center z-10"
    >
      <div className="relative w-full max-w-[980px] mx-auto px-6 text-center">
        {/* Waveform SVG */}
        <svg
          className="w-full max-w-[min(72vw,980px)] h-[140px] mx-auto mb-8"
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
            opacity="0.7"
            style={{ transformOrigin: 'center' }}
          />
        </svg>

        {/* Label */}
        <span
          ref={labelRef}
          className="label-mono block mb-6"
        >
          SIXTH LAB — ASSISTIVE GLASSES
        </span>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-['Space_Grotesk'] text-[clamp(32px,5vw,72px)] font-semibold text-[#F4F7FB] mb-6 max-w-[920px] mx-auto leading-[1.05]"
        >
          <span className="word inline-block">The</span>{' '}
          <span className="word inline-block">Objectivity</span>{' '}
          <span className="word inline-block">Layer</span>{' '}
          <span className="word inline-block">for</span>{' '}
          <span className="word inline-block">Mental</span>{' '}
          <span className="word inline-block">Health.</span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="text-[clamp(15px,1.4vw,20px)] text-[#A9B3C2] max-w-[640px] mx-auto mb-10 leading-relaxed"
        >
          Smart glasses that sense physiological changes in real time—so you can respond earlier, calmer, and on your own terms.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={scrollToWaitlist} className="btn-primary group">
            Join the waitlist
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={scrollToProblem} className="btn-secondary">
            See how it works
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
