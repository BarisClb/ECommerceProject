import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideNavigation from "./adminNavigation/AdminSideNavigation";
import AdminTopNavigation from "./adminNavigation/AdminTopNavigation";
import "./css/index.css";

const AdminNavigation = () => {
	return (
		<>
			<AdminTopNavigation />
			<AdminSideNavigation />
			<div id="admin-content-wrapper">
				<Outlet />
			</div>
		</>
	);
};

export default AdminNavigation;
