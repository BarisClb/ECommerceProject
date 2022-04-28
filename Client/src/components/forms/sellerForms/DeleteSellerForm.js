import React, { useEffect, useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../store/actions";

const DeleteSellerForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(0);
	const [entityFound, setEntityFound] = useState(false);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navDeleteButtonClick = () => {
		if (props.navDeleteButtonClick && idValue >= 0) {
			props.navDeleteButtonClick(Number.parseInt(seller.id));
		}
		setIdValue(0);
		toggle();
	};

	const seller = useSelector((state) => state.common.EntityToUpdate);

	const dispatch = useDispatch();
	const findEntity = () => {
		dispatch(commonActions.getEntityToUpdate("Sellers", idValue));
	};

	useEffect(() => {
		if (seller.id) {
			setIdValue(seller.id);
			setNameValue(seller.name);
			setUsernameValue(seller.username);
			setEMailValue(seller.eMail);
			setPasswordValue(seller.password);
			setEntityFound(true);
		} else {
			setIdValue(0);
			setNameValue("");
			setUsernameValue("");
			setEMailValue("");
			setPasswordValue("");
			setEntityFound(false);
		}
	}, [seller]);

	const [nameValue, setNameValue] = useState("");
	const [usernameValue, setUsernameValue] = useState("");
	const [eMailValue, setEMailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");

	return (
		<>
			<button className="btn btn-danger	" onClick={toggle}>
				Delete
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="modal-form-item">Delete Seller</ModalHeader>
				<ModalBody className="modal-form">
					{/* SELLER ID */}
					<div className="modal-form-item modal-form-id">
						<label
							htmlFor="modal-seller-delete-form-id"
							className="form-label"
						>
							Id
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-seller-delete-form-id"
							placeholder="Id"
							value={idValue}
							onChange={(event) => setIdValue(event.target.value)}
							min="1"
						/>
						<button
							className="btn btn-primary get-entity-to-delete-button"
							onClick={() => findEntity()}
						>
							Get Seller
						</button>
					</div>
					{/* SELLER NAME */}
					<div className="modal-form-item modal-form-name">
						<label
							htmlFor="modal-seller-delete-form-name"
							className="form-label"
						>
							Name
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-seller-delete-form-name"
							placeholder="Seller Name"
							value={nameValue}
							disabled={true}
						/>
					</div>
					{/* SELLER USERNAME */}
					<div className="modal-form-item modal-form-username">
						<label
							htmlFor="modal-seller-delete-form-username"
							className="form-label"
						>
							Username
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-seller-delete-form-username"
							placeholder="Username"
							value={usernameValue}
							disabled={true}
						/>
					</div>
					{/* SELLER EMAIL */}
					<div className="modal-form-item modal-form-eMail">
						<label
							htmlFor="modal-seller-delete-form-eMail"
							className="form-label"
						>
							EMail
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-seller-delete-form-eMail"
							placeholder="EMail"
							value={eMailValue}
							disabled={true}
						/>
					</div>
					{/* SELLER PASSWORD */}
					<div className="modal-form-item modal-form-password">
						<label
							htmlFor="modal-seller-delete-form-password"
							className="form-label"
						>
							Password
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-seller-delete-form-password"
							placeholder="Password"
							value={passwordValue}
							disabled={true}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-danger form-input form-control"
						onClick={() => navDeleteButtonClick()}
						disabled={!entityFound}
					>
						Delete Seller
					</button>
					<button
						className="btn btn-secondary form-input form-control"
						onClick={toggle}
					>
						Close
					</button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default DeleteSellerForm;
