import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { commonAction } from "../../store/actions";
import MainLayout from "./MainLayout";
import "./css/index.css";
import SellerSideNavigation from "../navigation/SellerSideNavigation";
import { Outlet } from "react-router-dom";

const SellerLayout = ({ children }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(commonAction.asyncEnd());
	}, []);
	return (
		<MainLayout>
			<SellerSideNavigation />
			<div id="seller-content-wrapper">
				{children}
				<Outlet />
			</div>
		</MainLayout>
	);
};

export default SellerLayout;
