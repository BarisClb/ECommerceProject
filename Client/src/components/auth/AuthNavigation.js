import React from "react";
import { useDispatch } from "react-redux";
import { accountActions } from "../../store/actions/accountActions";
import "./css/index.css";

function AuthNavigation(params) {
	const dispatch = useDispatch();
	const logOut = () => {
		dispatch(accountActions.accountLogOut("User"));
	};

	return (
		<div id="main-authpage-content-wrapper">
			<div id="main-authpage-content">
				<div id="main-authpage-auth-text" className="row">
					<h1>
						It seems like you are already Logged In,{" "}
						{params.user.name
							? params.user.name
							: params.seller.name
							? params.seller.name
							: "Stranger"}
					</h1>
				</div>
				<div id="main-authpage-dummypage-text" className="row">
					<h5>Would you like to go to your profile?</h5>
					<h5>Or maybe LogOut and change account?</h5>
				</div>

				<div id="main-authpage-dummypage-links" className="row">
					<div className="col-md-4 col-sm-12 d-flex justify-content-center">
						<a className="main-authpage-dummypage-link nav-link" href="/admin/profile">
							Admin Profile
						</a>
					</div>
					<div className="col-md-4 col-sm-12 d-flex justify-content-center">
						<a className="main-authpage-dummypage-link nav-link" href="/store/profile">
							User Profile
						</a>
					</div>
					<div className="col-md-4 col-sm-12 d-flex justify-content-center">
						<div
							className="main-authpage-dummypage-link nav-link"
							onClick={() => params.logOut()}
						>
							LogOut
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AuthNavigation;
