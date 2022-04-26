import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { useSelector } from "react-redux";

const UpdateCategoryForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(-1);
	const idValueUpdate = (newCategoryId) => {
		setIdValue(newCategoryId);
		if (newCategoryId >= 0) {
			let category = categories.find(
				(category) => category.id === Number.parseInt(newCategoryId)
			);
			setNameValue(category.name);
			setDescriptionValue(category.description);
		} else {
			setNameValue("");
			setDescriptionValue("");
		}
	};
	const [nameValue, setNameValue] = useState("");
	const nameValueUpdate = (newNameValue) => {
		setNameValue(newNameValue);
	};
	const [descriptionValue, setDescriptionValue] = useState("");
	const descriptionValueUpdate = (newDescriptionValue) => {
		setDescriptionValue(newDescriptionValue);
	};

	const categories = useSelector((state) => state.category.categories);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navUpdateButtonClick = () => {
		if (
			props.navUpdateButtonClick &&
			idValue >= 0 &&
			nameValue &&
			descriptionValue
		) {
			let updatedCategory = {};
			if (changeName) {
				updatedCategory = { ...updatedCategory, name: nameValue };
			}
			if (changeDescription) {
				updatedCategory = {
					...updatedCategory,
					description: descriptionValue,
				};
			}
			props.navUpdateButtonClick(Number.parseInt(idValue), {
				...updatedCategory,
			});
		}
		setIdValue(-1);
		setNameValue("");
		setDescriptionValue("");
		toggle();
	};

	// Update or Not

	const [changeName, setChangeName] = useState(true);
	const [changeDescription, setChangeDescription] = useState(true);

	return (
		<>
			<button className="btn btn-warning" onClick={toggle}>
				Update
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="modal-form-item">
					Update Category
				</ModalHeader>
				<ModalBody className="modal-form">
					{/* CATEGORY TO CHANGE */}
					<div className="modal-form-item modal-form-old-category d-flex">
						<label
							htmlFor="modal-category-update-form-category"
							className="form-label"
						>
							Old Category
						</label>
						<Input
							type="select"
							className="form-control form-input"
							id="modal-category-update-form-category"
							placeholder="Category"
							value={idValue}
							onChange={(event) => idValueUpdate(event.target.value)}
						>
							<option value={-1}>Choose a Category to Update</option>
							{categories[0] ? (
								categories.map((category) => {
									return (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									);
								})
							) : (
								<option disabled={true}>No Categories Found</option>
							)}
						</Input>
					</div>
					{/* NAME */}
					<div className="modal-form-item modal-form-name d-flex">
						<label
							htmlFor="modal-category-update-form-name"
							className="form-label"
						>
							Name
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-category-update-form-name"
							placeholder="New Name"
							value={nameValue}
							onChange={(event) => nameValueUpdate(event.target.value)}
							disabled={!changeName}
						/>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								defaultValue
								id="modal-form-category-update-name-check"
								onChange={() => setChangeName(!changeName)}
							/>
							<label
								className="form-check-label"
								htmlFor="modal-form-category-update-name-check"
							>
								Don't Change
							</label>
						</div>
					</div>
					{/* DESCRIPTION */}
					<div className="modal-form-item modal-form-description d-flex">
						<label
							htmlFor="modal-category-update-form-description"
							className="form-label"
						>
							Description
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-category-update-form-description"
							placeholder="New Description"
							value={descriptionValue}
							onChange={(event) =>
								descriptionValueUpdate(event.target.value)
							}
							disabled={!changeDescription}
						/>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								defaultValue
								id="modal-form-category-update-description-check"
								onChange={() =>
									setChangeDescription(!changeDescription)
								}
							/>
							<label
								className="form-check-label"
								htmlFor="modal-form-category-update-description-check"
							>
								Don't Change
							</label>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-warning form-input form-control"
						onClick={() => navUpdateButtonClick()}
					>
						Update Category
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

export default UpdateCategoryForm;
