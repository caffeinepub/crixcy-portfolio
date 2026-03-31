import {
  Camera,
  Clock,
  Headphones,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Scale,
  Shield,
  Sparkles,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ---------- Scroll fade hook ----------
function useFadeOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".section-fade");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1 },
    );
    for (const el of Array.from(els)) observer.observe(el);
    return () => observer.disconnect();
  }, []);
}

// ---------- Particle Background ----------
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    const particles: {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      opacitySpeed: number;
    }[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.6 + 0.1,
        opacitySpeed: (Math.random() - 0.5) * 0.005,
      });
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += p.opacitySpeed;
        if (p.opacity < 0.05) p.opacitySpeed = Math.abs(p.opacitySpeed);
        if (p.opacity > 0.7) p.opacitySpeed = -Math.abs(p.opacitySpeed);
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(69, 230, 255, ${p.opacity})`;
        ctx.fill();
      }
      animFrame = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// ---------- Navbar ----------
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "HOME", href: "#hero" },
    { label: "ABOUT", href: "#about" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "CURRENT WORK", href: "#current-work" },
    { label: "SKILLS", href: "#skills" },
    { label: "CONTACT", href: "#contact" },
  ];

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(6,11,20,0.92)" : "rgba(6,11,20,0.6)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid rgba(69,230,255,0.15)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          data-ocid="nav.link"
          className="flex items-center gap-2 text-lg font-extrabold tracking-widest uppercase"
          style={{
            color: "#45E6FF",
            textShadow: "0 0 12px rgba(69,230,255,0.7)",
          }}
        >
          <Sparkles size={18} style={{ color: "#45E6FF" }} />
          CRIXCY
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-ocid="nav.link"
              onClick={(e) => {
                e.preventDefault();
                handleNav(l.href);
              }}
              className="text-xs font-semibold tracking-widest transition-colors duration-200"
              style={{ color: "#AFC2D6" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#45E6FF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#AFC2D6";
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded"
          style={{ color: "#45E6FF" }}
          onClick={() => setOpen(!open)}
          data-ocid="nav.toggle"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: "rgba(6,11,20,0.97)" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-ocid="nav.link"
              onClick={(e) => {
                e.preventDefault();
                handleNav(l.href);
              }}
              className="text-sm font-semibold tracking-widest py-2 border-b"
              style={{ color: "#AFC2D6", borderColor: "rgba(69,230,255,0.15)" }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ---------- Hero ----------
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-animated"
      style={{ paddingTop: "4rem" }}
    >
      <ParticleCanvas />

      {/* Radial glow behind title */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(69,230,255,0.06) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />

      <div className="relative text-center px-4 z-10">
        {/* Title */}
        <h1
          className="glow-title font-inter font-black uppercase tracking-widest select-none"
          style={{
            fontSize: "clamp(56px, 12vw, 110px)",
            color: "#EAF6FF",
            lineHeight: 1,
            marginBottom: "1.25rem",
          }}
        >
          CRIXCY
        </h1>

        {/* Subtitle */}
        <p
          className="font-semibold uppercase tracking-widest mb-4"
          style={{
            fontSize: "clamp(13px, 2.5vw, 22px)",
            color: "#45E6FF",
            letterSpacing: "0.2em",
          }}
        >
          Minecraft Staff &nbsp;|&nbsp; Moderator &nbsp;|&nbsp; Staff Manager
        </p>

        {/* Tagline */}
        <p
          className="max-w-xl mx-auto mb-10"
          style={{ fontSize: "15px", color: "#AFC2D6", lineHeight: 1.7 }}
        >
          Helping Minecraft servers grow with strong moderation and management.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="btn-primary px-8 py-3 rounded-full text-sm font-bold tracking-wide"
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="hero.primary_button"
          >
            Contact Me
          </button>
          <button
            type="button"
            className="btn-outline px-8 py-3 rounded-full text-sm font-bold tracking-wide"
            onClick={() =>
              document
                .querySelector("#experience")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="hero.secondary_button"
          >
            View Experience
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #060B14)",
          zIndex: 2,
        }}
      />
    </section>
  );
}

// ---------- Section Heading ----------
function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-10">
      <h2
        className="font-extrabold uppercase tracking-widest mb-3"
        style={{ fontSize: "clamp(20px, 4vw, 28px)", color: "#EAF6FF" }}
      >
        {title}
      </h2>
      <div className="cyan-divider w-32" />
    </div>
  );
}

// ---------- About ----------
function About() {
  return (
    <section
      id="about"
      className="py-24 px-4"
      style={{ background: "#060B14" }}
    >
      <div className="max-w-4xl mx-auto section-fade">
        <SectionHeading title="About Me" />
        <div className="glass-card rounded-2xl p-8 md:p-12">
          <p
            className="mb-8 leading-relaxed"
            style={{ fontSize: "15px", color: "#AFC2D6", lineHeight: 1.85 }}
          >
            Hello! I'm Crixcy, a 15-year-old Minecraft staff member from India
            (GMT +5:30). I am available for around 3–5 hours in-game daily and
            remain active on Discord for 10+ hours. I can contribute effectively
            to your server with my strong staff management skills and ability to
            support team members in resolving issues. I'm also capable of
            mentoring new staff, helping them adapt and improve. Additionally, I
            have basic experience in media management and can assist in
            organizing tournaments and server events, ensuring smooth execution
            and player engagement.
          </p>

          {/* Info chips */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: <MapPin size={14} />, text: "India (GMT +5:30)" },
              { icon: <Clock size={14} />, text: "3–5h in-game daily" },
              { icon: <Headphones size={14} />, text: "10+ hours Discord" },
            ].map((chip) => (
              <div
                key={chip.text}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(69,230,255,0.1)",
                  border: "1px solid rgba(69,230,255,0.35)",
                  color: "#45E6FF",
                }}
              >
                {chip.icon}
                {chip.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Experience ----------
const experienceData = [
  {
    role: "Staff Manager",
    server: "DeathMC",
    members: "3,500+ members",
    players: "Avg 310 players",
    status: "Closed",
    statusColor: "#ff6b6b",
  },
  {
    role: "Admin (SM)",
    server: "KyroMC",
    members: "2,850+ members",
    players: "Avg 60+ players",
    status: "Past",
    statusColor: "#AFC2D6",
  },
  {
    role: "Senior Moderator",
    server: "UniversalMC",
    members: "11,200+ members",
    players: "Avg 600–750 players",
    status: "Past",
    statusColor: "#AFC2D6",
  },
  {
    role: "Senior Moderator",
    server: "PlumSMP",
    members: "7,000+ members",
    players: "Avg 500–600 players",
    status: "Ended",
    statusColor: "#ffa94d",
  },
  {
    role: "Jr. Moderator",
    server: "BlockFun",
    members: "37,000+ members",
    players: "Avg 550–600 players",
    status: "Past",
    statusColor: "#AFC2D6",
  },
  {
    role: "Helper",
    server: "CrystalChaos",
    members: "11,000+ members",
    players: "Avg 350–400 players",
    status: "Past",
    statusColor: "#AFC2D6",
  },
];

function Experience() {
  return (
    <section
      id="experience"
      className="py-24 px-4"
      style={{
        background: "linear-gradient(180deg, #060B14 0%, #080f1e 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto section-fade">
        <SectionHeading title="Experience" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {experienceData.map((exp, i) => (
            <div
              key={exp.server}
              className="glass-card rounded-xl p-6"
              data-ocid={`experience.item.${i + 1}`}
            >
              <p
                className="font-bold mb-1"
                style={{ fontSize: "15px", color: "#EAF6FF" }}
              >
                {exp.role}
              </p>
              <p
                className="font-semibold mb-4"
                style={{ fontSize: "18px", color: "#45E6FF" }}
              >
                {exp.server}
              </p>
              <div className="flex flex-col gap-1 mb-4">
                <span style={{ fontSize: "13px", color: "#AFC2D6" }}>
                  👥 {exp.members}
                </span>
                <span style={{ fontSize: "13px", color: "#AFC2D6" }}>
                  🎮 {exp.players}
                </span>
              </div>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: `${exp.statusColor}18`,
                  border: `1px solid ${exp.statusColor}55`,
                  color: exp.statusColor,
                }}
              >
                {exp.status}
              </span>
            </div>
          ))}
        </div>
        <p
          className="text-center italic text-sm"
          style={{ color: "#AFC2D6", opacity: 0.7 }}
        >
          I've included Discord member counts and average player base to reflect
          server scale and activity.
        </p>
      </div>
    </section>
  );
}

// ---------- Current Work ----------
const currentRoles = [
  {
    role: "Admin",
    server: "Cavern",
    members: "6,000+ Discord members",
    players: "100+ avg player base",
  },
  {
    role: "Staff Member",
    server: "FastClient",
    members: "11,500+ Discord members",
    players: null,
  },
];

function CurrentWork() {
  return (
    <section
      id="current-work"
      className="py-24 px-4"
      style={{
        background:
          "linear-gradient(180deg, #080f1e 0%, #071420 50%, #060B14 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto section-fade">
        <div
          className="rounded-2xl p-8 md:p-12 mb-2"
          style={{
            background: "rgba(10,22,38,0.7)",
            border: "1.5px solid rgba(69,230,255,0.5)",
            boxShadow:
              "0 0 50px rgba(69,230,255,0.15), 0 0 100px rgba(69,230,255,0.05)",
          }}
        >
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <h2
                className="font-extrabold uppercase tracking-widest"
                style={{ fontSize: "clamp(20px, 4vw, 28px)", color: "#EAF6FF" }}
              >
                Current Work
              </h2>
              <span
                className="active-badge px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{
                  border: "1px solid rgba(69,230,255,0.7)",
                  background: "rgba(69,230,255,0.1)",
                  color: "#45E6FF",
                }}
              >
                ● Active
              </span>
            </div>
            <div className="cyan-divider w-32" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentRoles.map((r, i) => (
              <div
                key={r.server}
                className="glass-card rounded-xl p-6 relative"
                data-ocid={`current-work.item.${i + 1}`}
              >
                <div className="absolute top-4 right-4">
                  <span
                    className="active-badge flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      border: "1px solid rgba(69,230,255,0.65)",
                      background: "rgba(69,230,255,0.1)",
                      color: "#45E6FF",
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#45E6FF",
                        display: "inline-block",
                        animation: "dotPulse 1.5s ease-in-out infinite",
                      }}
                    />
                    ACTIVE
                  </span>
                </div>
                <p
                  className="font-bold mb-1 pr-20"
                  style={{ fontSize: "15px", color: "#EAF6FF" }}
                >
                  {r.role}
                </p>
                <p
                  className="font-semibold mb-4"
                  style={{ fontSize: "20px", color: "#45E6FF" }}
                >
                  {r.server}
                </p>
                <div className="flex flex-col gap-1">
                  <span style={{ fontSize: "13px", color: "#AFC2D6" }}>
                    👥 {r.members}
                  </span>
                  {r.players && (
                    <span style={{ fontSize: "13px", color: "#AFC2D6" }}>
                      🎮 {r.players}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Skills ----------
const skills = [
  {
    icon: Shield,
    label: "Staff Management",
    desc: "Leading and organizing staff teams with clarity and efficiency.",
  },
  {
    icon: Scale,
    label: "Moderation & Conflict Handling",
    desc: "Fair, consistent rule enforcement and dispute resolution.",
  },
  {
    icon: Users,
    label: "Team Mentoring",
    desc: "Onboarding and guiding new staff to perform at their best.",
  },
  {
    icon: Trophy,
    label: "Event & Tournament Hosting",
    desc: "Organizing engaging server events and tournaments smoothly.",
  },
  {
    icon: Camera,
    label: "Basic Media Management",
    desc: "Assisting with content creation and server media coordination.",
  },
];

function Skills() {
  return (
    <section
      id="skills"
      className="py-24 px-4"
      style={{ background: "#060B14" }}
    >
      <div className="max-w-5xl mx-auto section-fade">
        <SectionHeading title="Skills" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="glass-card rounded-xl p-6 flex flex-col gap-3"
                data-ocid={`skills.item.${i + 1}`}
              >
                <Icon
                  size={36}
                  style={{
                    color: "#45E6FF",
                    filter: "drop-shadow(0 0 8px rgba(69,230,255,0.5))",
                  }}
                />
                <p
                  className="font-bold"
                  style={{ color: "#EAF6FF", fontSize: "15px" }}
                >
                  {s.label}
                </p>
                <p
                  style={{
                    color: "#AFC2D6",
                    fontSize: "13px",
                    lineHeight: 1.6,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------- Contact ----------
function Contact() {
  const contacts = [
    {
      icon: Mail,
      platform: "Email",
      handle: "utsav557799@gmail.com",
      href: "mailto:utsav557799@gmail.com",
      ocid: "contact.email.link",
    },
    {
      icon: MessageCircle,
      platform: "Discord",
      handle: "tisu78",
      href: "https://discord.com/users/tisu78",
      ocid: "contact.discord.link",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 px-4"
      style={{
        background: "linear-gradient(180deg, #060B14 0%, #080f1e 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto section-fade text-center">
        <SectionHeading title="Contact" />
        <p className="mb-10 text-sm" style={{ color: "#AFC2D6" }}>
          Interested in having me on your team? Reach out through any of the
          channels below.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contacts.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.platform}
                href={c.href}
                target={c.platform === "Discord" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="glass-card rounded-xl p-8 flex flex-col items-center gap-3 no-underline"
                data-ocid={c.ocid}
              >
                <Icon
                  size={40}
                  style={{
                    color: "#45E6FF",
                    filter: "drop-shadow(0 0 10px rgba(69,230,255,0.5))",
                  }}
                />
                <p className="font-bold text-base" style={{ color: "#EAF6FF" }}>
                  {c.platform}
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#45E6FF" }}
                >
                  {c.handle}
                </p>
                <p className="text-xs" style={{ color: "#AFC2D6" }}>
                  Click to reach out
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;
  return (
    <footer
      className="py-8 px-4 text-center"
      style={{
        borderTop: "1px solid",
        borderImage:
          "linear-gradient(90deg, transparent, rgba(69,230,255,0.4), transparent) 1",
        background: "#060B14",
      }}
    >
      <p className="text-xs" style={{ color: "#AFC2D6", opacity: 0.6 }}>
        © {year} Crixcy. Built for Minecraft staff excellence. &nbsp;·&nbsp;
        Built with ❤️ using{" "}
        <a
          href={utm}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#45E6FF" }}
        >
          caffeine.ai
        </a>
      </p>
    </footer>
  );
}

// ---------- App ----------
export default function App() {
  useFadeOnScroll();

  return (
    <div className="font-inter min-h-screen" style={{ background: "#060B14" }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <CurrentWork />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
