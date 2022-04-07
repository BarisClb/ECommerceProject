import React from "react";

export default function Loading() {
  return (
    <div className="preloader flex-column justify-content-center align-items-center">
      <img
        className="animation__shake"
        src="img/loader.png"
        alt="loader"
        height="60"
        width="60"
      />
    </div>
  );
}
