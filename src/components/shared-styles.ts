// Shared CSS styles used across multiple pages
// Extracted to eliminate duplication of ~300 lines of CSS per page

export const SHARED_STYLES = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
.animate-delay-200 { animation-delay: 0.2s; opacity: 0; }
.animate-delay-300 { animation-delay: 0.3s; opacity: 0; }
.nav-link::after { content: ''; position: absolute; left: 0; top: 100%; width: 0; height: 2px; background: #3b82f6; transition: width 0.3s; }
.nav-link:hover::after { width: 100%; }
.mobile-menu { transform: translateX(100%); transition: transform 0.3s ease-out, visibility 0s 0.3s; visibility: hidden; }
.mobile-menu.open { transform: translateX(0); visibility: visible; transition: transform 0.3s ease-out, visibility 0s 0s; }

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
@property --gradient-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
@property --gradient-angle-offset { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
@property --gradient-percent { syntax: "<percentage>"; initial-value: 20%; inherits: false; }
@property --gradient-shine { syntax: "<color>"; initial-value: #8484ff; inherits: false; }

.shiny-cta {
  --gradient-angle: 0deg; --gradient-angle-offset: 0deg; --gradient-percent: 20%; --gradient-shine: #8484ff; --shadow-size: 2px;
  position: relative; overflow: hidden; border-radius: 9999px; padding: 1.25rem 2.5rem; font-size: 1.125rem; line-height: 1.2; font-weight: 500; color: #ffffff;
  background: linear-gradient(#003A70, #0060A9) padding-box, conic-gradient(from calc(var(--gradient-angle) - var(--gradient-angle-offset)), transparent 0%, #3b82f6 5%, var(--gradient-shine) 15%, #3b82f6 30%, transparent 40%, transparent 100%) border-box;
  border: 2px solid transparent; box-shadow: inset 0 0 0 1px #1e293b; outline: none;
  transition: --gradient-angle-offset 800ms cubic-bezier(0.25,1,0.5,1), --gradient-percent 800ms cubic-bezier(0.25,1,0.5,1), --gradient-shine 800ms cubic-bezier(0.25,1,0.5,1), box-shadow 0.3s;
  cursor: pointer; isolation: isolate; outline-offset: 4px; font-family: 'Inter','Helvetica Neue',sans-serif; z-index: 0; animation: border-spin 2.5s linear infinite;
}
@keyframes border-spin { to { --gradient-angle: 360deg; } }
.shiny-cta:active { transform: translateY(1px); }
.shiny-cta::before {
  content:''; pointer-events:none; position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); z-index:0;
  --size:calc(100% - 6px); --position:2px; --space:4px; width:var(--size); height:var(--size);
  background:radial-gradient(circle at var(--position) var(--position),white 0.5px,transparent 0) padding-box;
  background-size:var(--space) var(--space); background-repeat:space;
  mask-image:conic-gradient(from calc(var(--gradient-angle) + 45deg),black,transparent 10% 90%,black); border-radius:inherit; opacity:0.4;
}
.shiny-cta::after {
  content:''; pointer-events:none; position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); z-index:1;
  width:100%; aspect-ratio:1; background:linear-gradient(-50deg,transparent,#3b82f6,transparent);
  mask-image:radial-gradient(circle at bottom,transparent 40%,black); opacity:0.6; animation:shimmer 4s linear infinite;
}
.shiny-cta span { position:relative; z-index:2; display:inline-block; }
@keyframes shimmer { to { transform:translate(-50%,-50%) rotate(360deg); } }

.font-geist { font-family: 'Geist', sans-serif !important; }
.font-manrope { font-family: 'Manrope', sans-serif !important; }
`;

export const FONT_LINKS = [
  "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap",
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
];
