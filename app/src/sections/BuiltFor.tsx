import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const audiences = [
  {
    number: '01',
    title: 'Generalized Anxiety',
    description: 'Daily baseline tracking to spot patterns.',
  },
  {
    number: '02',
    title: 'Panic',
    description: 'Rapid onset detection with a grounding cue.',
  },
  {
    number: '03',
    title: 'Anticipatory Anxiety',
    description: 'Early signals before events.',
  },
  {
    number: '04',
    title: 'ADHD / Autism',
    description: 'Support for regulation and transitions.',
  },
];

const BuiltFor = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cardElements = cardsRef.current.filter(Boolean);

    if (!section || !header || cardElements.length === 0) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header,
        { y: 20, opacity: 0 },
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

      // Cards staggered reveal
      cardElements.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 30, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
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
      className="section-flowing bg-[#0B0F17] py-[10vh] lg:py-[12vh] z-50"
    >
      <div className="w-full px-6 lg:px-16 max-w-[1200px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16">
          <h2 className="font-['Space_Grotesk'] text-[clamp(28px,3.5vw,48px)] font-semibold text-[#F4F7FB]">
            Built for real life.
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {audiences.map((audience, index) => (
            <div
              key={audience.number}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="card-dark p-8 lg:p-10 min-h-[200px] lg:min-h-[240px] flex flex-col justify-between group hover:border-[#22D3D3]/30 transition-colors duration-300"
            >
              <div>
                <span className="font-['IBM_Plex_Mono'] text-4xl lg:text-5xl font-medium text-[#22D3D3]/40 group-hover:text-[#22D3D3]/60 transition-colors">
                  {audience.number}
                </span>
              </div>
              
              <div>
                <h3 className="font-['Space_Grotesk'] text-xl lg:text-2xl font-semibold text-[#F4F7FB] mb-3">
                  {audience.title}
                </h3>
                <p className="text-[clamp(14px,1.2vw,17px)] text-[#A9B3C2] leading-relaxed">
                  {audience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuiltFor;
