import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../store/actions";

function StoreTopNavigation() {
	const dispatch = useDispatch();
	const darkMode = useSelector((state) => state.common.DarkMode);
	const setDarkMode = (darkMode) => {
		dispatch(commonActions.toggleDarkMode(darkMode));
	};
	return (
		<div>
			<nav
				className={`nav nav-pills flex-column flex-sm-row ${
					darkMode ? "navbar-dark bg-dark" : "navbar-secondary bg-light store-nav-light"
				}`}
				id="store-top-sitenav"
			>
				<a className="flex-sm-fill text-sm-center nav-link" href="/admin">
					Admin Front
				</a>
				<a className="flex-sm-fill text-sm-center nav-link" href="/store">
					Store Front
				</a>
				<a className="flex-sm-fill text-sm-center nav-link" href="/seller">
					Seller Front
				</a>
			</nav>

			<nav
				id="store-topnav-second"
				className={`navbar navbar-expand-lg ${
					darkMode ? "navbar-dark bg-dark" : "navbar-secondary bg-light store-navbar-light"
				}`}
			>
				<a className="navbar-brand" href="/">
					Celebi Store
				</a>
				<button
					className={`navbar-toggler ${
						darkMode ? "navbar-dark" : "navbar-light bg-light navbar-toggler-light"
					}`}
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="true"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<a className="nav-link" href="/">
								Category 1
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/">
								Category 2
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/">
								Category 3
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/">
								Category 4
							</a>
						</li>
					</ul>
					<div className="form-check form-switch">
						<input
							className="form-check-input"
							type="checkbox"
							id="flexSwitchCheckDefault"
							onChange={() => setDarkMode(!darkMode)}
							checked={darkMode}
						/>
						<label className="form-check-label" htmlFor="flexSwitchCheckDefault">
							Dark Mode
						</label>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default StoreTopNavigation;
