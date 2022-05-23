import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AdminWelcome from "../../components/admin/AdminWelcome";
import AdminLayout from "../../components/layout/AdminLayout";
import { commonActions } from "../../store/actions";
import { accountActions } from "../../store/actions/accountActions";

function AdminMain() {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.account.user);
	const accountRoles = user.roles;
	useEffect(() => {
		if (!commonActions.objectIsEmpty(user)) {
			dispatch(accountActions.accountVerify("User"));
		}
	}, []);

	return (
		<AdminLayout>
			{(user && commonActions.objectIsEmpty(user)) ||
			(accountRoles && !accountRoles.includes("Admin")) ? (
				<AdminWelcome />
			) : (
				<Outlet />
			)}
		</AdminLayout>
	);
}

export default AdminMain;
