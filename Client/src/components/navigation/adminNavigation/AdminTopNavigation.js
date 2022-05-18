import React from "react";
import "./css/index.css";
import "../css/index.css";

function AdminTopNavigation() {
	return (
		<nav id="admin-topnav" className="main-header navbar navbar-expand navbar-dark navbar-dark">
			<ul className="navbar-nav">
				<li className="nav-item d-none d-sm-inline-block">
					<a href="/admin" className="nav-link">
						Admin Front
					</a>
				</li>
				<li className="nav-item d-none d-sm-inline-block">
					<a href="/store" className="nav-link">
						Store Front
					</a>
				</li>
				<li className="nav-item d-none d-sm-inline-block">
					<a href="/seller" className="nav-link">
						Seller Front
					</a>
				</li>
			</ul>
		</nav>
	);
}

export default AdminTopNavigation;
