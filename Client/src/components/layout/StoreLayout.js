import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { commonAction } from "../../store/actions";
import "./css/index.css";
import { Outlet } from "react-router-dom";
import StoreTopNavigation from "../navigation/storeNavigation/StoreTopNavigation";
import StoreFooter from "../navigation/storeNavigation/StoreFooter";

const StoreLayout = ({ children }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(commonAction.asyncEnd());
	}, []);
	return (
		<>
			<StoreTopNavigation />
			<div id="store-content-wrapper">
				{children}
				<Outlet />
			</div>
			<StoreFooter />
		</>
	);
};

export default StoreLayout;
