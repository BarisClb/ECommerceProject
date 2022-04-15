import React from "react";

const Loading = () => {
	return (
		<div className="preloader flex-column justify-content-center align-items-center">
			<img
				className="animation__shake"
				src="loader.png"
				alt="loader"
				height="60"
				width="60"
			/>
		</div>
	);
};

export default Loading;
