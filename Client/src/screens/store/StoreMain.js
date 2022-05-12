import React from "react";
import { Outlet } from "react-router-dom";
import StoreWelcomePage from "../../components/store/StoreWelcomePage";
import StoreLayout from "../../components/layout/StoreLayout";

function StoreMain() {
	return (
		<StoreLayout>
			<Outlet />
		</StoreLayout>
	);
}

export default StoreMain;
