import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { useSelector } from "react-redux";

const DeleteLikeForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(-1);
	const idValueUpdate = (newLikeId) => {
		setIdValue(newLikeId);
	};
	const likes = useSelector((state) => state.like.likes);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navDeleteButtonComp = () => {
		if (props.navDeleteButtonClick && idValue >= 0) {
			props.navDeleteButtonClick(Number.parseInt(idValue));
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
				<ModalHeader className="acdFormItem">Delete Like</ModalHeader>
				<ModalBody className="acdForm">
					<div className="acdFormItem deleteform-id">
						<label htmlFor="deleteForm-id" className="form-label">
							Like
						</label>
						<Input
							type="select"
							className="form-control form-input"
							id="deleteForm-id"
							placeholder="Like"
							value={idValue}
							onChange={(event) => idValueUpdate(event.target.value)}
						>
							<option value={-1}>Choose A Like To Delete</option>
							{likes ? (
								likes.map((like) => {
									return (
										<option key={like.id} value={like.id}>
											{like.name}
										</option>
									);
								})
							) : (
								<option>No Likes Found</option>
							)}
						</Input>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-danger form-input form-control"
						onClick={() => navDeleteButtonComp()}
					>
						Delete Like
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

export default DeleteLikeForm;
