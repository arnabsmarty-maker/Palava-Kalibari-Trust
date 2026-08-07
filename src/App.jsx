import { useEffect, useRef, useState } from 'react'
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Play,
  Crown,
  Sparkles,
  CalendarDays,
  Clock,
  UtensilsCrossed,
  Users,
  Star,
  Check,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Pause,
  Facebook,
  Youtube,
  Instagram,
  Flame,
  Baby,
  Ticket,
  Download,
  Loader2,
  Landmark,
  Heart,
  Gift,
  HandHeart,
  Utensils,
  Image as ImageIcon,
  QrCode,
  Upload,
  ExternalLink,
  Copy,
  Smartphone,
  Medal,
  Award,
  CreditCard,
} from 'lucide-react'
import QRCode from 'qrcode'
import DurgaFace from './DurgaFace.jsx'
import {
  TRUST,
  ILISH_PLATTERS,
  ILISH_EVENT,
  DURGA_EVENT,
  NIRGHANTA,
  MEMBERSHIP_PLANS,
  MEMBER_PERKS,
  ANNADAN,
  FEATURED_CONTRIBUTIONS,
  DONATION_COLUMNS,
  DONATION_ROWS,
  DONATION_NOTE,
} from './data.js'

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'Events', href: '#durga' },
  { label: 'Durga Puja 2026', href: '#durga' },
  { label: 'Annadan', href: '#annadan' },
  { label: 'Donate', href: '#donate' },
  { label: 'Sponsorship', href: '#sponsorship' },
  { label: 'Contact Us', href: '#contact' },
]

const inr = (n) => '₹' + n.toLocaleString('en-IN')

// Real festive footage, served from /public.
const VIDEO_SRC = '/pkt-durga-puja.mp4'
const TIMELAPSE_RATE = 3 // full-player default
const SLOMO_RATE = 0.5 // cinematic hero "display" — half-speed slow motion

// Photo assets served from /public. Drop a file at the given path and it shows
// automatically; until then a labeled placeholder appears in its place.
const IMG = {
  annadan2: '/annadan-2.jpg', // Volunteers serving bhog to children
  annadan3: '/annadan-3.jpg', // Community bhog & Durga pandal
  annadanEating: '/annadan-eating.jpg', // Community Bhog Seba under tent
  annadanPlate: '/annadan-plate.jpg', // Sacred Maha Bhog Prasad Plate
  annadanCrowd: '/annadan-crowd.jpg', // Grand Festive Pandal Audience
  annadanTeam: '/annadan-team.jpg', // Devoted PKT Volunteer Team
  durgaFace: '/durga-face-real.png', // Authentic Durga face emblem
  pktLogo: '/pkt-logo.png', // Official circular PKT logo
  aboutHappiness: '/about-collage-happiness.jpg', // "Ma Durga Brings Happiness For All"
  aboutTrustReg: '/about-trust-reg.jpg', // Durga Utsav 2024 pandal photo
  aboutMenTeam: '/about-men-team.jpg', // PKT male members team
  aboutDancers: '/about-dancers.jpg', // Traditional Bengali stage dancers
  aboutWomenTeam: '/about-women-team.jpg', // PKT female members team
  aboutSaraswatiPuja: '/about-saraswati-puja.jpg', // Saraswati Puja youth awards
  durgaIdolPratima: '/durga-idol-pratima.jpg', // Sacred Maa Durga Pratima Idol photo
  idolSponsorFamily: '/idol-sponsor-family.jpg', // Anjan & Divya Dey & Family photo
  aboutOrganizersDuo: '/about-organizers-duo.jpg', // PKT Organisers photo
  aboutDurgotsav2024Women: '/about-durgotsav-2024-women.jpg', // Durga Utsav 2024 Women Organisers Entry
  sponsorUtkalaBanga: '/sponsor-utkala-banga.png', // Utkala Banga logo
  sponsorNovoInsurance: '/sponsor-novo-insurance.png', // Novo Insurance logo
  sponsorCanaraBank: '/sponsor-canara-bank.png', // Canara Bank logo
  sponsorSencoJewellers: '/sponsor-senco-jewellers.png', // Senco Gold & Diamonds logo
  sponsorTezOil: '/sponsor-tez-oil.png', // Tez Mustard Oil logo
  sponsorCroma: '/sponsor-croma.png', // Croma logo
  sponsorSkylark: '/sponsor-skylark.png', // SkyLark Enterprises logo
  sponsorKangenWater: '/sponsor-kangen-water.png', // Kangen Water Palava logo
  sponsorBharatElectricals: '/sponsor-bharat-electricals.png', // Bharat Electrical Works logo
  patronSouravGhosh: '/patron-sourav-ghosh.jpg', // Sourav Ghosh (Trustee / Entrepreneur) photo
}

// Renders the real photo if it exists in /public, otherwise a graceful,
// on-brand placeholder that names the file to add.
function AutoImage({ src, alt, className = '', icon: Icon = ImageIcon }) {
  const [err, setErr] = useState(false)
  if (err || !src) {
    return (
      <div
        className={`grid place-items-center bg-gradient-to-br from-maroon via-maroon-deep to-black text-center px-4 ${className}`}
      >
        <div>
          <Icon className="w-10 h-10 text-gold/70 mx-auto" />
          <p className="mt-2 text-gold-bright/90 text-sm font-medium">{alt}</p>
          <p className="mt-1 text-ivory-cream/50 text-[11px]">
            Add photo → <code>public{src}</code>
          </p>
        </div>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setErr(true)}
      className={`object-cover ${className}`}
    />
  )
}

// ── Registration & payment integration (all configurable) ────
// Registration is handled by the official Google Form, which stores every
// entry in its linked Google Sheet (the "master Excel"). A Google Apps Script
// on that sheet updates the membership count and emails the admin — see
// integration/AppsScript.gs. The site never fakes a payment confirmation.
const REGISTRATION_FORM_ID =
  '1FAIpQLSeRA9IDj-xhAy-eptdFUZMF7VoehKK9eAbw2BHNo5dhLFiGIQ'
const REGISTRATION_FORM_URL = `https://docs.google.com/forms/d/e/${REGISTRATION_FORM_ID}/viewform`
const REGISTRATION_FORM_EMBED = `${REGISTRATION_FORM_URL}?embedded=true`
const ADMIN_EMAIL = 'palavakalibaritrust@gmail.com'

// UPI: Official ICICI Bank VPA and QR Standee image
const UPI_VPA = 'MSPALAVAKALIBARITRUST.eazypay@icici'
const UPI_PAYEE = 'M/S.PALAVA KALIBARI TRUST'
const UPI_QR_IMAGE = '/upi-qr.png'

// Razorpay: paste your payment link here when ready
const RAZORPAY_PAYMENT_URL = ''

const upiUri = (amount) =>
  `upi://pay?pa=${encodeURIComponent(UPI_VPA)}&pn=${encodeURIComponent(
    UPI_PAYEE
  )}&am=${amount || ''}&cu=INR&tn=${encodeURIComponent('PKT Contribution')}`

// Scannable UPI QR — renders a crisp, vector-sharp QR scanner frame
function UpiQR({ amount = 0, size = 200 }) {
  const [qrDataUrl, setQrDataUrl] = useState('')

  useEffect(() => {
    QRCode.toDataURL(upiUri(amount), {
      width: size * 2.5,
      margin: 1,
      color: { dark: '#000000', light: '#ffffff' },
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(''))
  }, [amount, size])

  return (
    <div className="relative inline-block p-2.5 rounded-2xl bg-white border-2 border-gold/40 shadow-xl text-center">
      {/* Target reticle brackets for a high-tech camera scanner aesthetic */}
      <div className="relative p-2 bg-white rounded-xl overflow-hidden">
        <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-gold-deep" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-gold-deep" />
        <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-gold-deep" />
        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-gold-deep" />

        {qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt="Scan to Pay via UPI - Palava Kalibari Trust"
            className="w-full h-auto object-contain mx-auto rounded"
            style={{ width: `${size}px`, height: `${size}px` }}
          />
        ) : (
          <img
            src="/upi-qr-cropped.png"
            alt="Scan to Pay via UPI - Palava Kalibari Trust"
            className="w-full h-auto object-contain mx-auto rounded"
            style={{ width: `${size}px`, height: `${size}px` }}
          />
        )}
      </div>

      <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-700">
        <QrCode className="w-3.5 h-3.5 text-maroon" />
        <span>Scan &amp; Pay with Any UPI App</span>
      </div>
    </div>
  )
}

// ── Reveal-on-scroll helper ──────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ── Small ornamental heading ─────────────────────────────────
function SectionTitle({ eyebrow, title, subtitle, dark = false }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-14">
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-gold-deep font-semibold tracking-[0.25em] uppercase text-xs">
          <Sparkles className="w-4 h-4" /> {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-4xl md:text-5xl font-bold mt-3 ${
          dark ? 'text-gold-bright' : 'text-maroon'
        }`}
      >
        {title}
      </h2>
      <div className="ornament my-5 text-gold" aria-hidden>
        <Crown className="inline w-5 h-5 text-gold" />
      </div>
      {subtitle && (
        <p className={`text-base md:text-lg ${dark ? 'text-ivory-cream/80' : 'text-charcoal/70'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

const FB_URL = 'https://www.facebook.com/people/Palava-Kali-Bari-Trust/61556667802517/'
const IG_URL = 'https://www.instagram.com/palavakalibari/'

// Official Brand Social Icons
function FacebookIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={`${className} shrink-0 hover:brightness-110 transition-all`} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        d="M14.5 12.25H16l.35-2.25h-1.85V8.75c0-.6.3-.9 1.1-.9h.9V5.6s-1.1-.15-2.05-.15c-2.1 0-3.4 1.25-3.4 3.5v1.05H9v2.25h1.95V18h3.55v-5.75z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

function InstagramIcon({ className = "w-6 h-6" }) {
  return (
    <div className={`relative rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-sm shrink-0 hover:brightness-110 transition-all ${className}`}>
      <svg className="w-[62%] h-[62%] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
// HEADER
// ══════════════════════════════════════════════════════════════
function Header({ onJoin, onSponsor, onOpenYearEvents }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setEventsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-maroon-deep/95 backdrop-blur shadow-lg shadow-maroon-deep/30 py-2'
          : 'bg-maroon-deep/80 backdrop-blur-sm py-2.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo & Brand Title */}
        <a href="#home" className="flex items-center gap-2 group shrink-0">
          <img
            src={IMG.pktLogo}
            alt="Palava Kalibari Trust Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain group-hover:scale-105 transition-transform duration-300"
            style={{ mixBlendMode: 'screen' }}
          />
          <span className="leading-tight">
            <span className="block font-display text-gold-bright font-bold text-sm sm:text-base lg:text-lg tracking-wide whitespace-nowrap">
              Palava Kalibari Trust
            </span>
            <span className="block text-[9px] sm:text-[10px] text-ivory-cream/70 tracking-[0.2em] uppercase whitespace-nowrap">
              Spiritual &amp; Cultural Hub
            </span>
          </span>
        </a>

        {/* Desktop Navigation Links with Glowing Events Dropdown */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV.map((n) => {
            if (n.label === 'Events') {
              return (
                <div key="events-dropdown" ref={dropdownRef} className="relative group">
                  <button
                    onClick={() => setEventsDropdownOpen((prev) => !prev)}
                    className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs xl:text-sm font-extrabold text-gold-bright bg-gradient-to-r from-amber-500/20 via-gold/20 to-amber-600/20 border border-gold/50 rounded-full hover:bg-gold hover:text-maroon-deep transition-all shadow-[0_0_15px_rgba(255,215,0,0.6)] animate-pulse whitespace-nowrap"
                  >
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>Events ▾</span>
                  </button>

                  {/* Glowing Dropdown Menu */}
                  {eventsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 p-1.5 rounded-2xl bg-[#1c000a] border-2 border-gold/60 shadow-[0_0_25px_rgba(255,215,0,0.5)] backdrop-blur-md z-50 animate-fade-up">
                      <div className="text-[10px] uppercase font-bold tracking-widest text-gold/70 px-3 py-1.5 border-b border-gold/20 flex items-center justify-between">
                        <span>Select Event Year</span>
                        <Sparkles className="w-3 h-3 text-gold" />
                      </div>
                      
                      <button
                        onClick={() => {
                          setEventsDropdownOpen(false)
                          if (onOpenYearEvents) onOpenYearEvents('2023-2024')
                        }}
                        className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold text-ivory-warm hover:bg-gold hover:text-maroon-deep transition-all flex items-center justify-between group/item my-0.5"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-200" />
                          2023–2024 Events (Foundational)
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover/item:translate-x-1 transition-transform" />
                      </button>

                      <button
                        onClick={() => {
                          setEventsDropdownOpen(false)
                          if (onOpenYearEvents) onOpenYearEvents('2024-2025')
                        }}
                        className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold text-ivory-warm hover:bg-gold hover:text-maroon-deep transition-all flex items-center justify-between group/item my-0.5"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                          2024–2025 Events
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover/item:translate-x-1 transition-transform" />
                      </button>

                      <button
                        onClick={() => {
                          setEventsDropdownOpen(false)
                          if (onOpenYearEvents) onOpenYearEvents('2025-2026')
                        }}
                        className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold text-gold-bright bg-gold/10 border border-gold/30 hover:bg-gold hover:text-maroon-deep transition-all flex items-center justify-between group/item my-0.5"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                          2025–2026 Events (Active)
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover/item:translate-x-1 transition-transform" />
                      </button>

                      <button
                        onClick={() => {
                          setEventsDropdownOpen(false)
                          if (onOpenYearEvents) onOpenYearEvents('2026-2027')
                        }}
                        className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold text-ivory-warm hover:bg-gold hover:text-maroon-deep transition-all flex items-center justify-between group/item my-0.5"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-rose-400" />
                          2026–2027 Events (Upcoming)
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover/item:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  )}
                </div>
              )
            }

            return (
              <a
                key={n.href}
                href={n.href}
                className="px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-semibold text-ivory-warm hover:text-gold-bright rounded-md transition-colors whitespace-nowrap relative after:absolute after:left-2.5 after:right-2.5 after:-bottom-0.5 after:h-0.5 after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              >
                {n.label}
              </a>
            )
          })}
        </nav>

        {/* Right Action Controls & Social Links */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Social Links (Facebook & Instagram Official Icons) */}
          <div className="flex items-center gap-2 border-r border-gold/30 pr-2.5">
            <a
              href={FB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform shadow-md flex items-center justify-center"
              aria-label="Facebook — Palava Kalibari Trust"
              title="Facebook — Palava Kalibari Trust"
            >
              <FacebookIcon className="w-6 h-6 sm:w-7 sm:h-7" />
            </a>
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform shadow-md flex items-center justify-center"
              aria-label="Instagram — Palava Kalibari Trust"
              title="Instagram — Palava Kalibari Trust"
            >
              <InstagramIcon className="w-6 h-6 sm:w-7 sm:h-7" />
            </a>
          </div>

          <button
            onClick={onJoin}
            className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 bg-maroon border-2 border-gold text-gold-bright font-bold px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-gold hover:text-maroon-deep transition-all hover:shadow-gold hover:scale-[1.03] whitespace-nowrap"
          >
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-gold-bright stroke-[2.5]" /> Become a Member
          </button>
          <button
            className="lg:hidden text-gold-bright p-1.5"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-maroon-deep border-t border-gold/20 px-4 py-3 animate-fade-up">
          {/* Mobile Events Glowing Dropdown Options */}
          <div className="my-2 p-2 rounded-xl bg-black/40 border border-gold/40 shadow-[0_0_15px_rgba(255,215,0,0.4)] animate-pulse">
            <div className="text-[10px] font-bold uppercase tracking-widest text-gold-bright mb-1.5 px-2 flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" /> Event Archives by Year
            </div>
            <div className="grid grid-cols-4 gap-1">
              <button
                onClick={() => {
                  setOpen(false)
                  if (onOpenYearEvents) onOpenYearEvents('2023-2024')
                }}
                className="py-1.5 px-1 rounded-lg bg-gold/10 border border-gold/30 text-ivory-cream text-[11px] font-bold text-center hover:bg-gold hover:text-maroon-deep"
              >
                2023–24
              </button>
              <button
                onClick={() => {
                  setOpen(false)
                  if (onOpenYearEvents) onOpenYearEvents('2024-2025')
                }}
                className="py-1.5 px-1 rounded-lg bg-gold/10 border border-gold/30 text-ivory-cream text-[11px] font-bold text-center hover:bg-gold hover:text-maroon-deep"
              >
                2024–25
              </button>
              <button
                onClick={() => {
                  setOpen(false)
                  if (onOpenYearEvents) onOpenYearEvents('2025-2026')
                }}
                className="py-1.5 px-1 rounded-lg bg-gold text-maroon-deep text-[11px] font-extrabold text-center shadow-md"
              >
                2025–26 ★
              </button>
              <button
                onClick={() => {
                  setOpen(false)
                  if (onOpenYearEvents) onOpenYearEvents('2026-2027')
                }}
                className="py-1.5 px-1 rounded-lg bg-gold/10 border border-gold/30 text-ivory-cream text-[11px] font-bold text-center hover:bg-gold hover:text-maroon-deep"
              >
                2026–27
              </button>
            </div>
          </div>

          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-ivory-cream/90 hover:text-gold-bright border-b border-gold/10 text-sm font-semibold"
            >
              {n.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false)
              onSponsor()
            }}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-gold to-amber-600 text-maroon-deep font-extrabold px-4 py-2.5 rounded-full text-sm shadow-[0_0_20px_rgba(255,215,0,0.7)] animate-pulse"
          >
            <Crown className="w-4 h-4 fill-maroon-deep" /> Become a Sponsor
          </button>

          <button
            onClick={() => {
              setOpen(false)
              onJoin()
            }}
            className="mt-2.5 w-full inline-flex items-center justify-center gap-2 bg-gold text-maroon-deep font-semibold px-4 py-2.5 rounded-full text-sm"
          >
            <Star className="w-4 h-4" /> Become a Member
          </button>
          <div className="flex items-center justify-center gap-3 pt-3 border-t border-gold/20 mt-3">
            <a
              href={FB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-white bg-[#1877F2] hover:bg-[#166fe5] px-3.5 py-1.5 rounded-full shadow-md"
            >
              <FacebookIcon className="w-4 h-4" /> Facebook
            </a>
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 px-3.5 py-1.5 rounded-full shadow-md"
            >
              <InstagramIcon className="w-4 h-4" /> Instagram
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

// ══════════════════════════════════════════════════════════════
// HERO
// ══════════════════════════════════════════════════════════════
function Hero({ onJoin, onSponsor }) {
  const [video, setVideo] = useState(false)
  // Welcome line shows once on first open, then fades so the video is clear.
  const [intro, setIntro] = useState(true)
  const bgRef = useRef(null)

  // Cinematic full-bleed display video, driven at half-speed slow motion.
  useEffect(() => {
    const v = bgRef.current
    if (!v) return
    const apply = () => {
      v.playbackRate = SLOMO_RATE
    }
    apply()
    v.addEventListener('loadedmetadata', apply)
    v.addEventListener('play', apply)
    return () => {
      v.removeEventListener('loadedmetadata', apply)
      v.removeEventListener('play', apply)
    }
  }, [])

  // Auto-dismiss the intro after a few seconds (or on first scroll).
  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 4000)
    const onScroll = () => setIntro(false)
    window.addEventListener('scroll', onScroll, { once: true })
    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Full-bleed cinematic display video (0.5× slow motion) */}
      <video
        ref={bgRef}
        src={VIDEO_SRC}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
      />

      {/* Feather-light scrim so the clean footage stays visible. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />

      {/* First-open intro — welcome line, then it fades away */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center px-4 transition-opacity duration-1000 ${
          intro ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,4,10,0.55),transparent_70%)]" />
        <div className="relative text-center max-w-3xl mx-auto animate-fade-up">
          <span className="inline-flex items-center gap-2 bg-black/30 border border-gold/50 text-gold-bright px-4 py-1.5 rounded-full text-xs md:text-sm tracking-wide backdrop-blur">
            <Sparkles className="w-4 h-4" /> সবাই আমন্ত্রিত — All Are Welcome
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-ivory-warm mt-5 leading-tight drop-shadow-[0_3px_18px_rgba(0,0,0,0.9)]">
            Welcome to the{' '}
            <span className="text-shimmer">Spiritual &amp; Cultural Hub</span> of
            Palava
          </h1>
        </div>
      </div>

      {/* Persistent slim controls — kept minimal so the video is the star */}
      <div className="absolute z-10 inset-x-0 bottom-8 flex flex-col items-center gap-5 px-4">
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="#durga"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-bright to-gold-deep text-maroon-deep font-bold px-5 py-2.5 rounded-full shadow-lg hover:shadow-gold-lg hover:scale-[1.04] transition-all text-sm"
          >
            <CalendarDays className="w-4 h-4" /> Durga Puja Nirghanta
          </a>
          <button
            onClick={() => setVideo(true)}
            className="inline-flex items-center gap-2 bg-black/30 border-2 border-gold text-gold-bright font-semibold px-5 py-2.5 rounded-full hover:bg-gold hover:text-maroon-deep transition-all backdrop-blur text-sm"
          >
            <Play className="w-4 h-4" fill="currentColor" /> Watch Full Reel
          </button>
          <button
            onClick={onSponsor}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-gold to-amber-600 text-maroon-deep font-extrabold px-5 py-2.5 rounded-full shadow-[0_0_25px_rgba(255,215,0,0.85)] animate-pulse hover:scale-[1.04] transition-all text-sm border border-white/40"
          >
            <Crown className="w-4 h-4 fill-maroon-deep" /> Become a Sponsor
          </button>

          <button
            onClick={onJoin}
            className="inline-flex items-center gap-2 bg-black/30 border-2 border-gold/70 text-ivory-warm font-semibold px-5 py-2.5 rounded-full hover:bg-gold hover:text-maroon-deep transition-all backdrop-blur text-sm"
          >
            <Star className="w-4 h-4" /> Become a Member
          </button>
        </div>
        <a
          href="#ilish"
          className="flex flex-col items-center text-gold-bright/90 hover:text-gold-bright drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
          aria-label="Scroll down"
        >
          <span className="w-6 h-10 rounded-full border-2 border-gold/60 grid place-items-start justify-center p-1.5">
            <span className="w-1 h-2 rounded-full bg-gold animate-floaty" />
          </span>
        </a>
      </div>

      {/* Slow-motion badge */}
      <span className="absolute z-10 top-24 right-6 inline-flex items-center gap-1.5 bg-black/40 border border-gold/40 text-gold-bright text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur">
        <Clock className="w-3.5 h-3.5" /> {SLOMO_RATE}× Slow-motion
      </span>

      {video && <VideoModal onClose={() => setVideo(false)} />}
    </section>
  )
}

function VideoModal({ onClose }) {
  const ref = useRef(null)
  const [rate, setRate] = useState(TIMELAPSE_RATE)

  // Keep the chosen speed applied across play/seek/loop events.
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const apply = () => {
      v.playbackRate = rate
    }
    apply()
    v.addEventListener('play', apply)
    v.addEventListener('loadedmetadata', apply)
    return () => {
      v.removeEventListener('play', apply)
      v.removeEventListener('loadedmetadata', apply)
    }
  }, [rate])

  const speeds = [1, 2, 3, 4]

  return (
    <Modal onClose={onClose} maxW="max-w-3xl">
      <div className="p-1.5 bg-gradient-to-r from-gold-bright to-gold-deep rounded-2xl shadow-gold-lg">
        <div className="rounded-xl overflow-hidden bg-maroon-deep">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <h3 className="font-display text-gold-bright font-bold text-lg leading-tight truncate">
                Durga Puja — Festive Reel
              </h3>
              <p className="text-ivory-cream/70 text-xs">
                Playing at {rate}× time-lapse
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden sm:flex items-center gap-1 bg-black/30 border border-gold/30 rounded-full p-1">
                {speeds.map((s) => (
                  <button
                    key={s}
                    onClick={() => setRate(s)}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                      rate === s
                        ? 'bg-gold text-maroon-deep'
                        : 'text-gold-bright hover:bg-gold/15'
                    }`}
                  >
                    {s}×
                  </button>
                ))}
              </div>
              <button
                onClick={onClose}
                className="grid place-items-center w-9 h-9 rounded-full border border-gold/40 text-gold-bright hover:bg-gold hover:text-maroon-deep transition-colors"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Player */}
          <video
            ref={ref}
            src={VIDEO_SRC}
            className="w-full aspect-video bg-black"
            controls
            autoPlay
            loop
            playsInline
            preload="metadata"
          />

          {/* Mobile speed row */}
          <div className="sm:hidden flex items-center justify-center gap-1 py-2 bg-black/20">
            {speeds.map((s) => (
              <button
                key={s}
                onClick={() => setRate(s)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  rate === s ? 'bg-gold text-maroon-deep' : 'text-gold-bright'
                }`}
              >
                {s}×
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

// ══════════════════════════════════════════════════════════════
// GENERIC MODAL
// ══════════════════════════════════════════════════════════════
function Modal({ children, onClose, maxW = 'max-w-lg' }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div
        className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm animate-fade-up"
        onClick={onClose}
      />
      <div className={`relative w-full ${maxW} animate-fade-up`}>{children}</div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
// ILISH UTSAV
// ══════════════════════════════════════════════════════════════
function IlishSection({ onBook }) {
  const [active, setActive] = useState(ILISH_PLATTERS[0].id)
  const platter = ILISH_PLATTERS.find((p) => p.id === active)
  return (
    <section id="ilish" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="reveal">
          <SectionTitle
            eyebrow="Coming First"
            title="Ilish Utsav 2026"
            subtitle="A celebration of Bengal's beloved Ilish — three curated platters, one unforgettable afternoon."
          />
        </div>

        {/* Event facts */}
        <div className="reveal grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
          <Fact icon={CalendarDays} label="Date" value={ILISH_EVENT.date} />
          <Fact icon={Clock} label="Time" value={ILISH_EVENT.time} />
          <Fact icon={MapPin} label="Venue" value={ILISH_EVENT.venue} />
        </div>

        <div className="reveal grid lg:grid-cols-5 gap-8 items-start">
          {/* Tabs */}
          <div className="lg:col-span-2 flex lg:flex-col gap-3">
            {ILISH_PLATTERS.map((p) => {
              const on = p.id === active
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(p.id)}
                  className={`flex-1 text-left rounded-xl border-2 p-4 transition-all ${
                    on
                      ? 'border-gold bg-maroon text-ivory-warm shadow-gold scale-[1.02]'
                      : 'border-gold/30 bg-white/60 hover:border-gold hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-display font-bold text-lg ${
                        on ? 'text-gold-bright' : 'text-maroon'
                      }`}
                    >
                      {p.name}
                    </span>
                    <UtensilsCrossed
                      className={`w-5 h-5 ${on ? 'text-gold' : 'text-gold-deep'}`}
                    />
                  </div>
                  <div className="mt-2 flex gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold-deep font-semibold">
                      Member {inr(p.member)}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-semibold ${
                        on ? 'bg-ivory-warm/20 text-ivory-warm' : 'bg-maroon/10 text-maroon'
                      }`}
                    >
                      Non-Member {inr(p.nonMember)}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Menu detail */}
          <div className="lg:col-span-3">
            <div
              className={`rounded-2xl overflow-hidden border-2 border-gold/40 bg-white shadow-xl`}
            >
              <div className={`bg-gradient-to-r ${platter.accent} p-5 flex items-center justify-between`}>
                <div>
                  <h3 className="font-display text-2xl font-bold text-ivory-warm">
                    {platter.name}
                  </h3>
                  <p className="text-ivory-cream/80 text-sm">
                    {platter.items.length} delicacies • served fresh
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-gold-bright font-bold text-2xl">
                    {inr(platter.member)}
                  </div>
                  <div className="text-ivory-cream/70 text-xs">member price</div>
                </div>
              </div>
              <ul className="p-6 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {platter.items.map((it, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-charcoal/85 text-sm animate-fade-up"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <Check className="w-4 h-4 text-gold-deep mt-0.5 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <div className="px-6 pb-6">
                <button
                  onClick={() => onBook(platter)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-maroon to-maroon-deep text-gold-bright font-bold py-3.5 rounded-xl border border-gold/50 hover:shadow-gold hover:scale-[1.01] transition-all"
                >
                  <Ticket className="w-5 h-5" /> Book Platter Seats
                </button>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-maroon bg-gold/10 border border-gold/30 rounded-xl px-4 py-3">
              <Baby className="w-5 h-5 text-gold-deep shrink-0" />
              {ILISH_EVENT.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Fact({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-white/70 border border-gold/30 rounded-xl px-4 py-3">
      <span className="grid place-items-center w-10 h-10 rounded-full bg-maroon text-gold-bright shrink-0">
        <Icon className="w-5 h-5" />
      </span>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-gold-deep font-semibold">
          {label}
        </div>
        <div className="text-sm font-medium text-charcoal">{value}</div>
      </div>
    </div>
  )
}

// ── Ilish booking modal ──────────────────────────────────────
function BookingModal({ platter, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', qty: 1, type: 'member' })
  const [done, setDone] = useState(false)
  const price = form.type === 'member' ? platter.member : platter.nonMember
  const total = price * Math.max(1, Number(form.qty) || 1)

  return (
    <Modal onClose={onClose}>
      <div className="rounded-2xl overflow-hidden border-2 border-gold/50 bg-ivory shadow-2xl">
        <div className="bg-gradient-to-r from-maroon to-maroon-deep px-6 py-5 flex items-center justify-between">
          <div>
            <h3 className="font-display text-xl font-bold text-gold-bright">
              Book — {platter.name}
            </h3>
            <p className="text-ivory-cream/75 text-sm">{ILISH_EVENT.date}</p>
          </div>
          <button onClick={onClose} className="text-ivory-cream/80 hover:text-gold-bright">
            <X className="w-6 h-6" />
          </button>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 grid place-items-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-display text-2xl text-maroon font-bold">Seats Reserved!</h4>
            <p className="text-charcoal/70 mt-2 text-sm">
              Thank you {form.name || 'guest'} — we've noted {form.qty} seat(s) for the{' '}
              {platter.name}. Our team will confirm on {form.phone || 'your number'}.
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-maroon text-gold-bright font-semibold px-6 py-2.5 rounded-full border border-gold/50"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            className="p-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              setDone(true)
            }}
          >
            <Field label="Full Name">
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="pkt-input"
                placeholder="Your name"
              />
            </Field>
            <Field label="Phone Number">
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="pkt-input"
                placeholder="10-digit mobile"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Seats">
                <input
                  type="number"
                  min="1"
                  value={form.qty}
                  onChange={(e) => setForm({ ...form, qty: e.target.value })}
                  className="pkt-input"
                />
              </Field>
              <Field label="Category">
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="pkt-input"
                >
                  <option value="member">Member</option>
                  <option value="nonmember">Non-Member</option>
                </select>
              </Field>
            </div>
            <div className="flex items-center justify-between bg-gold/10 border border-gold/30 rounded-xl px-4 py-3">
              <span className="text-maroon font-semibold">Total</span>
              <span className="font-display text-2xl font-bold text-maroon">
                {inr(total)}
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gold-bright to-gold-deep text-maroon-deep font-bold py-3 rounded-xl hover:shadow-gold transition-all"
            >
              Confirm Booking
            </button>
          </form>
        )}
      </div>
    </Modal>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-maroon mb-1.5">{label}</span>
      {children}
    </label>
  )
}

// ══════════════════════════════════════════════════════════════
// DURGA PUJA NIRGHANTA SECTION (MAIN PAGE SCHEDULE)
// ══════════════════════════════════════════════════════════════
function DurgaSection() {
  const [activeNirghanta, setActiveNirghanta] = useState(NIRGHANTA[0].id)
  const day = NIRGHANTA.find((d) => d.id === activeNirghanta)

  return (
    <section id="durga" className="relative text-ivory-warm">

      {/* ── ZONE 1: Cinematic Devi Maa video — NO content overlapping ── */}
      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(320px, 50vw, 560px)' }}>
        <video
          src="/nirghanta-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 20%' }}
        />
        {/* Minimal bottom gradient so zone 2 blends in seamlessly */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-maroon-deep to-transparent" />
        {/* Subtle top nav-gap shim */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/30 to-transparent" />

        {/* Festival badge — top-left, never over the face */}
        <div className="absolute top-6 left-6 z-10">
          <span className="inline-flex items-center gap-2 bg-black/40 border border-gold/50 text-gold-bright px-4 py-1.5 rounded-full text-xs md:text-sm tracking-widest uppercase backdrop-blur font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> The Grand Festival
          </span>
        </div>
      </div>

      {/* ── ZONE 2: Schedule panel — solid dark background, fully readable ── */}
      <div className="bg-gradient-to-b from-maroon-deep via-[#3a0010] to-[#1a0008]">
        <div className="max-w-5xl mx-auto px-4 pt-10 pb-20">

          {/* Section heading */}
          <div className="reveal text-center mb-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ivory-warm leading-tight">
              Durga Puja 2026
              <span className="block text-gold-bright text-2xl md:text-3xl mt-1 font-normal tracking-wide">
                Puja Nirghanta
              </span>
            </h2>
            <p className="mt-3 text-ivory-cream/65 text-sm tracking-wide">
              {DURGA_EVENT.dates} &nbsp;•&nbsp; {DURGA_EVENT.location}
            </p>
            <div className="mt-4 mx-auto h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          {/* Tithi tabs */}
          <div className="reveal flex flex-wrap justify-center gap-2 mb-8">
              {NIRGHANTA.map((d) => {
                const on = d.id === activeNirghanta
                return (
                  <button
                    key={d.id}
                    onClick={() => setActiveNirghanta(d.id)}
                    className={`relative px-4 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${
                      on
                        ? 'bg-gold text-maroon-deep border-gold shadow-[0_0_18px_rgba(212,175,55,0.5)] scale-105'
                        : 'border-gold/30 text-gold-bright hover:border-gold hover:bg-gold/10'
                    }`}
                  >
                    {d.sacred && (
                      <Flame className={`inline w-4 h-4 mr-1 ${on ? 'text-maroon-deep' : 'text-gold'}`} />
                    )}
                    {d.tithi}
                    <span className={`block text-[10px] font-normal ${on ? 'text-maroon' : 'text-ivory-cream/55'}`}>
                      {d.day}
                    </span>
                  </button>
                )
              })}
            </div>

          {/* Day detail card */}
          <div className="reveal max-w-3xl mx-auto">
            <div
              className={`rounded-2xl border p-6 md:p-8 ${
                day.sacred
                  ? 'border-gold/60 bg-gold/10 shadow-[0_0_40px_rgba(212,175,55,0.15)]'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {/* Card header */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-6 pb-5 border-b border-white/10">
                <div>
                  <h3 className="font-display text-3xl font-bold text-gold-bright">{day.tithi}</h3>
                  <p className="text-ivory-cream/60 text-sm mt-0.5">{day.day} &nbsp;•&nbsp; {day.weekday}</p>
                </div>
                {day.sacred && (
                  <span className="inline-flex items-center gap-2 bg-gold text-maroon-deep font-bold px-4 py-2 rounded-full text-sm">
                    <Flame className="w-4 h-4" /> Most Sacred Moment
                  </span>
                )}
              </div>

              {/* Muhurats + Rituals */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Times */}
                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.22em] text-gold mb-3 flex items-center gap-2 font-semibold">
                    <Clock className="w-4 h-4" /> Muhurats
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {day.times.map((t, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-black/30 border border-gold/25 text-gold-bright text-sm font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rituals */}
                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.22em] text-gold mb-3 flex items-center gap-2 font-semibold">
                    <Sparkles className="w-4 h-4" /> Rituals
                  </h4>
                  <ul className="space-y-2">
                    {day.rituals.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-ivory-cream/85 text-sm">
                        <ChevronRight className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {day.note && (
                <p className="mt-6 text-sm italic text-gold-bright/80 border-t border-white/10 pt-4">
                  ✦ {day.note}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════
// MEMBERSHIP + RAZORPAY
// ══════════════════════════════════════════════════════════════
function MembershipSection({ registerJoinRef }) {
  const [plan, setPlan] = useState(MEMBERSHIP_PLANS[0].id)
  const [showForm, setShowForm] = useState(false)
  const [copied, setCopied] = useState(false)
  const selected = MEMBERSHIP_PLANS.find((p) => p.id === plan)
  const formRef = useRef(null)

  // expose scroll-to for header CTA
  useEffect(() => {
    if (registerJoinRef) registerJoinRef.current = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [registerJoinRef])

  return (
    <section id="membership" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="reveal">
          <SectionTitle
            eyebrow="Membership Portal"
            title="Join the PKT Family"
            subtitle="Become part of a movement to keep Bengali heritage alive in Palava — with year-round perks."
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Plans */}
          <div className="reveal space-y-5">
            {MEMBERSHIP_PLANS.map((p) => {
              const on = p.id === plan
              return (
                <button
                  key={p.id}
                  onClick={() => setPlan(p.id)}
                  className={`w-full text-left rounded-2xl border-2 p-6 transition-all relative overflow-hidden ${
                    on
                      ? 'border-gold bg-gradient-to-br from-maroon to-maroon-deep text-ivory-warm shadow-gold-lg scale-[1.01]'
                      : 'border-gold/30 bg-white hover:border-gold hover:shadow-gold'
                  }`}
                >
                  {p.highlight && (
                    <span className="absolute top-4 right-4 bg-gold text-maroon-deep text-[11px] font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  )}
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid place-items-center w-12 h-12 rounded-full ${
                        on ? 'bg-gold text-maroon-deep' : 'bg-maroon text-gold-bright'
                      }`}
                    >
                      {p.id === 'life' ? <Crown className="w-6 h-6" /> : <Star className="w-6 h-6" />}
                    </span>
                    <div>
                      <h3 className={`font-display text-2xl font-bold ${on ? 'text-gold-bright' : 'text-maroon'}`}>
                        {p.name}
                      </h3>
                      <p className={`text-sm ${on ? 'text-ivory-cream/75' : 'text-charcoal/60'}`}>
                        {p.tagline}
                      </p>
                    </div>
                  </div>
                  <div className={`mt-4 flex items-end gap-2 ${on ? 'text-gold-bright' : 'text-maroon'}`}>
                    <span className="font-display text-4xl font-bold">{inr(p.total)}</span>
                    <span className={`text-sm mb-1 ${on ? 'text-ivory-cream/70' : 'text-charcoal/60'}`}>
                      total
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${on ? 'text-ivory-cream/75' : 'text-charcoal/60'}`}>
                    {inr(p.joining)} joining fee + {inr(p.fee)} {p.feeLabel}
                  </p>
                </button>
              )
            })}

            {/* Perks */}
            <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6">
              <h4 className="font-display text-lg text-maroon font-bold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-gold-deep" /> Member Perks
              </h4>
              <ul className="grid sm:grid-cols-2 gap-3">
                {MEMBER_PERKS.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-charcoal/85">
                    <span className="grid place-items-center w-5 h-5 rounded-full bg-maroon text-gold-bright shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Register & Pay */}
          <div ref={formRef} className="reveal">
            <div className="rounded-2xl border-2 border-gold/40 bg-white shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-maroon to-maroon-deep px-6 py-5">
                <h3 className="font-display text-xl font-bold text-gold-bright">
                  Register &amp; Contribute
                </h3>
                <p className="text-ivory-cream/75 text-sm">
                  Two quick steps — pay, then submit your details.
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Plan + amount */}
                <div className="flex items-end gap-4">
                  <label className="flex-1">
                    <span className="block text-sm font-medium text-maroon mb-1.5">
                      Membership Plan
                    </span>
                    <select
                      value={plan}
                      onChange={(e) => setPlan(e.target.value)}
                      className="pkt-input"
                    >
                      {MEMBERSHIP_PLANS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-wider text-gold-deep font-semibold">
                      Amount
                    </div>
                    <div className="font-display text-3xl font-bold text-maroon">
                      {inr(selected.total)}
                    </div>
                  </div>
                </div>

                {/* STEP 1 — Pay */}
                <div className="rounded-xl border border-gold/30 bg-gold/5 p-5">
                  <h4 className="font-semibold text-maroon flex items-center gap-2 mb-4">
                    <span className="grid place-items-center w-6 h-6 rounded-full bg-maroon text-gold-bright text-xs font-bold">
                      1
                    </span>
                    Pay {inr(selected.total)}
                  </h4>

                  {RAZORPAY_PAYMENT_URL ? (
                    <a
                      href={RAZORPAY_PAYMENT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#0b2b5b] text-white font-bold py-3.5 px-6 rounded-xl hover:bg-[#0a2450] transition-all shadow-md hover:shadow-lg text-base"
                    >
                      <ShieldCheck className="w-5 h-5 text-gold-bright" /> Pay securely via Razorpay
                    </a>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                      <div className="shrink-0">
                        <UpiQR amount={selected.total} size={180} />
                      </div>
                      <div className="flex-1 min-w-0 w-full text-center sm:text-left">
                        <p className="text-xs md:text-sm text-slate-700 font-medium">
                          Scan with any UPI app (GPay / PhonePe / Paytm / BHIM)
                        </p>
                        {UPI_VPA ? (
                          <>
                            <div className="mt-3 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                              <code className="px-2.5 py-1 rounded-lg bg-maroon/10 text-maroon font-semibold text-xs break-all font-mono">
                                {UPI_VPA}
                              </code>
                              <button
                                onClick={() => {
                                  navigator.clipboard?.writeText(UPI_VPA)
                                  setCopied(true)
                                  setTimeout(() => setCopied(false), 1500)
                                }}
                                className="inline-flex items-center gap-1 text-xs font-bold text-gold-deep hover:text-maroon shrink-0"
                              >
                                {copied ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" /> Copy
                                  </>
                                )}
                              </button>
                            </div>
                            <a
                              href={upiUri(selected.total)}
                              className="mt-3 inline-flex items-center gap-2 border-2 border-maroon text-maroon font-bold px-4 py-2 rounded-full text-xs hover:bg-maroon hover:text-gold-bright transition-colors"
                            >
                              <Smartphone className="w-3.5 h-3.5" /> Open UPI app
                            </a>
                          </>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>

                {/* STEP 2 — Register */}
                <div className="rounded-xl border border-gold/30 bg-white p-5">
                  <h4 className="font-semibold text-maroon flex items-center gap-2 mb-2">
                    <span className="grid place-items-center w-6 h-6 rounded-full bg-maroon text-gold-bright text-xs font-bold">
                      2
                    </span>
                    Submit details &amp; upload payment screenshot
                  </h4>
                  <p className="text-sm text-charcoal/70 mb-4">
                    Fill our official registration form and attach your payment
                    proof. Every entry is saved to our records and our team is
                    notified instantly.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setShowForm(true)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-bright to-gold-deep text-maroon-deep font-bold px-5 py-3 rounded-xl hover:shadow-gold-lg hover:scale-[1.02] transition-all"
                    >
                      <Upload className="w-5 h-5" /> Complete Registration
                    </button>
                    <a
                      href={REGISTRATION_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-2 border-gold text-maroon font-semibold px-5 py-3 rounded-xl hover:bg-gold hover:text-maroon-deep transition-all"
                    >
                      <ExternalLink className="w-5 h-5" /> Open in new tab
                    </a>
                  </div>
                </div>

                <p className="flex items-start gap-2 text-xs text-charcoal/55">
                  <ShieldCheck className="w-4 h-4 text-gold-deep shrink-0 mt-0.5" />
                  Membership is confirmed only after our team verifies your
                  payment — you'll receive an email confirmation. Queries:{' '}
                  <a href={`mailto:${ADMIN_EMAIL}`} className="text-maroon underline">
                    {ADMIN_EMAIL}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForm && <RegisterFormModal onClose={() => setShowForm(false)} />}
    </section>
  )
}

// ── Embedded official Google Form (registration + payment proof) ──
function RegisterFormModal({ onClose }) {
  return (
    <Modal onClose={onClose} maxW="max-w-2xl">
      <div className="rounded-2xl overflow-hidden bg-white shadow-2xl">
        <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-maroon to-maroon-deep px-5 py-4">
          <div>
            <h3 className="font-display text-lg font-bold text-gold-bright">
              PKT Registration
            </h3>
            <p className="text-ivory-cream/70 text-xs">
              Enter your details &amp; upload payment proof
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={REGISTRATION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory-cream/80 hover:text-gold-bright"
              aria-label="Open form in a new tab"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
            <button
              onClick={onClose}
              className="text-ivory-cream/80 hover:text-gold-bright"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <iframe
          title="PKT Registration Form"
          src={REGISTRATION_FORM_EMBED}
          className="w-full h-[70vh] bg-white"
          loading="lazy"
        >
          Loading…
        </iframe>
      </div>
    </Modal>
  )
}


// ══════════════════════════════════════════════════════════════
// ANNADAN — The Heart of the Festival
// ══════════════════════════════════════════════════════════════
function AnnadanSection() {
  const [currentImg, setCurrentImg] = useState(0)

  const slides = [
    {
      src: IMG.annadanEating,
      title: 'Community Bhog Seba',
      subtitle: 'Serving hot, nutritious Maha Bhog under the pandal with love and equality',
      icon: Utensils,
    },
    {
      src: IMG.annadanTeam,
      title: 'Devoted Volunteer Team',
      subtitle: 'PKT members & residents uniting to cook and serve hundreds of families daily',
      icon: Users,
    },
    {
      src: IMG.annadanPlate,
      title: 'Sacred Maha Bhog Prasad',
      subtitle: 'Pure, blissful Prasad — Khichdi, Labra, Payesh, and Chutney served to all',
      icon: Sparkles,
    },
    {
      src: IMG.annadanCrowd,
      title: 'Grand Festive Audience Gathering',
      subtitle: 'Palava residents gathering together in a shared spirit of devotion and joy',
      icon: Heart,
    },
    {
      src: IMG.annadan2,
      title: 'Daily Children & Resident Service',
      subtitle: 'Over 800 individuals fed daily across all four days of Durga Puja',
      icon: Utensils,
    },
    {
      src: IMG.annadan3,
      title: 'Integrated Community Reach',
      subtitle: 'Uniting residents, local needy, and visitors in a single festive family',
      icon: HandHeart,
    },
  ]

  useEffect(() => {
    // Preload carousel slide images for instant smooth transitions
    slides.forEach((s) => {
      const img = new Image()
      img.src = s.src
    })
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [slides.length])

  const activeSlide = slides[currentImg]

  return (
    <section
      id="annadan"
      className="relative min-h-[620px] md:min-h-[700px] overflow-hidden text-ivory-warm"
    >
      {/* Full-scale background image carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        {slides.map((slide, idx) => (
          <img
            key={idx}
            src={slide.src}
            alt={slide.title}
            loading={idx === 0 ? "eager" : "lazy"}
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
              idx === currentImg ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}

        {/* Minimal top scrim — keeps 90% of photo 100% clear */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />
      </div>

      {/* Top Header Badge — subtle top-left pin */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 pt-6 flex justify-between items-center">
        <span className="inline-flex items-center gap-2 bg-black/60 border border-gold/40 text-gold-bright font-bold tracking-[0.2em] uppercase text-[11px] px-3.5 py-1 rounded-full backdrop-blur-md">
          <HandHeart className="w-3.5 h-3.5 text-gold-bright" /> {ANNADAN.eyebrow}
        </span>
        <span className="hidden md:inline-flex items-center gap-2 text-xs text-ivory-cream/80 bg-black/50 px-3 py-1 rounded-full backdrop-blur border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-gold" /> {slides.length} Photos Showcase
        </span>
      </div>

      {/* BOTTOM 10% WRITEUPS & CONTROLS STRIP */}
      <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-[#100005] via-[#180007]/90 to-transparent pt-12 pb-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">

          {/* Left: Compact Title & Copy */}
          <div className="max-w-xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gold-bright flex items-center justify-center md:justify-start gap-2">
              {ANNADAN.title}
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
            </h2>
            <p className="text-xs md:text-sm text-ivory-cream/90 mt-1 line-clamp-2 leading-relaxed">
              {ANNADAN.body}
            </p>
          </div>

          {/* Center: Compact Stats Pills */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap justify-center">
            {ANNADAN.stats.map((s, i) => (
              <div key={i} className="px-3 py-1.5 rounded-xl border border-gold/30 bg-black/60 backdrop-blur text-center">
                <div className="font-display text-base font-extrabold text-gold-bright">{s.value}</div>
                <div className="text-[9px] font-semibold text-ivory-cream/70 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Right: CTA & Carousel Controls */}
          <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
            <div className="flex items-center gap-2">
              {RAZORPAY_PAYMENT_URL ? (
                <a
                  href={RAZORPAY_PAYMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-gold-bright to-gold-deep text-maroon-deep font-bold px-4 py-2 rounded-lg text-xs shadow-gold hover:scale-105 transition-all"
                >
                  <HandHeart className="w-3.5 h-3.5" /> Donate to Annadan
                </a>
              ) : (
                <a
                  href={upiUri(0)}
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-gold-bright to-gold-deep text-maroon-deep font-bold px-4 py-2 rounded-lg text-xs shadow-gold hover:scale-105 transition-all"
                >
                  <Smartphone className="w-3.5 h-3.5" /> Donate via UPI
                </a>
              )}
              <a
                href="#donate"
                className="inline-flex items-center gap-1 border border-gold/40 bg-black/40 text-gold-bright font-bold px-3 py-2 rounded-lg text-xs hover:bg-gold/20 transition-all"
              >
                <Landmark className="w-3.5 h-3.5" /> Options
              </a>
            </div>

            {/* Slide Indicators & Caption */}
            <div className="flex items-center gap-2 text-[11px] text-ivory-cream/80 bg-black/50 px-3 py-1 rounded-full border border-white/10">
              <activeSlide.icon className="w-3 h-3 text-gold" />
              <span className="font-bold text-gold-bright">{activeSlide.title}</span>
              <div className="flex items-center gap-1 ml-1">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImg(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentImg ? 'w-4 bg-gold' : 'w-1.5 bg-white/40'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════
// INDIVIDUAL DONATION OPTIONS
// ══════════════════════════════════════════════════════════════
function DonationSection() {
  const [copied, setCopied] = useState(false)
  return (
    <section
      id="donate"
      className="relative py-24 overflow-hidden bg-gradient-to-br from-maroon-deep to-black text-ivory-warm"
    >
      <div className="absolute inset-0 mandala-bg opacity-10" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-maroon/40 blur-3xl rounded-full" />
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="reveal mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ivory-warm">
            Individual Donation Options
          </h2>
          <div className="mt-3 h-1 w-40 rounded-full bg-gradient-to-r from-gold-bright to-transparent" />
        </div>

        {/* Official QR Payment & Bank Contribution Block */}
        <div className="reveal mb-12 rounded-3xl border-2 border-gold/40 bg-gradient-to-r from-maroon-deep/90 via-[#2a000d] to-black p-6 md:p-8 shadow-2xl">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* QR Scanner Component */}
            <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
              <UpiQR size={210} />
              <p className="text-xs text-gold-bright/80 mt-3 font-medium">
                Scan with any UPI App (GPay / PhonePe / Paytm / BHIM)
              </p>
            </div>

            {/* Account & Payment Details */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full bg-gold/10 border border-gold/30">
                  <ShieldCheck className="w-4 h-4 text-gold" /> Official Bank &amp; UPI Payment
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-ivory-warm mt-3">
                  {UPI_PAYEE}
                </h3>
                <p className="text-xs text-ivory-cream/60 mt-1">
                  Registered Trust: {TRUST.registration}
                </p>
              </div>

              {/* UPI VPA Box */}
              <div className="p-4 rounded-xl border border-gold/30 bg-black/40 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-gold/70 uppercase tracking-wider font-semibold">Official UPI ID</div>
                  <div className="font-mono text-sm md:text-base text-gold-bright font-bold mt-0.5 select-all">
                    {UPI_VPA}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(UPI_VPA)
                      setCopied(true)
                      setTimeout(() => setCopied(false), 1500)
                    }}
                    className="inline-flex items-center gap-1.5 bg-gold/20 hover:bg-gold text-gold-bright hover:text-maroon-deep border border-gold/40 font-bold px-3.5 py-2 rounded-lg text-xs transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy UPI ID
                      </>
                    )}
                  </button>
                  <a
                    href={upiUri(0)}
                    className="inline-flex items-center gap-1.5 bg-maroon hover:bg-gold text-gold-bright hover:text-maroon-deep border border-gold font-bold px-3.5 py-2 rounded-lg text-xs transition-colors"
                  >
                    <Smartphone className="w-4 h-4" /> Open App
                  </a>
                </div>
              </div>

              <p className="text-xs text-ivory-cream/70 leading-relaxed italic">
                ✦ Contributions directly support Durga Puja 2026, Maha Bhog Annadan, and year-round cultural events.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Featured contributions */}
          <div className="reveal">
            <h3 className="text-gold tracking-[0.25em] uppercase text-sm font-semibold mb-5">
              Featured Contributions
            </h3>
            <div className="space-y-4">
              {FEATURED_CONTRIBUTIONS.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-4 rounded-2xl border border-gold/40 bg-gradient-to-r from-maroon/40 to-maroon-deep/40 p-5 hover:border-gold hover:shadow-gold transition-all"
                >
                  <span className="grid place-items-center w-14 h-14 rounded-full bg-gradient-to-br from-gold-bright to-gold-deep text-maroon-deep shrink-0">
                    <Gift className="w-7 h-7" />
                  </span>
                  <span className="font-semibold text-ivory-warm text-lg">{c.name}</span>
                  <span className="ml-auto font-display text-2xl font-bold text-gold-bright">
                    {inr(c.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Puja-wise item donation table */}
          <div className="reveal">
            <h3 className="text-gold tracking-[0.25em] uppercase text-sm font-semibold mb-5">
              Puja-wise Item Donation (₹)
            </h3>
            <div className="rounded-2xl border border-gold/40 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-maroon/60 text-gold-bright">
                      <th className="text-left font-semibold px-4 py-3">Puja</th>
                      {DONATION_COLUMNS.map((col) => (
                        <th key={col} className="font-semibold px-3 py-3 text-center whitespace-nowrap">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DONATION_ROWS.map((r, i) => (
                      <tr
                        key={r.puja}
                        className={`border-t border-gold/15 ${
                          i % 2 ? 'bg-black/30' : 'bg-maroon-deep/30'
                        } hover:bg-maroon/40 transition-colors`}
                      >
                        <td className="px-4 py-3 font-semibold text-ivory-warm whitespace-nowrap">
                          {r.puja}
                        </td>
                        {r.values.map((v, j) => (
                          <td key={j} className="px-3 py-3 text-center text-ivory-cream/85">
                            {v.toLocaleString('en-IN')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <p className="reveal mt-10 text-center italic text-ivory-cream/60">
          {DONATION_NOTE}
        </p>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════
// ABOUT
// ══════════════════════════════════════════════════════════════
function AboutSection() {
  const [currentImg, setCurrentImg] = useState(0)

  const slides = [
    {
      src: IMG.aboutDurgotsav2024Women,
      title: 'Durga Utsav 2024 Celebrations',
      subtitle: 'Palava Kalibari Trust members at the grand Durgotsav 2024 Pandal Entry',
    },
    {
      src: IMG.aboutWomenTeam,
      title: 'PKT Women Community Organisers',
      subtitle: 'Bringing families & residents together in shared joy, culture, and tradition',
    },
    {
      src: IMG.aboutMenTeam,
      title: 'PKT Resident Executive Team',
      subtitle: 'Dedicated community members organising large-format festive experiences in Palava',
    },
    {
      src: IMG.aboutSaraswatiPuja,
      title: 'Saraswati Puja Youth Excellence Awards',
      subtitle: 'Fostering cultural talent, youth participation, and community spirit',
    },
    {
      src: IMG.aboutOrganizersDuo,
      title: 'PKT Trust Organisers',
      subtitle: 'Devoted leadership driving cultural initiatives & community welfare',
    },
  ]

  const stats = [
    { icon: Users, label: 'Community-Led', value: 'By Residents' },
    { icon: Landmark, label: 'Registered Trust', value: 'F-8722' },
    { icon: Sparkles, label: 'Culture First', value: 'Bengali Heritage' },
    { icon: CalendarDays, label: 'Year-Round', value: 'Engagement' },
  ]

  useEffect(() => {
    // Preload carousel slide images for instant smooth transitions
    slides.forEach((s) => {
      const img = new Image()
      img.src = s.src
    })
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [slides.length])

  const activeSlide = slides[currentImg]

  return (
    <section id="about" className="relative min-h-[620px] md:min-h-[700px] overflow-hidden text-ivory-warm">
      {/* Full-scale background image carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        {slides.map((slide, idx) => (
          <img
            key={idx}
            src={slide.src}
            alt={slide.title}
            loading={idx === 0 ? "eager" : "lazy"}
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
              idx === currentImg ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}

        {/* Minimal top scrim — keeps 90% of photo 100% clear */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />
      </div>

      {/* Top Header Badge — subtle top-left pin */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 pt-6 flex justify-between items-center">
        <span className="inline-flex items-center gap-2 bg-black/60 border border-gold/40 text-gold-bright font-bold tracking-[0.2em] uppercase text-[11px] px-3.5 py-1 rounded-full backdrop-blur-md">
          <Heart className="w-3.5 h-3.5 text-gold-bright" /> Who We Are
        </span>
        <span className="hidden md:inline-flex items-center gap-2 text-xs text-ivory-cream/80 bg-black/50 px-3 py-1 rounded-full backdrop-blur border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-gold" /> {slides.length} Gallery Photos
        </span>
      </div>

      {/* BOTTOM 10% WRITEUPS & CONTROLS STRIP */}
      <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-[#100005] via-[#180007]/90 to-transparent pt-12 pb-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">

          {/* Left: Compact Title & Copy */}
          <div className="max-w-xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gold-bright flex items-center justify-center md:justify-start gap-2">
              About Palava Kalibari Trust
            </h2>
            <p className="text-xs md:text-sm text-ivory-cream/90 mt-1 line-clamp-2 leading-relaxed">
              {TRUST.whoWeAre}
            </p>
          </div>

          {/* Center: Compact Stats Pills */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap justify-center">
            {stats.map((s, i) => (
              <div key={i} className="px-3 py-1.5 rounded-xl border border-gold/30 bg-black/60 backdrop-blur text-center">
                <div className="font-display text-xs md:text-sm font-extrabold text-gold-bright">{s.value}</div>
                <div className="text-[9px] font-semibold text-ivory-cream/70 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Right: Slide Indicators & Caption */}
          <div className="flex flex-col items-center md:items-end gap-1.5 shrink-0">
            <div className="flex items-center gap-2 text-[11px] text-ivory-cream/80 bg-black/50 px-3 py-1 rounded-full border border-white/10">
              <Sparkles className="w-3 h-3 text-gold" />
              <span className="font-bold text-gold-bright">{activeSlide.title}</span>
              <div className="flex items-center gap-1 ml-1">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImg(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentImg ? 'w-4 bg-gold' : 'w-1.5 bg-white/40'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════
// CONTACT + FOOTER
// ══════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer id="contact" className="relative bg-gradient-to-b from-maroon to-maroon-deep text-ivory-cream pt-20 pb-8 overflow-hidden">
      <div className="absolute inset-0 mandala-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="reveal text-center mb-14">
          <span className="inline-flex items-center gap-2 text-gold tracking-[0.25em] uppercase text-xs">
            <Sparkles className="w-4 h-4" /> Get In Touch
          </span>
          <h2 className="font-display text-4xl font-bold text-gold-bright mt-3">
            Contact &amp; Trust Details
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contacts */}
          <div className="reveal rounded-2xl border border-gold/30 bg-white/5 p-6">
            <h3 className="font-display text-xl text-gold-bright font-bold mb-4">
              Direct Contacts
            </h3>
            <ul className="space-y-3">
              {TRUST.contacts.map((c) => (
                <li key={c.phone}>
                  <a
                    href={`tel:+91${c.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 group"
                  >
                    <span className="grid place-items-center w-10 h-10 rounded-full bg-gold/15 text-gold-bright group-hover:bg-gold group-hover:text-maroon-deep transition-colors">
                      <Phone className="w-5 h-5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-ivory-warm">{c.name}</span>
                      <span className="text-sm text-ivory-cream/70">+91 {c.phone}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 space-y-2">
              {TRUST.emails.map((em) => (
                <a
                  key={em}
                  href={`mailto:${em}`}
                  className="flex items-center gap-2 text-sm text-ivory-cream/80 hover:text-gold-bright"
                >
                  <Mail className="w-4 h-4 text-gold" /> {em}
                </a>
              ))}
            </div>
          </div>

          {/* Address + Trust */}
          <div className="reveal rounded-2xl border border-gold/30 bg-white/5 p-6">
            <h3 className="font-display text-xl text-gold-bright font-bold mb-4">
              Registered Address
            </h3>
            <p className="flex items-start gap-2 text-sm text-ivory-cream/85">
              <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              {TRUST.address}
            </p>
            <div className="mt-5 rounded-xl border border-gold/30 bg-gold/10 p-4 text-sm">
              <div className="flex items-center gap-2 text-gold-bright font-semibold">
                <ShieldCheck className="w-4 h-4" /> Registration
              </div>
              <p className="text-ivory-cream/80 mt-1">{TRUST.registration}</p>
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href={FB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform shadow-md"
                aria-label="Palava Kalibari Trust Facebook Page"
              >
                <FacebookIcon className="w-9 h-9" />
              </a>
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform shadow-md"
                aria-label="Palava Kalibari Trust Instagram Profile"
              >
                <InstagramIcon className="w-9 h-9" />
              </a>
            </div>
          </div>

          {/* Map mockup — click to open Google Maps */}
          <a
            href="https://www.google.com/maps?q=19.172499086849395,73.10843808563546"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal block rounded-2xl border border-gold/30 bg-white/5 p-2 overflow-hidden group cursor-pointer hover:border-gold/60 transition-colors"
            title="Open in Google Maps"
          >
            <div className="relative h-full min-h-[220px] rounded-xl overflow-hidden bg-[#132a1a]">
              {/* Stylized map */}
              <svg viewBox="0 0 400 260" className="absolute inset-0 w-full h-full">
                <rect width="400" height="260" fill="#16321f" />
                <g stroke="#25543a" strokeWidth="10" fill="none">
                  <path d="M-10 60 H410" />
                  <path d="M-10 160 H410" />
                  <path d="M90 -10 V270" />
                  <path d="M260 -10 V270" />
                </g>
                <g stroke="#1f4630" strokeWidth="4" fill="none">
                  <path d="M-10 110 H410" />
                  <path d="M175 -10 V270" />
                  <path d="M330 -10 V270" />
                </g>
                <rect x="20" y="180" width="55" height="55" fill="#1c3d28" rx="4" />
                <rect x="110" y="180" width="130" height="55" fill="#1c3d28" rx="4" />
                <rect x="290" y="80" width="90" height="60" fill="#1c3d28" rx="4" />
                <circle cx="175" cy="110" r="4" fill="#D4AF37" opacity="0.5" />
              </svg>

              {/* Pin */}
              <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-full text-center">
                <div className="relative inline-grid place-items-center">
                  <span className="absolute w-10 h-10 rounded-full bg-gold/40 animate-ping" />
                  <MapPin className="relative w-9 h-9 text-gold-bright drop-shadow" fill="#800020" />
                </div>
                <div className="mt-1 bg-maroon-deep/90 border border-gold/40 rounded-lg px-3 py-1.5 text-xs text-gold-bright whitespace-nowrap">
                  PKT • Inside Gate No. 2, Phase 2
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-2 bg-gold text-maroon-deep font-bold px-5 py-2.5 rounded-full text-sm shadow-lg">
                  <MapPin className="w-4 h-4" /> Open in Google Maps
                </span>
              </div>

              <span className="absolute bottom-2 right-2 text-[10px] text-ivory-cream/40">
                Click to open in Google Maps
              </span>
            </div>
          </a>
        </div>

        <div className="reveal mt-14 pt-6 border-t border-gold/20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ivory-cream/60">
          <p className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-gold" />© {new Date().getFullYear()} Palava Kalibari
            Trust. All rights reserved.
          </p>
          <p>Made with devotion for the Palava community · সবাই আমন্ত্রিত</p>
        </div>
      </div>
    </footer>
  )
}

// ══════════════════════════════════════════════════════════════
// SPONSORSHIP
// ══════════════════════════════════════════════════════════════
const SPONSORSHIP_PACKAGES = [
  {
    id: 'platinum',
    tier: 'Platinum',
    tagline: 'Category Dominance',
    price: '₹5 Lakhs',
    amount: 500000,
    icon: Crown,
    color: 'from-[#bfa14a] to-[#7c6015]',
    border: 'border-[#D4AF37]',
    shadow: '0 0 40px rgba(212,175,55,0.35)',
    perks: [
      'Main Gate branding with logo & campaign creatives',
      'Exclusive visibility on both LED screens',
      'Maximum audio-visual presence across all event days',
    ],
  },
  {
    id: 'gold',
    tier: 'Gold',
    tagline: 'High-Impact Visibility',
    price: '₹3 Lakhs',
    amount: 300000,
    icon: Medal,
    color: 'from-[#c9922a] to-[#7a500a]',
    border: 'border-[#c9922a]',
    shadow: '0 0 30px rgba(201,146,42,0.25)',
    perks: [
      'Pandal Gate / Cultural Backstage branding',
      'Visibility on both LED screens',
      'Strong venue-wide branding across all days',
    ],
  },
  {
    id: 'silver',
    tier: 'Silver',
    tagline: 'Sustained Brand Recall',
    price: '₹2 Lakhs',
    amount: 200000,
    icon: Award,
    color: 'from-[#9ea8b3] to-[#5a6370]',
    border: 'border-[#9ea8b3]',
    shadow: '0 0 24px rgba(158,168,179,0.2)',
    perks: [
      'Inner Pandal Gate branding',
      'Visibility on both LED screens',
      'Continuous presence across all days',
    ],
  },
]

function SponsorshipSection({ onSponsor }) {
  const getMailHref = (pkg) => {
    const subject = `Sponsorship Enquiry — ${pkg.tier} Package (${pkg.price})`
    const body = `Hello Palava Kalibari Trust Team,\n\nI am interested in exploring the ${pkg.tier} Sponsorship Package (${pkg.price}) for Durga Puja 2026.\n\nCompany / Organization Name:\nContact Person:\nPhone Number:\nEmail:\n\nPlease share the formal Sponsorship Deck & MOU details.\n\nThank you!`
    return `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="sponsorship" className="relative py-24 overflow-hidden bg-gradient-to-b from-[#1a0008] via-maroon-deep to-[#0f0003] text-ivory-warm">
      {/* Mandala background */}
      <div className="absolute inset-0 mandala-bg opacity-20" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] bg-gold/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Left-Aligned Section Header & Glowing CTA */}
        <div className="reveal flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 border-b border-gold/20 pb-8">
          <div className="max-w-2xl text-left">
            <span className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold-bright px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-semibold mb-3">
              <Star className="w-3.5 h-3.5" /> Brand Partnership
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ivory-warm">
              Sponsorship Packages
            </h2>
            <p className="mt-2 text-gold-bright text-base md:text-lg font-light tracking-wide">
              for Market-Leading Brands &amp; Corporate Partners
            </p>
          </div>

          {/* Left-Anchored Glowing "Become a Sponsor" Primary CTA Button */}
          <div className="shrink-0">
            <button
              onClick={onSponsor}
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 via-gold to-amber-600 text-maroon-deep font-extrabold px-7 py-3.5 rounded-full shadow-[0_0_30px_rgba(255,215,0,0.9)] animate-pulse hover:scale-[1.06] transition-all text-base border-2 border-white/60"
            >
              <Crown className="w-5 h-5 fill-maroon-deep stroke-[2.5]" />
              Become a Sponsor
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="reveal grid md:grid-cols-3 gap-6 lg:gap-8">
          {SPONSORSHIP_PACKAGES.map((pkg) => {
            const Icon = pkg.icon
            return (
              <a
                key={pkg.id}
                href={getMailHref(pkg)}
                className={`group relative flex flex-col rounded-2xl border-2 ${pkg.border} bg-gradient-to-b from-[#2a0010] to-[#150006] p-7 cursor-pointer hover:scale-[1.03] transition-all duration-300`}
                style={{ boxShadow: pkg.shadow }}
              >
                {/* Tier icon */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-5 mx-auto shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Tier name + tagline */}
                <div className="text-center mb-4">
                  <h3 className="font-display text-2xl font-bold tracking-[0.15em] uppercase text-ivory-warm">
                    {pkg.tier}
                  </h3>
                  <p className="text-[11px] tracking-[0.25em] uppercase text-gold/70 mt-1">{pkg.tagline}</p>
                  <div className="mt-3 text-4xl font-extrabold font-display" style={{ color: '#D4AF37' }}>
                    {pkg.price}
                  </div>
                </div>

                <div className="my-4 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

                {/* Perks */}
                <ul className="space-y-3 flex-1">
                  {pkg.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-ivory-cream/85">
                      <span className="text-gold mt-0.5 shrink-0">✦</span>
                      {perk}
                    </li>
                  ))}
                </ul>

                {/* CTA — Opens Sponsor Modal with Email, Razorpay & UPI options */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    if (onSponsor) onSponsor()
                  }}
                  className={`mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r ${pkg.color} text-center font-bold text-white text-sm tracking-wide shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2 border border-white/20`}
                >
                  <Crown className="w-4 h-4" />
                  Become a Sponsor ({pkg.tier})
                </button>
              </a>
            )
          })}
        </div>

        {/* Bottom note */}
        <div className="reveal mt-12 text-center p-6 rounded-2xl bg-black/40 border border-gold/30 max-w-2xl mx-auto">
          <p className="text-sm text-ivory-cream/90 font-medium">
            All corporate sponsorships include a formal MOU & brand report.
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs md:text-sm text-gold-bright">
            <Mail className="w-4 h-4 text-gold" />
            Direct Email:
            <a
              href={`mailto:${ADMIN_EMAIL}?subject=Customized%20Sponsorship%20Enquiry`}
              className="font-bold underline text-gold-bright hover:text-white transition-colors"
            >
              {ADMIN_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════
// OFFICIAL SPONSORS & CO-SPONSORS LOGO SHOWCASE
// ══════════════════════════════════════════════════════════════
function OurSponsorsSection({ onSponsor }) {
  const sponsors = [
    {
      name: 'Utkala Banga',
      logo: IMG.sponsorUtkalaBanga,
      url: 'https://www.zomato.com/mumbai/utkala-banga-dombivali-east-thane',
      desc: 'Multi-Cuisine Partner',
    },
    {
      name: 'Novo Insurance',
      logo: IMG.sponsorNovoInsurance,
      url: 'https://novoinsure.com/',
      desc: 'Insurance Broking Services',
    },
  ]

  const coSponsors = [
    {
      name: 'Canara Bank',
      logo: IMG.sponsorCanaraBank,
      url: 'https://canarabank.com',
      desc: 'Banking & Financial Partner',
    },
    {
      name: 'Senco Gold & Diamonds',
      logo: IMG.sponsorSencoJewellers,
      url: 'https://sencogoldanddiamonds.com/?srsltid=AfmBOopeUC5YMB8e37u6ux6BB0qiZJOK7EvEtLk53_TRX6hmzJG_Csmh',
      desc: 'Jeweller for Generations',
    },
    {
      name: 'Tez Mustard Oil',
      logo: IMG.sponsorTezOil,
      url: 'https://reconoil.com/',
      desc: 'Purity & Culinary Partner',
    },
    {
      name: 'Croma',
      logo: IMG.sponsorCroma,
      url: 'https://www.croma.com/?srsltid=AfmBOor7vBeU0nFuFrJApJtVsjXJbSx5-kfG3aNutTrpxxWDjszi56a1',
      desc: 'Electronics & Retail Partner',
    },
    {
      name: 'SkyLark Enterprises',
      logo: IMG.sponsorSkylark,
      desc: 'Infrastructure & Enterprise Partner',
    },
    {
      name: 'Kangen Water Palava',
      logo: IMG.sponsorKangenWater,
      desc: 'Pure Alkaline Hydration Partner',
    },
    {
      name: 'Bharat Electrical Works',
      logo: IMG.sponsorBharatElectricals,
      desc: 'Electrical & Engineering Partner',
    },
  ]

  return (
    <section id="our-partners" className="relative py-12 bg-gradient-to-b from-[#0f0003] to-[#170007] text-ivory-warm border-t border-gold/20">
      <div className="relative max-w-5xl mx-auto px-4">
        {/* Section Heading — Left Aligned with Glowing Button on Left */}
        <div className="reveal flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8 pb-4 border-b border-gold/20">
          <div className="text-left">
            <span className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/30 text-gold-bright font-bold tracking-widest uppercase text-[11px] px-3.5 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-bright" /> Official Brand Partners
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-ivory-warm">
              Sponsors &amp; Co-Sponsors
            </h2>
          </div>

          {/* Glowing "Become a Sponsor" Button on Left/Side */}
          <button
            onClick={onSponsor}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-gold to-amber-600 text-maroon-deep font-extrabold px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.8)] animate-pulse hover:scale-[1.05] transition-all text-xs sm:text-sm border border-white/50"
          >
            <Crown className="w-4 h-4 fill-maroon-deep stroke-[2.5]" />
            Become a Sponsor
          </button>
        </div>

        {/* 2-Column Grid Layout — Prominent Sponsors & Compact Co-Sponsors */}
        <div className="reveal grid md:grid-cols-2 gap-6 items-center">

          {/* COLUMN 1: SPONSORS (BIGGER & PROMINENT) */}
          <div className="rounded-2xl border-2 border-gold/50 bg-black/60 backdrop-blur-md p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gold/30">
              <span className="inline-flex items-center gap-2 text-gold-bright font-display text-lg sm:text-xl font-bold">
                <Crown className="w-5 h-5 text-gold" /> Official Sponsors
              </span>
              <span className="text-xs bg-gold/20 text-gold-bright border border-gold/40 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Title Sponsors
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {sponsors.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl bg-white p-4 flex flex-col items-center justify-center text-center shadow-lg border-2 border-amber-300/80 hover:border-gold hover:scale-[1.04] transition-all duration-300 h-32 sm:h-36 cursor-pointer"
                >
                  <div className="h-20 sm:h-24 w-full flex items-center justify-center p-1">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain filter group-hover:brightness-105 transition-all"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-1 text-xs font-bold text-slate-800 group-hover:text-maroon">
                    <span>{item.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: CO-SPONSORS (SMALLER & COMPACT) */}
          <div className="rounded-2xl border border-gold/30 bg-black/40 backdrop-blur-md p-4 shadow-lg">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-gold/20">
              <span className="inline-flex items-center gap-1.5 text-gold-bright font-display text-sm sm:text-base font-bold">
                <Award className="w-4 h-4 text-gold" /> Co-Sponsors
              </span>
              <span className="text-[10px] bg-gold/10 text-gold-bright border border-gold/30 font-medium px-2 py-0.5 rounded-full uppercase">
                Co-Sponsors
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {coSponsors.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl bg-white p-2 flex flex-col items-center justify-center text-center shadow-sm border border-slate-200/80 hover:border-gold hover:scale-[1.02] transition-all duration-300 h-20 sm:h-22 cursor-pointer"
                >
                  <div className="h-10 sm:h-12 w-full flex items-center justify-center p-1">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain filter group-hover:brightness-105 transition-all opacity-90 group-hover:opacity-100"
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-center gap-0.5 text-[10px] font-semibold text-slate-600 group-hover:text-maroon">
                    <span>{item.name}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100" />
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════
// IDOL & PATRON SPONSORS (AUTO-CHANGING CAROUSEL)
// ══════════════════════════════════════════════════════════════
function IdolSponsorSection({ onSponsor }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const patronSlides = [
    {
      id: 'anjan-family',
      badge: 'Official Idol Sponsors',
      subBadge: 'Palava Kalibari Trust',
      title: 'Anjan & Divya Dey & Family',
      description: (
        <>
          Palava Kalibari Trust extends its deepest, heartfelt gratitude to{' '}
          <strong className="text-gold-bright font-semibold">Anjan Dey &amp; Divya Dey and Family</strong> for
          their immense generosity, devotion, and continuous patronage as the official{' '}
          <strong className="text-gold-bright font-semibold">Idol Sponsors for both Durga Puja 2025 and Durga Puja 2026</strong>.
        </>
      ),
      bgImage: IMG.durgaIdolPratima,
      bgPosition: 'center 26%',
      cardImage: IMG.idolSponsorFamily,
      cardLabel: 'Anjan & Divya Dey & Family',
      pills: [
        { num: '25', text: 'Durga Puja 2025 Idol Sponsor' },
        { num: '26', text: 'Durga Puja 2026 Idol Sponsor' },
      ],
    },
    {
      id: 'sourav-ghosh',
      badge: 'Cover All Weather Support',
      subBadge: 'Palava Kalibari Trust',
      title: 'Sourav Ghosh',
      subtitleTag: 'Trustee / Entrepreneur',
      description: (
        <>
          Palava Kalibari Trust acknowledges and extends heartfelt appreciation to{' '}
          <strong className="text-gold-bright font-semibold">Sourav Ghosh (Trustee &amp; Entrepreneur)</strong> for providing{' '}
          <strong className="text-gold-bright font-semibold">Cover All Weather Support</strong> and essential infrastructure, ensuring a safe and seamless celebration.
        </>
      ),
      bgImage: IMG.patronSouravGhosh,
      bgPosition: 'center top',
      cardImage: IMG.patronSouravGhosh,
      cardLabel: 'Sourav Ghosh — Trustee / Entrepreneur',
      pills: [
        { num: '★', text: 'Cover All Weather Support' },
        { num: 'PKT', text: 'Trustee & Entrepreneur' },
      ],
    },
  ]

  useEffect(() => {
    patronSlides.forEach((slide) => {
      const img = new Image()
      img.src = slide.bgImage
      if (slide.cardImage !== slide.bgImage) {
        const cardImg = new Image()
        cardImg.src = slide.cardImage
      }
    })
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % patronSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [patronSlides.length])

  const active = patronSlides[currentSlide]

  return (
    <section id="idol-sponsors" className="relative min-h-[680px] md:min-h-[780px] overflow-hidden text-ivory-warm bg-black">
      {/* 1. Full-scale background images (cross-fading) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        {patronSlides.map((slide, idx) => (
          <img
            key={slide.id}
            src={slide.bgImage}
            alt={slide.title}
            loading={idx === 0 ? "eager" : "lazy"}
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ objectPosition: slide.bgPosition }}
          />
        ))}
        {/* Subtle top scrim */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-10" />
      </div>

      {/* Top Header Badge & Slide Switcher */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 pt-6 flex justify-between items-center">
        <span className="inline-flex items-center gap-2 bg-black/70 border border-gold/50 text-gold-bright font-bold tracking-[0.2em] uppercase text-xs px-4 py-1.5 rounded-full backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-gold-bright" /> {active.badge}
        </span>

        {/* Slide Indicators / manual switch */}
        <div className="flex items-center gap-2 bg-black/70 px-3 py-1.5 rounded-full backdrop-blur border border-gold/40">
          {patronSlides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-gold-bright' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              title={s.title}
            />
          ))}
        </div>
      </div>

      {/* 2. BOTTOM STRIP: Dynamic Write-ups + Small Photo Card */}
      <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-[#0d0004] via-[#170007]/95 to-transparent pt-16 pb-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">

          {/* Left: Gratitude Text & Badges */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold-bright text-xs font-bold uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5 text-gold" /> {active.badge}
              </span>
              <span className="text-xs text-ivory-cream/70 font-semibold">• {active.subBadge}</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-gold-bright drop-shadow-lg flex items-center justify-center md:justify-start gap-3">
              {active.title}
              {active.subtitleTag && (
                <span className="text-sm font-sans font-medium text-gold/80 bg-black/50 px-3 py-1 rounded-full border border-gold/30">
                  {active.subtitleTag}
                </span>
              )}
            </h2>

            <p className="text-xs md:text-base text-ivory-cream/90 line-clamp-3 leading-relaxed max-w-2xl font-light">
              {active.description}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              {active.pills.map((pill, i) => (
                <div key={i} className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-gold/30">
                  <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold-bright font-bold font-display text-xs">
                    {pill.num}
                  </div>
                  <span className="text-xs font-bold text-ivory-warm">{pill.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Small Photo Card (w-44 h-44 md:w-56 md:h-52) */}
          <div className="shrink-0 relative group">
            <div className="relative p-1.5 rounded-2xl bg-gradient-to-br from-gold-bright via-gold to-gold-deep shadow-2xl border-2 border-amber-300">
              <div className="relative w-44 h-44 md:w-56 md:h-52 rounded-xl overflow-hidden bg-black">
                <img
                  src={active.cardImage}
                  alt={active.cardLabel}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-2 text-center">
                  <span className="text-xs font-bold text-gold-bright flex items-center justify-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> {active.cardLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════
// SPONSORSHIP MODAL (Email, Razorpay & UPI Payment)
// ══════════════════════════════════════════════════════════════
function SponsorModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('email') // 'email' | 'razorpay' | 'upi'
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedUpi, setCopiedUpi] = useState(false)

  const sponsorSubject = "Official Sponsorship & Partnership Enquiry — Palava Kalibari Trust"
  const sponsorBody = `Dear Palava Kalibari Trust Team,

I am interested in becoming an Official Sponsor / Brand Partner for Palava Kalibari Trust Durga Puja celebrations.

Company / Brand Name: 
Contact Person Name: 
Mobile Number: 
Email Address: 
Sponsorship Package Interest (Platinum / Gold / Silver / Custom Patron): 

Please share the formal Sponsorship Deck, MOU, and LED Branding details.

Thank you!`

  const mailtoUrl = `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(sponsorSubject)}&body=${encodeURIComponent(sponsorBody)}`

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(ADMIN_EMAIL)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText(UPI_VPA)
    setCopiedUpi(true)
    setTimeout(() => setCopiedUpi(false), 2500)
  }

  return (
    <Modal onClose={onClose} maxW="max-w-2xl">
      <div className="p-1 rounded-2xl bg-gradient-to-br from-amber-400 via-gold to-amber-600 shadow-2xl">
        <div className="rounded-xl overflow-hidden bg-gradient-to-b from-[#1c000a] via-[#120006] to-[#0a0003] p-6 text-ivory-warm">
          
          {/* Header */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 text-gold-bright font-bold tracking-widest uppercase text-xs px-3.5 py-1 rounded-full mb-2">
              <Crown className="w-4 h-4 text-gold-bright" /> Brand Partnership &amp; Sponsorship
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-gold-bright">
              Become an Official Sponsor
            </h2>
            <p className="text-xs md:text-sm text-ivory-cream/80 mt-1 max-w-md mx-auto">
              Partner with Palava Kalibari Trust to showcase your brand to thousands of resident families &amp; visitors.
            </p>
          </div>

          {/* Action Tabs: Email | Razorpay | UPI */}
          <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-black/60 border border-gold/30 mb-6">
            <button
              onClick={() => setActiveTab('email')}
              className={`py-2.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'email'
                  ? 'bg-gradient-to-r from-gold-bright to-gold text-maroon-deep shadow-md'
                  : 'text-ivory-cream/70 hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>1. Email Enquiry</span>
            </button>

            <button
              onClick={() => setActiveTab('razorpay')}
              className={`py-2.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'razorpay'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                  : 'text-ivory-cream/70 hover:text-white'
              }`}
            >
              <CreditCard className="w-4 h-4 shrink-0" />
              <span>2. Razorpay</span>
            </button>

            <button
              onClick={() => setActiveTab('upi')}
              className={`py-2.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'upi'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                  : 'text-ivory-cream/70 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4 shrink-0" />
              <span>3. UPI &amp; Bank</span>
            </button>
          </div>

          {/* Tab 1: EMAIL ENQUIRY */}
          {activeTab === 'email' && (
            <div className="space-y-4 animate-fade-up">
              <div className="p-5 rounded-xl bg-black/50 border border-gold/30 text-center space-y-3">
                <p className="text-xs text-ivory-cream/90">
                  Send your sponsorship requirements directly to the Palava Kalibari Trust executive committee:
                </p>
                <div className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-gold/10 border border-gold/30 text-gold-bright font-mono text-sm font-bold">
                  <span>{ADMIN_EMAIL}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 rounded hover:bg-gold/20 text-gold-bright transition-colors"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <a
                  href={mailtoUrl}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-gold to-amber-600 text-maroon-deep font-extrabold py-3.5 px-6 rounded-xl shadow-gold text-sm hover:scale-[1.02] transition-all"
                >
                  <Mail className="w-4 h-4" /> Open Email Client with Pre-filled Sponsorship Form
                </a>
              </div>
            </div>
          )}

          {/* Tab 2: RAZORPAY PAYMENT */}
          {activeTab === 'razorpay' && (
            <div className="space-y-4 text-center animate-fade-up">
              <div className="p-5 rounded-xl bg-gradient-to-b from-blue-950/60 to-black/60 border border-blue-500/40 space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-600/30 border border-blue-400/50 flex items-center justify-center mx-auto text-blue-300">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-lg text-blue-200">
                  Secure Online Payment via Razorpay
                </h4>
                <p className="text-xs text-ivory-cream/80 max-w-md mx-auto">
                  Pay sponsorship contributions online instantly via Credit Card, Debit Card, NetBanking, Corporate Cards &amp; Wallets.
                </p>

                <a
                  href="https://razorpay.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg hover:brightness-110 transition-all text-sm border border-white/20"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-300" /> Proceed to Razorpay Payment Gateway
                </a>
              </div>
            </div>
          )}

          {/* Tab 3: UPI & BANK TRANSFER */}
          {activeTab === 'upi' && (
            <div className="space-y-4 text-center animate-fade-up">
              <div className="p-4 rounded-xl bg-black/60 border border-gold/30 space-y-3">
                <p className="text-xs text-gold-bright font-bold">
                  Official Payee: {UPI_PAYEE}
                </p>

                {/* Scannable QR Standee */}
                <div className="w-48 h-48 mx-auto p-2 bg-white rounded-2xl shadow-xl border-2 border-gold flex items-center justify-center">
                  <img src={UPI_QR_IMAGE} alt="ICICI Bank UPI QR Standee" className="w-full h-full object-contain" />
                </div>

                <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-gold/10 border border-gold/30 text-gold-bright font-mono text-xs font-bold">
                  <span>{UPI_VPA}</span>
                  <button
                    onClick={handleCopyUpi}
                    className="p-1 rounded hover:bg-gold/20 text-gold-bright transition-colors"
                  >
                    {copiedUpi ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <a
                  href={`upi://pay?pa=${encodeURIComponent(UPI_VPA)}&pn=${encodeURIComponent(UPI_PAYEE)}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs hover:brightness-110 transition-all"
                >
                  <Smartphone className="w-4 h-4" /> Open GPay / PhonePe / Paytm App
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </Modal>
  )
}

// ══════════════════════════════════════════════════════════════
// YEAR EVENTS DATA & STANDALONE DEDICATED PAGE VIEW
// ══════════════════════════════════════════════════════════════
const YEAR_EVENTS_DATA = {
  '2023-2024': {
    year: '2023–2024',
    title: 'Events & Celebrations (2023–2024)',
    subtitle: 'Celebrating faith, culture, and our inaugural gatherings in Palava',
    events: [
      {
        title: 'Saraswati Pujo 2023–2024',
        date: 'February 2024',
        venue: 'Palava Kalibari Grounds',
        image: '/about-saraswati-puja.jpg',
        description: 'As the gentle strains of devotion filled the air, Saraswati Pujo celebrated the goddess of wisdom, learning, and art. Dressed in hues of spring and adorned with flowers, PKT members came together to seek her blessings for knowledge and inspiration. The festival wove together faith, culture, and joy, creating cherished moments that honored both heritage and the pursuit of enlightenment.',
        highlights: [
          'Pushpanjali & Haate Khori for children seeking Maa Saraswati blessings',
          'Vibrant spring attire, traditional decorations & prasad distribution',
          'Cultural music, rabindra sangeet & community togetherness',
        ],
      },
    ],
  },
  '2024-2025': {
    year: '2024–2025',
    title: 'Events & Celebrations (2024–2025)',
    subtitle: 'A vibrant year of festivals, culinary heritage, Durga Pujo & community picnic',
    events: [
      {
        title: 'Poila Boishakh 2024–2025',
        date: 'April 2024',
        venue: 'Palava Community Pavilion',
        image: '/about-organizers-duo.jpg',
        description: 'With hearts adorned in festive cheer and the promise of new beginnings, Poila Boishakh arrived like a vibrant song of spring. The air blossomed with laughter, melodies, and warm wishes as families and communities came together to celebrate Bengal’s rich heritage. The festival filled every heart with joy, hope, and the spirit of togetherness.',
        highlights: [
          'Welcoming the Bengali New Year with traditional attire & music',
          'Cultural evening, Noboborsho feast & community meet-and-greet',
        ],
      },
      {
        title: 'Ilish Utsav 2024–2025',
        date: 'August 2024',
        venue: 'Palava Kalibari Hall',
        image: '/annadan-plate.jpg',
        description: 'At Ilish Utsav, the silver queen of Bengal took center stage, delighting hearts and palates alike. The aroma of traditional delicacies, laughter, and shared memories filled the air, celebrating a timeless bond with Bengal’s culinary heritage. A festival of flavors, tradition, and togetherness, it was pure joy served on a plate.',
        highlights: [
          'Celebration of Bengal’s culinary silver queen',
          'Traditional Hilsa preparations served fresh to resident families',
        ],
      },
      {
        title: 'Durga Pujo 2024–2025',
        date: 'October 2024',
        venue: 'Gate No. 2, Lodha Palava Phase 2',
        image: '/about-durgotsav-2024-women.jpg',
        description: 'As the dhak beats echoed and vibrant pandal lit up the autumn sky, Durga Pujo brought together devotion, culture, and celebration. Filled with adda, laughter, and cherished traditions, it was a joyous tribute to Bengal’s spirit.',
        highlights: [
          'Grand Pandal illumination, sacred pushpanjali & dhak beats',
          'Daily Bhog Prasad, adda sessions & evening cultural stage',
        ],
      },
      {
        title: 'Kali Pujo 2024–2025',
        date: 'November 2024',
        venue: 'Palava Kalibari Grounds',
        image: '/about-trust-reg.jpg',
        description: 'Beneath a sky glowing with lamps and hope, the first Kali Pujo of PKT unfolded in sacred splendor. Amid chants, devotion, and festive gatherings, hearts united to seek Maa Kali’s divine blessings.',
        highlights: [
          'First official Kali Pujo of PKT in sacred splendor',
          'Diwali illumination, midnight mantras & community offerings',
        ],
      },
      {
        title: 'Annual Picnic 2024–2025',
        date: 'December 2024',
        venue: 'Palava Outing Grounds',
        image: '/about-women-team.jpg',
        description: 'The Annual Picnic brought everyone together for a day of joy, laughter, and camaraderie. Amid games, conversations, and shared experiences, it created cherished memories and strengthened the bonds that make our community special.',
        highlights: [
          'Day of fun, games, delicious food & outdoor activities',
          'Strengthening resident community bonds and friendships',
        ],
      },
      {
        title: 'Saraswati Pujo 2024–2025',
        date: 'February 2025',
        venue: 'Palava Kalibari Auditorium',
        image: '/about-saraswati-puja.jpg',
        description: 'With joyful hearts and festive cheer, Saraswati Pujo was celebrated with prayers, vibrant cultural performances, and music. Communities came together to seek blessings for wisdom and inspiration while honoring Bengal’s rich traditions. The celebration beautifully blended faith, culture, and joy, creating cherished memories for all.',
        highlights: [
          'Vasant Panchami pushpanjali, youth music & dance gala',
          'Celebrating wisdom, art & Bengal’s rich cultural heritage',
        ],
      },
    ],
  },
  '2025-2026': {
    year: '2025–2026',
    title: 'Events & Celebrations (2025–2026)',
    subtitle: 'Current active year featuring Ilish Utsav, 800+ Annadan Durga Pujo & Kali Pujo',
    events: [
      {
        title: 'Poila Baishakh 2025–2026',
        date: 'April 2025',
        venue: 'Palava Kalibari Grounds',
        image: '/about-organizers-duo.jpg',
        description: 'With hearts blooming in festive cheer, Poila Boishakh arrived like a joyful melody of spring. Laughter, music, and warm wishes filled the air as loved ones came together, celebrating Bengal’s rich heritage with hope, happiness, and the promise of new beginnings.',
        highlights: [
          'Noboborsho spring melodies, traditional attire & feast',
        ],
      },
      {
        title: 'Ilish Utsav 2025–2026',
        date: 'August 2025',
        venue: 'Grand Pandal Hall, Lodha Palava Phase 2',
        image: '/annadan-plate.jpg',
        description: 'At Ilish Utsav, the iconic flavours of Hilsa came alive in a delightful celebration of taste and tradition. From the golden crispness of Ilish Bhaja and the mustard-rich Sorshe Ilish to aromatic Ilish Paturi and delicate Bhapa Ilish, every preparation celebrated Bengal’s timeless culinary heritage. A joyful feast where flavours, memories, and togetherness came beautifully alive.',
        highlights: [
          'Golden Ilish Bhaja, mustard Sorshe Ilish, Ilish Paturi & Bhapa Ilish',
          'Authentic Hilsa feast celebrating culinary heritage',
        ],
      },
      {
        title: 'Durga Pujo 2025–2026',
        date: 'September – October 2025',
        venue: 'Gate No. 2, Lodha Palava Phase 2',
        image: '/durga-idol-pratima.jpg',
        description: 'Durga Pujo came alive with festive splendour, devotion, and joyful togetherness. From annadaan catering to 800+ people, vibrant cultural programs, Dhunochi Naach, dance and musical performances to an enchanting magic show, every moment added colour and cheer to the celebration, beautifully capturing the spirit of Bengal.',
        highlights: [
          'Annadan Seba catering to 800+ resident visitors daily',
          'Sponsored Maa Durga Pratima (Anjan & Divya Dey)',
          'Dhunochi Naach, magic show & live musical performances',
        ],
      },
      {
        title: 'Kali Pujo 2025–2026',
        date: 'October 2025',
        venue: 'Palava Kalibari Grounds',
        image: '/about-men-team.jpg',
        description: 'Kali Pujo unfolded in an aura of devotion and festive radiance, with red hibiscus flowers, soulful mantra chanting, and glowing rows of oil lamps illuminating the celebrations. From the sacred offering of bhog to the heartfelt Bisarjan, every moment beautifully reflected faith, tradition, and togetherness.',
        highlights: [
          'Red hibiscus offerings, oil lamp illumination & mantra chanting',
          'Sacred bhog distribution and heartfelt Bisarjan ceremony',
        ],
      },
      {
        title: 'Annual Picnic 2025–2026',
        date: 'December 2025',
        venue: 'Palava Resort & Swimming Pool Grounds',
        image: '/about-collage-happiness.jpg',
        description: 'The Annual Picnic was a delightful day of laughter, relaxation, and togetherness at a wonderful venue. With delicious food, exciting activities and games, refreshing moments by the swimming pool, and the cheerful company of friends and family, it was a perfect blend of fun and fond memories.',
        highlights: [
          'Fun resort outing with swimming pool games & activities',
          'Delicious community food & cherished memories with family',
        ],
      },
      {
        title: 'Saraswati Pujo 2025–2026',
        date: 'February 2026',
        venue: 'Palava Kalibari Auditorium',
        image: '/about-saraswati-puja.jpg',
        description: 'Saraswati Pujo, celebrated on the auspicious occasion of Vasant Panchami, filled the day with devotion and the vibrant hues of yellow. From Haate Khori, placing books before the Goddess, bhog, and cultural performances to heartfelt wishes for the community’s board exam students, the celebration beautifully honoured knowledge, learning, and new beginnings.',
        highlights: [
          'Vasant Panchami yellow theme, Haate Khori & placing books at deity feet',
          'Special blessings & wishes for board exam students & kids',
        ],
      },
    ],
  },
  '2026-2027': {
    year: '2026–2027',
    title: 'Events & Celebrations (2026–2027)',
    subtitle: 'Upcoming flagship festival line-up, Poila Boishakh, Rabindra Nazrul Jayanti & Durga Pujo 2026',
    events: [
      {
        title: 'Poila Boishakh 2026–2027',
        date: 'April 2026',
        venue: 'Palava Kalibari Cultural Hall',
        image: '/about-organizers-duo.jpg',
        description: 'Poila Boishakh welcomed the Bengali New Year with festive cheer, authentic Bengali cuisine, and joyful get-togethers in traditional attire. The celebrations came alive with Bengali folk music and soulful poetry recitations, beautifully capturing the warmth, culture, and spirit of Bengal.',
        highlights: [
          'Authentic Bengali cuisine, traditional attire & Noboborsho meetup',
          'Bengali folk music & soulful poetry recitations',
        ],
      },
      {
        title: 'Rabindra Nazrul Jayanti 2026–2027',
        date: 'May 2026',
        venue: 'Palava Kalibari Auditorium',
        image: '/about-dancers.jpg',
        description: 'Rabindra Nazrul Jayanti was a vibrant cultural celebration honouring the birth anniversaries of Bengal’s literary and musical icons, Gurudev Rabindranath Tagore and Rebel Poet Kazi Nazrul Islam. Soulful musical performances, graceful dances, delicious food, and warm meet-and-greets brought everyone together in a joyful tribute to their timeless legacy.',
        highlights: [
          'Tribute to Gurudev Rabindranath Tagore & Kazi Nazrul Islam',
          'Classical dances, musical recitals & community food meet',
        ],
      },
      {
        title: 'Durga Pujo 2026–2027',
        date: 'October 16 – 20, 2026',
        venue: 'Gate No. 2, Lodha Palava Phase 2',
        image: '/durga-idol-pratima.jpg',
        description: 'The pinnacle 5-day cultural extravaganza celebrating Durga Puja 2026 with sponsored Maa Durga Pratima idol, Cover All Weather Support by Sourav Ghosh, 1,000+ daily Annadan Seba, and mega stage performances.',
        highlights: [
          '10,000+ expected visitors across 5 festive days',
          'Cover All Weather Support by Sourav Ghosh & Sponsored Durga Idol',
          'Platinum, Gold & Silver brand partnerships & 1,000+ daily Annadan Seba',
        ],
      },
    ],
  },
}

function YearEventsPage({ yearKey, onNavigateYear, onGoHome, onJoin, onSponsor }) {
  const data = YEAR_EVENTS_DATA[yearKey] || YEAR_EVENTS_DATA['2025-2026']
  const [slideIndex, setSlideIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // Extract all photos from events
  const slides = data.events.map((ev, idx) => ({
    image: ev.image,
    title: ev.title,
    date: ev.date,
    venue: ev.venue,
    eventIndex: idx,
    description: ev.description,
  }))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setSlideIndex(0)
  }, [yearKey])

  // Auto-changing slideshow timer (every 4 seconds)
  useEffect(() => {
    if (!isPlaying || slides.length === 0) return
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isPlaying, slides.length])

  const currentSlide = slides[slideIndex] || slides[0]

  return (
    <div className="min-h-screen bg-[#070002] text-ivory-warm">
      <Header onJoin={onJoin} onSponsor={onSponsor} onOpenYearEvents={onNavigateYear} />

      <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 space-y-6">
        
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <div className="flex items-center gap-2 text-xs font-bold text-gold-bright bg-black/60 backdrop-blur px-4 py-1.5 rounded-full border border-gold/40 shadow-lg">
            <button onClick={onGoHome} className="hover:underline flex items-center gap-1 text-ivory-cream/80">
              Home
            </button>
            <span>/</span>
            <span className="text-gold/80">Events Archive</span>
            <span>/</span>
            <span className="text-gold-bright font-extrabold">{data.year}</span>
          </div>

          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-bright to-gold-deep text-maroon-deep font-extrabold text-xs px-5 py-2 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.6)] hover:scale-105 transition-all"
          >
            ← Back to Main Home Page
          </button>
        </div>

        {/* Glowing 4-Year Page Redirection Switcher */}
        <div className="p-4 rounded-2xl bg-black/80 backdrop-blur border-2 border-gold/60 shadow-[0_0_25px_rgba(255,215,0,0.5)]">
          <div className="text-xs uppercase font-extrabold tracking-widest text-gold-bright mb-2.5 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-bright" /> Select Event Year — 70% Photo Showcase &amp; 30% Events View:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { key: '2023-2024', label: '📜 2023–2024' },
              { key: '2024-2025', label: '📅 2024–2025' },
              { key: '2025-2026', label: '★ 2025–2026' },
              { key: '2026-2027', label: '🚀 2026–2027' },
            ].map((item) => {
              const active = item.key === yearKey
              return (
                <button
                  key={item.key}
                  onClick={() => onNavigateYear(item.key)}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all text-center ${
                    active
                      ? 'bg-gradient-to-r from-amber-500 via-gold to-amber-600 text-maroon-deep shadow-[0_0_20px_rgba(255,215,0,0.85)] scale-[1.03] border-2 border-white/60'
                      : 'bg-gold/10 border border-gold/30 text-ivory-warm hover:bg-gold hover:text-maroon-deep'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Year Title Header */}
        <div className="text-left pt-2 pb-1">
          <span className="inline-flex items-center gap-2 bg-gold/15 border border-gold/40 text-gold-bright font-extrabold tracking-widest uppercase text-xs px-3.5 py-1 rounded-full mb-2">
            <CalendarDays className="w-3.5 h-3.5" /> {data.year} Photo Gallery &amp; Event Feed
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-gold-bright leading-tight">
            {data.title}
          </h1>
          <p className="text-sm md:text-base text-ivory-cream/80 mt-1 font-light">
            {data.subtitle}
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            70% PICTURE SHOWCASE (LEFT) & 30% EVENTS FEED (RIGHT)
           ══════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">

          {/* ── LEFT COLUMN: 70% Photo Showcase with Auto-Changing Slideshow ── */}
          <div className="w-full lg:w-[70%] flex flex-col rounded-3xl bg-black border-2 border-gold/60 overflow-hidden shadow-[0_0_35px_rgba(255,215,0,0.3)] relative min-h-[480px] md:min-h-[600px] justify-between">
            
            {/* Auto-Changing Slide Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              {slides.map((s, idx) => (
                <img
                  key={idx}
                  src={s.image}
                  alt={s.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    idx === slideIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100 pointer-events-none'
                  }`}
                  style={{ transitionProperty: 'opacity, transform' }}
                />
              ))}
              {/* Vignette & Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070002] via-black/40 to-black/30" />
            </div>

            {/* Top Bar inside 70% Canvas */}
            <div className="relative z-10 p-4 md:p-6 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 bg-black/75 border border-gold/60 text-gold-bright text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-gold-bright" /> Auto-Changing Photo Showcase • {slideIndex + 1} of {slides.length}
              </span>

              {/* Pause/Play Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-black/70 hover:bg-gold hover:text-maroon-deep text-gold-bright border border-gold/50 p-2 rounded-full transition-all text-xs font-bold flex items-center gap-1 backdrop-blur"
                title={isPlaying ? 'Pause Auto Slideshow' : 'Play Auto Slideshow'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>

            {/* Bottom Overlay Info inside 70% Canvas */}
            <div className="relative z-10 p-6 md:p-8 bg-gradient-to-t from-[#070002] via-[#070002]/90 to-transparent">
              <span className="text-xs font-extrabold text-gold-bright bg-maroon-deep/90 border border-gold/50 px-3 py-1 rounded-full">
                {currentSlide.date}
              </span>
              <h2 className="font-display text-2xl md:text-4xl font-extrabold text-gold-bright mt-3 leading-snug drop-shadow-md">
                {currentSlide.title}
              </h2>
              <p className="text-xs text-gold/80 flex items-center gap-1.5 font-medium mt-1">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0" /> {currentSlide.venue}
              </p>
              {currentSlide.description && (
                <p className="text-xs md:text-sm text-ivory-cream/90 font-light leading-relaxed mt-2.5 max-w-3xl italic">
                  "{currentSlide.description}"
                </p>
              )}

              {/* Arrow Controls & Dot Indicators */}
              <div className="flex items-center justify-between mt-5 pt-3 border-t border-gold/30">
                <div className="flex items-center gap-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === slideIndex ? 'w-8 bg-gold' : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                    className="p-2 rounded-full bg-black/70 border border-gold/40 text-gold-bright hover:bg-gold hover:text-maroon-deep transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSlideIndex((prev) => (prev + 1) % slides.length)}
                    className="p-2 rounded-full bg-black/70 border border-gold/40 text-gold-bright hover:bg-gold hover:text-maroon-deep transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: 30% Events Timeline Feed ── */}
          <div className="w-full lg:w-[30%] flex flex-col space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#20000a] to-[#120005] border-2 border-gold/50 text-center shadow-lg">
              <span className="text-xs font-extrabold uppercase tracking-widest text-gold-bright flex items-center justify-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-gold" /> Events Feed ({data.year})
              </span>
              <p className="text-[11px] text-ivory-cream/70 mt-1">
                Click any event below to view its photo in the 70% showcase
              </p>
            </div>

            {/* Events List Cards (30% Width Column) */}
            <div className="flex-1 space-y-3.5 overflow-y-auto pr-1">
              {data.events.map((ev, idx) => {
                const isActive = slideIndex === idx
                return (
                  <div
                    key={idx}
                    onClick={() => setSlideIndex(idx)}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#3a0010] to-[#200008] border-gold shadow-[0_0_20px_rgba(255,215,0,0.5)] scale-[1.02]'
                        : 'bg-black/60 border-gold/30 hover:border-gold/60 hover:bg-black/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-extrabold text-gold-bright uppercase tracking-wider bg-gold/15 border border-gold/30 px-2 py-0.5 rounded-md">
                        {ev.date}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 animate-pulse">
                          ● Viewing Photo
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-base text-ivory-warm leading-snug group-hover:text-gold-bright">
                      {ev.title}
                    </h3>
                    <p className="text-[11px] text-gold/80 mt-1 flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3 text-gold shrink-0" /> {ev.venue}
                    </p>

                    {/* Write-up snippet */}
                    {ev.description && (
                      <p className="text-xs text-ivory-cream/80 font-light leading-relaxed mt-2 pt-2 border-t border-gold/15 line-clamp-3 italic">
                        "{ev.description}"
                      </p>
                    )}

                    {/* Highlights */}
                    <ul className="mt-2.5 pt-2 border-t border-gold/10 space-y-1 text-[11px] text-ivory-cream/75">
                      {ev.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-gold shrink-0 mt-0.5">✦</span>
                          <span className="leading-tight">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

          </div>

        </div>

      </main>

      <Footer onSponsor={onSponsor} />
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
// APP
// ══════════════════════════════════════════════════════════════
export default function App() {
  useReveal()
  const [booking, setBooking] = useState(null)
  const [sponsorModal, setSponsorModal] = useState(false)
  const [routeHash, setRouteHash] = useState(window.location.hash || '#home')
  const joinRef = useRef(null)

  useEffect(() => {
    const onHashChange = () => {
      setRouteHash(window.location.hash || '#home')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const goJoin = () => {
    if (routeHash.startsWith('#events-')) {
      window.location.hash = '#membership'
    } else if (joinRef.current) {
      joinRef.current()
    }
  }

  const openSponsor = () => setSponsorModal(true)

  const navigateYearEvents = (yearKey) => {
    window.location.hash = `#events-${yearKey}`
  }

  const goHome = () => {
    window.location.hash = '#home'
  }

  // Check if current URL route is a dedicated year event page (e.g. #events-2023-2024)
  const isEventsPage = routeHash.startsWith('#events-')
  const currentEventYear = isEventsPage ? routeHash.replace('#events-', '') : null

  if (isEventsPage && currentEventYear) {
    return (
      <>
        <YearEventsPage
          yearKey={currentEventYear}
          onNavigateYear={navigateYearEvents}
          onGoHome={goHome}
          onJoin={goJoin}
          onSponsor={openSponsor}
        />
        {sponsorModal && <SponsorModal onClose={() => setSponsorModal(false)} />}
      </>
    )
  }

  return (
    <div className="min-h-screen">
      <Header onJoin={goJoin} onSponsor={openSponsor} onOpenYearEvents={navigateYearEvents} />
      <main>
        <Hero onJoin={goJoin} onSponsor={openSponsor} />
        <IlishSection onBook={setBooking} />
        <DurgaSection />
        <AnnadanSection />
        <DonationSection />
        <MembershipSection registerJoinRef={joinRef} />
        <SponsorshipSection onSponsor={openSponsor} />
        <IdolSponsorSection onSponsor={openSponsor} />
        <AboutSection />
        <OurSponsorsSection onSponsor={openSponsor} />
      </main>
      <Footer onSponsor={openSponsor} />

      {booking && <BookingModal platter={booking} onClose={() => setBooking(null)} />}
      {sponsorModal && <SponsorModal onClose={() => setSponsorModal(false)} />}
    </div>
  )
}
