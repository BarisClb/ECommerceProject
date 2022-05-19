import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../store/actions";
import "./css/index.css";
import StoreTopNavigation from "../navigation/storeNavigation/StoreTopNavigation";
import StoreFooter from "../navigation/storeNavigation/StoreFooter";
import Loading from "../common/Loading";

const StoreLayout = (params) => {
	const dispatch = useDispatch();
	const common = useSelector((state) => state.common);
	// useEffect(() => {
	// 	dispatch(commonActions.asyncEnd());
	// }, []);
	const darkMode = useSelector((state) => state.common.DarkMode);

	return (
		<>
			<StoreTopNavigation account={params.account} logOut={params.logOut} />
			{common.IsLoading && <Loading />}
			<div
				id="store-content-wrapper"
				className={darkMode ? "store-content-wrapper-dark" : "store-content-wrapper-light"}
			>
				{params.children}
			</div>
			<StoreFooter />
		</>
	);
};

export default StoreLayout;
