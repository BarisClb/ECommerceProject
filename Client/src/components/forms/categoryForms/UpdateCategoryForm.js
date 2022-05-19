import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useSelector } from "react-redux";

const UpdateCategoryForm = (props) => {
	// FORM DATA
	const categories = useSelector((state) => state.category.categories);

	const [idValue, setIdValue] = useState(0);
	const idValueUpdate = (newCategoryId) => {
		setIdValue(newCategoryId);
		if (newCategoryId > 0) {
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
	const [descriptionValue, setDescriptionValue] = useState("");

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = (e) => {
		e.preventDefault();
		setModal(!modal);
	};

	const navUpdateButtonClick = (e) => {
		e.preventDefault();
		if (props.navUpdateButtonClick && idValue > 0) {
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
		setIdValue(0);
		setNameValue("");
		setDescriptionValue("");

		setChangeName(false);
		setChangeDescription(false);

		toggle();
	};

	// Update or Not

	const [changeName, setChangeName] = useState(false);
	const [changeDescription, setChangeDescription] = useState(false);

	return (
		<>
			<button className="btn btn-warning" onClick={toggle}>
				Update
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<form onSubmit={(e) => navUpdateButtonClick(e)}>
					<ModalHeader className="modal-form-item">Update Category</ModalHeader>
					<ModalBody className="modal-form">
						{/* CATEGORY ID */}
						<div className="modal-form-item modal-form-old-category">
							<label htmlFor="modal-category-update-form-category" className="form-label">
								Category
							</label>
							<select
								name="modal-category-update-form-category"
								id="modal-category-update-form-category"
								className="form-control form-select form-input"
								placeholder="Category"
								value={idValue}
								onChange={(e) => idValueUpdate(e.target.value)}
							>
								<option value={0}>Choose a Category to Update</option>
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
							</select>
						</div>
						{/* CATEGORY NAME */}
						<div className="modal-form-item modal-form-name">
							<label htmlFor="modal-category-update-form-name" className="form-label">
								Name
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-category-update-form-name"
								placeholder="New Name"
								value={nameValue}
								onChange={(event) => setNameValue(event.target.value)}
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
									Change
								</label>
							</div>
						</div>
						{/* CATEGORY DESCRIPTION */}
						<div className="modal-form-item modal-form-description">
							<label htmlFor="modal-category-update-form-description" className="form-label">
								Description
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-category-update-form-description"
								placeholder="New Description"
								value={descriptionValue}
								onChange={(event) => setDescriptionValue(event.target.value)}
								disabled={!changeDescription}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									defaultValue
									id="modal-form-category-update-description-check"
									onChange={() => setChangeDescription(!changeDescription)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-category-update-description-check"
								>
									Change
								</label>
							</div>
						</div>
					</ModalBody>
					<ModalFooter>
						<button className="btn btn-warning form-input form-control" type="submit">
							Update Category
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

export default UpdateCategoryForm;
