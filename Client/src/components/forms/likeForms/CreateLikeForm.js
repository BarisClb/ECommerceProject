import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CreateLikeForm = (props) => {
	// FORM DATA
	const [userIdValue, setUserIdValue] = useState(0);
	const [commentIdValue, setCommentIdValue] = useState(0);
	const [productIdValue, setProductIdValue] = useState(0);

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
				userId: userIdValue,
				commentId: commentIdValue,
				productId: productIdValue,
			});
		}
		setUserIdValue(0);
		setCommentIdValue(0);
		setProductIdValue(0);

		setModal(!modal);
	};

	return (
		<>
			<button className="btn btn-success" onClick={toggle}>
				Create
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<form onSubmit={(e) => navCreateButtonClick(e)}>
					<ModalHeader className="modal-form-item">Create Like</ModalHeader>
					<ModalBody className="modal-form">
						{/* WARNING */}
						<div className="modal-form-item">
							<label className="form-label">Only User Accounts should Create Likes.</label>
						</div>
						{/* LIKE USERID */}
						<div className="modal-form-item modal-form-userId">
							<label htmlFor="modal-like-create-form-userId" className="form-label">
								UserId
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-like-create-form-userId"
								placeholder="UserId"
								value={userIdValue}
								onChange={(event) => setUserIdValue(event.target.value)}
								min="0"
							/>
						</div>
						{/* LIKE COMMENTID */}
						<div className="modal-form-item modal-form-commentId">
							<label htmlFor="modal-like-create-form-commentId" className="form-label">
								CommentId
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-like-create-form-commentId"
								placeholder="CommentId"
								value={commentIdValue}
								onChange={(event) => setCommentIdValue(event.target.value)}
								min="0"
							/>
						</div>
						{/* LIKE PRODUCTID */}
						<div className="modal-form-item modal-form-productId">
							<label htmlFor="modal-like-create-form-productId" className="form-label">
								ProductId
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-like-create-form-productId"
								placeholder="ProductId"
								value={productIdValue}
								onChange={(event) => setProductIdValue(event.target.value)}
								min="0"
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<button className="btn btn-success form-input form-control" type="submit">
							Create Like
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

export default CreateLikeForm;
