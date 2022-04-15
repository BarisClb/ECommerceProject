import React from "react";
import AdminSideNavigation from "./adminNavigation/AdminSideNavigation";
import AdminTopNavigation from "./adminNavigation/AdminTopNavigation";

const AdminNavigation = () => {
	return (
		<>
			<AdminTopNavigation />
			<AdminSideNavigation />
		</>
	);
};

export default AdminNavigation;
