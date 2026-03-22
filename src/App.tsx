/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
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
  Pause,
  ArrowDown,
  ImageUp
} from "lucide-react";
import heroImage from "../media/img/Gemini_Generated_Image_yp2pf4yp2pf4yp2p.png";
import audioTrack from "../media/mp3/YTDown.com_YouTube_Media_DbXMjAYSa68_009_128k.mp3";

const items = [
  { name: "PDF", icon: "📄", detail: "Reference files" },
  { name: "Notes", icon: "📝", detail: "Quick summaries" },
  { name: "Assignments", icon: "📚", detail: "Course tasks" },
  { name: "Lab Records", icon: "🧪", detail: "Experiment logs" },
  { name: "Observations", icon: "🔍", detail: "Key findings" },
  { name: "Records", icon: "📁", detail: "Organized docs" }
];

const coupons = [
  { title: "Coffee Coupon", icon: <Coffee />, desc: "Redeem for one coffee during a study break." },
  { title: "Ice Cream Coupon", icon: <IceCream />, desc: "Redeem for one ice cream treat." },
  { title: "The 'I Owe You' Help", icon: <Sparkles />, desc: "A favor or help request that I absolutely cannot deny!" }
];

const memoryQuotes = [
  "Thanks for helping with labs",
  "Your notes saved me",
  "Couldn't have managed records without you",
];

const gratitudeMoments = [
  {
    title: "Lab Days",
    note: "When experiments got messy, your guidance made everything manageable.",
  },
  {
    title: "Assignment Rush",
    note: "During deadline chaos, your notes and support really helped me stay on track.",
  },
  {
    title: "Final Stretch",
    note: "Near the end, your consistency and help made the semester much lighter.",
  },
];

const chapterNav = [
  { key: "intro", label: "Intro" },
  { key: "thanks", label: "Thanks" },
  { key: "journey", label: "Journey" },
  { key: "note", label: "Note" },
  { key: "highlights", label: "Highlights" },
  { key: "rewards", label: "Rewards" },
  { key: "final", label: "Final" },
];

const BTSLogo = () => (
  <div className="bts-logo">
    <div className="bts-logo-part" />
    <div className="bts-logo-part right" />
  </div>
);

export default function App() {
  const createdStamp = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());
  const mainContentRef = useRef<HTMLElement | null>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<typeof coupons[0] | null>(null);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isPageLinkCopied, setIsPageLinkCopied] = useState(false);
  const [isPageShared, setIsPageShared] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationPlayed, setCelebrationPlayed] = useState(false);
  const [isPostcardBusy, setIsPostcardBusy] = useState(false);
  const [postcardMessage, setPostcardMessage] = useState<string>("");
  const [activeChapter, setActiveChapter] = useState(chapterNav[0].key);
  const [audioElement] = useState(() => new Audio(audioTrack));

  const triggerHaptic = (pattern: number | number[]) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  };

  useEffect(() => {
    const handleEnded = () => setIsPlaying(false);
    audioElement.preload = "auto";
    audioElement.addEventListener("ended", handleEnded);

    return () => {
      audioElement.pause();
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (celebrationPlayed) return;
      const scrollTop = window.scrollY;
      const doc = document.documentElement;
      const maxScrollable = doc.scrollHeight - window.innerHeight;
      if (maxScrollable <= 0) return;

      const progress = scrollTop / maxScrollable;
      if (progress >= 0.95) {
        setCelebrationPlayed(true);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 1800);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [celebrationPlayed]);

  useEffect(() => {
    const handleChapterTracking = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
      if (sections.length === 0) return;

      const viewportAnchor = window.innerHeight * 0.35;
      let current = sections[0];
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - viewportAnchor);
        if (distance < bestDistance) {
          bestDistance = distance;
          current = section;
        }
      }

      const chapterKey = current.dataset.chapter;
      if (chapterKey) setActiveChapter(chapterKey);
    };

    handleChapterTracking();
    window.addEventListener("scroll", handleChapterTracking, { passive: true });
    window.addEventListener("resize", handleChapterTracking);
    return () => {
      window.removeEventListener("scroll", handleChapterTracking);
      window.removeEventListener("resize", handleChapterTracking);
    };
  }, []);

  const scrollToMainContent = () => {
    mainContentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToChapter = (chapterKey: string) => {
    const target = document.querySelector<HTMLElement>(`[data-chapter='${chapterKey}']`);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const createPostcardBlob = async (): Promise<Blob | null> => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const drawRoundedRect = (
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number,
    ) => {
      const r = Math.min(radius, width / 2, height / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + width - r, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + r);
      ctx.lineTo(x + width, y + height - r);
      ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
      ctx.lineTo(x + r, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
      const words = text.split(" ");
      let line = "";
      let currentY = y;

      for (const word of words) {
        const testLine = line ? `${line} ${word}` : word;
        if (ctx.measureText(testLine).width > maxWidth && line) {
          ctx.fillText(line, x, currentY);
          line = word;
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }

      if (line) ctx.fillText(line, x, currentY);
      return currentY;
    };

    const bg = ctx.createLinearGradient(0, 0, 1080, 1920);
    bg.addColorStop(0, "#fff9fc");
    bg.addColorStop(0.5, "#ffeef5");
    bg.addColorStop(1, "#f8ecff");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1080, 1920);

    const glow = ctx.createRadialGradient(540, 760, 200, 540, 760, 940);
    glow.addColorStop(0, "rgba(125, 95, 255, 0.18)");
    glow.addColorStop(1, "rgba(125, 95, 255, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 1080, 1920);

    ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      const x = 50 + i * 58;
      const y = 120 + ((i * 111) % 1600);
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    drawRoundedRect(90, 120, 900, 1680, 56);
    ctx.fillStyle = "rgba(255,255,255,0.80)";
    ctx.fill();

    ctx.fillStyle = "#7D5FFF";
    ctx.font = "700 22px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("A SMALL THANK-YOU PAGE", 540, 210);

    ctx.fillStyle = "#d81b60";
    ctx.font = "italic 700 110px 'Cormorant Garamond', serif";
    ctx.fillText("Thank You,", 540, 340);
    ctx.font = "italic 700 106px 'Cormorant Garamond', serif";
    ctx.fillText("Sharina", 540, 432);

    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = heroImage;
    }).catch(() => null);

    if (image) {
      drawRoundedRect(160, 500, 760, 760, 48);
      ctx.save();
      ctx.clip();
      ctx.drawImage(image, 160, 500, 760, 760);
      ctx.restore();
    }

    ctx.fillStyle = "#6b7280";
    ctx.font = "500 38px 'Inter', sans-serif";
    ctx.textAlign = "center";
    const textY = wrapText(
      "Engineering life would have been much harder without your help. Thank you for all your support.",
      540,
      1370,
      760,
      54,
    );

    ctx.fillStyle = "#7D5FFF";
    ctx.font = "700 24px 'Inter', sans-serif";
    ctx.fillText(`Made with gratitude in 2026 • ${createdStamp}`, 540, textY + 96);

    ctx.textAlign = "right";
    ctx.fillStyle = "#5b4699";
    ctx.font = "700 34px 'Inter', sans-serif";
    ctx.fillText("samxiao", 930, 1730);

    return await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.95));
  };

  const handlePostcardShare = async () => {
    if (isPostcardBusy) return;
    setIsPostcardBusy(true);
    setPostcardMessage("");

    try {
      const blob = await createPostcardBlob();
      if (!blob) {
        setPostcardMessage("Could not generate image");
        return;
      }

      const file = new File([blob], "thank-you-postcard.png", { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "Thank You, Sharina",
          text: "Postcard from this thank-you page",
          files: [file],
        });
        setPostcardMessage("Ready for status/story");
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "thank-you-postcard.png";
        link.click();
        URL.revokeObjectURL(url);
        setPostcardMessage("Image downloaded");
      }
    } catch {
      setPostcardMessage("Share canceled");
    } finally {
      setIsPostcardBusy(false);
      setTimeout(() => setPostcardMessage(""), 2600);
    }
  };

  const handleRedeem = () => {
    triggerHaptic([20, 30, 20]);
    setIsRedeemed(true);
    setTimeout(() => {
      setIsRedeemed(false);
      setSelectedCoupon(null);
    }, 2000);
  };

  const handleToggleFinalNote = () => {
    const nextState = !showTranslation;
    setShowTranslation(nextState);
    if (nextState) {
      triggerHaptic(24);
    }
  };

  const handleReplyBack = () => {
    const text = "Got your page, thank you! 😊";
    const url = `https://wa.me/919951970441?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleCopy = () => {
    if (!selectedCoupon) return;
    const text = `Hi samxiao, I redeemed this coupon: ${selectedCoupon.title}.\n"${selectedCoupon.desc}"\n- Sharina 💜`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    if (!selectedCoupon) return;
    const text = `Hi samxiao, I redeemed this coupon: ${selectedCoupon.title}.\n"${selectedCoupon.desc}"\n- Sharina 💜`;
    const url = `https://wa.me/919951970441?text=${encodeURIComponent(text)}`;
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

  const togglePlay = async () => {
    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioElement.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="min-h-screen font-sans bg-[#fff9fb]">
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

      <section data-chapter="intro" className="relative z-10 min-h-screen px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-md"
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-bora/70 font-medium">
            A small thank-you page
          </p>
          <p className="mt-3 text-[11px] md:text-xs text-gray-500 tracking-wide">
            Scroll down to reveal the note section by section.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-bora/20 bg-white/85 px-4 py-2 text-[10px] md:text-xs tracking-[0.14em] uppercase text-bora/80 shadow-sm">
            <span>Made with gratitude in 2026</span>
            <span className="text-bora/40">•</span>
            <span>{createdStamp}</span>
          </div>

          <button
            onClick={scrollToMainContent}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-bora text-white px-6 py-3 text-xs uppercase tracking-[0.22em] font-semibold shadow-lg shadow-bora/20 hover:bg-bora/90 transition-colors"
          >
            <ArrowDown size={14} />
            Start
          </button>
        </motion.div>
      </section>

      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-[95] flex-col gap-2 bg-white/70 backdrop-blur-sm border border-bora/10 rounded-2xl px-3 py-3 shadow-md">
        {chapterNav.map((chapter) => {
          const isActive = activeChapter === chapter.key;
          return (
            <button
              key={chapter.key}
              onClick={() => scrollToChapter(chapter.key)}
              className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] transition-colors ${isActive ? "text-bora" : "text-bora/45 hover:text-bora/80"}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-bora" : "bg-bora/30"}`} />
              <span>{chapter.label}</span>
            </button>
          );
        })}
      </div>

      <main ref={mainContentRef} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 md:py-28">

        {/* Header Section */}
        <motion.section
          data-chapter="thanks"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-16 md:mb-24"
        >
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
                src={heroImage}
                alt="Korean Hanbok Aesthetic" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -inset-4 bg-bora/20 rounded-[40px] md:rounded-[60px] blur-2xl opacity-50 -z-0 rotate-6" />
          </motion.div>
        </motion.section>

        <motion.section
          data-chapter="journey"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-24 md:mb-36 min-h-[72vh] flex flex-col justify-center"
        >
          <div className="text-center mb-8 md:mb-12">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-bora/60 font-medium">Journey</p>
            <h3 className="mt-2 font-serif text-3xl md:text-5xl text-[#d81b60] italic">A small timeline of gratitude</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {gratitudeMoments.map((moment, idx) => (
              <motion.article
                key={moment.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-[28px] border border-white/70 bg-white/85 px-5 py-6 md:p-7 shadow-[0_10px_24px_rgba(125,95,255,0.10)]"
              >
                <p className="text-[10px] uppercase tracking-[0.24em] text-bora/45 font-semibold">Step {idx + 1}</p>
                <h4 className="mt-3 font-serif text-2xl text-[#d81b60]">{moment.title}</h4>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{moment.note}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          data-chapter="note"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="mb-24 md:mb-36 min-h-[68vh] flex items-center"
        >
          <div className="w-full rounded-[32px] border border-bora/10 bg-gradient-to-br from-white/90 to-[#fff3f8] p-7 md:p-12 shadow-[0_14px_30px_rgba(216,27,96,0.10)]">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-bora/60 font-medium">Long Note</p>
            <h3 className="mt-3 font-serif text-3xl md:text-5xl text-[#d81b60] italic">One more thing I wanted to say</h3>
            <div className="mt-6 space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
              <p>
                This page is simple, but the gratitude behind it is real. Throughout labs, assignments, and regular class pressure,
                your help made the difficult parts feel less overwhelming.
              </p>
              <p>
                Thank you for being generous with your time, sharing notes, and helping when things got confusing. Small support like that
                really matters more than people realize.
              </p>
              <p className="font-serif text-lg italic text-[#d81b60]/80">
                I genuinely appreciate it. Thank you again, Sharina.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          data-chapter="final"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mb-24 md:mb-36"
        >
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-bora/60 font-medium">Memory Notes</p>
            <h3 className="mt-2 font-serif text-2xl md:text-3xl text-[#d81b60] italic">Little lines that stayed with me</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
            {memoryQuotes.map((quote, idx) => (
              <motion.div
                key={quote}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-2xl border border-pink-100/80 bg-white/85 px-5 py-4 text-center shadow-sm"
              >
                <p className="text-[13px] md:text-sm text-gray-600 leading-relaxed italic">"{quote}"</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Items Grid */}
        <motion.section
          data-chapter="highlights"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mb-20 md:mb-32"
        >
          <div className="text-center mb-7 md:mb-10">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-bora/60 font-medium">Support Highlights</p>
            <h2 className="mt-2 font-serif text-2xl md:text-4xl text-[#d81b60] italic">All the ways you helped</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative overflow-hidden rounded-[28px] md:rounded-[34px] border border-white/70 bg-gradient-to-br from-white/90 to-[#fff1f6] p-5 md:p-7 text-center group transition-all duration-500 shadow-[0_12px_24px_rgba(216,27,96,0.10)]"
              >
                <div className="absolute top-3 right-4 text-[10px] tracking-[0.2em] uppercase text-bora/35 font-semibold">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                <div className="mx-auto mb-3 md:mb-4 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/90 border border-pink-100 flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-500 shadow-sm">
                  {item.icon}
                </div>

                <h3 className="font-serif text-xl md:text-2xl text-[#d81b60] font-medium tracking-wide leading-tight">
                  {item.name}
                </h3>

                <p className="mt-1.5 text-[10px] md:text-xs uppercase tracking-[0.16em] text-gray-400 font-medium">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Coupons Section */}
        <motion.section
          data-chapter="rewards"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20 md:mb-32"
        >
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
        </motion.section>

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
                        Valid for one-time use with SAMXIAO
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
              onClick={handleToggleFinalNote}
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
        <div className="text-[11px] tracking-[0.2em] uppercase text-bora/70 font-semibold">
          samxiao
        </div>

        <button
          onClick={handlePostcardShare}
          disabled={isPostcardBusy}
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-white border border-bora/20 px-5 py-3 text-[10px] md:text-xs uppercase tracking-[0.2em] text-bora font-semibold shadow-sm hover:bg-bora/5 transition-colors disabled:opacity-70"
        >
          <ImageUp size={14} />
          {isPostcardBusy ? "Preparing postcard" : "Share as Postcard"}
        </button>

        {postcardMessage ? (
          <p className="text-[10px] uppercase tracking-[0.2em] text-bora/70">{postcardMessage}</p>
        ) : null}

        <button
          onClick={handleReplyBack}
          className="text-[11px] md:text-xs text-bora/70 hover:text-bora underline underline-offset-4 transition-colors"
        >
          Reply
        </button>
      </footer>

      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] pointer-events-none"
          >
            {Array.from({ length: 18 }).map((_, idx) => (
              <motion.div
                key={idx}
                initial={{
                  opacity: 0,
                  scale: 0.4,
                  x: `${(idx % 6) * 18 - 35}vw`,
                  y: "40vh",
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.4, 1, 0.8],
                  y: ["40vh", `${8 + (idx % 8) * 8}vh`],
                }}
                transition={{ duration: 1.4, ease: "easeOut", delay: idx * 0.02 }}
                className="absolute left-1/2 text-bora/70"
              >
                <Sparkles size={idx % 2 === 0 ? 18 : 14} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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
