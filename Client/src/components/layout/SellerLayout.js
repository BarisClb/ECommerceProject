import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commonAction } from "../../store/actions";
import "./css/index.css";
import SellerSideNavigation from "../navigation/sellerNavigation/SellerSideNavigation";
import { Outlet } from "react-router-dom";
import SellerTopNavigation from "../navigation/sellerNavigation/SellerTopNavigation";
import Loading from "../common/Loading";

const SellerLayout = ({ children }) => {
	const dispatch = useDispatch();
	const common = useSelector((state) => state.common);
	useEffect(() => {
		dispatch(commonAction.asyncEnd());
	}, []);
	return (
		<>
			<SellerTopNavigation />
			<SellerSideNavigation />
			{common.IsLoading && <Loading />}
			<div id="seller-content-wrapper">
				{children}
				<Outlet />
			</div>
		</>
	);
};

export default SellerLayout;
