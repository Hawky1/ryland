import { useEffect } from "react";

interface PageMetaProps {
  title: string;
  description: string;
}

/** Sets per-page <title> and <meta name="description"> */
const PageMeta = ({ title, description }: PageMetaProps) => {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
};

export default PageMeta;
