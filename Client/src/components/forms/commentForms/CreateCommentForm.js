import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { useSelector } from "react-redux";

const CreateCommentForm = (props) => {
	// FORM DATA
	const [nameValue, setNameValue] = useState("");
	const nameValueUpdate = (newWord) => {
		setNameValue(newWord);
	};
	const [commentNameValue, setCommentNameValue] = useState("No Comment");
	const commentNameValueUpdate = (newCommentId) => {
		setCommentNameValue(newCommentId);
	};
	const [unitPriceValue, setUnitPriceValue] = useState(0);
	const unitPriceValueUpdate = (newWord) => {
		setUnitPriceValue(newWord);
	};
	const [unitsInStockValue, setUnitsInStockValue] = useState(0);
	const unitsInStockValueUpdate = (newWord) => {
		setUnitsInStockValue(newWord);
	};

	const comments = useSelector((state) => state.comment.comments);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navCreateButtonClick = () => {
		if (props.navCreateButtonClick) {
			props.navCreateButtonClick({
				name: nameValue,
				comment: commentNameValue,
				unitPrice: unitPriceValue,
				unitsInStock: unitsInStockValue,
			});
		}
		setNameValue("");
		setCommentNameValue("No Comment");
		setUnitPriceValue(0);
		setUnitsInStockValue(0);
		toggle();
	};

	return (
		<>
			<button className="btn btn-success" onClick={toggle}>
				Add
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="modal-form-item">Add Product</ModalHeader>
				<ModalBody className="modal-form">
					<div className="modal-form-item modal-form-name">
						<label
							htmlFor="modal-comment-add-form-name"
							className="form-label"
						>
							Name
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-comment-add-form-name"
							placeholder="Name"
							value={nameValue}
							onChange={(event) => nameValueUpdate(event.target.value)}
						/>
					</div>
					<div className="modal-form-item modal-form-comment">
						<label
							htmlFor="modal-comment-add-form-comment"
							className="form-label"
						>
							Comment
						</label>
						<Input
							type="select"
							className="form-control form-input"
							id="addForm-id"
							placeholder="Comment"
							value={commentNameValue}
							onChange={(event) =>
								commentNameValueUpdate(event.target.value)
							}
						>
							<option value={"No Comment"}>Choose a Comment</option>
							{comments ? (
								comments.map((comment) => {
									return (
										<option key={comment.id} value={comment.name}>
											{comment.name}
										</option>
									);
								})
							) : (
								<option value={"No Comment"}>No Comments Found</option>
							)}
						</Input>
					</div>
					<div className="modal-form-item modal-form-unitPrice">
						<label htmlFor="addForm-unitPrice" className="form-label">
							Unit Price
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="addForm-unitPrice"
							placeholder="UnitPrice"
							value={unitPriceValue}
							onChange={(event) =>
								unitPriceValueUpdate(event.target.value)
							}
							min="0"
						/>
					</div>
					<div className="acdFormItem addform-unitsInStock">
						<label htmlFor="addForm-unitsInStock" className="form-label">
							Units In Stock
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="addForm-unitsInStock"
							placeholder="Units In Stock"
							value={unitsInStockValue}
							onChange={(event) =>
								unitsInStockValueUpdate(event.target.value)
							}
							min="0"
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-success form-input form-control"
						onClick={() => navCreateButtonClick()}
					>
						Add Comment
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
