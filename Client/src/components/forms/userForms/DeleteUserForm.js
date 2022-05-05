import React, { useEffect, useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../store/actions";

const DeleteUserForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(0);
	const [entityFound, setEntityFound] = useState(false);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navDeleteButtonClick = () => {
		if (props.navDeleteButtonClick && idValue > 0) {
			props.navDeleteButtonClick(Number.parseInt(user.id));
		}
		setIdValue(0);
		toggle();
	};

	const user = useSelector((state) => state.common.EntityToUpdate);

	const dispatch = useDispatch();
	const findEntity = () => {
		dispatch(commonActions.getEntityToUpdate("Users", idValue));
	};

	useEffect(() => {
		if (user.id) {
			setIdValue(user.id);
			setNameValue(user.name);
			setUsernameValue(user.username);
			setEMailValue(user.eMail);
			setPasswordValue(user.password);
			setAdminValue(user.admin);
			setEntityFound(true);
		} else {
			setIdValue(0);
			setNameValue("");
			setUsernameValue("");
			setEMailValue("");
			setPasswordValue("");
			setAdminValue(false);
			setEntityFound(false);
		}
	}, [user]);

	const [nameValue, setNameValue] = useState("");
	const [usernameValue, setUsernameValue] = useState("");
	const [eMailValue, setEMailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const [adminValue, setAdminValue] = useState(false);

	return (
		<>
			<button className="btn btn-danger	" onClick={toggle}>
				Delete
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="modal-form-item">Delete User</ModalHeader>
				<ModalBody className="modal-form">
					{/* USER ID */}
					<div className="modal-form-item modal-form-id">
						<label htmlFor="modal-user-delete-form-id" className="form-label">
							Id
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-user-delete-form-id"
							placeholder="Id"
							value={idValue}
							onChange={(event) => setIdValue(event.target.value)}
							min="1"
						/>
						<button
							className="btn btn-primary get-entity-to-delete-button"
							onClick={() => findEntity()}
						>
							Get User
						</button>
					</div>
					{/* USER NAME */}
					<div className="modal-form-item modal-form-name">
						<label htmlFor="modal-user-delete-form-name" className="form-label">
							Name
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-user-delete-form-name"
							placeholder="User Name"
							value={nameValue}
							disabled={true}
						/>
					</div>
					{/* USER USERNAME */}
					<div className="modal-form-item modal-form-username">
						<label htmlFor="modal-user-delete-form-username" className="form-label">
							Username
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-user-delete-form-username"
							placeholder="Username"
							value={usernameValue}
							disabled={true}
						/>
					</div>
					{/* USER EMAIL */}
					<div className="modal-form-item modal-form-eMail">
						<label htmlFor="modal-user-delete-form-eMail" className="form-label">
							EMail
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-user-delete-form-eMail"
							placeholder="EMail"
							value={eMailValue}
							disabled={true}
						/>
					</div>
					{/* USER PASSWORD */}
					<div className="modal-form-item modal-form-password">
						<label htmlFor="modal-user-delete-form-password" className="form-label">
							Password
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-user-delete-form-password"
							placeholder="Password"
							value={passwordValue}
							disabled={true}
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
							disabled={true}
						>
							<option value={false}>No</option>
							<option value={true}>Yes</option>
						</Input>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-danger form-input form-control"
						onClick={() => navDeleteButtonClick()}
						disabled={!entityFound}
					>
						Delete User
					</button>
					<button className="btn btn-secondary form-input form-control" onClick={toggle}>
						Close
					</button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default DeleteUserForm;
