import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { commonActions } from "../../store/actions";
import { accountActions } from "../../store/actions/accountActions";

function AdminMain() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(accountActions.accountVerify("User"));
	}, []);

	const accountUser = useSelector((state) => state.account.user);
	const accountRoles = accountUser.roles;

	const logIn = () => {
		let user = { accountType: "User", account: "UserName2", password: "123" };

		dispatch(accountActions.accountLogIn("User", user));
	};
	const logOut = () => {
		dispatch(accountActions.accountLogOut("User"));
	};

	return (
		<>
			{commonActions.objectIsEmpty(accountUser) ? (
				"You need to log in."
			) : !accountRoles.includes("Admin") ? (
				"You are unathorized."
			) : (
				<Outlet />
			)}
			{/* {<Outlet acountUser={accountUser} />} */}
			<button onClick={logIn}>Log In</button>
			<button onClick={logOut}>Log Out</button>
		</>
	);
}

export default AdminMain;
