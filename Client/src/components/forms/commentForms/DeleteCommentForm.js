import React, { useEffect, useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../store/actions";

const DeleteCommentForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(0);
	const [entityFound, setEntityFound] = useState(false);

	const comment = useSelector((state) => state.common.EntityToUpdate);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navDeleteButtonClick = () => {
		if (props.navDeleteButtonClick && idValue > 0) {
			props.navDeleteButtonClick(Number.parseInt(idValue));
		}
		setIdValue(-1);

		setEntityFound(false);

		setModal(!modal);
	};

	const dispatch = useDispatch();
	const findEntity = () => {
		dispatch(commonActions.getEntityToUpdate("Comments", idValue));
	};

	useEffect(() => {
		if (comment && comment.id) {
			setIdValue(comment.id);
			setTitleValue(comment.title);
			setTextValue(comment.text);
			setRatingValue(comment.rating);
			setUserIdValue(comment.userId);
			setEntityFound(true);
		} else {
			setIdValue(0);
			setTitleValue("");
			setTextValue("");
			setRatingValue(0);
			setUserIdValue(0);
			setEntityFound(false);
		}
	}, [comment]);

	const [titleValue, setTitleValue] = useState("");
	const [textValue, setTextValue] = useState("");
	const [ratingValue, setRatingValue] = useState(0);
	const [userIdValue, setUserIdValue] = useState(0);

	return (
		<>
			<button className="btn btn-danger" onClick={toggle}>
				Delete
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="modal-form-item">Delete Comment</ModalHeader>
				<ModalBody className="modal-form">
					{/* COMMENT ID */}
					<div className="modal-form-item modal-form-id">
						<label htmlFor="modal-comment-delete-form-id" className="form-label">
							Id
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-comment-delete-form-id"
							placeholder="Id"
							value={idValue}
							onChange={(event) => setIdValue(event.target.value)}
							min="1"
						/>
						<button
							className="btn btn-primary get-entity-to-delete-button"
							onClick={() => findEntity()}
						>
							Get Comment
						</button>
					</div>
					{/* COMMENT TITLE */}
					<div className="modal-form-item modal-form-title">
						<label htmlFor="modal-comment-delete-form-title" className="form-label">
							Title
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-comment-delete-form-title"
							placeholder="Title"
							value={titleValue}
							onChange={(event) => setTitleValue(event.target.value)}
							disabled={true}
						/>
					</div>
					{/* COMMENT TEXT */}
					<div className="modal-form-item modal-form-text">
						<label htmlFor="modal-comment-delete-form-text" className="form-label">
							Text
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-comment-delete-form-text"
							placeholder="Text"
							value={textValue}
							onChange={(event) => setTextValue(event.target.value)}
							disabled={true}
						/>
					</div>
					{/* COMMENT RATING */}
					<div className="modal-form-item modal-form-rating">
						<label htmlFor="modal-comment-delete-form-rating" className="form-label">
							Rating
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-comment-delete-form-rating"
							placeholder="Rating"
							value={ratingValue}
							onChange={(event) => setRatingValue(event.target.value)}
							min="0"
							max="5"
							disabled={true}
						/>
					</div>
					{/* COMMENT USERID */}
					<div className="modal-form-item modal-form-userId">
						<label htmlFor="modal-comment-delete-form-userId" className="form-label">
							UserId
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-comment-delete-form-userId"
							placeholder="UserId"
							value={userIdValue}
							onChange={(event) => setUserIdValue(event.target.value)}
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
						Delete Comment
					</button>
					<button className="btn btn-secondary form-input form-control" onClick={toggle}>
						Close
					</button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default DeleteCommentForm;
