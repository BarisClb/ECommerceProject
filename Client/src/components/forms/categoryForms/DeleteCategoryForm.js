import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { useSelector } from "react-redux";

const DeleteCategoryForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(0);
	const idValueUpdate = (newCategoryId) => {
		setIdValue(newCategoryId);
	};

	const categories = useSelector((state) => state.category.categories);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navDeleteButtonClick = () => {
		if (props.navDeleteButtonClick && idValue > 0) {
			props.navDeleteButtonClick(Number.parseInt(idValue));
		}
		setIdValue(0);
		toggle();
	};
	return (
		<>
			<button className="btn btn-danger" onClick={toggle}>
				Delete
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="modal-form-item">
					Delete Category
				</ModalHeader>
				<ModalBody className="modal-form">
					{/* CATEGORY ID */}
					<div className="modal-form-item deleteform-id">
						<label
							htmlFor="modal-category-delete-form-category"
							className="form-label"
						>
							Category
						</label>
						<Input
							type="select"
							className="form-control form-input"
							id="modal-category-delete-form-category"
							placeholder="Category"
							value={idValue}
							onChange={(event) => idValueUpdate(event.target.value)}
						>
							<option value={0}>Choose A Category To Delete</option>
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
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-danger form-input form-control"
						onClick={() => navDeleteButtonClick()}
					>
						Delete Category
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

export default DeleteCategoryForm;
