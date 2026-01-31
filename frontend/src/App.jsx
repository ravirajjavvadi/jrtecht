    // frontend/src/App.jsx
    import React, { useState, useEffect } from "react"; // Explicitly import useState and useEffect

    /**
     * JR Tech Solutions Landing Page
     *
     * This React application renders a high-end landing page for JR Tech Solutions.
     * It uses plain CSS for styling and vanilla JavaScript with CSS classes for animations,
     * replacing Tailwind CSS and Framer Motion to simplify setup and avoid errors.
     * The contact form submits data to a Node.js Express backend.
     */
                                     
    // --- Helper Components ---
    // These functional components are reusable UI blocks, now using standard HTML elements
    // and referencing classes from index.css.

    /**
     * Stat Component: Displays a key metric.
     * @param {object} props - Componaent props.
     * @param {string} props.title - The title of the statistic (e.g., "Uptime").
     * @param {string} props.value - The value of the statistic (e.g., "99.99%").
     */
    function Stat({ title, value }) {
      return (
        <div className="rounded-lg p-3 bg-slate-800/40 border border-white/5">
          <div className="text-xs text-slate-400">{title}</div>
          <div className="text-xl font-bold">{value}</div>
        </div>
      );
    }

    /**
     * FeatureCard Component: Highlights a key product feature.
     * Includes a subtle lift animation on hover using CSS transitions.
     * @param {object} props - Component props.
     * @param {string} props.title - The title of the feature.
     * @param {string} props.desc - A brief description of the feature.
     * @param {string} props.icon - An emoji or character for the feature icon.
     */
    function FeatureCard({ title, desc, icon }) {
      return (
        <div
          className="rounded-2xl p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/40 border border-white/5 shadow-lg
                     transition-transform duration-300 hover:-translate-y-1.5"
        >
          <div className="text-3xl">{icon}</div>
          <div className="mt-4 font-semibold text-lg">{title}</div>
          <div className="mt-2 text-slate-400">{desc}</div>
        </div>
      );
    }

    /**
     * StepCard Component: Represents a step in a process.
     * Includes a subtle scale animation on hover using CSS transitions.
     * @param {object} props - Component props.
     * @param {number} props.index - The step number.
     * @param {string} props.title - The title of the step.
     * @param {string} props.desc - A description of the step.
     */
    function StepCard({ index, title, desc }) {
      return (
        <div
          className="rounded-xl p-6 bg-slate-800/30 border border-white/5
                     transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="w-10 h-10 rounded-md bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center font-bold">{index}</div>
          <div className="mt-4 font-semibold">{title}</div>
          <div className="mt-2 text-slate-400">{desc}</div>
        </div>
      );
    }

    /**
     * PriceCard Component: Displays details for a pricing plan.
     * Can be styled as 'featured' to stand out.
     * Includes a subtle lift animation on hover using CSS transitions.
     * @param {object} props - Component props.
     * @param {string} props.title - The title of the pricing plan (e.g., "Pro").
     * @param {string} props.price - The price (e.g., "$49/mo", "Free").
     * @param {string[]} props.benefits - An array of benefits included in the plan.
     * @param {boolean} [props.featured=false] - True if this plan should be highlighted.
     */
    function PriceCard({ title, price, benefits, featured = false }) {
      const featuredClasses = featured
        ? "bg-gradient-to-br from-indigo-700 to-pink-600 shadow-2xl text-white"
        : "bg-slate-800/30";
      const buttonClasses = featured
        ? "bg-white text-black font-semibold"
        : "bg-gradient-to-r from-indigo-500 to-pink-500 text-white";

      return (
        <div
          className={`rounded-2xl p-6 ${featuredClasses} border border-white/5
                     transition-transform duration-300 hover:-translate-y-2`}
        >
          <div className="flex items-center justify-between">
            <div className="font-semibold text-lg">{title}</div>
            <div className="text-xl font-bold">{price}</div>
          </div>
          <ul className="mt-4 text-slate-300 space-y-2">
            {benefits.map((b) => (
              <li key={b} className="text-sm">• {b}</li>
            ))}
          </ul>
          <div className="mt-6">
            <button className={`w-full py-3 rounded-md ${buttonClasses}`}>Choose</button>
          </div>
        </div>
      );
    }

    // --- Main App Component ---
    // This is the root component that renders the entire landing page UI.
    // It manages state for the contact form's input, loading, and feedback.
    export default function App() {
      // State variables for the contact form's email and message inputs
      const [contactEmail, setContactEmail] = useState('');
      const [contactMessage, setContactMessage] = useState('');
      // State for managing loading status during form submission
      const [contactLoading, setContactLoading] = useState(false);
      // State to indicate if the form submission was successful (true/false/null)
      const [contactSuccess, setContactSuccess] = useState(null);
      // State to store feedback message for the user after form submission
      const [contactFeedback, setContactFeedback] = useState('');

      // Define the URL for the backend contact form API endpoint
      const CONTACT_API_URL = 'http://localhost:3001/contact'; // Must match the backend server.js route

      // useEffect to apply initial animations using plain CSS classes after component mounts
      useEffect(() => {
        // Hero Left animation
        const heroLeft = document.querySelector('.hero-left');
        if (heroLeft) {
          heroLeft.classList.add('hero-left-animate');
        }

        // Hero Right animation
        const heroRight = document.querySelector('.hero-right');
        if (heroRight) {
          heroRight.classList.add('hero-right-animate');
        }

        // Chart animation
        const chart = document.querySelector('.chart-content');
        if (chart) {
          chart.classList.add('chart-animate');
        }

        // Floating Card animation (uses CSS keyframes defined in index.css)
        const floatingCard = document.querySelector('.floating-card');
        if (floatingCard) {
          floatingCard.classList.add('floating-card-animate');
        }

        // Pendrive Mockup animation
        const pendriveMockup = document.querySelector('.pendrive-mockup');
        if (pendriveMockup) {
          pendriveMockup.classList.add('pendrive-mockup-animate');
        }

        // Plug to Launch card animation (uses CSS keyframes defined in index.css)
        const plugLaunch = document.querySelector('.plug-launch');
        if (plugLaunch) {
          plugLaunch.classList.add('plug-launch-animate');
        }

      }, []); // Empty dependency array means this runs once after the initial render


      /**
       * handleContactSubmit: Asynchronous function to handle the contact form submission.
       * @param {Event} e - The submit event from the form.
       */
      const handleContactSubmit = async (e) => {
        e.preventDefault(); // Prevent the browser's default form submission (which causes a page reload)

        // Reset feedback states before starting a new submission
        setContactLoading(true);
        setContactSuccess(null);
        setContactFeedback('');

        try {
          // Send a POST request to the backend with the form data as JSON
          const response = await fetch(CONTACT_API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Specify that we are sending JSON data
            },
            // Convert email and message state values to a JSON string for the request body
            body: JSON.stringify({ email: contactEmail, message: contactMessage }),
          });

          // Parse the JSON response from the backend
          const result = await response.json();

          // Check if the HTTP response status is OK (2xx)
          if (response.ok) {
            setContactSuccess(true); // Mark as success
            setContactFeedback(result.message); // Set success message from backend
            // Clear the form fields after a successful submission
            setContactEmail('');
            setContactMessage('');
          } else {
            // If response is not OK, it's an error from the backend (e.g., 400 Bad Request)
            setContactSuccess(false); // Mark as failure
            // Use backend's error message or a generic one
            setContactFeedback(result.message || 'Something went wrong. Please try again.');
          }
        } catch (error) {
          // Catch network errors (e.g., backend server is not running)
          console.error('Error submitting contact form:', error);
          setContactSuccess(false); // Mark as failure
          setContactFeedback('Network error. Please ensure the backend server is running.');
        } finally {
          // Always set loading to false after the fetch operation completes
          setContactLoading(false);
        }
      };

      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-slate-900 to-black text-slate-100 font-inter">
          {/* NAV Section */}
          <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg shadow-2xl flex items-center justify-center text-black font-bold">JR</div>
              <div>
                <div className="text-lg font-semibold">JR Tech Solutions</div>
                <div className="text-xs text-slate-400">Software & Cloud — Next-level products</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-slate-300">
              <a className="hover:text-white" href="#features">Features</a>
              <a className="hover:text-white" href="#work">How it works</a>
              <a className="hover:text-white" href="#product">Product</a>
              <a className="hover:text-white" href="#pricing">Pricing</a>
              <a className="hover:text-white" href="#contact">Contact</a>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-md font-medium shadow-lg">Get Demo</button>
            </div>
          </nav>

          {/* UPCOMING PRODUCT BANNER Section */}
          <section className="max-w-7xl mx-auto px-6 -mt-4">
            <div className="rounded-lg p-4 bg-gradient-to-r from-indigo-800/40 to-pink-800/20 border border-white/5 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center text-black font-bold">🔥</div>
                <div>
                  <div className="text-sm text-yellow-300 font-semibold">NEW · COMING SOON</div>
                  <div className="text-lg font-bold">AI SmartBill — Plug. Bill. Done.</div>
                  <div className="text-sm text-slate-300 mt-1 max-w-xl">An AI-powered, pendrive-ready billing experience for shopkeepers — instant launch, barcode & voice-assisted billing, predictive suggestions, and offline-first performance.</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-md bg-white text-black font-semibold shadow">Notify me</button>
                <a className="text-sm text-slate-300 underline" href="#product">Learn more</a>
              </div>
            </div>
          </section>

          {/* HERO Section */}
          <header className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 hero-left hero-left-initial"> {/* Added CSS classes for animation */}
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Build fast. Ship secure.
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400"> Next-level software</span>
              </h1>
              <p className="mt-6 text-lg text-slate-300 max-w-xl">
                We create performant, beautiful software systems with modern UI and rock-solid architecture — all optimized to scale.
                Animated, intuitive, and built for conversion.
              </p>

              <div className="mt-8 flex gap-4">
                <button className="px-6 py-3 rounded-lg bg-white text-black font-semibold shadow-xl">Request Demo</button>
                <button className="px-6 py-3 rounded-lg border border-slate-700 text-slate-200">See Docs</button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
                <Stat title="Faster launch" value="3x" />
                <Stat title="Uptime" value="99.99%" />
              </div>
            </div>

            {/* UI Mockup */}
            <div className="flex-1 hero-right hero-right-initial"> {/* Added CSS classes for animation */}
              <div className="relative w-full max-w-xl mx-auto">
                <div className="rounded-3xl p-6 bg-gradient-to-tr from-[#0f172a]/60 to-[#021126]/40 backdrop-blur-sm border border-white/5 shadow-2xl">
                  {/* top bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="w-3 h-3 bg-yellow-400 rounded-full" />
                      <span className="w-3 h-3 bg-green-400 rounded-full" />
                    </div>
                    <div className="text-xs text-slate-400">Dashboard • Live</div>
                  </div>

                  {/* animated chart */}
                  <div className="h-44 w-full rounded-lg bg-gradient-to-b from-slate-800/40 to-transparent p-4 flex flex-col justify-between chart-content chart-initial"> {/* Added CSS classes for animation */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-300 font-medium">Revenue</div>
                      <div className="text-sm text-slate-400">Monthly</div>
                    </div>
                    <svg viewBox="0 0 120 40" className="w-full h-28">
                      <defs>
                        <linearGradient id="g1" x1="0" x2="1">
                          <stop offset="0%" stopColor="#7c3aed" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                      <path d="M0 30 L15 20 L30 22 L45 12 L60 16 L75 8 L90 16 L105 10 L120 6" fill="none" stroke="url(#g1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div>Low</div>
                      <div>High</div>
                    </div>
                  </div>
                </div>
                {/* floating card */}
                <div
                  className="absolute -bottom-6 right-6 w-44 rounded-xl p-4 bg-gradient-to-br from-indigo-600/20 to-pink-600/12 border border-white/5 shadow-lg floating-card" /* Added CSS class for animation */
                >
                  <div className="text-xs text-slate-300">Active Users</div>
                  <div className="text-2xl font-bold">1000+</div>
                </div>
              </div>
            </div>
          </header>

          {/* PRODUCT SPOTLIGHT Section */}
          <section id="product" className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-semibold">AI SmartBill — Designed for Shopkeepers</h2>
                <p className="mt-4 text-lg text-slate-300 max-w-xl">Fast, offline-first billing that runs directly from a pendrive or as a desktop app. AI suggestions, voice billing, barcode scanning, and a minimal, high-contrast UI that keeps queues moving.</p>

                <ul className="mt-6 space-y-3">
                  <li className="flex items-start gap-3"><span className="text-indigo-400 font-bold">•</span> <span className="text-slate-300">Instant launch from pendrive (Electron portable build)</span></li>
                  <li className="flex items-start gap-3"><span className="text-indigo-400 font-bold">•</span> <span className="text-slate-300">AI-powered suggestions & quick-add buttons</span></li>
                  <li className="flex items-start gap-3"><span className="text-indigo-400 font-bold">•</span> <span className="text-slate-300">Offline-first with local DB and sync</span></li>
                  <li className="flex items-start gap-3"><span className="text-indigo-400 font-bold">•</span> <span className="text-slate-300">Full-screen, tactile UI for billing counters</span></li>
                </ul>

                <div className="mt-6 flex gap-4">
                  <button className="px-5 py-3 rounded-md bg-gradient-to-r from-indigo-500 to-pink-500 font-semibold">Join Waitlist</button>
                  <button className="px-5 py-3 rounded-md border border-white/10">Request Beta</button>
                </div>
              </div>

              {/* Animated pendrive mockup */}
              <div className="relative w-full max-w-md mx-auto">
                <div
                  className="rounded-2xl p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/40 border border-white/6 shadow-2xl pendrive-mockup pendrive-mockup-initial" /* Added CSS classes for animation */
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">SB</div>
                    <div>
                      <div className="text-sm text-slate-300 font-semibold">AI SmartBill</div>
                      <div className="text-xs text-slate-400">Plug-and-play billing for small businesses</div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="text-xs text-slate-400">Instant Actions</div>
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg bg-slate-800/30 text-center">Scan</div>
                      <div className="p-3 rounded-lg bg-slate-800/30 text-center">Voice</div>
                      <div className="p-3 rounded-lg bg-slate-800/30 text-center">Quick Add</div>
                    </div>
                  </div>
                </div>
                <div
                  className="absolute -bottom-6 left-6 w-32 rounded-md p-3 bg-gradient-to-br from-yellow-400/90 to-orange-400/80 text-black font-semibold shadow-lg plug-launch" /* Added CSS class for animation */
                >
                  Plug to launch
                </div>
              </div>
            </div>
          </section>

          {/* FEATURES Section */}
          <section id="features" className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard title="Lightning Performance" desc="Optimized builds, code-splitting, and server-side rendering to make your app feel instant." icon="⚡" />
              <FeatureCard title="Secure by Default" desc="End-to-end encryption, OAuth flows, and hardened cloud infrastructure standards." icon="🔒" />
              <FeatureCard title="Pixel-perfect UI" desc="Motion-driven interfaces, micro-interactions and accessible design patterns." icon="🎨" />
            </div>
          </section>

          {/* HOW IT WORKS Section */}
          <section id="work" className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-semibold">How it works</h2>
            <p className="mt-2 text-lg text-slate-300 max-w-2xl">A simple 3-step process to go from idea to production-ready product.</p>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <StepCard index={1} title="Design & Prototype" desc="We craft motion-led prototypes and test UX flows before a single line of code." />
              <StepCard index={2} title="Build & Integrate" desc="Fast iterations, CI/CD pipelines and modular architecture for scale." />
              <StepCard index={3} title="Launch & Monitor" desc="Robust observability and performance tuning post-launch." />
            </div>
          </section>

          {/* PRICING Section */}
          <section id="pricing" className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-semibold">Pricing</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <PriceCard title="Starter" price="Free" benefits={["1 project", "Basic support", "Community docs"]} />
              
              <PriceCard title="Pro" price="Rs.19999/mo" benefits={["Unlimited projects", "Priority support", "Advanced analytics"]} featured />
              
              <PriceCard title="Enterprise" price="Contact" benefits={["SLA & onboarding", "Custom integrations", "Dedicated engineer"]} />
            </div>
          </section>

          {/* CONTACT Section */}
          <footer id="contact" className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8">
              <div>
                <div className="text-xl font-semibold">Ready to build?</div>
                <div className="mt-2 text-slate-400 max-w-md">Tell us about your project and we'll prepare a tailored plan.</div>
              </div>

              {/* Contact Form with React state and submission logic */}
              <form className="w-full md:w-96 bg-slate-900/30 p-6 rounded-xl border border-white/3" onSubmit={handleContactSubmit}>
                <label htmlFor="contact-email" className="text-xs text-slate-400">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  className="mt-2 w-full p-3 rounded-md bg-transparent border border-white/6 text-slate-100"
                  placeholder="you@company.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                />
                <label htmlFor="contact-message" className="text-xs text-slate-400 mt-4 block">Message</label>
                <textarea
                  id="contact-message"
                  className="mt-2 w-full p-3 rounded-md bg-transparent border border-white/6 text-slate-100"
                  rows={4}
                  placeholder="A short description"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                />
                <div className="mt-4 flex justify-end items-center">
                  {contactLoading && <span className="text-slate-400 text-sm mr-3">Sending...</span>}
                  {contactFeedback && (
                    <span className={`text-sm mr-3 ${contactSuccess ? 'text-green-400' : 'text-red-400'}`}>
                      {contactFeedback}
                    </span>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-pink-500 font-semibold"
                    disabled={contactLoading}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-8 text-slate-500 text-sm">© {new Date().getFullYear()} JR Tech Solutions — Built with care.</div>
          </footer>
        </div>
      );
    }