import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CreateCategoryForm = (props) => {
	// FORM DATA
	const [nameValue, setNameValue] = useState("");
	const [descriptionValue, setDescriptionValue] = useState("");

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
				description: descriptionValue,
			});
		}
		setNameValue("");
		setDescriptionValue("");
		toggle();
	};

	return (
		<>
			<button className="btn btn-success" onClick={toggle}>
				Create
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<form onSubmit={(e) => navCreateButtonClick(e)}>
					<ModalHeader className="modal-form-item">Create Category</ModalHeader>
					<ModalBody className="modal-form">
						{/* CATEGORY NAME */}
						<div className="modal-form-item modal-form-name">
							<label htmlFor="modal-category-create-form-name" className="form-label">
								Name
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-category-create-form-name"
								placeholder="Name"
								value={nameValue}
								onChange={(event) => setNameValue(event.target.value)}
							/>
						</div>
						{/* CATEGORY DESCRIPTION */}
						<div className="modal-form-item modal-form-description">
							<label htmlFor="modal-category-create-form-description" className="form-label">
								Description
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-category-create-form-description"
								placeholder="Description"
								value={descriptionValue}
								onChange={(event) => setDescriptionValue(event.target.value)}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<button className="btn btn-success form-input form-control" type="submit">
							Create Category
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

export default CreateCategoryForm;
