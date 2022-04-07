import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../../store/actions/categoryActions";
import "./css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function AddCategoryForm(props) {
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

	// DISPATCH

	const dispatch = useDispatch();

	const navAddButtonComp = async () => {
		if (props.navAddButtonClick) {
			await props.navAddButtonClick({
				name: nameValue,
				description: descriptionValue,
			});
			dispatch(categoryActions.getCategories());
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
				<ModalHeader className="acdFormItem">Add Category</ModalHeader>
				<ModalBody className="acdForm">
					<div className="acdFormItem addFormName d-flex">
						<label htmlFor="addForm-name" className="form-label">
							Name
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="addForm-name"
							placeholder="Name"
							value={nameValue}
							onChange={(event) => nameValueUpdate(event.target.value)}
						/>
					</div>
					<div className="acdFormItem addFormDescription d-flex">
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
}
