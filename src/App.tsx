/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  Sparkles,
  Flower2,
  Coffee,
  Star,
  Ticket,
  IceCream,
  Moon,
  X,
  CheckCircle2,
  Languages,
  Copy,
  Share2,
  Play,
  Pause
} from "lucide-react";

const items = [
  { name: "PDF", icon: "📄" },
  { name: "Notes", icon: "📝" },
  { name: "Assignments", icon: "📚" },
  { name: "Lab Records", icon: "🧪" },
  { name: "Observations", icon: "🔍" },
  { name: "Records", icon: "📁" }
];

const coupons = [
  { title: "Quick Coffee", icon: <Coffee />, desc: "A casual coffee break on me whenever you need a caffeine hit." },
  { title: "Ice Cream Treat", icon: <IceCream />, desc: "A sweet treat to celebrate a small win or just because." },
  { title: "The 'I Owe You' Help", icon: <Sparkles />, desc: "A favor or help request that I absolutely cannot deny!" }
];

const BTSLogo = () => (
  <div className="bts-logo">
    <div className="bts-logo-part" />
    <div className="bts-logo-part right" />
  </div>
);

export default function App() {
  const defaultAudioSrc = "/media/mp3/YTDown.com_YouTube_Media_DbXMjAYSa68_009_128k.mp3";
  const [selectedCoupon, setSelectedCoupon] = useState<typeof coupons[0] | null>(null);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isPageLinkCopied, setIsPageLinkCopied] = useState(false);
  const [isPageShared, setIsPageShared] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement] = useState(new Audio());

  useEffect(() => {
    audioElement.src = defaultAudioSrc;
    const handleEnded = () => setIsPlaying(false);
    audioElement.addEventListener("ended", handleEnded);

    return () => {
      audioElement.pause();
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [audioElement, defaultAudioSrc]);

  useEffect(() => {
    const desktopScrollFactor = 0.5;
    const mobileScrollFactor = 0.4;
    let touchStartY: number | null = null;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      window.scrollBy({
        top: event.deltaY * desktopScrollFactor,
        behavior: "auto",
      });
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchStartY === null || event.touches.length !== 1) return;

      const currentY = event.touches[0].clientY;
      const deltaY = touchStartY - currentY;

      event.preventDefault();
      window.scrollBy({
        top: deltaY * mobileScrollFactor,
        behavior: "auto",
      });

      touchStartY = currentY;
    };

    const handleTouchEnd = () => {
      touchStartY = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  const handleRedeem = () => {
    setIsRedeemed(true);
    setTimeout(() => {
      setIsRedeemed(false);
      setSelectedCoupon(null);
    }, 2000);
  };

  const handleCopy = () => {
    if (!selectedCoupon) return;
    const text = `Hey Sharina! I've redeemed a coupon for: ${selectedCoupon.title}!\n"${selectedCoupon.desc}"\n- From your Engineering Survival Buddy 💜`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    if (!selectedCoupon) return;
    const text = `Hey Sharina! I've redeemed a coupon for: ${selectedCoupon.title}!\n"${selectedCoupon.desc}"\n- From your Engineering Survival Buddy 💜`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handlePageShare = async () => {
    const shareData = {
      title: "Thank You, Sharina",
      text: "A special thank-you webpage 💜",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setIsPageShared(true);
        setTimeout(() => setIsPageShared(false), 2000);
      } catch {
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsPageLinkCopied(true);
      setTimeout(() => setIsPageLinkCopied(false), 2000);
    } catch {
      window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`, "_blank");
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen font-sans bg-[#fff9fb] overflow-hidden">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-10 left-5 md:top-20 md:left-10 text-pink-200 opacity-50"
        >
          <Flower2 size={60} className="md:w-[100px] md:h-[100px]" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-10 right-5 md:bottom-20 md:right-10 text-pink-200 opacity-50"
        >
          <Sparkles size={50} className="md:w-[80px] md:h-[80px]" />
        </motion.div>
        {/* Subtle BTS 7 */}
        <div className="absolute top-5 right-5 md:top-10 md:right-10 text-bora/10 font-serif text-[120px] md:text-[200px] font-bold select-none">7</div>
        
        {/* Tiny BTS Logos scattered */}
        <div className="absolute top-[15%] left-[5%] rotate-12"><BTSLogo /></div>
        <div className="absolute bottom-[20%] left-[10%] -rotate-12"><BTSLogo /></div>
        <div className="absolute top-[40%] right-[8%] rotate-45 scale-75"><BTSLogo /></div>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 text-center md:text-left"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-korean text-bora text-base md:text-lg mb-4 tracking-[0.2em] uppercase"
            >
              보라해 💜 고마워
            </motion.div>
            
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-[#d81b60] mb-6 leading-tight flex flex-col md:flex-row md:flex-wrap justify-center md:justify-start items-center md:items-start gap-x-4">
              <span className="whitespace-nowrap">
                {"Thank You,".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: i * 0.05 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="whitespace-nowrap">
                {"Sharina".split("").map((char, i) => (
                  <motion.span
                    key={i + 11}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: (i + 11) * 0.05 }}
                    className="italic font-light"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-lg md:text-xl text-pink-400/80 font-light italic mb-8 max-w-md mx-auto md:mx-0"
            >
              To the person who helped me survive all those labs and assignments. 
              You're a great friend and I really appreciate all the help!
            </motion.p>
            <div className="flex justify-center md:justify-start gap-4 items-center">
              <Heart className="text-bora fill-bora animate-pulse" />
              <Star className="text-pink-300 fill-pink-300" />
              <Moon className="text-pink-200 fill-pink-100" />
              <div className="w-px h-4 bg-bora/20 mx-2" />
              <span className="text-[10px] text-bora/40 tracking-[0.3em] font-medium uppercase">Magic Shop</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-[40px] md:rounded-[60px] overflow-hidden border-4 md:border-8 border-white shadow-2xl relative z-10 rotate-3">
              <img 
                src="media/img/Gemini_Generated_Image_yp2pf4yp2pf4yp2p.png" 
                alt="Korean Hanbok Aesthetic" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -inset-4 bg-bora/20 rounded-[40px] md:rounded-[60px] blur-2xl opacity-50 -z-0 rotate-6" />
          </motion.div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-20 md:mb-32">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="k-glass p-6 md:p-8 rounded-[30px] md:rounded-[40px] text-center group transition-all duration-500"
            >
              <div className="text-3xl md:text-4xl mb-3 md:mb-4 group-hover:scale-125 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-[#d81b60] font-medium tracking-wide">
                {item.name}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Coupons Section */}
        <section className="mb-20 md:mb-32">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-[#d81b60] mb-8 md:mb-12 italic">Special Rewards for You</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
            {coupons.map((coupon, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 1 : -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCoupon(coupon)}
                className="coupon-card p-4 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden shadow-sm border-2 border-dashed border-pink-200 cursor-pointer group"
              >
                <div className="hidden md:block absolute -top-4 -right-4 w-12 h-12 bg-pink-50 rounded-full group-hover:bg-bora/10 transition-colors" />
                <div className="hidden md:block absolute -bottom-4 -left-4 w-12 h-12 bg-pink-50 rounded-full group-hover:bg-bora/10 transition-colors" />
                <div className="text-bora mb-2 md:mb-4 scale-75 md:scale-100 origin-left">{coupon.icon}</div>
                <h4 className="font-serif text-sm md:text-xl font-bold text-[#d81b60] mb-1 md:mb-2 line-clamp-1">{coupon.title}</h4>
                <p className="text-[10px] md:text-sm text-gray-500 italic line-clamp-2 md:line-clamp-none">{coupon.desc}</p>
                <div className="mt-3 md:mt-6 pt-2 md:pt-4 border-t border-pink-100 flex justify-between items-center">
                  <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-pink-300 group-hover:text-bora transition-colors">View</span>
                  <Ticket className="w-3 h-3 md:w-4 md:h-4 text-pink-200 group-hover:text-bora transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Coupon Modal */}
        <AnimatePresence>
          {selectedCoupon && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCoupon(null)}
                className="absolute inset-0 bg-bora/20 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-sm k-glass p-8 rounded-[40px] shadow-2xl overflow-hidden"
              >
                <button 
                  onClick={() => setSelectedCoupon(null)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-bora transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-bora/10 rounded-full flex items-center justify-center text-bora mb-6">
                    {selectedCoupon.icon}
                  </div>
                  
                  <h3 className="font-serif text-3xl text-[#d81b60] mb-4">{selectedCoupon.title}</h3>
                  <p className="text-gray-600 italic mb-8 leading-relaxed">
                    {selectedCoupon.desc}
                  </p>

                    <div className="w-full space-y-3">
                      <button
                        onClick={handleRedeem}
                        disabled={isRedeemed}
                        className={`w-full py-4 rounded-2xl font-bold tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-2 ${
                          isRedeemed 
                          ? "bg-green-500 text-white" 
                          : "bg-bora text-white hover:bg-bora/80 shadow-lg shadow-bora/20"
                        }`}
                      >
                        {isRedeemed ? (
                          <>
                            <CheckCircle2 size={20} />
                            Redeemed!
                          </>
                        ) : (
                          <>
                            <Ticket size={20} />
                            Redeem Now
                          </>
                        )}
                      </button>

                      <div className="flex gap-3">
                        <button
                          onClick={handleCopy}
                          className="flex-1 py-3 rounded-xl border border-bora/20 text-bora text-xs font-bold uppercase tracking-widest hover:bg-bora/5 transition-all flex items-center justify-center gap-2"
                        >
                          <Copy size={16} />
                          {isCopied ? "Copied!" : "Copy"}
                        </button>
                        <button
                          onClick={handleWhatsAppShare}
                          className="flex-1 py-3 rounded-xl border border-green-500/20 text-green-600 text-xs font-bold uppercase tracking-widest hover:bg-green-50 transition-all flex items-center justify-center gap-2"
                        >
                          <Share2 size={16} />
                          WhatsApp
                        </button>
                      </div>
                      
                      <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] pt-2">
                        Valid for one-time use with Sharina
                      </p>
                    </div>
                </div>

                {/* Decorative elements in modal */}
                <div className="absolute -bottom-10 -right-10 text-bora/5 font-serif text-[120px] font-bold select-none -z-10">7</div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Closing Message */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto px-6"
        >
          <div className="w-16 h-px bg-pink-200 mx-auto mb-12" />
          
          <div className="flex flex-col items-center mb-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-korean text-xl md:text-2xl text-bora leading-relaxed space-y-3"
            >
              <p>항상 도와줘서 정말 고마워.</p>
              <p>너 없었으면 공대 생활 정말 힘들었을 거야.</p>
              <p>최고의 친구가 되어줘서 고마워! 💜</p>
            </motion.div>

            <button 
              onClick={() => setShowTranslation(!showTranslation)}
              className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-bora/60 hover:text-bora transition-colors bg-white/50 px-5 py-2.5 rounded-full border border-bora/10 shadow-sm"
            >
              <Languages size={12} />
              {showTranslation ? "Show Original" : "Translate to English"}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {showTranslation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="py-4">
                  <p className="font-serif text-lg italic text-gray-400 leading-relaxed">
                    "Thank you so much for always helping me.<br />
                    Engineering life would have been really tough without you.<br />
                    Thank you for being the best friend! 💜"
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="font-serif text-sm md:text-base italic text-gray-500 mt-12">
            Engineering was much better with your help, Sharina!
          </p>
        </motion.div>
      </main>

      {/* Decorative Bottom */}
      <footer className="py-16 px-6 text-center flex flex-col items-center gap-6">
        <div className="flex items-center gap-6 opacity-20 grayscale hover:grayscale-0 transition-all duration-500">
          <BTSLogo />
          <div className="text-[10px] text-bora tracking-[0.5em] font-bold">ARMY</div>
          <BTSLogo />
        </div>
        <div className="text-bora/60 text-[10px] md:text-xs tracking-[0.3em] uppercase max-w-xs md:max-w-none leading-loose font-medium">
          Sharina &times; Army &times; Engineering Survival
        </div>
      </footer>

      {/* Floating Music Player */}
      <div className="fixed bottom-6 left-6 z-[100] flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="w-14 h-14 bg-bora text-white rounded-full shadow-lg flex items-center justify-center relative group"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          
          {/* Tooltip */}
          <div className="absolute left-full ml-3 px-3 py-1 bg-white text-bora text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isPlaying ? "Pause Music" : "Play Music"}
          </div>
        </motion.button>
      </div>

      {/* Floating Share Button */}
      <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePageShare}
          className="w-14 h-14 bg-white text-bora rounded-full shadow-lg border border-bora/10 flex items-center justify-center relative group"
          aria-label="Share this website"
        >
          <Share2 size={24} />

          <div className="absolute right-full mr-3 px-3 py-1 bg-bora text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isPageShared ? "Shared" : isPageLinkCopied ? "Link Copied" : "Share Link"}
          </div>
        </motion.button>
      </div>
    </div>
  );
}
