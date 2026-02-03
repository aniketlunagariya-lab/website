import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Solution = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const cta = ctaRef.current;

    if (!section || !image || !label || !headline || !body || !cta) return;

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
      // Product image from right
      scrollTl.fromTo(
        image,
        { x: '55vw', opacity: 0, rotate: -10, scale: 0.96 },
        { x: 0, opacity: 1, rotate: -6, scale: 1, ease: 'none' },
        0
      );

      // Headline from left
      scrollTl.fromTo(
        headline,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.06
      );

      // Label from left
      scrollTl.fromTo(
        label,
        { x: '-30vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // Body and CTA
      scrollTl.fromTo(
        body,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.14
      );

      scrollTl.fromTo(
        cta,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // SETTLE (30% - 70%) - hold with ambient float

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headline,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        label,
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.71
      );

      scrollTl.fromTo(
        body,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        cta,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.73
      );

      scrollTl.fromTo(
        image,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Ambient float animation for image
      gsap.to(image, {
        y: -6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="solution"
      className="section-pinned bg-[#0B0F17] flex items-center z-30"
    >
      <div className="w-full px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-[1400px] mx-auto">
          {/* Left content */}
          <div className="flex-1 max-w-[520px] text-center lg:text-left">
            <span
              ref={labelRef}
              className="label-mono block mb-6"
            >
              SIXTH LAB GLASSES
            </span>

            <h2
              ref={headlineRef}
              className="font-['Space_Grotesk'] text-[clamp(32px,4.5vw,64px)] font-semibold text-[#F4F7FB] mb-6 leading-[1.05]"
            >
              The Objectivity Layer.
            </h2>

            <p
              ref={bodyRef}
              className="text-[clamp(15px,1.3vw,19px)] text-[#A9B3C2] mb-8 leading-relaxed"
            >
              A lightweight frame that tracks physiological markers and translates them into clear, actionable feedback.
            </p>

            <button
              ref={ctaRef}
              onClick={scrollToHowItWorks}
              className="btn-secondary group"
            >
              Explore features
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right image */}
          <div
            ref={imageRef}
            className="flex-1 flex justify-center lg:justify-end"
            style={{ transform: 'rotate(-6deg)' }}
          >
            <img
              src="/product_glasses.jpg"
              alt="Sixth Lab Smart Glasses"
              className="w-full max-w-[min(54vw,760px)] h-auto rounded-lg shadow-2xl"
              style={{ boxShadow: '0 18px 50px rgba(0,0,0,0.35)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
