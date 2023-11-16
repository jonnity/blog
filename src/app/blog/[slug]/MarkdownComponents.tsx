import { z } from "zod";
import type { Components } from "react-markdown";

const srcSchema = z.string();
const altSchema = z.string();
export const MarkdownComponents: Components = {
  img: (props) => {
    const src = srcSchema.parse(props.src);
    const alt = altSchema.parse(props.alt);
    return (
      <span className="flex w-full justify-center">
        <img src={src} alt={alt} />
      </span>
    );
  },
};
