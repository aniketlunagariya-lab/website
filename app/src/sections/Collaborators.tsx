import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Code, Stethoscope, Building2, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const roles = [
  {
    title: 'Engineers',
    description: 'Firmware, embedded systems, wearables',
    icon: Code,
  },
  {
    title: 'Clinicians',
    description: 'Researchers in mental health',
    icon: Stethoscope,
  },
  {
    title: 'Advisors',
    description: 'NHS or health-tech experience',
    icon: Building2,
  },
  {
    title: 'Investors',
    description: 'Aligned with our impact-first mission',
    icon: TrendingUp,
  },
];

const Collaborators = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const roleElements = rolesRef.current.filter(Boolean);
    const cta = ctaRef.current;

    if (!section || !header || roleElements.length === 0 || !cta) return;

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

      // Roles stagger
      roleElements.forEach((role) => {
        gsap.fromTo(
          role,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: role,
              start: 'top 85%',
              end: 'top 65%',
              scrub: 0.4,
            },
          }
        );
      });

      // CTA animation
      gsap.fromTo(
        cta,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cta,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.4,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-flowing bg-[#0B0F17] py-[10vh] lg:py-[12vh] z-50"
    >
      <div className="w-full px-6 lg:px-16 max-w-[1100px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="label-mono block mb-4">WANT TO GET INVOLVED?</span>
          <h2 className="font-['Space_Grotesk'] text-[clamp(28px,3.5vw,48px)] font-semibold text-[#F4F7FB] mb-4">
            We're building a team.
          </h2>
          <p className="text-[clamp(15px,1.3vw,19px)] text-[#A9B3C2] max-w-[600px] mx-auto">
            Sixth Lab is looking for passionate people who want to make a real difference in mental health technology.
          </p>
        </div>

        {/* Roles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <div
                key={role.title}
                ref={(el) => { rolesRef.current[index] = el; }}
                className="card-dark p-6 text-center group hover:border-[#22D3D3]/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#22D3D3]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#22D3D3]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[#22D3D3]" />
                </div>
                <h4 className="font-['Space_Grotesk'] text-lg font-semibold text-[#F4F7FB] mb-2">
                  {role.title}
                </h4>
                <p className="text-sm text-[#A9B3C2]">
                  {role.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            ref={ctaRef}
            href="mailto:aniket@sixthlab.com"
            className="btn-primary inline-flex group"
          >
            Get in Touch
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Collaborators;
