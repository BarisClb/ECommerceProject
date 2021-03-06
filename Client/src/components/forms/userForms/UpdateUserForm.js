import React, { useEffect, useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../store/actions";

const UpdateUserForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(0);
	const [entityFound, setEntityFound] = useState(false);

	const user = useSelector((state) => state.common.EntityToUpdate);

	const dispatch = useDispatch();

	const findEntity = (e) => {
		e.preventDefault();
		dispatch(commonActions.getEntityToUpdate("Users", idValue));
	};

	useEffect(() => {
		if (user && user.id) {
			setIdValue(user.id);
			setNameValue(user.name);
			setUsernameValue(user.username);
			seteMailValue(user.eMail);
			setPasswordValue(user.password);
			setAddressValue(user.address);
			setAdminValue(user.admin);
			setEntityFound(true);
		} else {
			setIdValue(0);
			setNameValue("");
			setUsernameValue("");
			seteMailValue("");
			setPasswordValue("");
			setAddressValue("");
			setAdminValue(false);
			setEntityFound(false);
		}
	}, [user]);

	const [nameValue, setNameValue] = useState("");
	const [usernameValue, setUsernameValue] = useState("");
	const [eMailValue, seteMailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const [addressValue, setAddressValue] = useState("");
	const [adminValue, setAdminValue] = useState(false);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = (e) => {
		e.preventDefault();
		setModal(!modal);
	};
	const navUpdateButtonClick = (e) => {
		e.preventDefault();
		if (props.navUpdateButtonClick && idValue > 0) {
			let updatedUser = {};
			if (changeName) {
				updatedUser = { ...updatedUser, name: nameValue };
			}
			if (changeUsername) {
				updatedUser = { ...updatedUser, username: usernameValue };
			}
			if (changeeMail) {
				updatedUser = { ...updatedUser, eMail: eMailValue };
			}
			if (changePassword) {
				updatedUser = { ...updatedUser, password: passwordValue };
			}
			if (changeAddress) {
				updatedUser = { ...updatedUser, address: addressValue };
			}
			if (changeAdmin) {
				// Boolean Value turns into String when I put it inside object as a variable, so I added this.
				let admin = { admin: false };
				// I don't know why but I have to use === true here, otherwise it always goes inside.
				if (adminValue === "true") {
					admin = { admin: true };
				}
				updatedUser = { ...updatedUser, ...admin };
			}

			props.navUpdateButtonClick(Number.parseInt(idValue), {
				...updatedUser,
			});
		}
		setIdValue(0);
		setNameValue("");
		setUsernameValue("");
		seteMailValue("");
		setPasswordValue("");
		setAddressValue("");
		setAdminValue(false);

		setChangeName(false);
		setChangeUsername(false);
		setChangeeMail(false);
		setChangePassword(false);
		setChangeAddress(false);
		setChangeAdmin(false);

		setEntityFound(false);

		setModal(!modal);
	};

	// Update or Not

	const [changeName, setChangeName] = useState(false);
	const [changeUsername, setChangeUsername] = useState(false);
	const [changeeMail, setChangeeMail] = useState(false);
	const [changePassword, setChangePassword] = useState(false);
	const [changeAddress, setChangeAddress] = useState(false);
	const [changeAdmin, setChangeAdmin] = useState(false);

	return (
		<>
			<button className="btn btn-warning" onClick={toggle}>
				Update
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<form onSubmit={(e) => navUpdateButtonClick(e)}>
					<ModalHeader className="modal-form-item">Update User</ModalHeader>
					<ModalBody className="modal-form">
						{/* USER ID */}
						<div className="modal-form-item modal-form-id">
							<label htmlFor="modal-user-update-form-id" className="form-label">
								Id
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-user-update-form-id"
								placeholder="Id"
								value={idValue}
								onChange={(event) => setIdValue(event.target.value)}
								min="1"
							/>
							<button
								className="btn btn-primary get-entity-to-update-button"
								onClick={(e) => findEntity(e)}
							>
								Get User
							</button>
						</div>
						{/* USER NAME */}
						<div className="modal-form-item modal-form-name">
							<label htmlFor="modal-user-update-form-name" className="form-label">
								Name
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-user-update-form-name"
								placeholder="User Name"
								value={nameValue}
								onChange={(event) => setNameValue(event.target.value)}
								disabled={!changeName}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="modal-form-user-update-name-check"
									onChange={() => setChangeName(!changeName)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-user-update-name-check"
								>
									Change
								</label>
							</div>
						</div>
						{/* USER USERNAME */}
						<div className="modal-form-item modal-form-username">
							<label htmlFor="modal-user-update-form-username" className="form-label">
								Username
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-user-update-form-username"
								placeholder="Username"
								value={usernameValue}
								onChange={(event) => setUsernameValue(event.target.value)}
								disabled={!changeUsername}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="modal-form-user-update-username-check"
									onChange={() => setChangeUsername(!changeUsername)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-user-update-username-check"
								>
									Change
								</label>
							</div>
						</div>
						{/* USER EMAIL */}
						<div className="modal-form-item modal-form-eMail">
							<label htmlFor="modal-user-update-form-eMail" className="form-label">
								EMail
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-user-update-form-eMail"
								placeholder="EMail"
								value={eMailValue}
								onChange={(event) => seteMailValue(event.target.value)}
								disabled={!changeeMail}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="modal-form-user-update-eMail-check"
									onChange={() => setChangeeMail(!changeeMail)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-user-update-eMail-check"
								>
									Change
								</label>
							</div>
						</div>
						{/* USER PASSWORD */}
						<div className="modal-form-item modal-form-password">
							<label htmlFor="modal-user-update-form-password" className="form-label">
								Password
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-user-update-form-password"
								placeholder="Password"
								value={passwordValue}
								onChange={(event) => setPasswordValue(event.target.value)}
								disabled={!changePassword}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									defaultValue
									id="modal-form-user-update-password-check"
									onChange={() => setChangePassword(!changePassword)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-user-update-password-check"
								>
									Change
								</label>
							</div>
						</div>
						{/* USER ADDRESS */}
						<div className="modal-form-item modal-form-address">
							<label htmlFor="modal-user-update-form-address" className="form-label">
								Address
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-user-update-form-address"
								placeholder="Address"
								value={addressValue}
								onChange={(event) => setAddressValue(event.target.value)}
								disabled={!changeAddress}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									defaultValue
									id="modal-form-user-update-address-check"
									onChange={() => setChangeAddress(!changeAddress)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-user-update-address-check"
								>
									Change
								</label>
							</div>
						</div>
						{/* USER ADMIN */}
						<div className="modal-form-item modal-form-admin">
							<label htmlFor="modal-form-admin" className="form-label">
								Admin
							</label>
							<Input
								type="select"
								className="form-control form-input"
								id="modal-user-create-form-admin"
								placeholder="Admin"
								value={adminValue}
								onChange={(event) => setAdminValue(event.target.value)}
								disabled={!changeAdmin}
							>
								<option value={false}>No</option>
								<option value={true}>Yes</option>
							</Input>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									defaultValue
									id="modal-form-user-update-admin-check"
									onChange={() => setChangeAdmin(!changeAdmin)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-user-update-admin-check"
								>
									Change
								</label>
							</div>
						</div>
					</ModalBody>
					<ModalFooter>
						<button
							className="btn btn-warning form-input form-control"
							type="submit"
							disabled={!entityFound}
						>
							Update User
						</button>
						<button
							className="btn btn-secondary form-input form-control"
							onClick={(e) => toggle(e)}
						>
							Close
						</button>
					</ModalFooter>
				</form>
			</Modal>
		</>
	);
};

export default UpdateUserForm;
