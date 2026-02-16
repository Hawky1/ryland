import { motion } from "framer-motion";

interface SingleProps {
  variant: "single";
  src: string;
  alt?: string;
}

interface StackedProps {
  variant: "stacked";
  covers: string[];
}

type Props = SingleProps | StackedProps;

export default function BookMockup3D(props: Props) {
  if (props.variant === "single") {
    return (
      <motion.div
        initial={{ opacity: 0, rotateY: -15 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex justify-center"
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative w-full max-w-md mx-auto"
          style={{
            transform: "rotateY(-8deg) rotateX(3deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <img
            src={props.src}
            alt={props.alt || "Ebook cover"}
            className="w-full rounded-lg shadow-2xl shadow-black/40"
          />
          {/* Spine shadow */}
          <div
            className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/30 to-transparent rounded-l-lg"
            style={{ transform: "translateZ(-2px)" }}
          />
        </div>
      </motion.div>
    );
  }

  // Stacked variant — show 6-8 covers fanned out
  const visibleCovers = props.covers.slice(0, 8);
  const count = visibleCovers.length;
  return (
    <div className="relative w-full max-w-3xl mx-auto h-[280px] sm:h-[420px] md:h-[480px] overflow-hidden" style={{ perspective: "1200px" }}>
      {visibleCovers.map((cover, i) => {
        const rotation = -(count * 1.5) + i * 3.5;
        const translateX = -(count * 10) + i * 28;
        const translateZ = -i * 10;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="absolute top-4 left-1/2 w-32 sm:w-56 md:w-64"
            style={{
              transform: `translateX(${translateX}px) rotateY(-6deg) rotateZ(${rotation}deg) translateZ(${translateZ}px)`,
              transformStyle: "preserve-3d",
              zIndex: visibleCovers.length - i,
            }}
          >
            <img
              src={cover}
              alt={`Ebook ${i + 1}`}
              className="w-full rounded-lg shadow-2xl shadow-black/40"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
