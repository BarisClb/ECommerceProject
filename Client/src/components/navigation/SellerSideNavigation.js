import React from "react";
import "./css/index.css";

const SellerSideNavigation = () => {
	return (
		<div
			id="seller-sidenav"
			className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar"
		>
			<a
				href=""
				className="d-flex align-items-center mb-md-0 me-md-auto text-white text-decoration-none seller-sidenav-items"
			>
				<i className="bi bi-list"></i>
				<span className="fs-2 seller-sidenav-text">Seller Front</span>
			</a>
			<hr />
			<ul className="nav nav-pills flex-column mb-auto">
				<li className="nav-item">
					<a href="/seller/products" className="nav-link text-white">
						<div className="seller-sidenav-items">
							<div>
								<i className="bi bi-person-circle"></i>
							</div>
							<div className="seller-sidenav-text">
								<h5>Products</h5>
							</div>
						</div>
					</a>
				</li>
				<li className="nav-item">
					<a href="/seller/orders" className="nav-link text-white">
						<div className="seller-sidenav-items">
							<div>
								<i className="bi bi-person-circle"></i>
							</div>
							<div className="seller-sidenav-text">
								<h5>Orders</h5>
							</div>
						</div>
					</a>
				</li>
				<li className="nav-item">
					<a href="/seller/comments" className="nav-link text-white">
						<div className="seller-sidenav-items">
							<div>
								<i className="bi bi-person-circle"></i>
							</div>
							<div className="seller-sidenav-text">
								<h5>Comments</h5>
							</div>
						</div>
					</a>
				</li>
				<li className="nav-item">
					<a href="/seller/commentreplies" className="nav-link text-white">
						<div className="seller-sidenav-items">
							<div>
								<i className="bi bi-person-circle"></i>
							</div>
							<div className="seller-sidenav-text">
								<h5>Comment Replies</h5>
							</div>
						</div>
					</a>
				</li>
			</ul>
			<hr />
			<div className="seller-sidenav-profile dropdown">
				<a
					href="#"
					className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
					id="dropdownUser1"
					data-bs-toggle="dropdown"
				>
					<i className="bi bi-person-circle"></i>
					<strong className="seller-sidenav-text">Seller Name</strong>
				</a>
				<ul
					className="dropdown-menu dropdown-menu-dark text-small shadow"
					aria-labelledby="dropdownUser1"
				>
					<li>
						<a className="dropdown-item" href="/seller/profile">
							Profile
						</a>
					</li>

					<li>
						<hr className="dropdown-divider" />
					</li>
					<li>
						<a className="dropdown-item" href="#">
							Sign Out
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SellerSideNavigation;
