import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CreateOrderForm = (props) => {
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

	const navCreateButtonClick = () => {
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
				Add
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="acdFormItem">Add Order</ModalHeader>
				<ModalBody className="acdForm">
					<div className="acdFormItem addFormName">
						<label
							htmlFor="modal-order-create-form-name"
							className="form-label"
						>
							Name
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-order-create-form-name"
							placeholder="Name"
							value={nameValue}
							onChange={(event) => nameValueUpdate(event.target.value)}
						/>
					</div>
					<div className="acdFormItem addFormDescription">
						<label htmlFor="addForm-name" className="form-label">
							Description
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="addForm-description"
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
						onClick={() => navCreateButtonClick()}
					>
						Add Order
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

export default CreateOrderForm;
