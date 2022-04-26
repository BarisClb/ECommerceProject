import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commonAction } from "../../store/actions";
import "./css/index.css";
import { Outlet } from "react-router-dom";
import StoreTopNavigation from "../navigation/storeNavigation/StoreTopNavigation";
import StoreFooter from "../navigation/storeNavigation/StoreFooter";
import Loading from "../common/Loading";

const StoreLayout = ({ children }) => {
	const dispatch = useDispatch();
	const common = useSelector((state) => state.common);
	useEffect(() => {
		dispatch(commonAction.asyncEnd());
	}, []);
	const darkMode = useSelector((state) => state.common.DarkMode);
	return (
		<>
			<StoreTopNavigation />
			{common.IsLoading && <Loading />}
			<div
				id="store-content-wrapper"
				className={
					darkMode
						? "store-content-wrapper-dark"
						: "store-content-wrapper-light"
				}
			>
				{children}
				<Outlet />
			</div>
			<StoreFooter />
		</>
	);
};

export default StoreLayout;
