import React from "react";
import { useSelector } from "react-redux";
import { commonActions } from "../../store/actions";
import "./css/index.css";

function SellerWelcome() {
	const accountSeller = useSelector((state) => state.account.seller);
	const accountRoles = accountSeller.roles;

	return (
		<div id="seller-welcome-component-wrapper">
			<h1>
				Hello,{" "}
				{accountSeller && !commonActions.objectIsEmpty(accountSeller)
					? accountSeller.name
					: "Stranger"}
			</h1>
			<h3>
				{accountSeller && commonActions.objectIsEmpty(accountSeller)
					? "You need to LogIn to access Seller Panel."
					: accountRoles && !accountRoles.includes("Seller")
					? "You don't have the necessary 'Seller' role to access and change data."
					: "Hope you are having a great day."}
			</h3>
			{((accountSeller && commonActions.objectIsEmpty(accountSeller)) ||
				(accountRoles && !accountRoles.includes("Seller"))) && (
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

export default SellerWelcome;
