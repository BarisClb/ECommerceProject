import React, { useEffect, useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../store/actions";

const UpdateCommentReplyForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(0);
	const [entityFound, setEntityFound] = useState(false);

	const commentReply = useSelector((state) => state.common.EntityToUpdate);

	const dispatch = useDispatch();
	const findEntity = () => {
		dispatch(commonActions.getEntityToUpdate("CommentReplies", idValue));
	};

	useEffect(() => {
		if (commentReply.id) {
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

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navUpdateButtonClick = () => {
		if (props.navUpdateButtonClick && idValue > 0) {
			let updatedCommentReply = {};
			if (changeText) {
				updatedCommentReply = {
					...updatedCommentReply,
					text: textValue,
				};
			}

			props.navUpdateButtonClick(Number.parseInt(idValue), {
				...updatedCommentReply,
			});
		}
		setIdValue(0);
		setTextValue("");
		setEntityFound(false);
		setChangeText(true);
		dispatch(commonActions.getEntityToUpdate("CommentReplies", 0));
		toggle();
	};

	// Update or Not

	const [changeText, setChangeText] = useState(true);

	return (
		<>
			<button className="btn btn-warning" onClick={toggle}>
				Update
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="modal-form-item">Update CommentReply</ModalHeader>
				<ModalBody className="modal-form">
					{/* COMMENTREPLY ID */}
					<div className="modal-form-item modal-form-id">
						<label htmlFor="modal-commentReply-update-form-id" className="form-label">
							Id
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-commentReply-update-form-id"
							placeholder="Id"
							value={idValue}
							onChange={(event) => setIdValue(event.target.value)}
							min="1"
						/>
						<button
							className="btn btn-primary get-entity-to-update-button"
							onClick={() => findEntity()}
						>
							Get CommentReply
						</button>
					</div>
					{/* COMMENTREPLY DESCRIPTION */}
					<div className="modal-form-item modal-form-text">
						<label htmlFor="modal-commentReply-update-form-text" className="form-label">
							Text
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-commentReply-update-form-text"
							placeholder="Text"
							value={textValue}
							onChange={(event) => setTextValue(event.target.value)}
							disabled={!changeText}
						/>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								id="modal-form-commentReply-update-text-check"
								onChange={() => setChangeText(!changeText)}
							/>
							<label
								className="form-check-label"
								htmlFor="modal-form-commentReply-update-text-check"
							>
								Don't Change
							</label>
						</div>
					</div>
					{/* COMMENTREPLY CATEGORYID */}
					<div className="modal-form-item modal-form-productId">
						<label htmlFor="modal-commentReply-update-form-productId" className="form-label">
							ProductId
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-commentReply-update-form-productId"
							placeholder="ProductId"
							value={productIdValue}
							min="0"
							disabled={true}
						/>
					</div>
					{/* COMMENTREPLY SELLERID */}
					<div className="modal-form-item modal-form-sellerId">
						<label htmlFor="modal-commentReply-update-form-sellerId" className="form-label">
							SellerId
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-commentReply-update-form-sellerId"
							placeholder="SellerId"
							value={sellerIdValue}
							min="0"
							disabled={true}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-warning form-input form-control"
						onClick={() => navUpdateButtonClick()}
						disabled={!entityFound}
					>
						Update CommentReply
					</button>
					<button className="btn btn-secondary form-input form-control" onClick={toggle}>
						Close
					</button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default UpdateCommentReplyForm;
