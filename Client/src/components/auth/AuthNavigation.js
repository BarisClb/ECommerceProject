import React from "react";
import { useDispatch } from "react-redux";
import { commonActions } from "../../store/actions";
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
				<div id="main-authpage-auth-header" className="row">
					<h1>
						Hello,{" "}
						{params.user && params.user.name
							? params.user.name
							: params.seller && params.seller.name && params.seller.name}
					</h1>
				</div>
				<div id="main-authpage-auth-text" className="row">
					<h5>Would you like to go to your profile?</h5>
					<h5>LogOut and change account?</h5>
					<h5>Or maybe, create a new one?</h5>
				</div>
				{/* Links */}
				<div id="main-authpage-auth-links" className="row">
					{params.user && !commonActions.objectIsEmpty(params.user) ? (
						<>
							<div className="col-md-4 col-sm-12 d-flex justify-content-center">
								<a className="main-authpage-auth-link nav-link" href="/admin/profile">
									Admin Profile
								</a>
							</div>
							<div className="col-md-4 col-sm-12 d-flex justify-content-center">
								<a className="main-authpage-auth-link nav-link" href="/store/profile">
									User Profile
								</a>
							</div>
						</>
					) : (
						<div className="col-md-8 col-sm-12 d-flex justify-content-center">
							<a className="main-authpage-auth-link nav-link" href="/seller/profile">
								Seller Profile
							</a>
						</div>
					)}

					<div className="col-md-4 col-sm-12 d-flex justify-content-center">
						<div className="main-authpage-auth-link nav-link" onClick={() => params.logOut()}>
							LogOut
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AuthNavigation;
