import { useEffect, useRef, useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Boxes, BrainCircuit, Check,
  Database, Eye, Globe2, Layers3, Linkedin, Mail, Menu,
  Network, ScanLine, Sprout, Workflow, X, type LucideIcon,
} from 'lucide-react'

type ResearchArea = { title: string; description: string; icon: LucideIcon }

const researchAreas: ResearchArea[] = [
  { title: 'Artificial Intelligence', description: 'Intelligent systems designed to work through complex, real-world problems.', icon: BrainCircuit },
  { title: 'Machine Learning', description: 'Models and methods that find useful patterns in diverse data.', icon: Network },
  { title: 'Decision Intelligence', description: 'Bringing data and context together to support more informed decisions.', icon: Layers3 },
  { title: 'Computer Vision', description: 'Exploring how machines interpret and understand visual information.', icon: Eye },
  { title: 'Environmental Intelligence', description: 'Understanding environmental data to inform more considered action.', icon: Globe2 },
  { title: 'Data Platforms', description: 'Reliable foundations for making complex information useful and accessible.', icon: Database },
  { title: 'Automation & Productivity', description: 'Thoughtful automation that helps people focus on higher-value work.', icon: Workflow },
  { title: 'Agricultural Technology', description: 'Exploring the role of emerging technologies in a changing agricultural landscape.', icon: Sprout },
]

const capabilities = ['Enterprise AI & Data Platforms', 'Microsoft Azure', 'Applied Machine Learning', 'Systems Integration', 'Automation Engineering', 'Product Development', 'Cloud Architecture', 'Digital Transformation']
const navigation = [{ label: 'About', href: '#about' }, { label: 'Research', href: '#research' }, { label: 'Vision', href: '#vision' }, { label: 'Founder', href: '#founder' }]
const linkedIn = 'https://www.linkedin.com/in/sampadalam'
const contactEmail = 'support@ameez.ca'

function Brand({ footer = false }: { footer?: boolean }) {
  return <a className={`brand ${footer ? 'brand-footer' : ''}`} href="#home" aria-label="Ameez Research Labs home">
    <img className="brand-mark" src={`${import.meta.env.BASE_URL}ameez-monogram.svg`} alt="" />
    <span className="brand-name">AMEEZ<span>RESEARCH LABS</span></span>
  </a>
}

function ResearchVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    let frame = 0
    let width = 0
    let height = 0
    let tick = 0
    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = width * ratio
      canvas.height = height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
    const draw = () => {
      context.clearRect(0, 0, width, height)
      const centerX = width * 0.53
      const centerY = height * 0.5
      const radius = Math.min(width * 0.36, height * 0.36)
      const time = reducedMotion ? 0 : tick * 0.003
      const glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.65)
      glow.addColorStop(0, 'rgba(27, 105, 163, .19)')
      glow.addColorStop(0.55, 'rgba(16, 82, 122, .07)')
      glow.addColorStop(1, 'rgba(5, 7, 20, 0)')
      context.fillStyle = glow
      context.fillRect(0, 0, width, height)

      for (let ring = 0; ring < 15; ring++) {
        const latitude = (ring / 14 - 0.5) * Math.PI * 0.92
        const ringRadius = Math.cos(latitude) * radius
        const y = Math.sin(latitude) * radius * 0.82
        context.beginPath()
        for (let step = 0; step <= 120; step++) {
          const angle = (step / 120) * Math.PI * 2
          const wave = Math.sin(angle * 3 + ring * 0.6 + time) * radius * 0.018
          const x = centerX + Math.cos(angle) * ringRadius
          const pointY = centerY + y + Math.sin(angle) * ringRadius * 0.24 + wave
          if (step === 0) context.moveTo(x, pointY)
          else context.lineTo(x, pointY)
        }
        context.strokeStyle = `rgba(70, 177, 201, ${0.08 + (1 - Math.abs(latitude) / 1.6) * 0.13})`
        context.lineWidth = 0.7
        context.stroke()
      }
      for (let line = 0; line < 20; line++) {
        const longitude = line / 20 * Math.PI * 2 + time * 0.13
        context.beginPath()
        for (let step = 0; step <= 80; step++) {
          const latitude = (step / 80 - 0.5) * Math.PI
          const x = centerX + Math.cos(latitude) * Math.cos(longitude) * radius
          const y = centerY + Math.sin(latitude) * radius * 0.82 + Math.cos(latitude) * Math.sin(longitude) * radius * 0.24
          if (step === 0) context.moveTo(x, y)
          else context.lineTo(x, y)
        }
        context.strokeStyle = 'rgba(73, 158, 190, .12)'
        context.lineWidth = 0.65
        context.stroke()
      }
      for (let index = 0; index < 85; index++) {
        const angle = index * 2.399 + time * (index % 2 ? 0.1 : -0.1)
        const spread = Math.sqrt((index + 1) / 85)
        const x = centerX + Math.cos(angle) * radius * spread * 1.65
        const y = centerY + Math.sin(angle) * radius * spread * 1.22
        const alpha = 0.18 + (index % 5) * 0.1
        context.beginPath()
        context.arc(x, y, index % 13 === 0 ? 1.8 : 0.8, 0, Math.PI * 2)
        context.fillStyle = `rgba(${index % 3 === 0 ? '45, 212, 191' : '118, 190, 233'}, ${alpha})`
        context.fill()
      }
      tick++
      if (!reducedMotion) frame = requestAnimationFrame(draw)
    }
    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize) }
  }, [reducedMotion])

  return <div className="visual" aria-hidden="true">
    <div className="visual-grid" />
    <canvas ref={canvasRef} />
    <div className="visual-cross visual-cross-one">+</div><div className="visual-cross visual-cross-two">+</div>
  </div>
}

function SectionHeading({ title, description }: { title: string; description?: string }) {
  return <div className="section-heading">
    <div className="section-heading-main"><h2>{title}</h2>{description && <p>{description}</p>}</div>
  </div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formReady, setFormReady] = useState(false)
  const reducedMotion = useReducedMotion()

  function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') || '').trim()
    const organization = String(data.get('organization') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()
    const subject = `Website inquiry from ${name}`
    const body = `Name: ${name}\nOrganization: ${organization || 'Not provided'}\nEmail: ${email}\n\nMessage:\n${message}`
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setFormReady(true)
  }

  return <div id="home" className="site-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          {navigation.map(item => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
          <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Get in touch <ArrowUpRight size={15} /></a>
        </nav>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
    </header>

    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-inner">
          <motion.div className="hero-copy" initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="hero-eyebrow"><span className="status-dot" /> INDEPENDENT RESEARCH. LASTING IMPACT.</div>
            <h1 id="hero-title">Applied AI Research <span>for a Better Future<span className="title-dot">.</span></span></h1>
            <p>Building intelligent systems that transform complex data into meaningful decisions for organizations, industries, and society.</p>
            <div className="hero-actions"><a className="button button-primary" href="#about">Explore Our Mission <ArrowRight size={17} /></a><a className="button button-text" href="#contact">Contact Us <ArrowUpRight size={17} /></a></div>
          </motion.div>
          <ResearchVisual />
        </div>
        <div className="container hero-bottom"><a href="#about">SCROLL TO EXPLORE <ArrowDown size={14} /></a><span>EST. 2022</span></div>
      </section>

      <section id="about" className="section about-section">
        <div className="container">
          <SectionHeading title="About Ameez" />
          <div className="about-layout"><div className="about-lead">Curiosity, grounded<br />in <span>real-world purpose.</span></div><div className="about-copy"><p>Ameez is a Canadian AI research and technology company focused on developing practical artificial intelligence systems that address real-world challenges.</p><p>Our work combines machine learning, data engineering, cloud computing, intelligent automation, and applied research to create technologies that generate measurable impact.</p></div></div>
        </div>
      </section>

      <section id="research" className="section research-section">
        <div className="container">
          <SectionHeading title="Research Areas" description="Exploring the intersection of intelligence, data, and the world around us." />
          <div className="research-grid">{researchAreas.map((area, index) => <motion.article className="research-card" key={area.title} initial={reducedMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}><div className="card-top"><area.icon size={23} strokeWidth={1.4} /></div><h3>{area.title}</h3><p>{area.description}</p><ArrowUpRight className="card-arrow" size={17} aria-hidden="true" /></motion.article>)}</div>
          <div className="research-footnote"><span><span className="status-dot" /> AREAS OF EXPLORATION</span><span>RESEARCH WITH PURPOSE <ArrowRight size={14} /></span></div>
        </div>
      </section>

      <section id="vision" className="section vision-section"><div className="container vision-layout"><div><h2>Our Vision<span className="title-dot">.</span></h2><div className="vision-symbol" aria-hidden="true"><span /><span /><span /></div></div><div className="vision-copy"><p className="vision-lead">We believe artificial intelligence can help solve some of humanity’s most important challenges.</p><p>From sustainability and resource management to knowledge accessibility and decision-making, our goal is to develop technology that creates meaningful long-term value for businesses, communities, and society.</p><div className="vision-values"><span>THOUGHTFUL BY DESIGN</span><span>BUILT FOR THE LONG TERM</span></div></div></div></section>

      <section id="founder" className="section founder-section"><div className="container"><SectionHeading title="Founder" description="Built on experience. Guided by curiosity." /><div className="founder-layout"><div className="portrait-placeholder" aria-hidden="true"><div className="portrait-grid" /><div className="portrait-symbol"><img src={`${import.meta.env.BASE_URL}ameez-monogram.svg`} alt="" /></div></div><div className="founder-content"><div className="founder-heading"><div><h3>Sampad Alam</h3><p>Founder & Principal Architect<br />Based in Ontario, Canada</p></div></div><div className="founder-bio"><p>Founded by Sampad Alam, a technology expert with nearly two decades of experience delivering enterprise software, AI, cloud, automation, and digital transformation solutions across North America and globally.</p><p>Sampad has held engineering and technology leadership roles across multiple industries, designing and delivering mission-critical platforms involving cloud computing, enterprise data management, business intelligence, workflow automation, modern applications, and artificial intelligence.</p><p>Through Ameez Research Labs, he is combining deep engineering expertise with applied research to build practical AI technologies that address complex real-world challenges.</p></div><div className="capabilities"><span className="small-label">AREAS OF EXPERIENCE</span><div>{capabilities.map(item => <span key={item}><Check size={13} /> {item}</span>)}</div></div><div className="founder-links"><a href={linkedIn} target="_blank" rel="noreferrer" aria-label="Sampad Alam's LinkedIn profile"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} /></a><a href={`mailto:${contactEmail}`}><Mail size={16} /> Email <ArrowUpRight size={14} /></a></div></div></div></div></section>

      <section className="collaboration"><div className="container collaboration-inner"><div><h2>Building for<br /><span>the Long Term.</span></h2></div><div className="collaboration-copy"><p>Ameez is currently developing next-generation AI technologies and exploring collaboration opportunities with researchers, advisors, pilot partners, and innovative organizations.</p><p>We welcome conversations with individuals and organizations interested in helping shape the future of applied intelligence.</p><a className="text-link" href="#contact">Start a conversation <ArrowRight size={17} /></a></div><div className="collaboration-art" aria-hidden="true"><Boxes size={110} strokeWidth={0.45} /></div></div></section>

      <section id="contact" className="section contact-section"><div className="container contact-layout"><div className="contact-intro"><h2>Let's Connect<span className="title-dot">.</span></h2><p>Have a question, an idea, or an opportunity to collaborate? We would be glad to hear from you.</p><a className="contact-email" href={`mailto:${contactEmail}`}><Mail size={17} /> {contactEmail} <ArrowUpRight size={15} /></a><div className="contact-aside"><ScanLine size={18} /><span>OPEN TO THOUGHTFUL<br />CONVERSATIONS</span></div></div><form className="contact-form" onSubmit={handleContact}><div className="form-row"><label><span>Name *</span><input name="name" autoComplete="name" placeholder="Your name" required /></label><label>Organization<input name="organization" autoComplete="organization" placeholder="Organization name" /></label></div><label><span>Email *</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label><label><span>Message *</span><textarea name="message" rows={5} placeholder="Tell us a little about what you have in mind" required /></label><div className="form-bottom"><button className="button button-primary" type="submit">Send Message <ArrowUpRight size={17} /></button><span>Opens in your email application</span></div>{formReady && <p className="form-feedback" role="status">Your email application should open with your message ready to send.</p>}</form></div></section>
    </main>

    <footer className="footer"><div className="container"><div className="footer-main"><div><Brand footer /><p>Canadian AI Research & Technology Company</p></div><div className="footer-links"><div><span>NAVIGATION</span><a href="#home">Home</a><a href="#about">About</a><a href="#research">Research</a><a href="#founder">Founder</a><a href="#contact">Contact</a></div><div><span>CONNECT</span><a href={linkedIn} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a><a href={`mailto:${contactEmail}`}>Email <ArrowUpRight size={13} /></a></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Ameez Research Labs. All rights reserved.</span></div></div></footer>
  </div>
}

export default App