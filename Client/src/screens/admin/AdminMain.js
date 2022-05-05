import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";

function AdminMain() {
	const common = useSelector((state) => state.common);
	return <AdminLayout>{<Outlet />}</AdminLayout>;
}

export default AdminMain;
