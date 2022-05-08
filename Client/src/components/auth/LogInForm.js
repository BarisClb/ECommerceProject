import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { accountActions } from "../../store/actions/accountActions";
import "./css/index.css";

function LogInForm() {
	const dispatch = useDispatch();

	const [accountType, setAccountType] = useState("User");

	const logIn = () => {
		let user = { accountType: "User", account: "UserName4", password: "123" };

		dispatch(accountActions.accountLogIn("User", user));
	};

	return (
		<div id="login-form">
			<form>
				{/* ACCOUNT TYPE */}
				<div className="form-outline mb-4">
					<label htmlFor="table-sort-by-reversed">Account Type</label>
					<select
						name="table-sort-by-reversed"
						id="table-sort-by-reversed"
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
					<label className="form-label" htmlFor="form2Example1">
						Username or Email
					</label>
					<input type="text" id="form2Example1" className="form-control" />
				</div>
				{/* Password input */}
				<div className="form-outline mb-4">
					<label className="form-label" htmlFor="form2Example2">
						Password
					</label>
					<input type="password" id="form2Example2" className="form-control" />
				</div>
				{/* 2 column grid layout for inline styling */}
				<div className="row mb-4">
					<div className="col d-flex justify-content-center">
						{/* Checkbox */}
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								defaultValue
								id="form2Example31"
								defaultChecked
							/>
							<label className="form-check-label" htmlFor="form2Example31">
								{" "}
								Remember me{" "}
							</label>
						</div>
					</div>
					<div className="col">
						{/* Simple link */}
						<a href="#!">Forgot password?</a>
					</div>
				</div>
				{/* Submit button */}
				<button type="button" className="btn btn-primary btn-block mb-4">
					Log in
				</button>
				{/* Register buttons */}
				<div className="text-center">
					<p>
						Not a member? <a href="#!">Register</a>
					</p>
					<p>or sign up with:</p>
					<button type="button" className="btn btn-link btn-floating mx-1">
						<i className="fab fa-facebook-f" />
					</button>
					<button type="button" className="btn btn-link btn-floating mx-1">
						<i className="fab fa-google" />
					</button>
					<button type="button" className="btn btn-link btn-floating mx-1">
						<i className="fab fa-twitter" />
					</button>
					<button type="button" className="btn btn-link btn-floating mx-1">
						<i className="fab fa-github" />
					</button>
				</div>
			</form>
		</div>
	);
}

export default LogInForm;
