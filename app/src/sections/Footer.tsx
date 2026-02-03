import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 95%',
            end: 'top 75%',
            scrub: 0.4,
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="section-flowing bg-[#0B0F17] border-t border-[rgba(244,247,251,0.08)] z-50"
    >
      <div className="w-full px-6 lg:px-16 py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto">
          {/* Main footer content */}
          <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-16 mb-12">
            {/* Left: Logo and tagline */}
            <div className="lg:max-w-[300px]">
              <h3 className="font-['Space_Grotesk'] text-2xl font-semibold text-[#F4F7FB] mb-4">
                Sixth Lab
              </h3>
              <p className="text-[#A9B3C2] text-sm leading-relaxed">
                The Objectivity Layer for Mental Health.
              </p>
            </div>

            {/* Center: Navigation */}
            <div className="flex flex-wrap gap-8 lg:gap-12">
              <div>
                <h4 className="font-['Space_Grotesk'] text-sm font-semibold text-[#F4F7FB] mb-4 uppercase tracking-wider">
                  Product
                </h4>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => scrollToSection('problem')}
                      className="text-sm text-[#A9B3C2] hover:text-[#22D3D3] transition-colors"
                    >
                      Problem
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('solution')}
                      className="text-sm text-[#A9B3C2] hover:text-[#22D3D3] transition-colors"
                    >
                      Solution
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('how-it-works')}
                      className="text-sm text-[#A9B3C2] hover:text-[#22D3D3] transition-colors"
                    >
                      How it works
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-['Space_Grotesk'] text-sm font-semibold text-[#F4F7FB] mb-4 uppercase tracking-wider">
                  Company
                </h4>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => scrollToSection('waitlist')}
                      className="text-sm text-[#A9B3C2] hover:text-[#22D3D3] transition-colors"
                    >
                      Join waitlist
                    </button>
                  </li>
                  <li>
                    <a
                      href="mailto:aniket@sixthlab.com"
                      className="text-sm text-[#A9B3C2] hover:text-[#22D3D3] transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-['Space_Grotesk'] text-sm font-semibold text-[#F4F7FB] mb-4 uppercase tracking-wider">
                  Legal
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-[#A9B3C2] hover:text-[#22D3D3] transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-[#A9B3C2] hover:text-[#22D3D3] transition-colors"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Contact */}
            <div>
              <h4 className="font-['Space_Grotesk'] text-sm font-semibold text-[#F4F7FB] mb-4 uppercase tracking-wider">
                Connect
              </h4>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:aniket@sixthlab.com"
                  className="flex items-center gap-2 text-sm text-[#A9B3C2] hover:text-[#22D3D3] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  aniket@sixthlab.com
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#A9B3C2] hover:text-[#22D3D3] transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="pt-8 border-t border-[rgba(244,247,251,0.08)] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#A9B3C2]/60">
              © 2026 Sixth Lab Limited. London, United Kingdom.
            </p>
            <p className="text-xs text-[#A9B3C2]/60">
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
