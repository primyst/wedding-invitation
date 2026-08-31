"use client";

const TABS = [
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export default function NavBar() {
  function go(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-zinc-900 bg-[#0A0A0B]/80 backdrop-blur-sm">
      <nav className="flex items-center justify-between px-6 sm:px-10 lg:px-16 h-14">
        <button
          onClick={() => go("top")}
          className="text-sm font-medium text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B9BFF] rounded"
        >
          Abdulqudus
        </button>
        <ul className="hidden sm:flex items-center gap-1 text-sm">
          {TABS.map((t) => (
            <li key={t.id}>
              <button
                onClick={() => go(t.id)}
                className="px-3 py-1.5 rounded text-zinc-400 hover:text-[#8B9BFF] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B9BFF]"
              >
                {t.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
