import { SHARED_STYLES, FONT_LINKS } from "./shared-styles";

/** Renders the shared font links and CSS styles used across all pages */
const SharedHead = () => (
  <>
    <style dangerouslySetInnerHTML={{ __html: SHARED_STYLES }} />
    {FONT_LINKS.map((href) => (
      <link key={href} rel="stylesheet" href={href} />
    ))}
  </>
);

export default SharedHead;
