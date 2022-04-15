import React from "react";

function AdminSideNavigation() {
	return (
		<aside className="main-sidebar sidebar-dark-primary elevation-4">
			<a href="index3.html" className="brand-link">
				<img
					src="/adminLTE/dist/img/AdminLTELogo.png"
					alt="AdminLTE Logo"
					className="brand-image img-circle elevation-3"
				/>
				<span className="brand-text font-weight-light">AdminLTE 3</span>
			</a>

			<div className="sidebar">
				<div className="user-panel mt-3 pb-3 mb-3 d-flex">
					<div className="image">
						<img
							src="/adminLTE/dist/img/user2-160x160.jpg"
							className="img-circle elevation-2"
							alt="User Image"
						/>
					</div>
					<div className="info">
						<a href="#" className="d-block">
							Alexander Pierce
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
							<a href="categories" className="nav-link">
								<i className="nav-icon far fa-calendar-alt"></i>
								<p>
									Categories
									{/* <span className="badge badge-info right"></span> */}
								</p>
							</a>
							<a href="products" className="nav-link">
								<i className="nav-icon far fa-calendar-alt"></i>
								<p>
									Products
									{/* <span className="badge badge-info right"></span> */}
								</p>
							</a>
							<a href="users" className="nav-link">
								<i className="nav-icon far fa-calendar-alt"></i>
								<p>
									Users
									{/* <span className="badge badge-info right"></span> */}
								</p>
							</a>
							<a href="sellers" className="nav-link">
								<i className="nav-icon far fa-calendar-alt"></i>
								<p>
									Sellers
									{/* <span className="badge badge-info right"></span> */}
								</p>
							</a>
							<a href="comments" className="nav-link">
								<i className="nav-icon far fa-calendar-alt"></i>
								<p>
									Comments
									{/* <span className="badge badge-info right"></span> */}
								</p>
							</a>
							<a href="commentReplies" className="nav-link">
								<i className="nav-icon far fa-calendar-alt"></i>
								<p>
									Comment Replies
									{/* <span className="badge badge-info right"></span> */}
								</p>
							</a>
							<a href="orders" className="nav-link">
								<i className="nav-icon far fa-calendar-alt"></i>
								<p>
									Orders
									{/* <span className="badge badge-info right"></span> */}
								</p>
							</a>
							<a href="likes" className="nav-link">
								<i className="nav-icon far fa-calendar-alt"></i>
								<p>
									Likes
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
