import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { commonAction } from "../../store/actions";
import MainLayout from "./MainLayout";
import "./css/index.css";
import StoreNavigation from "../navigation/StoreNavigation";
import { Outlet } from "react-router-dom";

const StoreLayout = ({ children }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(commonAction.asyncEnd());
	}, []);
	return (
		<MainLayout>
			<StoreNavigation />
			{children}
			<Outlet />
		</MainLayout>
	);
};

export default StoreLayout;
