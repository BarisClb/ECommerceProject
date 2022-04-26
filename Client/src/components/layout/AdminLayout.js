import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { commonAction } from "../../store/actions";
import Loading from "../common/Loading";
import AdminSideNavigation from "../navigation/adminNavigation/AdminSideNavigation";
import AdminTopNavigation from "../navigation/adminNavigation/AdminTopNavigation";
import "./css/index.css";

const AdminLayout = ({ children }) => {
	const dispatch = useDispatch();
	const common = useSelector((state) => state.common);
	useEffect(() => {
		dispatch(commonAction.asyncEnd());
	}, []);
	return (
		<>
			<AdminTopNavigation />
			<AdminSideNavigation />
			{common.IsLoading && <Loading />}
			<div id="admin-content-wrapper">
				{children}
				<Outlet />
			</div>
		</>
	);
};

export default AdminLayout;
