import React from "react";
import "./css/index.css";
import {
	Navbar,
	NavbarBrand,
	NavbarToggler,
	Collapse,
	Nav,
	NavItem,
} from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";

const StoreNavigation = () => {
	const toggle = () => {};
	return (
		<div>
			<nav id="main-topnav" className="navbar navbar-dark bg-dark">
				<div className="container-fluid justify-content-around">
					<a className="navbar-brand" href="admin">
						Admin Front
					</a>
					<a className="navbar-brand" href="store">
						Store Front
					</a>
					<a className="navbar-brand" href="seller">
						Seller Front
					</a>
				</div>
			</nav>
		</div>
	);
};

export default StoreNavigation;
