import React, { useEffect, useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../store/actions";

const UpdateCommentForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(0);
	const [entityFound, setEntityFound] = useState(false);

	const comment = useSelector((state) => state.common.EntityToUpdate);

	const dispatch = useDispatch();

	const findEntity = (e) => {
		e.preventDefault();
		dispatch(commonActions.getEntityToUpdate("Comments", idValue));
	};

	useEffect(() => {
		if (comment && comment.id) {
			setIdValue(comment.id);
			setTitleValue(comment.title);
			setTextValue(comment.text);
			setRatingValue(comment.rating);
			setEntityFound(true);
		} else {
			setIdValue(0);
			setTitleValue("");
			setTextValue("");
			setRatingValue(0);
			setEntityFound(false);
		}
	}, [comment]);

	const [titleValue, setTitleValue] = useState("");
	const [textValue, setTextValue] = useState("");
	const [ratingValue, setRatingValue] = useState(0);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = (e) => {
		e.preventDefault();
		setModal(!modal);
	};

	const navUpdateButtonClick = (e) => {
		e.preventDefault();
		if (props.navUpdateButtonClick && idValue > 0) {
			let updatedComment = {};

			if (changeTitle) {
				updatedComment = { ...updatedComment, title: titleValue };
			}
			if (changeText) {
				updatedComment = {
					...updatedComment,
					text: textValue,
				};
			}
			if (changeRating) {
				updatedComment = {
					...updatedComment,
					rating: ratingValue,
				};
			}

			props.navUpdateButtonClick(Number.parseInt(idValue), {
				...updatedComment,
			});
		}
		setIdValue(0);
		setTitleValue("");
		setTextValue("");
		setRatingValue(0);

		setEntityFound(false);
		setChangeTitle(false);
		setChangeText(false);
		setChangeRating(false);

		dispatch(commonActions.getEntityToUpdate("Comments", 0));

		toggle();
	};

	// Update or Not

	const [changeTitle, setChangeTitle] = useState(false);
	const [changeText, setChangeText] = useState(false);
	const [changeRating, setChangeRating] = useState(false);

	return (
		<>
			<button className="btn btn-warning" onClick={toggle}>
				Update
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<form onSubmit={(e) => navUpdateButtonClick(e)}>
					<ModalHeader className="modal-form-item">Update Comment</ModalHeader>
					<ModalBody className="modal-form">
						{/* COMMENT ID */}
						<div className="modal-form-item modal-form-id">
							<label htmlFor="modal-comment-update-form-id" className="form-label">
								Id
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-comment-update-form-id"
								placeholder="Id"
								value={idValue}
								onChange={(event) => setIdValue(event.target.value)}
								min="1"
							/>
							<button
								className="btn btn-primary get-entity-to-update-button"
								onClick={(e) => findEntity(e)}
							>
								Get Comment
							</button>
						</div>
						{/* COMMENT TITLE */}
						<div className="modal-form-item modal-form-title">
							<label htmlFor="modal-comment-update-form-title" className="form-label">
								Title
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-comment-update-form-title"
								placeholder="Title"
								value={titleValue}
								onChange={(event) => setTitleValue(event.target.value)}
								disabled={!changeTitle}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="modal-form-comment-update-title-check"
									onChange={() => setChangeTitle(!changeTitle)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-comment-update-title-check"
								>
									Change
								</label>
							</div>
						</div>
						{/* COMMENT TEXT */}
						<div className="modal-form-item modal-form-text">
							<label htmlFor="modal-comment-update-form-text" className="form-label">
								Text
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-comment-update-form-text"
								placeholder="Text"
								value={textValue}
								onChange={(event) => setTextValue(event.target.value)}
								disabled={!changeText}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="modal-form-comment-update-text-check"
									onChange={() => setChangeText(!changeText)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-comment-update-text-check"
								>
									Change
								</label>
							</div>
						</div>
						{/* COMMENT RATING */}
						<div className="modal-form-item modal-form-rating">
							<label htmlFor="modal-comment-update-form-rating" className="form-label">
								Rating
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-comment-update-form-rating"
								placeholder="Rating"
								value={ratingValue}
								onChange={(event) => setRatingValue(event.target.value)}
								min="0"
								max="5"
								disabled={!changeRating}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="modal-form-comment-update-rating-check"
									onChange={() => setChangeRating(!changeRating)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-comment-update-rating-check"
								>
									Change
								</label>
							</div>
						</div>
					</ModalBody>
					<ModalFooter>
						<button
							className="btn btn-warning form-input form-control"
							type="submit"
							disabled={!entityFound}
						>
							Update Comment
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

export default UpdateCommentForm;
