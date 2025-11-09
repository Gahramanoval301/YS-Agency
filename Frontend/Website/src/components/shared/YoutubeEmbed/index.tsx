import { useState } from "react";

const YouTubeEmbed = ({
  youtubeLink,
  thumbnailUrl,
  maxHeight = 360, // optional max height
}: {
  youtubeLink: string;
  thumbnailUrl: string;
  maxHeight?: number;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className="video-wrapper"
      style={{
        position: "relative",
        cursor: "pointer",
        width: "100%",
        maxHeight: `${maxHeight}px`,
        overflow: "hidden",
        paddingTop: "56.25%", // 16:9 aspect ratio
      }}
    >
      {!isPlaying ? (
        <img
          src={thumbnailUrl}
          alt="Video thumbnail"
          onClick={() => setIsPlaying(true)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <iframe
          src={youtubeLink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></iframe>
      )}
    </div>
  );
};

export default YouTubeEmbed;
