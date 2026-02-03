import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Waitlist = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const waveformRef = useRef<SVGPathElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const waveform = waveformRef.current;

    if (!section || !content || !waveform) return;

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
        content.querySelector('h2'),
        { y: '18vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        content.querySelector('p'),
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        content.querySelector('form'),
        { y: '10vh', opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0.14
      );

      // Waveform background
      scrollTl.fromTo(
        waveform,
        { opacity: 0 },
        { opacity: 0.1, ease: 'none' },
        0.1
      );

      // SETTLE (30% - 70%) - hold with ambient drift

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        content,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Ambient waveform drift
      gsap.to(waveform, {
        x: 20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <section
      ref={sectionRef}
      id="waitlist"
      className="section-pinned bg-[#0B0F17] flex items-center justify-center z-[80]"
    >
      {/* Background waveform */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          ref={waveformRef}
          d="M0,300 Q100,300 150,250 T300,350 T450,200 T600,400 T750,300 T900,300"
          fill="none"
          stroke="#22D3D3"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-[720px] mx-auto px-6 text-center"
      >
        <h2 className="font-['Space_Grotesk'] text-[clamp(32px,4.5vw,64px)] font-semibold text-[#F4F7FB] mb-6">
          Join the waitlist.
        </h2>

        <p className="text-[clamp(15px,1.3vw,19px)] text-[#A9B3C2] mb-10 max-w-[480px] mx-auto">
          Be the first to get updates and early access. No spam.
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-[480px] mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="flex-1 px-4 py-3 bg-[#111827] border border-[rgba(244,247,251,0.12)] rounded-md text-[#F4F7FB] placeholder:text-[#A9B3C2]/60 focus:outline-none focus:border-[#22D3D3] transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#0B0F17]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Joining...
                </span>
              ) : (
                <>
                  Join
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-3 text-[#22D3D3] bg-[#22D3D3]/10 border border-[#22D3D3]/30 rounded-md px-6 py-4 max-w-[480px] mx-auto">
            <Check className="w-5 h-5" />
            <span className="font-medium">You're on the list. We'll be in touch.</span>
          </div>
        )}

        <p className="text-xs text-[#A9B3C2]/60 mt-6">
          We'll never share your email. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default Waitlist;
