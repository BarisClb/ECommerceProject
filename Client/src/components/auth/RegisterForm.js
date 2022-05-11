import React, { useState } from "react";
import "./css/index.css";

function RegisterForm() {
	// // DATA
	// Shared
	const [accountType, setAccountType] = useState("User");
	const [nameValue, setNameValue] = useState("");
	const [usernameValue, setUsernameValue] = useState("");
	const [emailValue, setEmailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div id="login-form">
			<form>
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
					<label className="form-label" htmlFor="login-form-email">
						Email
					</label>
					<input
						type="text"
						id="login-form-email"
						className="form-control"
						value={emailValue}
						onChange={(e) => setEmailValue(e.target.value)}
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
								id="login-form-showpassword-checkbox"
								defaultChecked={showPassword}
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
					// onClick={() => ()}
				>
					Register
				</button>
			</form>
		</div>
	);
}

export default RegisterForm;
