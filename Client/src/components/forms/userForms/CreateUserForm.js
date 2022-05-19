import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";

const CreateUserForm = (props) => {
	// FORM DATA
	const [nameValue, setNameValue] = useState("");
	const [usernameValue, setUsernameValue] = useState("");
	const [eMailValue, setEMailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const [adminValue, setAdminValue] = useState(false);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = (e) => {
		e.preventDefault();
		setModal(!modal);
	};
	const navCreateButtonClick = (e) => {
		e.preventDefault();
		// Boolean Value turns into String when I put it inside object as a variable, so I added this.
		let admin = { admin: false };
		if (adminValue) {
			admin = { admin: true };
		}
		if (props.navCreateButtonClick) {
			props.navCreateButtonClick({
				name: nameValue,
				username: usernameValue,
				eMail: eMailValue,
				password: passwordValue,
				...admin,
			});
		}
		setNameValue("");
		setUsernameValue("");
		setEMailValue("");
		setPasswordValue("");
		setAdminValue(false);
		toggle();
	};

	return (
		<>
			<button className="btn btn-success" onClick={toggle}>
				Create
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<form onSubmit={(e) => navCreateButtonClick(e)}>
					<ModalHeader className="modal-form-item">Create User</ModalHeader>
					<ModalBody className="modal-form">
						{/* USER NAME */}
						<div className="modal-form-item modal-form-name">
							<label htmlFor="modal-user-update-form-name" className="form-label">
								Name
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-user-update-form-name"
								placeholder="Name"
								value={nameValue}
								onChange={(event) => setNameValue(event.target.value)}
							/>
						</div>
						{/* USER USERNAME */}
						<div className="modal-form-item modal-form-username">
							<label htmlFor="modal-user-create-form-username" className="form-label">
								Username
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-user-create-form-username"
								placeholder="Username"
								value={usernameValue}
								onChange={(event) => setUsernameValue(event.target.value)}
							/>
						</div>
						{/* USER EMAIL */}
						<div className="modal-form-item modal-form-email">
							<label htmlFor="modal-user-create-form-email" className="form-label">
								EMail
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-user-create-form-email"
								placeholder="Email"
								value={eMailValue}
								onChange={(event) => setEMailValue(event.target.value)}
							/>
						</div>
						{/* USER PASSWORD */}
						<div className="modal-form-item modal-form-password">
							<label htmlFor="modal-user-create-form-password" className="form-label">
								Password
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-user-create-form-password"
								placeholder="Password"
								value={passwordValue}
								onChange={(event) => setPasswordValue(event.target.value)}
							/>
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
							>
								<option value={false}>No</option>
								<option value={true}>Yes</option>
							</Input>
						</div>
					</ModalBody>
					<ModalFooter>
						<button className="btn btn-success form-input form-control" type="submit">
							Create User
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

export default CreateUserForm;
