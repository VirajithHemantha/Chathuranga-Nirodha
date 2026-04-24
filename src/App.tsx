import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Sparkles, MapPin, ChevronDown, Volume2, VolumeX, X, Hotel, MailOpen, Heart, Stars } from "lucide-react";
import { useInView } from 'react-intersection-observer';
import EnvelopeOpener from "./components/EnvelopeOpener";

/**
 * Premium Sri Lankan Homecoming Invitation Theme
 * Names: Kaveen & Samithri
 * Background: Cream/Red
 * Accents: Red/Gold
 */

const brideGroomImage = "/images/ChatGPT Image Apr 24, 2026, 10_27_41 PM.png";
const secondaryImage = "/images/ChatGPT Image Apr 24, 2026, 10_27_41 PM.png";
const backgroundMusic = "/ama_anjana_flute.mp3";
const googleScriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL?.trim() || "";

/** iOS / Android block unmuted autoplay; iPadOS may report as MacIntel. */
function isLikelyMobileOrTablet() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod|Android/i.test(ua)) return true;
  if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) return true;
  return false;
}

function FloatingPetals() {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<
    Array<{
      id: number;
      x: number;
      size: number;
      rotation: number;
      duration: number;
      delay: number;
      color: string;
      drift: number;
    }>
  >([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setPetals([]);
      return;
    }

    const colors = ["#ff0080", "#dc2626", "#ef4444", "#fecaca", "#991b1b", "#ffffff"];
    const petalCount = isMobile ? 15 : 25;
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 6,
      rotation: Math.random() * 360,
      duration: Math.random() * 12 + 14,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 30 - 15,
    }));

    setPetals(newPetals);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""
        }`}
    >
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute drop-shadow-[0_2px_6px_rgba(227,207,172,0.4)]"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + petal.drift}vw`,
            rotate: petal.rotation + (isLowPowerMode ? 360 : 720),
            opacity: [0, 0.9, 0.8, 0],
          }}
          transition={{
            duration: isLowPowerMode ? petal.duration * 1.2 : petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-sm"
          >
            <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function CountdownTimer() {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const targetDate = useMemo(() => new Date("May 15, 2026 17:00:00").getTime(), []);

  const getTimeLeft = (): { days: number; hours: number; minutes: number; seconds: number } => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const countdownItems = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  const floatingHearts = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 8 + Math.random() * 14,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 8,
  })), []);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 bg-gradient-to-br from-[#5a0000] via-[#991b1b] to-[#5a0000] flex flex-col items-center overflow-hidden z-20"
    >
      {/* Texture & Glow Layer */}
      <div className="absolute inset-0 opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)] pointer-events-none z-0" />

      {/* Floating Ornaments */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-[#d4af37]/20"
            style={{ left: heart.left, top: heart.top }}
            animate={{
              y: [0, -90, 0],
              x: [0, Math.random() * 30 - 15, 0],
              rotate: [0, Math.random() * 360, 0],
              opacity: [0, 0.45, 0],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-6xl px-6 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, type: "spring", stiffness: 100 }}
          className="mx-auto mb-16 max-w-4xl text-center md:mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/45 bg-black/30 px-5 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-[#d4af37]" />
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#f7e7ce] sm:text-sm">
              The Big Day Approaches
            </span>
            <Sparkles className="h-4 w-4 text-[#d4af37]" />
          </motion.div>

          <h2 className="font-alex text-6xl md:text-[8rem] leading-tight text-white drop-shadow-xl">
            Counting Down to <span className="relative inline-block text-shimmer">
              Forever
              <motion.svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full"
                viewBox="0 0 100 20" preserveAspectRatio="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              >
                <motion.path
                  d="M0 10 Q 25 20, 50 10 T 100 10"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </h2>

          <p className="mx-auto mt-10 max-w-2xl text-[#f7e7ce]/80 font-montserrat tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold">
            Every second brings us closer to our blessed wedding day. We cannot wait to celebrate this grace-filled moment with you.
          </p>
        </motion.div>

        <div className="w-full rounded-[2.5rem] border border-[#d4af37]/30 bg-black/20 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-6 md:p-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            {countdownItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + index * 0.1,
                  type: "spring",
                  bounce: 0.35
                }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_15px_35px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:border-[#d4af37]/40 group-hover:bg-white/10 md:p-8">
                  <div className="absolute inset-0 opacity-[0.1]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full border border-[#d4af37]/20" />
                  <div className="absolute -left-6 -bottom-6 h-16 w-16 rounded-full border border-[#d4af37]/10" />

                  <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    <div className="relative flex h-[64px] w-full items-center justify-center overflow-hidden sm:h-[78px] md:h-[96px]">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={item.value}
                          initial={{ y: 40, opacity: 0, scale: 0.65 }}
                          animate={{ y: 0, opacity: 1, scale: 1 }}
                          exit={{ y: -40, opacity: 0, scale: 0.65 }}
                          transition={{
                            type: "spring",
                            stiffness: 370,
                            damping: 24,
                            mass: 1
                          }}
                          className="absolute font-serif text-5xl font-semibold text-[#f7e7ce] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] sm:text-6xl md:text-7xl"
                        >
                          {String(item.value).padStart(2, '0')}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    <div className="mt-3 rounded-full border border-[#d4af37]/40 bg-black/40 px-3 py-1.5 shadow-sm md:mt-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d4af37] md:text-xs">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="flex items-center gap-3 text-[#d4af37]">
            <Stars size={14} className="animate-pulse" />
            <Heart size={15} className="animate-bounce" fill="currentColor" />
            <span className="font-serif italic text-lg text-[#f7e7ce]/80 sm:text-2xl">
              Can't wait to see you there!
            </span>
            <Heart size={15} className="animate-bounce" fill="currentColor" style={{ animationDelay: '200ms' }} />
            <Stars size={14} className="animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Preload critical assets */
const criticalAssets = ["/monogram_aa.png"];
function preloadAssets() {
  criticalAssets.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function AccommodationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const honeymoonRates = [
    {
      plan: "Full Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 38,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 36,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 33,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Half Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 35,500.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 33,500.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 30,500.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Bed & Breakfast",
      rooms: [
        { name: "Superior Room", rate: "LKR 32,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 30,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 27,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Room Only",
      rooms: [
        { name: "Superior Room", rate: "LKR 29,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 27,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 24,000.00", view: "Jungle View" },
      ],
    },
  ];

  const doubleRates = [
    {
      plan: "Full Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 35,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 33,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 30,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Half Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 32,500.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 30,500.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 27,500.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Bed & Breakfast",
      rooms: [
        { name: "Superior Room", rate: "LKR 29,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 27,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 24,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Room Only",
      rooms: [
        { name: "Superior Room", rate: "LKR 26,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 24,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 21,000.00", view: "Jungle View" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#fcfcf0]">
          <div>
            <h2 className="font-cinzel text-xl md:text-2xl text-[#991b1b] font-bold">Accommodation Rates</h2>
            <p className="text-[10px] uppercase tracking-widest text-[#991b1b] mt-1">Tranquil Hotel, Weliweriya</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#fcfcf0]/30">
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-[#991b1b]/30" />
                <h3 className="font-playball text-3xl text-[#991b1b]">Honeymoon Room Rates</h3>
                <div className="h-px flex-1 bg-[#991b1b]/30" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {honeymoonRates.map((plan) => (
                  <div key={plan.plan} className="bg-white p-6 rounded-xl border border-[#f87171]/30 shadow-sm">
                    <h4 className="font-cinzel text-sm font-bold text-[#991b1b] mb-4 border-b border-[#f87171]/20 pb-2">{plan.plan}</h4>
                    <div className="space-y-3">
                      {plan.rooms.map((room) => (
                        <div key={room.name} className="flex justify-between items-center gap-4">
                          <div>
                            <p className="text-xs font-bold text-slate-700">{room.name}</p>
                            <p className="text-[10px] text-slate-400">{room.view}</p>
                          </div>
                          <p className="text-xs font-bold text-[#991b1b] whitespace-nowrap">{room.rate}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-[#991b1b]/30" />
                <h3 className="font-playball text-3xl text-[#991b1b]">Double Room Rates</h3>
                <div className="h-px flex-1 bg-[#991b1b]/30" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {doubleRates.map((plan) => (
                  <div key={plan.plan} className="bg-white p-6 rounded-xl border border-[#f87171]/30 shadow-sm">
                    <h4 className="font-cinzel text-sm font-bold text-[#991b1b] mb-4 border-b border-[#f87171]/20 pb-2">{plan.plan}</h4>
                    <div className="space-y-3">
                      {plan.rooms.map((room) => (
                        <div key={room.name} className="flex justify-between items-center gap-4">
                          <div>
                            <p className="text-xs font-bold text-slate-700">{room.name}</p>
                            <p className="text-[10px] text-slate-400">{room.view}</p>
                          </div>
                          <p className="text-xs font-bold text-[#991b1b] whitespace-nowrap">{room.rate}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Check In</p>
                <p className="font-cinzel text-xl text-[#991b1b]">2:00 PM</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Check Out</p>
                <p className="font-cinzel text-xl text-[#991b1b]">12:00 PM</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Availability</p>
                <p className="font-cinzel text-sm text-[#991b1b] leading-tight">Max 16 Rooms Available</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border-t border-slate-50 flex justify-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] italic font-medium">Please contact the resort or couple for bookings</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function WeddingInvitation() {
  const [isOpened, setIsOpened] = useState(false);
  const [isAccommodationOpen, setIsAccommodationOpen] = useState(false);

  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    place: "",
    attending: "yes",
    guests: "1",
  });

  // --- Personalization Logic ---
  const [guestName, setGuestName] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) {
      setGuestName(to.replace(/_/g, " ")); // Replace underscores with spaces for cleaner URLs
    }
  }, []);
  // -----------------------------

  const [wishForm, setWishForm] = useState({
    name: "",
    message: "",
  });

  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [wishStatus, setWishStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const [musicAudible, setMusicAudible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioUnlockedRef = useRef(false);
  const hasStartedMusicRef = useRef(false);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.muted = false;
      audio.volume = 1;
      await audio.play();
      hasStartedMusicRef.current = true;
      audioUnlockedRef.current = true;
      setMusicAudible(true);
      return true;
    } catch (err) {
      console.error("Audio play failed:", err);
      return false;
    }
  }, []);

  const playMutedMusicFallback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.muted = true;
      audio.volume = 1;
      await audio.play();
      setMusicAudible(false);
      return true;
    } catch {
      return false;
    }
  }, []);

  const unlockAudioFromGesture = useCallback(async () => {
    if (audioUnlockedRef.current) return;

    const ok = await playMusic();

    if (!ok) {
      await playMutedMusicFallback();
    }
  }, [playMusic, playMutedMusicFallback]);

  const handleSoundToggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    void unlockAudioFromGesture();

    const wantOn = audio.muted || audio.paused;
    if (wantOn) {
      audio.muted = false;
      void audio.play().then(
        () => setMusicAudible(true),
        () => { },
      );
    } else {
      audio.muted = true;
      setMusicAudible(false);
    }
  }, [unlockAudioFromGesture]);

  useEffect(() => {
    const handler = () => {
      void unlockAudioFromGesture();
    };

    document.addEventListener("pointerdown", handler, { capture: true, passive: true });
    document.addEventListener("touchstart", handler, { capture: true, passive: true });

    return () => {
      document.removeEventListener("pointerdown", handler, true);
      document.removeEventListener("touchstart", handler, true);
    };
  }, [unlockAudioFromGesture]);

  useEffect(() => {
    if (isOpened) {
      preloadAssets();
    }
  }, [isOpened]);

  const submitToGoogleSheet = async (payload: Record<string, string>) => {
    if (!googleScriptUrl) {
      throw new Error("Missing VITE_GOOGLE_SCRIPT_URL");
    }

    try {
      await fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(payload),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      // With no-cors, we can't check response.ok, so we assume success if no promise rejection
    } catch (err) {
      console.error("Submission error:", err);
      throw err;
    }
  };

  const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!rsvpForm.name.trim()) {
      setRsvpStatus("error");
      return;
    }

    setRsvpStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "rsvp",
        name: rsvpForm.name.trim(),
        place: rsvpForm.place.trim(),
        attending: rsvpForm.attending,
        guests: rsvpForm.attending === "yes" ? rsvpForm.guests : "0",
        dietaryNotes: "",
      });
      setRsvpStatus("success");
      setRsvpForm({ name: "", place: "", attending: "yes", guests: "1" });
    } catch {
      setRsvpStatus("error");
    }
  };

  const handleWishSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!wishForm.name.trim() || !wishForm.message.trim()) {
      setWishStatus("error");
      return;
    }

    setWishStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "wish",
        name: wishForm.name.trim(),
        message: wishForm.message.trim(),
      });
      setWishStatus("success");
      setWishForm({ name: "", message: "" });
    } catch {
      setWishStatus("error");
    }
  };

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpened]);

  return (
    <main
      className={`min-h-screen w-full bg-[#fdfaf5] transition-all duration-1000 ${isOpened
        ? "relative"
        : "h-[100dvh] overflow-hidden flex items-center justify-center"
        } relative font-montserrat scroll-smooth`}
    >
      <FloatingPetals />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <EnvelopeOpener onOpen={() => {
            setIsOpened(true);
            void unlockAudioFromGesture();
          }} />
        ) : (
          <motion.div
            key="website-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="website-shell relative z-20 w-full"
            onPointerDownCapture={() => {
              void unlockAudioFromGesture();
            }}
            onTouchStartCapture={() => {
              void unlockAudioFromGesture();
            }}
          >
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsOpened(false)}
              className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-theme-100 text-theme-800 hover:bg-theme-50 transition-colors"
            >
              <div className="flex flex-col items-center">
                <div className="text-[8px] uppercase tracking-widest font-bold">Close</div>
              </div>
            </motion.button>

            <section className="relative z-10 flex min-h-[95dvh] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#5a0000] via-[#991b1b] to-[#5a0000] px-4 py-12 sm:px-8 md:min-h-[100dvh]">
              {/* Decorative background elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none z-0" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)] pointer-events-none z-0" />

                {/* Extra Floating Hearts for 'Cute' feel */}
                <motion.div
                  animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-20 left-[10%] text-pink-400/20"
                >
                  <Heart size={40} fill="currentColor" />
                </motion.div>
                <motion.div
                  animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute bottom-40 right-[15%] text-orange-300/20"
                >
                  <Heart size={30} fill="currentColor" />
                </motion.div>

                {/* SVG Floral Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
              </div>

              <div className="pointer-events-none absolute -left-10 top-20 h-40 w-40 rounded-full border-2 border-[#d4af37]/10 blur-[2px] animate-float-slow" />
              <div className="pointer-events-none absolute -right-10 bottom-20 h-32 w-32 rounded-full border-2 border-[#d4af37]/10 blur-[2px] animate-float-slow" style={{ animationDelay: '1.5s' }} />

              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 w-full max-w-5xl rounded-[2.5rem] glass-morphism px-5 py-10 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.3)] sm:px-12 sm:py-16 md:px-20 md:py-20"
              >
                {/* Side corner ornaments - modified for better mobile fit */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#d4af37]/30 rounded-tl-[2.5rem]" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#d4af37]/30 rounded-br-[2.5rem]" />

                <div className="mb-6 flex items-center justify-center gap-4">
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: isLikelyMobileOrTablet() ? 40 : 80 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-[1.5px] bg-gradient-to-r from-transparent to-[#d4af37]"
                  />
                  <div className="animate-heartbeat">
                    <Heart className="h-5 w-5 text-pink-500 fill-pink-500/20" />
                  </div>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: isLikelyMobileOrTablet() ? 40 : 80 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-[1.5px] bg-gradient-to-l from-transparent to-[#d4af37]"
                  />
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center font-montserrat text-[10px] font-bold uppercase tracking-[0.4em] text-[#3d0000] sm:text-[11px]"
                >
                  Are You Ready?
                </motion.p>

                <h1 className="mt-6 text-center font-alex text-[2.8rem] leading-[1.1] text-[#3d0000] drop-shadow-[0_2px_8px_rgba(0,0,0,0.05)] sm:text-[4.5rem] md:text-[6.5rem] lg:text-[7.5rem]">
                  <span className="block">Kaveen</span>
                  <div className="my-2 flex items-center justify-center gap-4">
                    <div className="h-px w-16 bg-[#3d0000]/20" />
                    <span className="font-serif text-3xl italic text-[#3d0000] sm:text-4xl md:text-5xl">&amp;</span>
                    <div className="h-px w-16 bg-[#3d0000]/20" />
                  </div>
                  <span className="block">Samithri</span>
                </h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="mt-8 mb-10 text-center"
                >
                  <p className="font-cinzel text-xl text-[#3d0000] tracking-[0.2em]">MAY 15 | 2026</p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mx-auto max-w-2xl text-center font-montserrat text-[11px] font-medium uppercase tracking-[0.25em] text-slate-800 leading-relaxed sm:text-xs"
                >
                  With joyous hearts, we invite you to share in our celebration of love and new beginnings
                </motion.p>

                <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
                  {[
                    { label: "Homecoming", value: "May 15th 2026" },
                    { label: "Venue", value: "Tranquil Hotel" },
                    { label: "Time", value: "5.00 P.M. onwards" }
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 + (i * 0.1) }}
                      className="group relative rounded-3xl border border-[#d4af37]/15 bg-white/40 p-4 text-center backdrop-blur-sm transition-all hover:bg-white/70 hover:border-[#d4af37]/30 shadow-sm"
                    >
                      <p className="text-[8px] uppercase tracking-[0.25em] text-[#d4af37] font-bold mb-1">{item.label}</p>
                      <p className="font-cinzel text-xs text-[#5a0000] tracking-wider sm:text-sm">{item.value}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                  className="mt-10 text-center"
                >
                  <div className="inline-flex items-center gap-3 rounded-full border border-pink-200/50 bg-white/40 px-6 py-2 backdrop-blur-md shadow-sm">
                    <Heart className="h-4 w-4 text-pink-500 fill-pink-500 animate-heartbeat" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-pink-600/80">SAVE THE DATE • MAY 15</span>
                    <Heart className="h-4 w-4 text-pink-500 fill-pink-500 animate-heartbeat" />
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 1 }}
                className="absolute bottom-6 z-30 md:bottom-10"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#7e6720]">Scroll</span>
                  <ChevronDown className="h-6 w-6 text-[#b88d1b] drop-shadow-md" />
                </motion.div>
              </motion.div>
            </section>

            <section className="relative py-24 md:py-36 w-full flex flex-col items-center overflow-hidden z-10 border-b-[0.5px] border-[#d4af37]/30 bg-[#fdfaf5]">
              <div className="absolute inset-0 opacity-[0.5] bg-[url('https://www.transparenttextures.com/patterns/white-marble.png')] pointer-events-none" />

              {/* Cute heart accents for 'Cute' feel */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 right-10 text-pink-300 opacity-40"
              >
                <Heart size={30} fill="currentColor" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 left-10 text-pink-300 opacity-40"
              >
                <Heart size={20} fill="currentColor" />
              </motion.div>

              <div className="absolute top-12 left-12 w-8 h-8 border-t-[0.5px] border-l-[0.5px] border-[#d4af37] opacity-60 hidden md:block"></div>
              <div className="absolute top-12 right-12 w-8 h-8 border-t-[0.5px] border-r-[0.5px] border-[#d4af37] opacity-60 hidden md:block"></div>
              <div className="absolute bottom-12 left-12 w-8 h-8 border-b-[0.5px] border-l-[0.5px] border-[#d4af37] opacity-60 hidden md:block"></div>
              <div className="absolute bottom-12 right-12 w-8 h-8 border-b-[0.5px] border-r-[0.5px] border-[#d4af37] opacity-60 hidden md:block"></div>

              <div className="max-w-[1100px] w-full flex flex-col items-center text-center relative z-20 px-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-8 md:mb-16"
                >
                  <p className="tracking-[0.2em] md:tracking-[0.7em] text-[#d4af37] text-[11px] md:text-[16px] uppercase font-montserrat font-bold drop-shadow-sm">
                    MR. &amp; MRS. GUNATHILAKA REQUEST THE HONOUR OF THE PRESENCE OF
                  </p>
                  
                  <div className="pt-6 pb-4 w-full flex justify-center">
                    <span className="text-[#3d0000] font-alex text-4xl md:text-6xl block leading-tight text-center">
                      {guestName || "Our Honored Guest"}
                    </span>
                  </div>

                  <p className="text-slate-500 font-serif text-[13px] md:text-[22px] italic tracking-wide mt-2 mb-2 uppercase">
                    TO CELEBRATE THE HOMECOMING OF THEIR SON
                  </p>
                  <div className="h-[0.5px] w-16 md:w-24 bg-[#d4af37]/50 mt-4" />
                </motion.div>

                <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-32 mt-4 mb-10 md:mb-16">
                  {/* Minimalist Names side */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 md:space-y-10 z-20 w-full"
                  >
                    <div className="w-full flex justify-center md:justify-start overflow-hidden">
                      <h3 className="text-5xl sm:text-6xl md:text-[8rem] lg:text-[9rem] font-alex text-[#3d0000] leading-none drop-shadow-sm px-2 pb-1">
                        Kaveen
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 w-full justify-center md:justify-start px-4 md:pl-6">
                      <div className="h-[0.5px] flex-1 max-w-[30px] md:max-w-[40px] bg-[#d4af37]/40" />
                      <span className="font-serif text-xl md:text-6xl text-slate-800 italic font-light">&</span>
                      <div className="h-[0.5px] flex-1 max-w-[30px] md:max-w-[40px] bg-[#d4af37]/40" />
                    </div>

                    <div className="w-full flex justify-center md:justify-start overflow-hidden">
                      <h3 className="text-5xl sm:text-6xl md:text-[8rem] lg:text-[9rem] font-alex text-[#3d0000] leading-none drop-shadow-sm px-2 pt-1">
                        Samithri
                      </h3>
                    </div>

                    <div className="pt-4 md:pt-8 w-full">
                      <p className="font-montserrat text-[8px] md:text-[11px] tracking-[0.15em] md:tracking-[0.2em] text-slate-500 uppercase font-bold text-center md:text-left leading-relaxed px-2">
                        Loving Son of Mr. Gunathilaka & Mrs. Gunathilaka
                      </p>
                      <p className="font-montserrat text-[8px] md:text-[11px] tracking-[0.15em] md:tracking-[0.2em] text-slate-500 uppercase font-bold text-center md:text-left leading-relaxed px-2">
                        with his bride Samithri DAUGHTER OF MR & MRS RODRIGO
                      </p>
                    </div>
                  </motion.div>

                  {/* Premium Single Image Layout */}
                  <div className="relative w-[280px] md:w-[450px] aspect-[3/4] flex-shrink-0 mb-8 md:mb-0">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5 }}
                      className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white group"
                    >
                      <img
                        src={brideGroomImage}
                        alt="Kaveen & Samithri"
                        loading="lazy"
                        decoding="async"
                        width={450}
                        height={600}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                      {/* Decorative frame inner line */}
                      <div className="absolute inset-4 border border-white/30 pointer-events-none rounded-lg" />
                    </motion.div>

                    {/* Background glow ornament */}
                    <div className="absolute -inset-4 bg-[#d4af37]/10 blur-2xl -z-10 rounded-3xl" />
                  </div>
                </div>
              </div>
            </section>



            <CountdownTimer />

            <section className="relative py-24 md:py-36 bg-white overflow-hidden">
              {/* Decorative background glow */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#d4af37]/10 blur-3xl"
              />

              <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Section Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-20"
                >
                  <h2 className="text-4xl md:text-6xl font-cinzel font-bold text-[#991b1b] mb-4 uppercase tracking-widest">Find Us Here</h2>
                  <div className="w-24 h-[1px] bg-[#d4af37] mx-auto" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  {/* Map Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="relative rounded-[2rem] overflow-hidden border border-[#d4af37]/30 aspect-square md:aspect-video lg:aspect-square shadow-2xl group"
                  >
                    <iframe
                      src="https://maps.google.com/maps?q=Tranquil%20Hotel,%20Weliweriya&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full grayscale-[0.2] contrast-110 opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
                    />

                    {/* Animated Border Overlay */}
                    <motion.div
                      animate={{
                        boxShadow: [
                          'inset 0 0 40px rgba(212, 175, 55, 0.1)',
                          'inset 0 0 80px rgba(212, 175, 55, 0.2)',
                          'inset 0 0 40px rgba(212, 175, 55, 0.1)',
                        ],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="absolute inset-0 rounded-[2rem] pointer-events-none"
                    />
                  </motion.div>

                  {/* Contact Information */}
                  <div className="flex flex-col justify-center space-y-10">
                    {[
                      {
                        icon: MapPin,
                        title: 'Venue',
                        details: ['Tranquil Hotel', 'Weliweriya, Sri Lanka'],
                      },
                      {
                        icon: Stars,
                        title: 'Event Time',
                        details: ['May 15th 2026', '5.00 P.M. onwards'],
                      },
                      {
                        icon: MailOpen,
                        title: 'RSVP Info',
                        details: ['Kaveen-0776688267', 'Samithri-0759490390'],
                      },
                    ].map((info, idx) => {
                      const Icon = info.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: idx * 0.2 }}
                          className="space-y-4 group"
                        >
                          {/* Icon and Title */}
                          <div className="flex items-center gap-6">
                            <motion.div
                              animate={{
                                y: [0, -5, 0],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: idx * 0.5
                              }}
                              className="p-4 bg-[#991b1b]/5 rounded-2xl border border-[#991b1b]/10 group-hover:bg-[#991b1b]/10 transition-colors"
                            >
                              <Icon className="w-6 h-6 text-[#991b1b]" />
                            </motion.div>
                            <h3 className="text-2xl md:text-3xl font-cinzel font-bold text-[#991b1b] tracking-wide">
                              {info.title}
                            </h3>
                          </div>

                          {/* Details */}
                          <div className="ml-20 space-y-2">
                            {info.details.map((detail, detailIdx) => (
                              <p key={detailIdx} className="text-slate-600 font-montserrat font-medium tracking-widest text-sm md:text-base">
                                {detail}
                              </p>
                            ))}
                          </div>

                          {/* Accent Line */}
                          <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.8,
                              delay: 0.3 + idx * 0.2,
                            }}
                            className="h-[1px] w-16 bg-[#d4af37]/40 origin-left ml-20"
                          />
                        </motion.div>
                      );
                    })}

                    {/* Directions Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="pt-6 ml-20"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: '#991b1b', color: '#ffffff' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.open("https://www.google.com/maps/search/?api=1&query=Tranquil+Hotel+Weliweriya", "_blank")}
                        className="inline-flex items-center gap-3 py-4 px-10 border-2 border-[#991b1b] text-[#991b1b] font-bold text-xs uppercase tracking-[0.3em] rounded-full transition-all duration-300"
                      >
                        <MapPin size={16} />
                        Get Directions
                      </motion.button>
                    </motion.div>
                  </div>
                </div>

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mt-20 p-10 bg-[#fdfaf5] border-l-4 border-[#991b1b] rounded-2xl text-center shadow-sm"
                >
                  <p className="text-slate-700 font-montserrat font-medium leading-relaxed max-w-3xl mx-auto">
                    Tranquil Hotel Weliweriya offers a serene and elegant setting for our celebration. 
                    Ample parking is available on-site for all guests.
                  </p>
                </motion.div>
              </div>
            </section>

            <section className="relative py-32 md:py-48 bg-[#f8f6f2] flex flex-col items-center overflow-hidden">
              <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center relative z-10 w-full">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-cinzel text-2xl md:text-4xl text-slate-800 tracking-[0.3em] mb-12 uppercase text-center"
                >
                  FOR OUR BIG DAY
                </motion.h2>

                <div className="relative w-full max-w-[550px] aspect-[4/5] flex items-center justify-center pt-12 md:pt-24 mt-12 md:mt-0">
                  <div className="absolute inset-0 z-0">
                    <img
                      src="/images/11.png"
                      alt="Envelope"
                      className="w-full h-full object-contain object-bottom drop-shadow-[0_40px_80px_rgba(0,0,0,0.3)]"
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 70, scale: 0.7 }}
                    whileInView={{ opacity: 1, y: 0, scale: 0.85 }}
                    transition={{ delay: 0.6, duration: 2.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="absolute -top-32 md:-top-56 left-1/2 -translate-x-1/2 w-[100%] md:w-[120%] h-64 md:h-[320px] pointer-events-none z-0"
                  >
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-sm opacity-90"
                    />
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom scale-x-[-1] -rotate-12 translate-x-12 opacity-80"
                    />
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom rotate-[15deg] -translate-x-12 opacity-70"
                    />
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom scale-75 translate-y-12 opacity-60"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="relative z-10 w-[94%] md:w-[88%] bg-[#fdfaf5]/95 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-[0.5px] border-[#d4af37]/40 flex flex-col items-center pt-4 pb-12 px-6 md:px-10"
                  >
                    {/* Premium inner frame */}
                    <div className="absolute inset-3 md:inset-4 border-[0.5px] border-[#d4af37]/20 pointer-events-none" />

                    <div className="w-full flex flex-col items-center mt-6 relative z-10 px-2 md:px-6">
                      <p className="font-montserrat text-[10px] md:text-[11px] tracking-[0.2em] text-slate-500 uppercase font-medium mb-2 text-center leading-relaxed">
                        RSVP (WhatsApp Only) - Kaveen-0776688267 | Samithri-0759490390
                      </p>

                      <div className="flex items-center justify-center gap-4 w-full mb-8">
                        <div className="h-[0.5px] w-full bg-[#d4af37]/40" />
                        <h3 className="font-alex text-5xl md:text-7xl text-gold-gradient whitespace-nowrap leading-normal py-2 drop-shadow-sm px-2">
                          R.S.V.P
                        </h3>
                        <div className="h-[0.5px] w-full bg-[#d4af37]/40" />
                      </div>

                      <form className="w-full space-y-8 text-left max-w-sm mt-4" onSubmit={handleRsvpSubmit}>
                        <div className="relative group">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] absolute -top-4 left-0 transition-colors group-focus-within:text-[#d4af37]">Name(s)</label>
                          <input
                            type="text"
                            placeholder="M.................................................."
                            value={rsvpForm.name}
                            onChange={(e) => {
                              setRsvpStatus("idle");
                              setRsvpForm((prev) => ({ ...prev, name: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b-[0.5px] border-slate-300 px-0 py-2 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#d4af37] transition-all font-serif text-lg md:text-xl italic"
                            required
                          />
                        </div>

                        <div className="relative group pt-4">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] absolute top-0 left-0 transition-colors group-focus-within:text-[#d4af37]">Area / City</label>
                          <input
                            type="text"
                            placeholder="Where are you coming from?"
                            value={rsvpForm.place}
                            onChange={(e) => {
                              setRsvpStatus("idle");
                              setRsvpForm((prev) => ({ ...prev, place: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b-[0.5px] border-slate-300 px-0 py-2 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#d4af37] transition-all font-serif text-lg md:text-xl italic mt-4"
                            required
                          />
                        </div>

                        <div className="space-y-5 pt-6">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                            Will you attend?
                          </label>

                          <div className="flex flex-col gap-3 font-serif italic text-lg md:text-xl text-slate-700">
                            <label className="flex items-center gap-4 cursor-pointer group">
                              <div className={`w-5 h-5 rounded-none border-[0.5px] flex items-center justify-center transition-colors ${rsvpForm.attending === "yes" ? "border-[#d4af37] bg-[#d4af37]/10" : "border-slate-300 bg-transparent group-hover:border-[#d4af37]/50"}`}>
                                {rsvpForm.attending === "yes" && <div className="w-3 h-3 bg-[#d4af37]" />}
                              </div>
                              <input type="radio" className="hidden" checked={rsvpForm.attending === "yes"} onChange={() => { setRsvpStatus("idle"); setRsvpForm((prev) => ({ ...prev, attending: "yes" })); }} />
                              <span>Delightfully accepts</span>
                            </label>

                            <label className="flex items-center gap-4 cursor-pointer group">
                              <div className={`w-5 h-5 rounded-none border-[0.5px] flex items-center justify-center transition-colors ${rsvpForm.attending === "no" ? "border-[#d4af37] bg-[#d4af37]/10" : "border-slate-300 bg-transparent group-hover:border-[#d4af37]/50"}`}>
                                {rsvpForm.attending === "no" && <div className="w-3 h-3 bg-[#d4af37]" />}
                              </div>
                              <input type="radio" className="hidden" checked={rsvpForm.attending === "no"} onChange={() => { setRsvpStatus("idle"); setRsvpForm((prev) => ({ ...prev, attending: "no" })); }} />
                              <span>Regretfully declines</span>
                            </label>
                          </div>
                        </div>

                        {rsvpForm.attending === "yes" && (
                          <div className="pt-4 animate-in fade-in slide-in-from-top-2 duration-500 relative group">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] absolute -top-4 left-0 transition-colors group-focus-within:text-[#d4af37]">
                              Number of Guests
                            </label>
                            <div className="relative">
                              <select
                                value={rsvpForm.guests}
                                onChange={(e) => {
                                  setRsvpStatus("idle");
                                  setRsvpForm((prev) => ({ ...prev, guests: e.target.value }));
                                }}
                                className="w-full bg-transparent border-b-[0.5px] border-slate-300 px-0 py-2 text-slate-800 focus:outline-none focus:border-[#d4af37] transition-all font-serif text-lg md:text-xl italic appearance-none cursor-pointer"
                              >
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                  <option key={num} value={num.toString()}>
                                    {num} {num === 1 ? "Guest" : "Guests"}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#d4af37]">
                                <ChevronDown size={16} />
                              </div>
                            </div>
                          </div>
                        )}

                        {(rsvpStatus === "success" || rsvpStatus === "error") && (
                          <p
                            className={`text-[10px] text-center font-semibold tracking-widest uppercase mt-4 ${rsvpStatus === "success" ? "text-red-700" : "text-red-500"
                              }`}
                          >
                            {rsvpStatus === "success"
                              ? "Thank you! RSVP sent successfully."
                              : "Something went wrong. Please try again."}
                          </p>
                        )}

                        <div className="pt-8">
                          <button
                            type="submit"
                            disabled={rsvpStatus === "sending"}
                            className="w-full border-[0.5px] border-[#d4af37] bg-transparent text-[#d4af37] hover:bg-[#d4af37] hover:text-white py-4 rounded-sm font-montserrat text-[10px] md:text-[11px] tracking-[0.3em] font-medium transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] uppercase disabled:opacity-50"
                          >
                            {rsvpStatus === "sending" ? "SENDING..." : "CONFIRM ATTENDANCE"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                </div>

              </div>
            </section>

            <div className="relative bg-[#f87171]/10">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <section className="relative py-24 md:py-36 flex flex-col items-center overflow-hidden">
                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#991b1b]/10 mb-8 mt-4 shadow-sm border border-[#991b1b]/20">
                      <Sparkles className="w-8 h-8 text-[#991b1b]" />
                    </div>

                    <h2 className="font-script text-[4.5rem] sm:text-[5rem] md:text-[7rem] text-[#991b1b] mb-6 drop-shadow-sm leading-none">
                      Best Wishes
                    </h2>
                    <div className="h-px w-24 bg-[#f87171] mb-8" />

                    <p className="text-[#991b1b] text-sm md:text-lg leading-relaxed max-w-xl mx-auto mb-16 font-serif tracking-[0.1em] px-4 uppercase font-bold">
                      Your presence at our wedding is the greatest gift of all. However, if you
                      wish to honor us with a message, we would be delighted to read it!
                    </p>

                    <div className="w-full max-w-2xl mx-auto bg-white p-8 md:p-14 shadow-[0_30px_70px_-15px_rgba(127,29,29,0.1)] border border-[#f87171]/50 relative group card-marble">
                      <div className="absolute inset-0 gold-foil-edge opacity-20 pointer-events-none" />
                      <div className="absolute inset-2 border-[0.5px] border-[#991b1b]/20 pointer-events-none transition-colors duration-700" />

                      <form className="space-y-12 text-left relative z-10" onSubmit={handleWishSubmit}>
                        <div className="space-y-4">
                          <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#991b1b]/40">
                            From
                          </label>
                          <input
                            type="text"
                            placeholder="YOUR NAME"
                            value={wishForm.name}
                            onChange={(e) => {
                              setWishStatus("idle");
                              setWishForm((prev) => ({ ...prev, name: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b border-[#f87171]/40 px-0 py-4 text-[#991b1b] placeholder:text-[#f87171]/30 focus:outline-none focus:border-[#991b1b] transition-all font-cinzel text-lg tracking-widest"
                            required
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#991b1b]/40">
                            Message
                          </label>
                          <textarea
                            rows={4}
                            placeholder="WISHES..."
                            value={wishForm.message}
                            onChange={(e) => {
                              setWishStatus("idle");
                              setWishForm((prev) => ({ ...prev, message: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b border-[#f87171]/40 px-0 py-4 text-[#991b1b] placeholder:text-[#f87171]/30 focus:outline-none focus:border-[#991b1b] transition-all font-cinzel text-lg tracking-widest resize-none"
                            required
                          />
                        </div>
                        {(wishStatus === "success" || wishStatus === "error") && (
                          <p
                            className={`text-[10px] text-center font-semibold ${wishStatus === "success" ? "text-red-700" : "text-red-500"
                              }`}
                          >
                            {wishStatus === "success"
                              ? "Wish sent successfully."
                              : "Something went wrong. Please try again."}
                          </p>
                        )}
                        <div className="pt-6 flex justify-center">
                          <button
                            type="submit"
                            disabled={wishStatus === "sending"}
                            className="bg-[#991b1b] text-white px-12 py-5 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-[#7f1d1d] transition-all duration-300 shadow-md disabled:opacity-70"
                          >
                            {wishStatus === "sending" ? "Sending..." : "Send Wishes"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                </div>
              </section>

              <footer className="relative py-24 md:py-32 bg-marble-red w-full flex flex-col items-center overflow-hidden z-20">
                {/* Subtle vignette over the deep green */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-0"></div>

                {/* Elegant border details */}
                <div className="absolute top-0 left-0 w-full h-[0.5px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent"></div>
                <div className="absolute inset-4 md:inset-6 border-[0.5px] border-[#d4af37]/20 pointer-events-none z-10 hidden md:block rounded-sm shadow-[inset_0_0_15px_rgba(212,175,55,0.05)]"></div>

                <div className="w-full max-w-4xl px-6 flex flex-col items-center text-center relative z-20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="flex flex-col items-center"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-[0.5px] w-12 md:w-16 bg-[#d4af37]/40" />
                      <div className="w-1.5 h-1.5 rotate-45 border-[0.5px] border-[#d4af37]/60" />
                      <div className="h-[0.5px] w-12 md:w-16 bg-[#d4af37]/40" />
                    </div>

                    <p className="font-montserrat text-[9px] md:text-[11px] tracking-[0.5em] text-[#f7e7ce]/70 uppercase font-medium mb-4">
                      With heartfelt gratitude
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mt-4">
                      <h2 className="font-alex text-5xl md:text-7xl text-gold-gradient py-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] leading-none">
                        Kaveen
                      </h2>
                      <span className="font-serif text-3xl md:text-5xl text-[#d4af37] italic opacity-80 drop-shadow-md pb-2">&amp;</span>
                      <h2 className="font-alex text-5xl md:text-7xl text-gold-gradient py-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] leading-none">
                        Samithri
                      </h2>
                    </div>
                  </motion.div>

                  <div className="mt-20 pt-8 border-t-[0.5px] border-[#d4af37]/30 w-full max-w-xs md:max-w-md flex flex-col items-center gap-4">
                    <p className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-[#f7e7ce]/50 font-bold leading-relaxed flex flex-col md:flex-row items-center gap-2 md:gap-4">
                      <span>© 2026 Kaveen &amp; Samithri</span>
                      <span className="hidden md:inline text-[#d4af37]/30">|</span>
                      <span>All Rights Reserved</span>
                    </p>
                    <a
                      href="https://wa.me/94776688267"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] tracking-[0.3em] text-[#d4af37]/60 hover:text-[#d4af37] transition-all uppercase font-medium flex items-center gap-2"
                    >
                      <span>Designed by invitemint</span>
                      <span className="w-1 h-1 rounded-full bg-[#d4af37]/40" />
                      <span>Contact us</span>
                    </a>
                  </div>
                </div>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio
        ref={audioRef}
        src={backgroundMusic}
        loop
        preload="metadata"
        playsInline
        className="sr-only"
        aria-hidden
      />

      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        onClick={() => handleSoundToggle()}
        aria-pressed={musicAudible}
        aria-label={musicAudible ? "Mute background music" : "Unmute background music"}
        className="fixed bottom-6 left-6 z-[120] flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#991b1b] bg-white/95 text-[#991b1b] shadow-[0_0_0_4px_rgba(185,28,28,0.2),0_10px_36px_-6px_rgba(127,29,29,0.45)] backdrop-blur-md touch-manipulation transition-[transform,box-shadow] hover:scale-[1.05] hover:shadow-[0_0_0_5px_rgba(185,28,28,0.28),0_14px_44px_-6px_rgba(127,29,29,0.5)] active:scale-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#991b1b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfaf5]"
      >
        {musicAudible ? <Volume2 className="h-6 w-6" strokeWidth={2} /> : <VolumeX className="h-6 w-6" strokeWidth={2} />}
      </motion.button>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f8717133;
        }
        ::-webkit-scrollbar-thumb {
          background: #991b1b66;
          border-radius: 10px;
        }
      `,
        }}
      />
      <AdminPanel />
      <AnimatePresence>
        {isAccommodationOpen && (
          <AccommodationModal
            isOpen={isAccommodationOpen}
            onClose={() => setIsAccommodationOpen(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function AdminPanel() {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [prefix, setPrefix] = useState("Mr. & Mrs.");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState(window.location.origin);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true") {
      setIsVisible(true);
    }
  }, []);

  const generateLink = () => {
    const fullName = prefix === "None" ? name : `${prefix} ${name}`;
    const urlSafeName = fullName.trim().replace(/\s+/g, "_");
    const link = `${baseUrl}?to=${urlSafeName}`;
    setGeneratedLink(link);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-4 z-[200] max-w-sm w-full bg-white/90 backdrop-blur-xl border border-theme-200 rounded-2xl shadow-2xl p-6 font-montserrat animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-cinzel font-bold text-theme-800 text-sm tracking-widest uppercase">
          Invitation Manager
        </h2>
        <button
          onClick={() => setIsVisible(false)}
          className="text-stone-400 hover:text-stone-600 transition-colors"
        >
          <VolumeX className="w-4 h-4 rotate-45" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1 block">
            Base Hosted Link
          </label>
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://your-wedding-site.com"
            className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-theme-400"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1 block">
            Prefix
          </label>
          <select
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-theme-400"
          >
            <option>Mr. & Mrs.</option>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Miss</option>
            <option>Family</option>
            <option>Dear</option>
            <option>None</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1 block">
            Guest Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-theme-400"
          />
        </div>

        <button
          onClick={generateLink}
          className="w-full bg-[#991b1b] text-white py-3 rounded-xl font-bold text-[10px] tracking-widest uppercase hover:bg-[#7f1d1d] transition-all"
        >
          Generate Personalized Link
        </button>

        {generatedLink && (
          <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-100 flex flex-col gap-2">
            <p className="text-[9px] text-stone-500 break-all font-mono">{generatedLink}</p>
            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center gap-2 bg-theme-100 text-theme-800 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-theme-200 transition-all"
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 text-[9px] text-stone-400 leading-relaxed">
        Tip: Add <span className="font-bold">?admin=true</span> to any URL to open this menu again.
      </p>
    </div>
  );
}
