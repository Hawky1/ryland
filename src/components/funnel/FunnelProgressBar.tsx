interface Props {
  currentStep: number;
  label: string;
}

const STEPS = 4;

export default function FunnelProgressBar({ currentStep, label }: Props) {
  return (
    <div className="w-full bg-[#001F3F] border-b border-white/10">
      <div className="max-w-3xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-blue-200 tracking-wide uppercase font-[Inter,sans-serif]">
            Step {currentStep} of {STEPS}: {label}
          </span>
          <span className="text-xs text-blue-300/60">{Math.round((currentStep / STEPS) * 100)}%</span>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                i < currentStep
                  ? "bg-gradient-to-r from-blue-400 to-cyan-400"
                  : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
