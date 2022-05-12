import React from "react";
import "./css/index.css";
import "../css/index.css";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../store/actions";
import { accountActions } from "../../../store/actions/accountActions";

function AdminSideNavigation() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.account.user);

	const logOut = () => {
		dispatch(accountActions.accountLogOut("User"));
	};

	return (
		<aside className="main-sidebar sidebar-dark-primary elevation-4">
			{/* FIRST SECTION */}
			<a href="/admin" className="brand-link adminNavTopName">
				<img
					src="/adminLTE/dist/img/AdminLTELogo.png"
					alt="AdminLTE Logo"
					className="brand-image img-circle elevation-3"
				/>
				<span className="brand-text font-weight-light">Admin Front</span>
			</a>
			{/* SECOND SECTION */}
			<div className="sidebar">
				<div id="admin-sidebar-dropdown-wrapper" className="user-panel mt-3 pb-3 mb-3 d-flex">
					<a
						href="/"
						className="d-flex align-items-center text-decoration-none dropdown-toggle"
						id="dropdownUser1"
						data-bs-toggle="dropdown"
					>
						<div className="image">
							<img
								src={
									user.name
										? "/adminLTE/dist/img/user2-160x160.jpg"
										: "/adminLTE/dist/img/AdminLTELogo.png"
								}
								className="img-circle elevation-2"
								alt="Admin"
							/>
						</div>
						<div className="info">
							<div className="d-block adminNavBottomName">
								{user.name ? user.name : "Stranger"}
							</div>
						</div>
					</a>
					{!commonActions.objectIsNullOrUndefined(user) &&
					!commonActions.objectIsEmpty(user) ? (
						<ul
							className="dropdown-menu dropdown-menu-dark text-small shadow"
							aria-labelledby="dropdownUser1"
						>
							<li>
								<a className="dropdown-item" href="/admin/profile">
									Profile
								</a>
							</li>
							<li>
								<hr className="dropdown-divider" />
							</li>
							<li onClick={logOut}>
								<div className="dropdown-item">Log Out</div>
							</li>
						</ul>
					) : (
						<ul
							className="dropdown-menu dropdown-menu-dark text-small shadow"
							aria-labelledby="dropdownUser1"
						>
							<li>
								<a className="dropdown-item" href="/login">
									Log In
								</a>
							</li>
						</ul>
					)}
				</div>
				{/* THIRD SECTION */}
				<nav className="mt-2">
					<ul
						className="nav nav-pills nav-sidebar flex-column"
						data-widget="treeview"
						role="menu"
						data-accordion="false"
					>
						<li className="nav-header">DATABASE</li>
						<li className="nav-item">
							<a href="/admin/categories" className="nav-link">
								<i className="nav-icon far fa-calendar-alt"></i>
								<p>
									Categories
									{/* <span className="badge badge-info right"></span> */}
								</p>
							</a>
						</li>
						<li className="nav-item">
							<a href="/admin/comments" className="nav-link">
								<i className="nav-icon far fa-calendar-alt"></i>
								<p>
									Comments
									{/* <span className="badge badge-info right"></span> */}
								</p>
							</a>
						</li>
						<li className="nav-item">
							<a href="/admin/commentReplies" className="nav-link">
								<i className="nav-icon far fa-calendar-alt"></i>
								<p>
									Comment Replies
									{/* <span className="badge badge-info right"></span> */}
								</p>
							</a>
						</li>
						<li className="nav-item">
							<a href="/admin/likes" className="nav-link">
								<i className="nav-icon far fa-calendar-alt"></i>
								<p>
									Likes
									{/* <span className="badge badge-info right"></span> */}
								</p>
							</a>
						</li>
						<li className="nav-item">
							<a href="/admin/orders" className="nav-link">
								<i className="nav-icon far fa-calendar-alt"></i>
								<p>
									Orders
									{/* <span className="badge badge-info right"></span> */}
								</p>
							</a>
						</li>
						<li className="nav-item">
							<a href="/admin/products" className="nav-link">
								<i className="nav-icon far fa-calendar-alt"></i>
								<p>
									Products
									{/* <span className="badge badge-info right"></span> */}
								</p>
							</a>
						</li>
						<li className="nav-item">
							<a href="/admin/sellers" className="nav-link">
								<i className="nav-icon far fa-calendar-alt"></i>
								<p>
									Sellers
									{/* <span className="badge badge-info right"></span> */}
								</p>
							</a>
						</li>
						<li className="nav-item">
							<a href="/admin/users" className="nav-link">
								<i className="nav-icon far fa-calendar-alt"></i>
								<p>
									Users
									{/* <span className="badge badge-info right"></span> */}
								</p>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</aside>
	);
}

export default AdminSideNavigation;
