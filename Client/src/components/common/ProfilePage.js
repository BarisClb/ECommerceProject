import React, { useEffect, useState } from "react";
import "./css/index.css";

function ProfilePage(props) {
	const [accountType] = useState(props.accountType && props.accountType);
	const [editProfile, setEditProfile] = useState(false);
	const [editPermission] = useState(props.editPermission ? props.editPermission : false);

	// Data
	let [account] = useState(props.account);
	// const [updateAction] = useState(props.updateAction);

	// Info Values
	const [accountName, setAccountName] = useState(account && account.name ? account.name : "");
	const [accountUsername, setAccountUsername] = useState(
		account && account.username ? account.username : ""
	);
	const [accountEMail, setAccountEMail] = useState(account && account.eMail ? account.eMail : "");
	const [accountPassword, setAccountPassword] = useState("");
	const [accountAdmin] = useState(account && account.admin ? account.admin : false);
	const [accountAdminPassword, setAccountAdminPassword] = useState("");

	const saveChanges = () => {
		if (props.updateAction) {
			let updatedInfo = {};
			if (changeName) {
				updatedInfo = { ...updatedInfo, name: accountName };
			}
			if (changeUsername) {
				updatedInfo = { ...updatedInfo, username: accountUsername };
			}
			if (changeEMail) {
				updatedInfo = { ...updatedInfo, eMail: accountEMail };
			}
			if (changePassword) {
				updatedInfo = { ...updatedInfo, password: accountPassword };
			}
			if (changeAdmin) {
				updatedInfo = { ...updatedInfo, adminPassword: accountAdminPassword };
			}
			props.updateAction(updatedInfo);
			setEditProfile((prev) => false);
		}
	};

	// Change or Not
	const [changeName, setChangeName] = useState(false);
	const [changeUsername, setChangeUsername] = useState(false);
	const [changeEMail, setChangeEMail] = useState(false);
	const [changePassword, setChangePassword] = useState(false);
	const [changeAdmin, setChangeAdmin] = useState(false);
	const [showAdminPassword, setShowAdminPassword] = useState(false);

	return (
		<div id="profile-info-container" className="container rounded bg-white mt-5 mb-5">
			<div className="row">
				{/* LEFT (PHOTO AND BASIC INFO) SECTION */}
				<div className="col-lg-3 border-right">
					<div className="d-flex flex-column align-items-center text-center p-3 py-5">
						<img
							className="rounded-circle mt-5"
							width="150px"
							src="/adminLTE/dist/img/AdminLTELogo.png"
							alt="Profile"
						/>
						<span className="font-weight-bold mt-2">
							{account && account.name ? account.name : "Stranger Name"}
						</span>
						<span className="text-black-50">
							{account && account.eMail ? account.eMail : "Stranger EMail"}
						</span>
						<div className={`mt-3 ${!editPermission ? "hide-me" : ""}`}>
							<button
								className="btn btn-primary edit-profile-button"
								type="button"
								onClick={() => setEditProfile((prev) => !editProfile)}
							>
								Edit Profile
							</button>
						</div>
					</div>
				</div>
				{/* MIDDLE (ACCOUNT INFO) SECTION */}
				<div className="col-lg-5 border-right">
					<div className="p-3 py-5">
						<div className="d-flex justify-content-between align-items-center mb-3">
							<h4 className="text-right">Profile</h4>
						</div>
						<div className="row mt-3 gap-2">
							<div className="col-lg-12">
								<div className="row">
									<div className="col-6">
										<label className="labels">Name</label>
									</div>
									<div className="col-6">
										<div className={`form-check ml-3 ${!editProfile ? "hide-me" : ""}`}>
											<input
												className="form-check-input"
												type="checkbox"
												id="profile-update-name-check"
												onChange={() => setChangeName((prev) => !changeName)}
												checked={changeName}
											/>
											<label
												className="form-check-label"
												htmlFor="profile-update-name-check"
											>
												Change
											</label>
										</div>
									</div>
								</div>
								<input
									type="text"
									className="form-control"
									placeholder="Name"
									defaultValue={accountName}
									onChange={(e) => setAccountName(e.target.value)}
									disabled={!editProfile || !changeName}
								/>
							</div>
							<div className="col-lg-12">
								<div className="row">
									<div className="col-6">
										<label className="labels">Username</label>
									</div>
									<div className="col-6">
										<div className={`form-check ml-3 ${!editProfile ? "hide-me" : ""}`}>
											<input
												className="form-check-input"
												type="checkbox"
												id="profile-update-username-check"
												onChange={() => setChangeUsername((prev) => !changeUsername)}
												checked={changeUsername}
											/>
											<label
												className="form-check-label"
												htmlFor="profile-update-username-check"
											>
												Change
											</label>
										</div>
									</div>
								</div>
								<input
									type="text"
									className="form-control"
									placeholder="Username"
									defaultValue={accountUsername}
									onChange={(e) => setAccountUsername(e.target.value)}
									disabled={!editProfile || !changeUsername}
								/>
							</div>
							<div className="col-lg-12">
								<div className="row">
									<div className="col-6">
										<label className="labels">EMail</label>
									</div>
									<div className="col-6">
										<div className={`form-check ml-3 ${!editProfile ? "hide-me" : ""}`}>
											<input
												className="form-check-input"
												type="checkbox"
												id="profile-update-eMail-check"
												onChange={() => setChangeEMail((prev) => !changeEMail)}
												checked={changeEMail}
											/>
											<label
												className="form-check-label"
												htmlFor="profile-update-eMail-check"
											>
												Change
											</label>
										</div>
									</div>
								</div>
								<input
									type="text"
									className="form-control"
									placeholder="Email"
									defaultValue={accountEMail}
									onChange={(e) => setAccountEMail(e.target.value)}
									disabled={!editProfile || !changeEMail}
								/>
							</div>
							<div className={`col-lg-12 ${!editProfile ? "hide-me" : ""}`}>
								<div className="row">
									<div className="col-6">
										<label className="labels">Password</label>
									</div>
									<div className="col-6">
										<div className={`form-check ml-3 ${!editProfile ? "hide-me" : ""}`}>
											<input
												className="form-check-input"
												type="checkbox"
												id="profile-update-password-check"
												onChange={() => setChangePassword((prev) => !changePassword)}
												checked={changePassword}
											/>
											<label
												className="form-check-label"
												htmlFor="profile-update-password-check"
											>
												Change
											</label>
										</div>
									</div>
								</div>
								<input
									type="text"
									className="form-control"
									placeholder="New Password"
									defaultValue={accountPassword}
									onChange={(e) => setAccountPassword(e.target.value)}
									disabled={!editProfile || !changePassword}
								/>
							</div>
							{(accountType === "Admin" || accountType === "User") && (
								<div className="col-lg-12">
									<div className="row">
										<div className="col-6">
											<label className="labels">Admin</label>
										</div>
										<div className="col-6">
											<div
												className={`form-check ml-3 ${!editProfile ? "hide-me" : ""}`}
											>
												<input
													className="form-check-input"
													type="checkbox"
													id="profile-update-admin-check"
													onChange={() => setChangeAdmin((prev) => !changeAdmin)}
													checked={changeAdmin}
												/>
												<label
													className="form-check-label"
													htmlFor="profile-update-admin-check"
												>
													Change
												</label>
											</div>
										</div>
									</div>
									<input
										type="text"
										className="form-control"
										placeholder="Admin"
										defaultValue={accountAdmin}
										disabled={true}
									/>
									<div className={`mt-2 ${!editProfile ? "hide-me" : ""}`}>
										<div className="row">
											<div className="col-6">
												<label className="labels">Admin Password</label>
											</div>
											<div className="col-6">
												{" "}
												<div
													className={`form-check ml-3 ${
														!editProfile ? "hide-me" : ""
													}`}
												>
													<input
														className="form-check-input"
														type="checkbox"
														id="profile-update-adminPassword-check"
														onChange={() =>
															setShowAdminPassword((prev) => !showAdminPassword)
														}
														checked={showAdminPassword}
													/>
													<label
														className="form-check-label"
														htmlFor="profile-update-adminPassword-check"
													>
														Show Password
													</label>
												</div>
											</div>
										</div>
										<input
											type={`${showAdminPassword ? "text" : "password"}`}
											className="form-control"
											placeholder="Admin Password"
											defaultValue={accountAdminPassword}
											onChange={(e) => setAccountAdminPassword(e.target.value)}
											disabled={!editProfile || !changeAdmin}
										/>
									</div>
								</div>
							)}
							<div className={`mt-4 text-center ${!editProfile ? "hide-me" : ""}`}>
								<button
									className="btn btn-primary profile-button"
									type="button"
									onClick={() => saveChanges()}
								>
									Save Changes
								</button>
							</div>
						</div>
					</div>
				</div>
				{/* RIGHT (FUTURE) SECTION */}
				<div className="col-lg-4">
					<div className="p-3 py-5">
						<div className="d-flex justify-content-between align-items-center mb-3">
							<h4>Future</h4>
						</div>
						<div className="row mt-3 gap-2">
							<div className="col-lg-12">
								<label className="labels">Phone Number</label>
								<input
									type="text"
									className="form-control"
									placeholder="Phone Number"
									defaultValue={""}
									disabled={true}
								/>
							</div>
							<div className="col-lg-12">
								<label className="labels">Address Line 1</label>
								<input
									type="text"
									className="form-control"
									placeholder="Address Line 1"
									defaultValue={""}
									disabled={true}
								/>
							</div>
							<div className="col-lg-12">
								<label className="labels">Address Line 2</label>
								<input
									type="text"
									className="form-control"
									placeholder="Address Line 2"
									defaultValue={""}
									disabled={true}
								/>
							</div>
							<div className="col-lg-12">
								<label className="labels">State/Region</label>
								<input
									type="text"
									className="form-control"
									placeholder="State"
									defaultValue={""}
									disabled={true}
								/>
							</div>
							<div className="col-lg-12">
								<label className="labels">Country</label>
								<input
									type="text"
									className="form-control"
									placeholder="Country"
									defaultValue={""}
									disabled={true}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;
