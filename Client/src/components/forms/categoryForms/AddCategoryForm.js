import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const AddCategoryForm = (props) => {
	// FORM DATA
	const [nameValue, setNameValue] = useState("");
	const [descriptionValue, setDescriptionValue] = useState("");

	const nameValueUpdate = (newName) => {
		setNameValue(newName);
	};
	const descriptionValueUpdate = (newDescription) => {
		setDescriptionValue(newDescription);
	};

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navAddButtonComp = () => {
		if (props.navAddButtonClick) {
			props.navAddButtonClick({
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
				Add
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="modal-form-item">Add Category</ModalHeader>
				<ModalBody className="modal-form">
					<div className="modal-form-item modal-form-name d-flex">
						<label
							htmlFor="modal-category-add-form-name"
							className="form-label"
						>
							Name
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-category-add-form-name"
							placeholder="Name"
							value={nameValue}
							onChange={(event) => nameValueUpdate(event.target.value)}
						/>
					</div>
					<div className="modal-form-item modal-form-description d-flex">
						<label
							htmlFor="modal-category-add-form-description"
							className="form-label"
						>
							Description
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-category-add-form-description"
							placeholder="Description"
							value={descriptionValue}
							onChange={(event) =>
								descriptionValueUpdate(event.target.value)
							}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-success form-input form-control"
						onClick={() => navAddButtonComp()}
					>
						Add Category
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

export default AddCategoryForm;
