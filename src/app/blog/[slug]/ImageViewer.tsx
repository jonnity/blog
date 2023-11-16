import { z } from "zod";

type Props = React.ClassAttributes<HTMLImageElement> &
  React.ImgHTMLAttributes<HTMLImageElement>;

const srcSchema = z.string();
const altSchema = z.string();
export const ImageViewer: React.FC<Props> = (props) => {
  const src = srcSchema.parse(props.src);
  const alt = altSchema.parse(props.alt);
  return (
    <span className="relative flex w-full justify-center">
      <img src={src} alt={alt} />
    </span>
  );
};
