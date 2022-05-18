import React, { useState } from "react";
import MainNavigation from "../navigation/MainNavigation";

function NotFound(params) {
	const [item] = useState(params.item);
	const [noNav] = useState(params.noNav ? params.noNav : true);
	const [siteFront] = useState(params.siteFront);

	return (
		<>
			{!noNav && <MainNavigation />}
			<div
				id="not-found-wrapper"
				className={`${
					!noNav
						? "notfound-basic-page"
						: siteFront === "Admin"
						? "admin-notfound-page"
						: siteFront === "Seller"
						? "seller-notfound-page"
						: ""
				}`}
			>
				<h1>The {item ? item : "Page"} you are looking for does not exist.</h1>
			</div>
		</>
	);
}

export default NotFound;
