import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AdminWelcome from "../../components/admin/AdminWelcome";
import AdminLayout from "../../components/layout/AdminLayout";
import { commonActions } from "../../store/actions";
import { accountActions } from "../../store/actions/accountActions";

function AdminMain() {
	const dispatch = useDispatch();

	const accountUser = useSelector((state) => state.account.user);
	const accountRoles = accountUser.roles;
	useEffect(() => {
		dispatch(accountActions.accountVerify("User"));
	}, []);

	return (
		<AdminLayout>
			{(accountUser && commonActions.objectIsEmpty(accountUser)) ||
			(accountRoles && !accountRoles.includes("Admin")) ? (
				<AdminWelcome />
			) : (
				<Outlet />
			)}
		</AdminLayout>
	);
}

export default AdminMain;
