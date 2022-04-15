import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import AdminNavigation from "../../components/navigation/AdminNavigation";
import Categories from "../Categories";

const AdminCategories = () => {
	return (
		<>
			<MainLayout>
				<Categories />
			</MainLayout>
		</>
	);
};

export default AdminCategories;
