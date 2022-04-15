import React from "react";

function AdminTopNavigation() {
	return (
		<nav className="main-header navbar navbar-expand navbar-dark navbar-dark">
			<ul className="navbar-nav">
				<li className="nav-item d-none d-sm-inline-block">
					<a className="nav-link">Home</a>
				</li>
				<li className="nav-item d-none d-sm-inline-block">
					<a className="nav-link">Contact</a>
				</li>
			</ul>
		</nav>
	);
}

export default AdminTopNavigation;
