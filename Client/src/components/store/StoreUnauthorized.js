import React from "react";
import "./css/index.css";

function StoreUnauthorized() {
	return (
		<div id="store-unauthorized-text">
			<h2 className="store-unauthorized-header">
				You don't have the authorization to view this page.
			</h2>
			<div className="row">
				<div className="col-md-6 col-sm-12 d-flex justify-content-center">
					<a className="main-authpage-auth-link nav-link" href="/login">
						LogIn
					</a>
				</div>
				<div className="col-md-6 col-sm-12 d-flex justify-content-center">
					<a className="main-authpage-auth-link nav-link" href="/register">
						Register
					</a>
				</div>
			</div>
		</div>
	);
}

export default StoreUnauthorized;
