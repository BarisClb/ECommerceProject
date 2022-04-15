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

const MainNavigation = () => {
	const toggle = () => {};
	return (
		<div>
			<Navbar
				color="dark"
				dark
				expand="md"
				fixed=""
				light
				className="navi--navbar"
			>
				<LinkContainer to="/">
					<NavbarBrand className="white">ECommerceDuoStudy</NavbarBrand>
				</LinkContainer>
				<NavbarToggler onClick={toggle} />
				<Collapse /* isOpen={toggle} */ navbar className="">
					<Nav className="flex" navbar>
						<LinkContainer to="/categories">
							<NavItem className="nav-link router-link">
								Categories
							</NavItem>
						</LinkContainer>
						<LinkContainer to="/products">
							<NavItem className="nav-link router-link">
								Products
							</NavItem>
						</LinkContainer>
						<LinkContainer to="/cart">
							<NavItem className="nav-link router-link">Cart</NavItem>
						</LinkContainer>
						<LinkContainer to="/deneme">
							<NavItem className="nav-link router-link">Deneme</NavItem>
						</LinkContainer>
						<LinkContainer to="/profile">
							<NavItem className="nav-link router-link">Profile</NavItem>
						</LinkContainer>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default MainNavigation;
