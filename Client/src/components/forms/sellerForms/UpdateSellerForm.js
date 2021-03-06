import React, { useEffect, useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../store/actions";

const UpdateSellerForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(0);
	const [entityFound, setEntityFound] = useState(false);

	const seller = useSelector((state) => state.common.EntityToUpdate);

	const dispatch = useDispatch();

	const findEntity = (e) => {
		e.preventDefault();
		dispatch(commonActions.getEntityToUpdate("Sellers", idValue));
	};

	useEffect(() => {
		if (seller && seller.id) {
			setIdValue(seller.id);
			setNameValue(seller.name);
			setUsernameValue(seller.username);
			seteMailValue(seller.eMail);
			setPasswordValue(seller.password);
			setEntityFound(true);
		} else {
			setIdValue(0);
			setNameValue("");
			setUsernameValue("");
			seteMailValue("");
			setPasswordValue("");
			setEntityFound(false);
		}
	}, [seller]);

	const [nameValue, setNameValue] = useState("");
	const [usernameValue, setUsernameValue] = useState("");
	const [eMailValue, seteMailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = (e) => {
		e.preventDefault();
		setModal(!modal);
	};
	const navUpdateButtonClick = (e) => {
		e.preventDefault();
		if (props.navUpdateButtonClick && idValue > 0) {
			let updatedSeller = {};
			if (changeName) {
				updatedSeller = { ...updatedSeller, name: nameValue };
			}
			if (changeUsername) {
				updatedSeller = { ...updatedSeller, username: usernameValue };
			}
			if (changeeMail) {
				updatedSeller = { ...updatedSeller, eMail: eMailValue };
			}
			if (changePassword) {
				updatedSeller = { ...updatedSeller, password: passwordValue };
			}

			props.navUpdateButtonClick(Number.parseInt(idValue), {
				...updatedSeller,
			});
		}
		setIdValue(0);
		setNameValue("");
		setUsernameValue("");
		seteMailValue("");
		setPasswordValue("");

		setChangeName(false);
		setChangeUsername(false);
		setChangeeMail(false);
		setChangePassword(false);

		setEntityFound(false);

		setModal(!modal);
	};

	// Update or Not

	const [changeName, setChangeName] = useState(false);
	const [changeUsername, setChangeUsername] = useState(false);
	const [changeeMail, setChangeeMail] = useState(false);
	const [changePassword, setChangePassword] = useState(false);

	return (
		<>
			<button className="btn btn-warning" onClick={toggle}>
				Update
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<form onSubmit={(e) => navUpdateButtonClick(e)}>
					<ModalHeader className="modal-form-item">Update Seller</ModalHeader>
					<ModalBody className="modal-form">
						{/* SELLER ID */}
						<div className="modal-form-item modal-form-id">
							<label htmlFor="modal-seller-update-form-id" className="form-label">
								Id
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-seller-update-form-id"
								placeholder="Id"
								value={idValue}
								onChange={(event) => setIdValue(event.target.value)}
								min="1"
							/>
							<button
								className="btn btn-primary get-entity-to-update-button"
								onClick={(e) => findEntity(e)}
							>
								Get Seller
							</button>
						</div>
						{/* SELLER NAME */}
						<div className="modal-form-item modal-form-name">
							<label htmlFor="modal-seller-update-form-name" className="form-label">
								Name
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-seller-update-form-name"
								placeholder="Seller Name"
								value={nameValue}
								onChange={(event) => setNameValue(event.target.value)}
								disabled={!changeName}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="modal-form-seller-update-name-check"
									onChange={() => setChangeName(!changeName)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-seller-update-name-check"
								>
									Change
								</label>
							</div>
						</div>
						{/* SELLER USERNAME */}
						<div className="modal-form-item modal-form-username">
							<label htmlFor="modal-seller-update-form-username" className="form-label">
								Username
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-seller-update-form-username"
								placeholder="Username"
								value={usernameValue}
								onChange={(event) => setUsernameValue(event.target.value)}
								disabled={!changeUsername}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="modal-form-seller-update-username-check"
									onChange={() => setChangeUsername(!changeUsername)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-seller-update-username-check"
								>
									Change
								</label>
							</div>
						</div>
						{/* SELLER EMAIL */}
						<div className="modal-form-item modal-form-eMail">
							<label htmlFor="modal-seller-update-form-eMail" className="form-label">
								EMail
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-seller-update-form-eMail"
								placeholder="EMail"
								value={eMailValue}
								onChange={(event) => seteMailValue(event.target.value)}
								disabled={!changeeMail}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="modal-form-seller-update-eMail-check"
									onChange={() => setChangeeMail(!changeeMail)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-seller-update-eMail-check"
								>
									Change
								</label>
							</div>
						</div>
						{/* SELLER PASSWORD */}
						<div className="modal-form-item modal-form-password">
							<label htmlFor="modal-seller-update-form-password" className="form-label">
								Password
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-seller-update-form-password"
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
									id="modal-form-seller-update-password-check"
									onChange={() => setChangePassword(!changePassword)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-seller-update-password-check"
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
							Update Seller
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

export default UpdateSellerForm;
