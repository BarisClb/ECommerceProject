import React, { useEffect, useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../store/actions";
import { categoryActions } from "../../../store/actions/categoryActions";

function StoreTopNavigation() {
	const dispatch = useDispatch();
	const darkMode = useSelector((state) => state.common.DarkMode);
	const setDarkMode = (darkMode) => {
		dispatch(commonActions.toggleDarkMode(darkMode));
	};

	// Categories
	const categories = useSelector((state) => state.category.categories);
	useEffect(() => {
		dispatch(categoryActions.getCategories());
	}, []);
	console.log(categories);
	return (
		<div>
			{/* SITE NAVIGATION */}
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
			{/* STORE NAVBAR */}
			<nav
				id="store-topnav-first"
				className={`navbar navbar-expand-lg ${
					darkMode
						? "navbar-dark bg-dark white-link-text"
						: "navbar-secondary bg-light store-navbar-light dark-link-text"
				}`}
			>
				<div className="container-fluid">
					<a className="navbar-brand col-2" href="/store">
						Celebi Store
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#topNav-first"
						aria-controls="topNav-first"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="topNav-first">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<form className="d-flex">
									<input
										className="form-control me-2"
										type="search"
										placeholder="Search"
										aria-label="Search"
									/>
									<button className="btn btn-outline-primary" type="submit">
										Search
									</button>
								</form>
							</li>
							<li className="nav-item">
								<div className="form-check form-switch">
									<input
										className="form-check-input"
										type="checkbox"
										id="darkMode-switch"
										onChange={() => setDarkMode(!darkMode)}
										checked={darkMode}
									/>
									<label className="form-check-label" htmlFor="darkMode-switch">
										Dark Mode
									</label>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			{/* STORE CATEGORY LIST */}
			<nav
				id="store-topnav-second"
				className={`navbar navbar-expand-lg ${
					darkMode
						? "navbar-dark bg-dark white-link-text"
						: "navbar-secondary bg-light store-navbar-light dark-link-text"
				}`}
			>
				<button
					className={`navbar-toggler ${
						darkMode ? "navbar-dark" : "navbar-light bg-light navbar-toggler-light"
					}`}
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#topNav-second"
					aria-controls="topNav-second"
					aria-expanded="true"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="topNav-second">
					<ul className="navbar-nav mr-auto">
						{/* TOO MUCH CATEGORY, UNCOMMENT THIS WHEN FINAL PRODUCT */}
						{/* {categories &&
							categories.length > 0 &&
							categories.map((category) => (
								<li className="nav-item" key={category.id}>
									<a className="nav-link" href={`/store/category/${category.id}`}>
										{category.name}
									</a>
								</li>
							))} */}
						<li className="nav-item">
							<a className="nav-link" href={`/store/category/1`}>
								PLACEHOLDER 1
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href={`/store/category/2`}>
								PLACEHOLDER 2
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href={`/store/category/3`}>
								PLACEHOLDER 3
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
}

export default StoreTopNavigation;
