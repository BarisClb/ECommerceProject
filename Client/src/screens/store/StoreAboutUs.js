import React from "react";

function StoreAboutUs() {
	return (
		<div
			id="store-aboutus-page-text"
			style={{
				display: "flex",
				flexDirection: "column",
				alignSelf: "center",
				flexGrow: "1",
				justifySelf: "center",
			}}
		>
			<div className="d-flex justify-content-center">
				<h2 className="store-aboutus-page-header">This Project is made by Barış Çelebi.</h2>
			</div>
			<div className="d-flex justify-content-center">
				<a className="store-aboutus-page-link nav-link" href="https://github.com/BarisClb">
					GitHub/BarisClb
				</a>
			</div>
		</div>
	);
}

export default StoreAboutUs;
