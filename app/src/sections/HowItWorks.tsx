import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Brain, Hand } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Monitor',
    description: 'Biosensors track skin conductance, heart rate, and movement.',
    icon: Activity,
  },
  {
    number: '02',
    title: 'Detect',
    description: 'Edge AI identifies patterns linked to rising anxiety.',
    icon: Brain,
  },
  {
    number: '03',
    title: 'Intervene',
    description: 'A gentle, private cue helps you ground—before it escalates.',
    icon: Hand,
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const stepElements = stepsRef.current.filter(Boolean);
    const line = lineRef.current;

    if (!section || !header || stepElements.length === 0) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.4,
          },
        }
      );

      // Step cards animation
      stepElements.forEach((step) => {
        gsap.fromTo(
          step,
          { x: '-10vw', opacity: 0, rotate: -0.5 },
          {
            x: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 0.4,
            },
          }
        );
      });

      // Line draw animation
      if (line) {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 0.4,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="section-flowing bg-[#0B0F17] py-[10vh] lg:py-[12vh] z-50"
    >
      <div className="w-full px-6 lg:px-16 max-w-[1100px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="font-['Space_Grotesk'] text-[clamp(28px,3.5vw,48px)] font-semibold text-[#F4F7FB] mb-4">
            How it works
          </h2>
          <p className="text-[clamp(15px,1.3vw,19px)] text-[#A9B3C2]">
            Three layers. One calm system.
          </p>
        </div>

        {/* Connecting line SVG */}
        <svg
          className="absolute left-1/2 -translate-x-1/2 w-px h-[calc(100%-200px)] hidden lg:block"
          style={{ top: '200px' }}
        >
          <path
            ref={lineRef}
            d="M0,0 L0,1000"
            stroke="#22D3D3"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
        </svg>

        {/* Steps */}
        <div className="flex flex-col gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[index] = el; }}
                className="card-dark w-full p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center gap-6"
              >
                {/* Left: Number and Title */}
                <div className="flex items-center gap-4 lg:gap-6 lg:w-[40%]">
                  <span className="font-['IBM_Plex_Mono'] text-3xl lg:text-4xl font-medium text-[#22D3D3]">
                    {step.number}
                  </span>
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-[#22D3D3]" />
                    <h3 className="font-['Space_Grotesk'] text-xl lg:text-2xl font-semibold text-[#F4F7FB]">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Right: Description */}
                <div className="lg:w-[60%] lg:pl-8">
                  <p className="text-[clamp(14px,1.2vw,17px)] text-[#A9B3C2] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
