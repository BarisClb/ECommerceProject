import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CreateSellerForm = (props) => {
	// FORM DATA
	const [nameValue, setNameValue] = useState("");
	const [usernameValue, setUsernameValue] = useState("");
	const [eMailValue, setEMailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = (e) => {
		e.preventDefault();
		setModal(!modal);
	};
	const navCreateButtonClick = (e) => {
		e.preventDefault();
		if (props.navCreateButtonClick) {
			props.navCreateButtonClick({
				name: nameValue,
				username: usernameValue,
				eMail: eMailValue,
				password: passwordValue,
			});
		}
		setNameValue("");
		setUsernameValue("");
		setEMailValue("");
		setPasswordValue("");

		setModal(!modal);
	};

	return (
		<>
			<button className="btn btn-success" onClick={toggle}>
				Create
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<form onSubmit={(e) => navCreateButtonClick(e)}>
					<ModalHeader className="modal-form-item">Create Seller</ModalHeader>
					<ModalBody className="modal-form">
						{/* SELLER NAME */}
						<div className="modal-form-item modal-form-name">
							<label htmlFor="modal-seller-create-form-name" className="form-label">
								Name
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-seller-create-form-name"
								placeholder="Name"
								value={nameValue}
								onChange={(event) => setNameValue(event.target.value)}
							/>
						</div>
						{/* SELLER USERNAME */}
						<div className="modal-form-item modal-form-username">
							<label htmlFor="modal-seller-create-form-username" className="form-label">
								Username
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-seller-create-form-username"
								placeholder="Username"
								value={usernameValue}
								onChange={(event) => setUsernameValue(event.target.value)}
							/>
						</div>
						{/* SELLER EMAIL */}
						<div className="modal-form-item modal-form-eMail">
							<label htmlFor="modal-seller-create-form-eMail" className="form-label">
								EMail
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-seller-create-form-eMail"
								placeholder="EMail"
								value={eMailValue}
								onChange={(event) => setEMailValue(event.target.value)}
							/>
						</div>
						{/* SELLER PASSWORD */}
						<div className="modal-form-item modal-form-password">
							<label htmlFor="modal-seller-create-form-password" className="form-label">
								Password
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-seller-create-form-password"
								placeholder="Password"
								value={passwordValue}
								onChange={(event) => setPasswordValue(event.target.value)}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<button className="btn btn-success form-input form-control" type="submit">
							Create Seller
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

export default CreateSellerForm;
