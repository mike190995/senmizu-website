import React, { useRef, useEffect, useState } from 'react';

// A simple hook to load the YouTube IFrame Player API script
const useYouTubeIframeApi = () => {
  const [isApiReady, setIsApiReady] = useState(false);

  useEffect(() => {
    if ((window as any).YT && (window as any).YT.Player) {
      setIsApiReady(true);
      return;
    }

    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }

    (window as any).onYouTubeIframeAPIReady = () => {
      setIsApiReady(true);
    };

    return () => {
      // Clean up the global callback
      delete (window as any).onYouTubeIframeAPIReady;
    };
  }, []);

  return isApiReady;
};

const AboutPage: React.FC = () => {
  const isApiReady = useYouTubeIframeApi();
  const playerRef = useRef<any>(null); // Ref for the YT Player instance
  const videoContainerRef = useRef<HTMLDivElement>(null); // Ref for the container div to observe

  useEffect(() => {
    const createPlayer = () => {
      playerRef.current = new (window as any).YT.Player('youtube-player-about', {
        events: {
          // You can add other event handlers here if needed
        },
      });
    };

    if (isApiReady) {
      if ((window as any).YT.Player) {
        createPlayer();
      } else {
        // If API is ready but Player is not, wait for the callback
        const originalCallback = (window as any).onYouTubeIframeAPIReady;
        (window as any).onYouTubeIframeAPIReady = () => {
          if (originalCallback) originalCallback();
          createPlayer();
        };
      }
    }
    
    return () => {
      // Destroy the player instance on component unmount
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
    };
  }, [isApiReady]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!playerRef.current || typeof playerRef.current.playVideo !== 'function') {
          return;
        }
        // When the video is more than 75% visible, play it. Otherwise, pause it.
        if (entry.isIntersecting) {
          playerRef.current.playVideo();
        } else {
          playerRef.current.pauseVideo();
        }
      },
      {
        root: null, // observing intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.75, // Trigger when 75% of the element is visible
      }
    );

    const currentRef = videoContainerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-4">
          About Senmizu
        </h1>
        <h2 className="text-xl md:text-2xl font-light text-cyan-300 mb-12">
          Crafting Digital Experiences with Fluidity and Grace.
        </h2>
        <div className="text-left text-lg text-slate-400 space-y-6">
          <p>
            Our journey at Senmizu Creatives is one of resilience and transformation. We began as a web development agency focused on quick, affordable solutions, but evolving to navigate the vast sea of competition tested our resolve and led us to our true purpose, rooted in our name Senmizu (千水) — "a thousand waters." This philosophy dictates that digital experiences must be as fluid, adaptable, and powerful as water itself. Today, like a river carving its path through stone, we shape technology to create seamless, intuitive, and deeply resonant journeys for every user, turning our story of survival into a mission of profound digital craftsmanship.
          </p>

          <div ref={videoContainerRef} className="my-12 rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/10">
            <div className="relative h-0 pb-[56.25%]">
              <iframe
                id="youtube-player-about"
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/5VbzV3k6_PI?enablejsapi=1&autoplay=0&mute=1&controls=0&showinfo=0&modestbranding=1&loop=1&playlist=5VbzV3k6_PI"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          
          <div className="pt-8">
            <h3 className="text-3xl font-bold text-white pb-6 text-center">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="text-xl font-semibold text-cyan-400 mb-2">Uncharted Creativity</h4>
                <p className="text-slate-500 text-sm mb-2 italic">(Innovation)</p>
                <p className="text-slate-400 text-base">We embrace the spirit of exploration, constantly innovating and developing unique, effective solutions that push the boundaries of what's possible.</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-cyan-400 mb-2">Steady at the Helm</h4>
                <p className="text-slate-500 text-sm mb-2 italic">(Diligence)</p>
                <p className="text-slate-400 text-base">We are steadfast in our commitment to thoroughness and an unwavering attention to detail, ensuring every solution we craft is robust, reliable, and built for enduring success.</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-cyan-400 mb-2">Navigate with Empathy</h4>
                <p className="text-slate-500 text-sm mb-2 italic">(Client-Centric)</p>
                <p className="text-slate-400 text-base">We chart our course by truly understanding our clients' needs and the perspectives of their users. Their success is our compass.</p>
              </div>
              <div className="lg:col-start-2">
                <h4 className="text-xl font-semibold text-cyan-400 mb-2">All Hands on Deck</h4>
                <p className="text-slate-500 text-sm mb-2 italic">(Collaboration)</p>
                <p className="text-slate-400 text-base">The best crews work together. We partner closely with our clients and each other to navigate challenges and celebrate shared victories.</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-cyan-400 mb-2">Anchor in Integrity</h4>
                <p className="text-slate-500 text-sm mb-2 italic">(Resilience & Trust)</p>
                <p className="text-slate-400 text-base">Through storms and calm seas, our commitment to honesty and transparency is our anchor. We are a resilient and trustworthy partner for the long voyage.</p>
              </div>
            </div>
          </div>

          <div className="pt-12">
            <h3 className="text-3xl font-bold text-white text-center">Our Process</h3>
            <p className="text-center text-slate-400 max-w-2xl mx-auto pt-2 pb-8">
              Our approach is holistic and collaborative. We dive deep into your brand's essence to build solutions that are not only visually stunning but also strategically sound.
            </p>
            <ol className="relative border-l border-slate-700 space-y-10">
              <li className="ml-8">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-cyan-900 text-cyan-300 rounded-full -left-4 ring-4 ring-slate-900">1</span>
                <h4 className="text-xl font-semibold text-white mb-1">Discovery & Strategy</h4>
                <p className="text-slate-400">We begin by immersing ourselves in your world. Through workshops and research, we define clear objectives and map out a strategic roadmap for success.</p>
              </li>
              <li className="ml-8">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-cyan-900 text-cyan-300 rounded-full -left-4 ring-4 ring-slate-900">2</span>
                <h4 className="text-xl font-semibold text-white mb-1">Design & Prototyping</h4>
                <p className="text-slate-400">Our design phase brings ideas to life. We create wireframes, high-fidelity mockups, and interactive prototypes to visualize the user journey and refine the experience.</p>
              </li>
              <li className="ml-8">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-cyan-900 text-cyan-300 rounded-full -left-4 ring-4 ring-slate-900">3</span>
                <h4 className="text-xl font-semibold text-white mb-1">Development & Launch</h4>
                <p className="text-slate-400">With a solid blueprint, our developers write clean, efficient code to build a robust and scalable product. We handle deployment to ensure a smooth launch.</p>
              </li>
            </ol>
          </div>

           <p className="pt-8">
            We are a collective of designers, developers, and strategists united by a passion for pushing the boundaries of what's possible on the web. We flow between disciplines, blending creativity with technical excellence to deliver work that makes a tangible impact. Partner with us, and let's create something extraordinary together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;