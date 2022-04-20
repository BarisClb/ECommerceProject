import React from "react";
import "./css/index.css";

function AdminSideNavigation() {
	return (
		<aside className="main-sidebar sidebar-dark-primary elevation-4">
			<a href="/admin" className="brand-link adminNavTopName">
				<img
					src="/adminLTE/dist/img/AdminLTELogo.png"
					alt="AdminLTE Logo"
					className="brand-image img-circle elevation-3"
				/>
				<span className="brand-text font-weight-light">Admin Front</span>
			</a>

			<div className="sidebar">
				<div className="user-panel mt-3 pb-3 mb-3 d-flex">
					<div className="image">
						<img
							src="/adminLTE/dist/img/user2-160x160.jpg"
							className="img-circle elevation-2"
							alt="Admin"
						/>
					</div>
					<div className="info">
						<a href="/admin" className="d-block adminNavBottomName">
							Admin Name
						</a>
					</div>
				</div>

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
