import React from "react";
import "./css/index.css";

function UnauthorizedPage() {
	return (
		<div id="unauthorized-page-text">
			<h2 className="unauthorized-page-header">
				You don't have the Authorization to view this page.
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

export default UnauthorizedPage;
