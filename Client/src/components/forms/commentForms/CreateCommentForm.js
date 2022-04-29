import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CreateCommentForm = (props) => {
	// FORM DATA
	const [titleValue, setTitleValue] = useState("");
	const [textValue, setTextValue] = useState("");
	const [ratingValue, setRatingValue] = useState(0);
	const [userIdValue, setUserIdValue] = useState(0);
	const [productIdValue, setProductIdValue] = useState(0);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navCreateButtonClick = () => {
		if (props.navCreateButtonClick) {
			props.navCreateButtonClick({
				title: titleValue,
				text: textValue,
				rating: ratingValue,
				userId: userIdValue,
				productId: productIdValue,
			});
		}
		setTitleValue("");
		setTextValue("");
		setRatingValue(0);
		setUserIdValue(0);
		setProductIdValue(0);
		toggle();
	};

	return (
		<>
			<button className="btn btn-success" onClick={toggle}>
				Create
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="modal-form-item">
					Create Comment
				</ModalHeader>
				<ModalBody className="modal-form">
					{/* WARNING */}
					<div className="modal-form-item">
						<label className="form-label">
							Only User Accounts should Create Comments.
						</label>
					</div>
					{/* COMMENT TITLE */}
					<div className="modal-form-item modal-form-title">
						<label
							htmlFor="modal-comment-create-form-title"
							className="form-label"
						>
							Title
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-comment-create-form-title"
							placeholder="Title"
							value={titleValue}
							onChange={(event) => setTitleValue(event.target.value)}
						/>
					</div>
					{/* COMMENT TEXT */}
					<div className="modal-form-item modal-form-text">
						<label
							htmlFor="modal-comment-create-form-text"
							className="form-label"
						>
							Text
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-comment-create-form-text"
							placeholder="Text"
							value={textValue}
							onChange={(event) => setTextValue(event.target.value)}
						/>
					</div>
					{/* COMMENT RATING */}
					<div className="modal-form-item modal-form-rating">
						<label
							htmlFor="modal-comment-create-form-rating"
							className="form-label"
						>
							Rating
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-comment-create-form-rating"
							placeholder="Rating"
							value={ratingValue}
							onChange={(event) => setRatingValue(event.target.value)}
							min="0"
							max="5"
						/>
					</div>
					{/* COMMENT USERID */}
					<div className="modal-form-item modal-form-userId">
						<label
							htmlFor="modal-comment-create-form-userId"
							className="form-label"
						>
							UserId
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-comment-create-form-userId"
							placeholder="UserId"
							value={userIdValue}
							onChange={(event) => setUserIdValue(event.target.value)}
							min="0"
						/>
					</div>
					{/* COMMENT PRODUCT */}
					<div className="modal-form-item modal-form-productId">
						<label
							htmlFor="modal-comment-create-form-productId"
							className="form-label"
						>
							ProductId
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-comment-create-form-productId"
							placeholder="ProductId"
							value={productIdValue}
							onChange={(event) => setProductIdValue(event.target.value)}
							min="0"
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-success form-input form-control"
						onClick={() => navCreateButtonClick()}
					>
						Create Comment
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

export default CreateCommentForm;
