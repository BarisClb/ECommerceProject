import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { accountActions } from "../../store/actions/accountActions";
import "./css/index.css";

function LogInForm() {
	const dispatch = useDispatch();

	const [accountType, setAccountType] = useState("User");
	const [accountName, setAccountName] = useState("");
	const [accountPassword, setAccountPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const logIn = (e) => {
		e.preventDefault();
		let user = { accountType: accountType, account: accountName, password: accountPassword };

		dispatch(accountActions.accountLogIn(accountType, user));
	};

	return (
		<div id="login-form">
			<form>
				{/* Register */}
				<div className="form-outline mb-1">
					<a className="main-authpage-auth-link nav-link" href="/register">
						Don't have an Account? Register here.
					</a>
				</div>
				{/* ACCOUNT TYPE */}
				<div className="form-outline mb-4">
					<label htmlFor="login-form-accountType-select">Account Type</label>
					<select
						name="login-form-accountType-select"
						id="login-form-accountType-select"
						className="form-select"
						value={accountType}
						onChange={(e) => setAccountType(e.target.value)}
					>
						<option value={"User"}>User</option>
						<option value={"Seller"}>Seller</option>
					</select>
				</div>
				{/* ACCOUNT INPUT (CAN BE USERNAME OR EMAIL, PASSES EMAIL REGEX IN API) */}
				<div className="form-outline mb-4">
					<label className="form-label" htmlFor="login-form-accountName">
						Username or Email
					</label>
					<input
						type="text"
						id="login-form-accountName"
						className="form-control"
						value={accountName}
						onChange={(e) => setAccountName(e.target.value)}
					/>
				</div>
				{/* PASSWORD INPUT */}
				<div className="form-outline mb-4">
					<label className="form-label" htmlFor="login-form-password">
						Password
					</label>
					<input
						type={showPassword ? "text" : "password"}
						id="login-form-password"
						className="form-control"
						value={accountPassword}
						onChange={(e) => setAccountPassword(e.target.value)}
					/>
				</div>
				{/* PASSWORD EXTRA */}
				<div className="row mb-4">
					<div className="col d-flex justify-content-center">
						{/* Checkbox */}
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								id="login-form-showpassword-checkbox"
								defaultChecked={showPassword}
								value={showPassword}
								onChange={() => setShowPassword(!showPassword)}
							/>
							<label className="form-check-label" htmlFor="login-form-showpassword-checkbox">
								Show Password
							</label>
						</div>
					</div>
					<div className="col">
						{/* Simple link */}
						<div className="forgot-password-link" onClick={() => window.alert("Try 123")}>
							Forgot password?
						</div>
					</div>
				</div>
				{/* Submit button */}
				<button
					type="button"
					className="btn btn-primary btn-block mb-4"
					onClick={(e) => logIn(e)}
				>
					Log in
				</button>
			</form>
		</div>
	);
}

export default LogInForm;
