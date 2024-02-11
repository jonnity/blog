type Prop = { videoId: string };
export const IframeYoutubePlayer: React.FC<Prop> = ({ videoId }) => {
  return (
    <div className="flex w-full justify-center">
      <iframe
        className="w-ful aspect-video max-w-lg"
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
};
