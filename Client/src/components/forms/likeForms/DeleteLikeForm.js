import React, { useEffect, useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../store/actions";

const DeleteLikeForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(0);
	const [entityFound, setEntityFound] = useState(false);

	const like = useSelector((state) => state.common.EntityToUpdate);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navDeleteButtonClick = () => {
		if (props.navDeleteButtonClick && idValue > 0) {
			props.navDeleteButtonClick(Number.parseInt(idValue));
		}
		setIdValue(0);

		setEntityFound(false);

		setModal(!modal);
	};

	const dispatch = useDispatch();
	const findEntity = () => {
		dispatch(commonActions.getEntityToUpdate("Likes", idValue));
	};

	useEffect(() => {
		if (like && like.id) {
			setIdValue(like.id);
			setUserIdValue(like.userId);
			setCommentIdValue(like.sellerId);
			setProductIdValue(like.productId);
			setEntityFound(true);
		} else {
			setIdValue(0);
			setUserIdValue(0);
			setCommentIdValue(0);
			setProductIdValue(0);
			setEntityFound(false);
		}
	}, [like]);

	const [userIdValue, setUserIdValue] = useState(0);
	const [commentIdValue, setCommentIdValue] = useState(0);
	const [productIdValue, setProductIdValue] = useState(0);

	return (
		<>
			<button className="btn btn-danger" onClick={toggle}>
				Delete
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="modal-form-item">Delete Like</ModalHeader>
				<ModalBody className="modal-form">
					{/* LIKE ID */}
					<div className="modal-form-item modal-form-id">
						<label htmlFor="modal-like-delete-form-id" className="form-label">
							Id
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-like-delete-form-id"
							placeholder="Id"
							value={idValue}
							onChange={(event) => setIdValue(event.target.value)}
							min="1"
						/>
						<button
							className="btn btn-primary get-entity-to-delete-button"
							onClick={() => findEntity()}
						>
							Get Like
						</button>
					</div>
					{/* LIKE USERID */}
					<div className="modal-form-item modal-form-userId">
						<label htmlFor="modal-like-delete-form-userId" className="form-label">
							UserId
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-like-delete-form-userId"
							placeholder="UserId"
							value={userIdValue}
							min="0"
							disabled={true}
						/>
					</div>
					{/* LIKE COMMENTID */}
					<div className="modal-form-item modal-form-commentId">
						<label htmlFor="modal-like-delete-form-commentId" className="form-label">
							CommentId
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-like-delete-form-commentId"
							placeholder="CommentId"
							value={commentIdValue}
							min="0"
							disabled={true}
						/>
					</div>
					{/* LIKE PRODUCTID */}
					<div className="modal-form-item modal-form-productId">
						<label htmlFor="modal-like-delete-form-productId" className="form-label">
							ProductId
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-like-delete-form-productId"
							placeholder="ProductId"
							value={productIdValue}
							min="0"
							disabled={true}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-danger form-input form-control"
						onClick={() => navDeleteButtonClick()}
						disabled={!entityFound}
					>
						Delete Like
					</button>
					<button className="btn btn-secondary form-input form-control" onClick={toggle}>
						Close
					</button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default DeleteLikeForm;
