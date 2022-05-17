import React, { useState } from "react";
import "./css/index.css";
import { userActions } from "../../store/actions/userActions";
import { sellerActions } from "../../store/actions/sellerActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function RegisterForm() {
	// // DATA
	// Shared
	const [accountType, setAccountType] = useState("User");
	const [nameValue, setNameValue] = useState("");
	const [usernameValue, setUsernameValue] = useState("");
	const [eMailValue, setEMailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	// User Only
	const [adminPasswordValue, setAdminPasswordValue] = useState("");
	const [showAdminPassword, setShowAdminPassword] = useState(false);

	// Register Action
	const dispatch = useDispatch();

	const register = () => {
		let registerInfo = {
			name: nameValue,
			username: usernameValue,
			eMail: eMailValue,
			password: passwordValue,
		};
		if (accountType === "User") {
			dispatch(userActions.createUser({ ...registerInfo, adminPassword: adminPasswordValue }));
		} else if (accountType === "Seller") {
			dispatch(sellerActions.createSeller(registerInfo));
		}
	};

	return (
		<div id="login-form">
			<form>
				{/* Login */}
				<div className="form-outline mb-1">
					<a className="main-authpage-auth-link nav-link" href="/login">
						Already have an Account? LogIn here.
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
				{/* NAME (PERSON) */}
				<div className="form-outline mb-4">
					<label className="form-label" htmlFor="login-form-name">
						Name
					</label>
					<input
						type="text"
						id="login-form-name"
						className="form-control"
						value={nameValue}
						onChange={(e) => setNameValue(e.target.value)}
					/>
				</div>
				{/* USERNAME */}
				<div className="form-outline mb-4">
					<label className="form-label" htmlFor="login-form-username">
						Username
					</label>
					<input
						type="text"
						id="login-form-username"
						className="form-control"
						value={usernameValue}
						onChange={(e) => setUsernameValue(e.target.value)}
					/>
				</div>
				{/* EMAIL */}
				<div className="form-outline mb-4">
					<label className="form-label" htmlFor="login-form-eMail">
						EMail
					</label>
					<input
						type="text"
						id="login-form-eMail"
						className="form-control"
						value={eMailValue}
						onChange={(e) => setEMailValue(e.target.value)}
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
						value={passwordValue}
						onChange={(e) => setPasswordValue(e.target.value)}
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
								id="login-form-showPassword-checkbox"
								defaultChecked={showPassword}
								onChange={() => setShowPassword(!showPassword)}
							/>
							<label className="form-check-label" htmlFor="login-form-showPassword-checkbox">
								Show Password
							</label>
						</div>
					</div>
					<div className="col">
						{/* Simple link */}
						<div className="forgot-password-link" onClick={() => toast("Try 123")}>
							Can't think of a password?
						</div>
					</div>
				</div>
				{/* ADMIN PASSWORD FOR USERS INPUT */}
				{accountType === "User" && (
					<>
						<div className="form-outline mb-4">
							<label className="form-label" htmlFor="login-form-adminPassword">
								Password
							</label>
							<input
								type={showAdminPassword ? "text" : "password"}
								id="login-form-adminPassword"
								className="form-control"
								value={adminPasswordValue}
								onChange={(e) => setAdminPasswordValue(e.target.value)}
							/>
						</div>
						<div className="row mb-4">
							<div className="col d-flex justify-content-center">
								<div className="form-check">
									<input
										className="form-check-input"
										type="checkbox"
										id="login-form-showAdminPassword-checkbox"
										defaultChecked={showAdminPassword}
										onChange={() => setShowAdminPassword(!showAdminPassword)}
									/>
									<label
										className="form-check-label"
										htmlFor="login-form-showAdminPassword-checkbox"
									>
										Show Password
									</label>
								</div>
							</div>
							<div className="col">
								{/* Simple link */}
								<div className="forgot-password-link" onClick={() => toast("Try 123")}>
									Can't remember the adminPassword?
								</div>
							</div>
						</div>
					</>
				)}
				{/* Submit button */}
				<button
					type="button"
					className="btn btn-primary btn-block mb-4"
					onClick={() => register()}
				>
					Register
				</button>
			</form>
		</div>
	);
}

export default RegisterForm;
