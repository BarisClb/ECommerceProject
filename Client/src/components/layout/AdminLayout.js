import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { commonActions } from "../../store/actions";
import Loading from "../common/Loading";
import AdminSideNavigation from "../navigation/adminNavigation/AdminSideNavigation";
import AdminTopNavigation from "../navigation/adminNavigation/AdminTopNavigation";
import "./css/index.css";

const AdminLayout = ({ children }) => {
	const dispatch = useDispatch();
	const common = useSelector((state) => state.common);
	useEffect(() => {
		dispatch(commonActions.asyncEnd());
	}, []);
	return (
		<>
			<AdminTopNavigation />
			<AdminSideNavigation />
			{common.IsLoading && <Loading />}
			<div id="admin-content-wrapper">{children}</div>
		</>
	);
};

export default AdminLayout;
