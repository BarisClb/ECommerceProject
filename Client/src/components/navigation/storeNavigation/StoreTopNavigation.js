import React, { useEffect, useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../store/actions";
import { categoryActions } from "../../../store/actions/categoryActions";
import { cartActions } from "../../../store/actions/cartActions";

function StoreTopNavigation(params) {
	const dispatch = useDispatch();
	const darkMode = useSelector((state) => state.common.DarkMode);
	const setDarkMode = (darkMode) => {
		dispatch(commonActions.toggleDarkMode(darkMode));
	};

	// Profile
	const [account, setAccount] = useState(params.account);
	const [accountType] = useState(account.accountType && account.accountType);
	const logOut = () => {
		if (params.logOut) {
			params.logOut();
			// To refresh
			setAccount({});
		}
	};

	// Search
	const [searchValue, setSearchValue] = useState("");

	// Cart
	const cartItems = useSelector((state) => state.cart.currentCart);

	const clearCart = () => {
		dispatch(cartActions.clearCart());
	};
	const removeFromCart = (item) => {
		dispatch(cartActions.removeFromCart(item, cartItems));
	};

	// Categories
	const categories = useSelector((state) => state.category.categories);
	useEffect(() => {
		dispatch(categoryActions.getCategories());
	}, []);

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
			{/* STORE MAIN NAVBAR */}
			<nav
				id="store-topnav-first"
				className={`navbar navbar-expand-lg ${
					darkMode
						? "navbar-dark bg-dark white-link-text"
						: "navbar-secondary bg-light store-navbar-light dark-link-text"
				}`}
			>
				<div className="container-fluid">
					<a id="store-name" className="navbar-brand col-2" href="/store">
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
						<ul id="store-topnav-main-items" className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<form className="d-flex">
									<input
										className="form-control me-2"
										type="search"
										placeholder="Search Product"
										aria-label="Search"
										defaultValue={searchValue}
										onChange={(e) => setSearchValue((prev) => e.target.value)}
									/>
									<a
										className="btn btn-outline-primary"
										href={`/store/products/${searchValue.trim()}`}
									>
										Search
									</a>
								</form>
							</li>
							<li className="nav-item">
								<div
									id="store-topnav-profile-button"
									className="store-topnav-profile dropdown"
								>
									<a
										href="/"
										className={`d-flex align-items-center text-white text-decoration-none dropdown-toggle btn ${
											darkMode ? "btn-outline-primary" : "btn-secondary"
										}`}
										id="store-profile-dropdown"
										data-bs-toggle="dropdown"
									>
										<i className="bi bi-person-circle mr-2" />
										<strong className="store-topnav-text">
											{account && account.name ? account.name : "Stranger"}
										</strong>
									</a>
									<ul
										className={`dropdown-menu text-small shadow ${
											darkMode && "dropdown-menu-dark"
										}`}
										aria-labelledby="store-profile-dropdown"
									>
										{account && account.name ? (
											<>
												<li>
													<a
														className="dropdown-item"
														href={`${
															accountType === "Seller"
																? "/seller/profile"
																: "/store/profile/" + account.id
														}`}
													>
														Profile
													</a>
												</li>
												{accountType === "User" && (
													<>
														<li>
															<hr className="dropdown-divider" />
														</li>
														<li>
															<a
																className="dropdown-item"
																href={`/store/profile/${account.id}/cart`}
															>
																Cart
															</a>
														</li>
														<li>
															<a
																className="dropdown-item"
																href={`/store/profile/${account.id}/orders`}
															>
																Orders
															</a>
														</li>
														<li>
															<a
																className="dropdown-item"
																href={`/store/profile/${account.id}/comments`}
															>
																Comments
															</a>
														</li>
													</>
												)}
												<li>
													<hr className="dropdown-divider" />
												</li>
												<li
													id="store-profile-dropdown-logout-button"
													onClick={() => logOut()}
												>
													<div
														id="store-topnav-logout-item dropdown-item"
														className="dropdown-item"
													>
														Log Out
													</div>
												</li>
											</>
										) : (
											<li>
												<a className="dropdown-item" href="/login">
													Log In
												</a>
											</li>
										)}
									</ul>
								</div>
							</li>
							<li id="store-topnav-cart-button" className="nav-item">
								<div className="store-topnav-cart dropdown">
									<a
										href="/"
										className={`d-flex align-items-center text-white text-decoration-none dropdown-toggle btn ${
											darkMode ? "btn-outline-primary" : "btn-secondary"
										}`}
										id="store-cart-dropdown"
										data-bs-toggle="dropdown"
									>
										<i className="bi bi-basket mr-2" />
										<strong className="store-topnav-text">
											{cartItems && cartItems.length > 0
												? cartItems.length + " Items in Cart"
												: "Cart Empty"}
										</strong>
									</a>
									<ul
										className={`dropdown-menu text-small shadow ${
											darkMode && "dropdown-menu-dark"
										}`}
										aria-labelledby="store-cart-dropdown"
									>
										<li className="dropdown-item">
											<a
												id="store-minicart-gotocart-link"
												href={
													accountType === "User"
														? `/store/profile/${account.id}/cart`
														: "/login"
												}
											>
												Go To Cart
											</a>
										</li>
										<li>
											<hr className="dropdown-divider" />
										</li>
										{cartItems && cartItems.length > 0 ? (
											cartItems.map((item) => (
												<li
													className="dropdown-item cartitem-productname"
													key={item.id}
												>
													<i
														className="bi bi-trash"
														id="trashIcon"
														onClick={() => removeFromCart(item)}
													></i>
													<a
														href={`/store/product/${item.id}`}
														className="store-minicart-product-link"
													>
														{item.name.length > 23
															? `${item.name}`.slice(0, 20) + "..."
															: item.name}
													</a>
													<span className="badge bg-secondary">
														{item.cartQuantity}
													</span>
												</li>
											))
										) : (
											<li>No items yet!</li>
										)}
										<li>
											<hr className="dropdown-divider" />
										</li>
										<li
											className="dropdown-item store-minicart-clear-button"
											onClick={() => clearCart()}
										>
											Clear
										</li>
									</ul>
								</div>
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
