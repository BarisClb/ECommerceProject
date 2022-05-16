import React from "react";
import { Outlet } from "react-router-dom";
import StoreLayout from "../../components/layout/StoreLayout";

function StoreMain() {
	return (
		<StoreLayout>
			<Outlet />
		</StoreLayout>
	);
}

export default StoreMain;
