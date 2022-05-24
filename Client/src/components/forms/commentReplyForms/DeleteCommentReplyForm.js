import React, { useEffect, useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../store/actions";

const DeleteCommentReplyForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(0);
	const [entityFound, setEntityFound] = useState(false);

	const commentReply = useSelector((state) => state.common.EntityToUpdate);

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
		dispatch(commonActions.getEntityToUpdate("CommentReplies", idValue));
	};

	useEffect(() => {
		if (commentReply && commentReply.id) {
			setIdValue(commentReply.id);
			setTextValue(commentReply.text);
			setProductIdValue(commentReply.productId);
			setSellerIdValue(commentReply.sellerId);
			setEntityFound(true);
		} else {
			setIdValue(0);
			setTextValue("");
			setProductIdValue(0);
			setSellerIdValue(0);
			setEntityFound(false);
		}
	}, [commentReply]);

	const [textValue, setTextValue] = useState("");
	const [productIdValue, setProductIdValue] = useState(0);
	const [sellerIdValue, setSellerIdValue] = useState(0);

	return (
		<>
			<button className="btn btn-danger" onClick={toggle}>
				Delete
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="modal-form-item">Delete CommentReply</ModalHeader>
				<ModalBody className="modal-form">
					{/* COMMENTREPLY ID */}
					<div className="modal-form-item modal-form-id">
						<label htmlFor="modal-commentReply-delete-form-id" className="form-label">
							Id
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-commentReply-delete-form-id"
							placeholder="Id"
							value={idValue}
							onChange={(event) => setIdValue(event.target.value)}
							min="1"
						/>
						<button
							className="btn btn-primary get-entity-to-delete-button"
							onClick={() => findEntity()}
						>
							Get CommentReply
						</button>
					</div>
					{/* COMMENTREPLY TEXT */}
					<div className="modal-form-item modal-form-text">
						<label htmlFor="modal-commentReply-delete-form-text" className="form-label">
							Text
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-commentReply-delete-form-text"
							placeholder="Text"
							value={textValue}
							disabled={true}
						/>
					</div>
					{/* COMMENTREPLY PRODUCTID */}
					<div className="modal-form-item modal-form-productId">
						<label htmlFor="modal-commentReply-delete-form-productId" className="form-label">
							ProductId
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-commentReply-delete-form-productId"
							placeholder="ProductId"
							value={productIdValue}
							min="0"
							disabled={true}
						/>
					</div>
					{/* COMMENTREPLY SELLERID */}
					<div className="modal-form-item modal-form-sellerId">
						<label htmlFor="modal-commentReply-delete-form-sellerId" className="form-label">
							SellerId
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-commentReply-delete-form-sellerId"
							placeholder="SellerId"
							value={sellerIdValue}
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
						Delete CommentReply
					</button>
					<button className="btn btn-secondary form-input form-control" onClick={toggle}>
						Close
					</button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default DeleteCommentReplyForm;
