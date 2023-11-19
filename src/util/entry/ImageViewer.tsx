type Prop = { src: string; alt: string; caption: string };
export const ImageViewer: React.FC<Prop> = (prop) => {
  return (
    <p className="flex flex-col items-center">
      <img src={prop.src} alt={prop.alt} />
      <span>{prop.caption}</span>
    </p>
  );
};
