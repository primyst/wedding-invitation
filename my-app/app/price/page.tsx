"use client";
import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Zap, Globe, LayoutDashboard, ShoppingBag, Code2, Link, Wrench, ArrowRight } from "lucide-react";

const services = [
  {
    id: "landing",
    icon: Zap,
    label: "Landing Pages",
    range: "₦150,000 – ₦250,000",
    tagline: "Focused, conversion-ready single-page sites.",
    timeline: "1 – 2 weeks",
    includes: [
      "Single-page structure with defined sections",
      "Fully responsive design (all devices)",
      "WhatsApp & contact integration",
      "Basic SEO setup",
      "Animations & micro-interactions",
      "Fast deployment",
    ],
    scopeNote: "Price varies by design complexity, animation depth, and conversion structure quality.",
    bestFor: ["Personal brands", "Small businesses", "Product/service promotion", "Marketing campaigns"],
  },
  {
    id: "business",
    icon: Globe,
    label: "Business Websites",
    range: "₦250,000 – ₦450,000",
    tagline: "Multi-page sites for structured, credible business presence.",
    timeline: "2 – 4 weeks",
    includes: [
      "3–6 pages (Home, About, Services, Contact, etc.)",
      "Responsive UI design",
      "Contact & inquiry forms",
      "Service structuring & content layout",
      "Basic SEO setup",
      "Social media integration",
      "Deployment",
    ],
    scopeNote: "Upper range applies to more pages, richer UI, or tighter timelines.",
    bestFor: ["Companies & agencies", "Schools & institutions", "Travel & service businesses", "NGOs & professional practices"],
  },
  {
    id: "premium",
    icon: Globe,
    label: "Premium Business Websites",
    range: "₦450,000 – ₦800,000",
    tagline: "High-end builds for brands that compete on perception.",
    timeline: "3 – 6 weeks",
    tag: "Most Popular",
    includes: [
      "Fully custom UI/UX system",
      "Advanced interactions & animations",
      "Strong UX architecture",
      "Conversion-focused structure",
      "Performance optimization",
      "Scalable front-end codebase",
    ],
    scopeNote: "Built for brands where design directly drives trust and revenue.",
    bestFor: ["Established businesses", "Growth-stage startups", "Brands focused on perception & authority"],
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    label: "E-Commerce Stores",
    range: "₦400,000 – ₦750,000",
    tagline: "Stores built to sell — not just display.",
    timeline: "3 – 5 weeks",
    includes: [
      "Product catalogue & management",
      "Cart & checkout flow",
      "Paystack / payment gateway integration",
      "Order management system",
      "Inventory tracking",
      "Responsive storefront design",
      "Deployment",
    ],
    scopeNote: "Price scales with product volume, custom logic, and integrations required.",
    bestFor: ["Retail businesses", "Fashion & lifestyle brands", "Food & consumer goods", "Digital product sellers"],
  },
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboards & Admin Systems",
    range: "₦600,000 – ₦1,200,000",
    tagline: "Internal tools that make operations actually work.",
    timeline: "4 – 8 weeks",
    includes: [
      "Admin dashboards",
      "Role-based access & permissions",
      "Data management interfaces",
      "Analytics & reporting panels",
      "Secure UI architecture",
    ],
    scopeNote: "Depends on workflow complexity, user roles, database structure, and integrations.",
    bestFor: ["Operations-heavy businesses", "Platforms needing internal tooling", "Multi-staff organizations"],
  },
  {
    id: "webapp",
    icon: Code2,
    label: "Custom Web Applications",
    range: "₦900,000 – ₦3,000,000+",
    tagline: "Full-scale products and SaaS platforms.",
    timeline: "6 – 16 weeks",
    includes: [
      "SaaS platforms",
      "Booking & reservation systems",
      "Marketplace systems",
      "Complex business logic",
      "API & third-party integrations",
      "Authentication & user management",
    ],
    scopeNote: "Scoped individually. Final price based on feature depth, architecture, real-time needs, and integrations.",
    bestFor: ["Startups building products", "Businesses automating workflows", "Platforms with user management"],
  },
  {
    id: "blockchain",
    icon: Link,
    label: "Blockchain-Based Systems",
    range: "Custom Quote",
    tagline: "Web3 interfaces and smart contract-integrated applications.",
    timeline: "By agreement",
    includes: [
      "Smart contract integration (UI layer)",
      "Wallet connection & management",
      "On-chain interaction flows",
      "Security-conscious architecture",
      "dApp interfaces",
    ],
    scopeNote: "Priced after scoping — complexity, contract logic, and security requirements vary significantly.",
    bestFor: ["Web3 startups", "DeFi projects", "NFT platforms", "Tokenized systems"],
  },
  {
    id: "maintenance",
    icon: Wrench,
    label: "Maintenance & Retainer",
    range: "₦30,000 – ₦120,000 / month",
    tagline: "Ongoing support so your site stays fast, updated, and working.",
    timeline: "Monthly rolling",
    includes: [
      "Content & copy updates",
      "Bug fixes & performance checks",
      "Security monitoring",
      "Minor feature additions",
      "Uptime & deployment management",
    ],
    scopeNote: "Tier depends on update frequency, site complexity, and response time requirements.",
    bestFor: ["Active businesses with frequent changes", "Sites with regular content cycles", "Clients who want peace of mind"],
  },
];

function ServiceCard({ service }: { service: typeof services[0] }) {
  const [open, setOpen] = useState(false);
  const Icon = service.icon;
  const isCustom = service.range === "Custom Quote";

  return (
    <div className={`group relative border border-zinc-800 bg-zinc-900/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-amber-500/40 hover:bg-zinc-900 ${open ? "border-amber-500/30 bg-zinc-900" : ""}`}>
      {service.tag && (
        <div className="absolute top-4 right-4 bg-amber-500 text-zinc-950 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
          {service.tag}
        </div>
      )}
      <div
        className="p-6 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Icon className="w-4.5 h-4.5 text-amber-400" size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-white font-semibold text-base leading-tight">{service.label}</h3>
              <div className="flex-shrink-0 text-zinc-500">
                {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
            <p className="text-zinc-400 text-sm mt-1 leading-snug">{service.tagline}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className={`font-bold text-sm ${isCustom ? "text-amber-400" : "text-amber-400"}`}>
                {service.range}
              </span>
              <span className="text-zinc-600 text-xs">·</span>
              <span className="text-zinc-500 text-xs">{service.timeline}</span>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="px-6 pb-6 space-y-5 border-t border-zinc-800 pt-5">
          <div>
            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3">What's Included</p>
            <ul className="space-y-2">
              {service.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                  <Check className="flex-shrink-0 mt-0.5 text-amber-500" size={14} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-1.5">Scope Note</p>
            <p className="text-zinc-400 text-sm leading-relaxed">{service.scopeNote}</p>
          </div>

          <div>
            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-2.5">Best For</p>
            <div className="flex flex-wrap gap-2">
              {service.bestFor.map((tag, i) => (
                <span key={i} className="text-xs text-zinc-400 bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PrimystPricing() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      <div className="relative max-w-2xl mx-auto px-5 py-16">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Primyst Solutions
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Web Development<br />
            <span className="text-amber-400">Pricing</span>
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed max-w-lg">
            Modern, scalable, and conversion-focused web experiences for brands, startups, and businesses. All prices are in Nigerian Naira (₦).
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-zinc-600" />Prices are starting points</span>
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-zinc-600" />Final quote after requirement analysis</span>
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-zinc-600" />Tap any service to expand</span>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 border border-zinc-800 rounded-2xl p-7 bg-zinc-900/40 text-center">
          <h2 className="text-white font-semibold text-lg mb-2">Not sure which tier fits?</h2>
          <p className="text-zinc-400 text-sm mb-5 leading-relaxed">
            Describe your project and I'll give you a clear scope and honest quote — no pressure, no guesswork.
          </p>
          <a
            href="https://wa.me/message/+2347035612652"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm px-6 py-3 rounded-xl transition-colors duration-200"
          >
            Start a Conversation
            <ArrowRight size={15} />
          </a>
          <p className="text-zinc-600 text-xs mt-4">primyst.com · hello@primyst.com</p>
        </div>
      </div>
    </div>
  );
}
