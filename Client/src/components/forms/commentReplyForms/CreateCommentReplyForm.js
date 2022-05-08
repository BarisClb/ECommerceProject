import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CreateCommentReplyForm = (props) => {
	// FORM DATA
	const [textValue, setTextValue] = useState("");
	const [commentIdValue, setCommentIdValue] = useState(0);
	const [productIdValue, setProductIdValue] = useState(0);
	const [sellerIdValue, setSellerIdValue] = useState(0);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navCreateButtonClick = (e) => {
		e.preventDefault();
		if (props.navCreateButtonClick) {
			props.navCreateButtonClick({
				text: textValue,
				commentId: commentIdValue,
				productId: productIdValue,
				sellerId: sellerIdValue,
			});
		}
		setTextValue("");
		setCommentIdValue(0);
		setProductIdValue(0);
		setSellerIdValue(0);
		toggle();
	};

	return (
		<>
			<button className="btn btn-success" onClick={toggle}>
				Create
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<form onSubmit={(e) => navCreateButtonClick(e)}>
					<ModalHeader className="modal-form-item">Create User</ModalHeader>
					<ModalBody className="modal-form">
						{/* WARNING */}
						<div className="modal-form-item">
							<label className="form-label">
								Only Seller Accounts should Create CommentReplies.
							</label>
						</div>
						{/* COMMENTREPLY TEXT */}
						<div className="modal-form-item modal-form-text">
							<label htmlFor="modal-user-update-form-text" className="form-label">
								Text
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-user-update-form-text"
								placeholder="Text"
								value={textValue}
								onChange={(event) => setTextValue(event.target.value)}
							/>
						</div>
						{/* COMMENTREPLY COMMENTID */}
						<div className="modal-form-item modal-form-commentId">
							<label
								htmlFor="modal-commentReply-create-form-commentId"
								className="form-label"
							>
								CommentId
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-commentReply-create-form-commentId"
								placeholder="CommentId"
								value={commentIdValue}
								onChange={(event) => setCommentIdValue(event.target.value)}
								min="0"
							/>
						</div>
						{/* COMMENTREPLY PRODUCTID */}
						<div className="modal-form-item modal-form-productId">
							<label
								htmlFor="modal-commentReply-create-form-productId"
								className="form-label"
							>
								ProductId
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-commentReply-create-form-productId"
								placeholder="ProductId"
								value={productIdValue}
								onChange={(event) => setProductIdValue(event.target.value)}
								min="0"
							/>
						</div>
						{/* COMMENTREPLY SELLERID */}
						<div className="modal-form-item modal-form-sellerId">
							<label
								htmlFor="modal-commentReply-create-form-sellerId"
								className="form-label"
							>
								SellerId
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-commentReply-create-form-sellerId"
								placeholder="SellerId"
								value={sellerIdValue}
								onChange={(event) => setSellerIdValue(event.target.value)}
								min="0"
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<button className="btn btn-success form-input form-control" type="submit">
							Create User
						</button>
						<button className="btn btn-secondary form-input form-control" onClick={toggle}>
							Close
						</button>
					</ModalFooter>
				</form>
			</Modal>
		</>
	);
};

export default CreateCommentReplyForm;
