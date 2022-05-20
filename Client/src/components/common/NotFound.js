import React, { useState } from "react";
import MainNavigation from "../navigation/MainNavigation";

function NotFound(props) {
	const [item] = useState(props.item);
	const [noNav] = useState(props.noNav ? props.noNav : true);
	const [siteFront] = useState(props.siteFront);

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
