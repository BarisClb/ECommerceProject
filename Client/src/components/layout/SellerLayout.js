import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { commonAction } from "../../store/actions";
import MainLayout from "./MainLayout";
import "./css/index.css";
import SellerSideNavigation from "../navigation/sellerNavigation/SellerSideNavigation";
import { Outlet } from "react-router-dom";
import SellerTopNavigation from "../navigation/sellerNavigation/SellerTopNavigation";

const SellerLayout = ({ children }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(commonAction.asyncEnd());
	}, []);
	return (
		<>
			<SellerTopNavigation />
			<SellerSideNavigation />
			<div id="seller-content-wrapper">
				{children}
				<Outlet />
			</div>
		</>
	);
};

export default SellerLayout;
