import React from "react";
import { useSelector } from "react-redux";
import { commonActions } from "../../store/actions";
import "./css/index.css";

function AdminWelcome() {
	const accountUser = useSelector((state) => state.account.user);
	const accountRoles = accountUser.roles;

	return (
		<div id="admin-welcome-component-wrapper">
			<h1>
				Hello,{" "}
				{accountUser && !commonActions.objectIsEmpty(accountUser) ? accountUser.name : "Guest"}
			</h1>
			<h3>
				{accountUser && commonActions.objectIsEmpty(accountUser)
					? "You need to LogIn to access Admin Panel."
					: accountRoles && !accountRoles.includes("Admin")
					? "You don't have the necessary 'Admin' role to access and change data."
					: "Hope you are having a great day."}
			</h3>
			{((accountUser && commonActions.objectIsEmpty(accountUser)) ||
				(accountRoles && !accountRoles.includes("Admin"))) && (
				<div className="row">
					<div className="col-md-6 col-sm-12 d-flex justify-content-center">
						<a className="main-authpage-auth-link nav-link" href="/login">
							LogIn
						</a>
					</div>
					<div className="col-md-6 col-sm-12 d-flex justify-content-center">
						<a className="main-authpage-auth-link nav-link" href="/register">
							Register
						</a>
					</div>
				</div>
			)}
		</div>
	);
}

export default AdminWelcome;
