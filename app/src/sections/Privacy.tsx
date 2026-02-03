import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, CloudOff, Trash2, Activity, Brain, Hand } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    title: 'On-device processing',
    description: 'Sensitive signals stay local.',
    icon: Cpu,
  },
  {
    title: 'No cloud required',
    description: 'Works without constant connectivity.',
    icon: CloudOff,
  },
  {
    title: 'You control the record',
    description: 'Export or delete anytime.',
    icon: Trash2,
  },
];

const Privacy = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const principleElements = principlesRef.current.filter(Boolean);

    if (!section || !left || !right || principleElements.length === 0) return;

    const ctx = gsap.context(() => {
      // Left text block
      gsap.fromTo(
        left,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: left,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.4,
          },
        }
      );

      // Right diagram
      gsap.fromTo(
        right,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: right,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.4,
          },
        }
      );

      // Principles list stagger
      principleElements.forEach((principle) => {
        gsap.fromTo(
          principle,
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: principle,
              start: 'top 85%',
              end: 'top 65%',
              scrub: 0.4,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-flowing bg-[#111827] py-[10vh] lg:py-[12vh] z-50"
    >
      <div className="w-full px-6 lg:px-16 max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left content */}
          <div ref={leftRef} className="flex-1">
            <h2 className="font-['Space_Grotesk'] text-[clamp(28px,3.5vw,48px)] font-semibold text-[#F4F7FB] mb-6">
              Privacy first. Always.
            </h2>
            <p className="text-[clamp(15px,1.3vw,19px)] text-[#A9B3C2] leading-relaxed mb-10">
              Your data is yours. We design for the least data necessary, processed as close to you as possible.
            </p>

            {/* Principles list */}
            <div className="flex flex-col gap-6">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <div
                    key={principle.title}
                    ref={(el) => { principlesRef.current[index] = el; }}
                    className="flex items-start gap-4 pb-6 border-b border-[rgba(244,247,251,0.08)] last:border-0 last:pb-0"
                  >
                    <div className="w-10 h-10 rounded-md bg-[#22D3D3]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#22D3D3]" />
                    </div>
                    <div>
                      <h4 className="font-['Space_Grotesk'] text-lg font-semibold text-[#F4F7FB] mb-1">
                        {principle.title}
                      </h4>
                      <p className="text-[clamp(14px,1.1vw,16px)] text-[#A9B3C2]">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right diagram */}
          <div ref={rightRef} className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-[400px] aspect-square">
              {/* Central device */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-[#22D3D3]/20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#22D3D3]/30 flex items-center justify-center">
                  <Cpu className="w-8 h-8 text-[#22D3D3]" />
                </div>
              </div>

              {/* Orbiting elements */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-16 h-16 rounded-full bg-[#111827] border border-[rgba(244,247,251,0.12)] flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#22D3D3]" />
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#111827] border border-[rgba(244,247,251,0.12)] flex items-center justify-center">
                <Brain className="w-6 h-6 text-[#22D3D3]" />
              </div>

              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-16 h-16 rounded-full bg-[#111827] border border-[rgba(244,247,251,0.12)] flex items-center justify-center">
                <Hand className="w-6 h-6 text-[#22D3D3]" />
              </div>

              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#111827] border border-[rgba(244,247,251,0.12)] flex items-center justify-center">
                <CloudOff className="w-6 h-6 text-[#22D3D3]" />
              </div>

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <circle
                  cx="50%"
                  cy="50%"
                  r="35%"
                  fill="none"
                  stroke="rgba(34, 211, 211, 0.15)"
                  strokeWidth="1"
                  strokeDasharray="8 4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
