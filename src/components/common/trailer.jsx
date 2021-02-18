import React from "react";

const Trailer = ({ movieKey }) => {
  return (
    <iframe
      id="player"
      type="text/html"
      width="800"
      height="500"
      src={`https://www.youtube.com/embed/${movieKey}?enablejsapi=1&origin=http://example.com&modestbranding=1&rel=0&controls=1`}
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
};

export default Trailer;
