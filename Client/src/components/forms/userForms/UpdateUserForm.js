import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { useSelector } from "react-redux";

const UpdateUserForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(-1);
	const idValueUpdate = (newUserId) => {
		setIdValue(newUserId);
		if (newUserId >= 0) {
			let user = users.find(
				(user) => user.id === Number.parseInt(newUserId)
			);
			setNameValue(user.name);
			setDescriptionValue(user.description);
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

	const users = useSelector((state) => state.user.users);

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
			props.navUpdateButtonClick(Number.parseInt(idValue), {
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
			<button className="btn btn-warning" onClick={toggle}>
				Update
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="acdFormItem">Update User</ModalHeader>
				<ModalBody className="acdForm">
					<div className="acdFormItem updateFormOldDescription d-flex">
						<label htmlFor="updateForm-id" className="form-label">
							Old User
						</label>
						<Input
							type="select"
							className="form-control form-input"
							id="updateForm-id"
							placeholder="User"
							value={idValue}
							onChange={(event) => idValueUpdate(event.target.value)}
						>
							<option value={-1}>Choose a User to Update</option>
							{users ? (
								users.map((user) => {
									return (
										<option key={user.id} value={user.id}>
											{user.name}
										</option>
									);
								})
							) : (
								<option>No Users Found</option>
							)}
						</Input>
					</div>
					<div className="acdFormItem updateFormNewName d-flex">
						<label htmlFor="updateForm-name" className="form-label">
							Name
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="updateForm-name"
							placeholder="New Name"
							value={nameValue}
							onChange={(event) => nameValueUpdate(event.target.value)}
						/>
					</div>
					<div className="acdFormItem updateFormNewDescription d-flex">
						<label
							htmlFor="updateForm-description"
							className="form-label"
						>
							Description
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="updateForm-description"
							placeholder="New Description"
							value={descriptionValue}
							onChange={(event) =>
								descriptionValueUpdate(event.target.value)
							}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-warning form-input form-control"
						onClick={() => navUpdateButtonClick()}
					>
						Update User
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

export default UpdateUserForm;
