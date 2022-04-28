import React, { useState } from "react";
import { commentReplyActions } from "../../../store/actions/commentReplyActions";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { useSelector } from "react-redux";

const UpdateCommentReplyForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(-1);
	const idValueUpdate = (newCommentReplyId) => {
		setIdValue(newCommentReplyId);
		if (newCommentReplyId >= 0) {
			let commentReply = commentReplies.find(
				(commentReply) =>
					commentReply.id === Number.parseInt(newCommentReplyId)
			);
			setNameValue(commentReply.name);
			setDescriptionValue(commentReply.description);
		} else {
			setNameValue("");
			setDescriptionValue("");
		}
	};
	const [nameValue, setNameValue] = useState("");
	const nameValueUpdate = (newNameValue) => {
		setNameValue(newNameValue);
	};
	const [descriptionValue, setDescriptionValue] = useState("");
	const descriptionValueUpdate = (newDescriptionValue) => {
		setDescriptionValue(newDescriptionValue);
	};

	const commentReplies = useSelector(
		(state) => state.commentReply.commentReplies
	);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navUpdateButtonClick = () => {
		if (
			props.navUpdateButtonClick &&
			idValue >= 0 &&
			nameValue &&
			descriptionValue
		) {
			props.navUpdateButtonClick(Number.parseInt(idValue), {
				name: nameValue,
				description: descriptionValue,
			});
		}
		setNameValue("");
		setDescriptionValue("");
		toggle();
	};

	return (
		<>
			<button className="btn btn-warning" onClick={toggle}>
				Update
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="acdFormItem">
					Update CommentReply
				</ModalHeader>
				<ModalBody className="acdForm">
					<div className="acdFormItem updateFormOldDescription">
						<label htmlFor="updateForm-id" className="form-label">
							Old CommentReply
						</label>
						<Input
							type="select"
							className="form-control form-input"
							id="updateForm-id"
							placeholder="CommentReply"
							value={idValue}
							onChange={(event) => idValueUpdate(event.target.value)}
						>
							<option value={-1}>Choose a CommentReply to Update</option>
							{commentReplies ? (
								commentReplies.map((commentReply) => {
									return (
										<option
											key={commentReply.id}
											value={commentReply.id}
										>
											{commentReply.name}
										</option>
									);
								})
							) : (
								<option>No CommentReplies Found</option>
							)}
						</Input>
					</div>
					<div className="acdFormItem updateFormNewName">
						<label htmlFor="updateForm-name" className="form-label">
							Name
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="updateForm-name"
							placeholder="New Name"
							value={nameValue}
							onChange={(event) => nameValueUpdate(event.target.value)}
						/>
					</div>
					<div className="acdFormItem updateFormNewDescription">
						<label
							htmlFor="updateForm-description"
							className="form-label"
						>
							Description
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="updateForm-description"
							placeholder="New Description"
							value={descriptionValue}
							onChange={(event) =>
								descriptionValueUpdate(event.target.value)
							}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-warning form-input form-control"
						onClick={() => navUpdateButtonClick()}
					>
						Update CommentReply
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

export default UpdateCommentReplyForm;
