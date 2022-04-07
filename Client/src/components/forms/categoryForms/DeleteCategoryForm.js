import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../../store/actions/categoryActions";
import "./css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { useSelector } from "react-redux";

export default function DeleteCategory(props) {
	// FORM DATA
	const [idValue, setIdValue] = useState(-1);
	const idValueUpdate = (newCategoryId) => {
		setIdValue(newCategoryId);
	};
	const categories = useSelector((state) => state.category.categories);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	// DISPATCH

	const dispatch = useDispatch();

	const navDeleteButtonComp = async () => {
		if (props.navDeleteButtonClick && idValue >= 0) {
			await props.navDeleteButtonClick(Number.parseInt(idValue));
			dispatch(categoryActions.getCategories());
		}
		setIdValue(-1);
		toggle();
	};
	return (
		<>
			<button className="btn btn-danger" onClick={toggle}>
				Delete
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="acdFormItem">Delete Category</ModalHeader>
				<ModalBody className="acdForm">
					<div className="acdFormItem deleteform-id">
						<label htmlFor="deleteForm-id" className="form-label">
							Category
						</label>
						<Input
							type="select"
							className="form-control form-input"
							id="deleteForm-id"
							placeholder="Category"
							value={idValue}
							onChange={(event) => idValueUpdate(event.target.value)}
						>
							<option value={-1}>Choose A Category To Delete</option>
							{categories ? (
								categories.map((category) => {
									return (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									);
								})
							) : (
								<option>No Categories Found</option>
							)}
						</Input>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-danger form-input form-control"
						onClick={() => navDeleteButtonComp()}
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
}
