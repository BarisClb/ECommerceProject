import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const UpdateLikeForm = (props) => {
	// Modal
	const [modal, setModal] = useState(false);
	const toggle = (e) => {
		e.preventDefault();
		setModal(!modal);
	};
	return (
		<>
			<button className="btn btn-warning" onClick={toggle}>
				Update
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="acdFormItem">Update Like</ModalHeader>
				<ModalBody className="acdForm">
					<div className="modal-form-item">
						<label htmlFor="updateForm-id" className="form-label">
							Updating Likes is not supported.
						</label>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-secondary form-input form-control"
						onClick={(e) => toggle(e)}
					>
						Close
					</button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default UpdateLikeForm;
