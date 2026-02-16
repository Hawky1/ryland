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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-center h-full"
      >
        <img
          src={props.src}
          alt={props.alt || "Ebook cover"}
          className="w-full h-auto max-h-[600px] object-contain rounded-xl"
        />
      </motion.div>
    );
  }

  // Stacked variant — grid display for clarity
  const visibleCovers = props.covers.slice(0, 8);
  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
      {visibleCovers.map((cover, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
        >
          <img
            src={cover}
            alt={`Ebook ${i + 1}`}
            className="w-full rounded-lg hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      ))}
    </div>
  );
}
