import React from "react";
import "./css/index.css";

function SellerTopNavigation() {
	return (
		<nav id="seller-topnav" className="navbar navbar-dark bg-dark">
			<div className="container-fluid justify-content-around">
				<a className="navbar-brand" href="/admin">
					Admin Front
				</a>
				<a className="navbar-brand" href="/store">
					Store Front
				</a>
				<a className="navbar-brand" href="/seller">
					Seller Front
				</a>
			</div>
		</nav>
	);
}

export default SellerTopNavigation;
