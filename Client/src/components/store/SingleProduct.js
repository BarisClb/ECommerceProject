import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { commonActions } from "../../store/actions";
import { cartActions } from "../../store/actions/cartActions";
import "./css/index.css";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function SingleProduct(props) {
	// DATA
	const [product] = useState(props.productPageData.product);
	const [productSeller, setProductSeller] = useState(props.productPageData.seller);
	const [comments, setComments] = useState(props.productPageData.comments);
	const [commentReplies, setCommentReplies] = useState(props.productPageData.commentReplies);
	const [likes, setLikes] = useState(props.productPageData.likes);

	const [commentLimit, setCommentLimit] = useState(2);

	useEffect(() => {
		setProductSeller(props.productPageData.seller);
		setComments(props.productPageData.comments);
		setCommentReplies(props.productPageData.commentReplies);
		setLikes(props.productPageData.likes);
	}, [props.productPageData]);

	// User
	const user = useSelector((state) => state.account.user);
	const seller = useSelector((state) => state.account.seller);

	// Cart
	const dispatch = useDispatch();
	const currentCart = useSelector((state) => state.cart.currentCart);

	const addToCart = () => {
		if (product.stock > 0) {
			dispatch(cartActions.addOrIncreaseCart(product, currentCart));
		} else if (product.stock <= 1) {
			toast.warning(`Sorry, looks like we are out of ${product.name}.`);
		}
	};

	// Misc

	const randomImage = commonActions.randomImage;
	const darkMode = useSelector((state) => state.common.DarkMode);

	//#region Modal

	const [modal, setModal] = useState(false);
	const [modalData, setModalData] = useState({}); // Entitty to Update/Delete
	const [modalAction, setModalAction] = useState(""); // ActionType + EntityName
	const [modalActionType, setModalActionType] = useState(""); // Create/Update/Delete

	// Logic For Modal Content and Authorization
	const modalToggle = (data = {}, action = "", actionType = "") => {
		// Shortcut for Closing
		if (commonActions.objectIsEmpty(data) && action === "" && actionType === "")
			return setModal(!modal);

		// Set Data
		setModalData(data);
		setModalAction(action);
		setModalActionType(actionType);

		//// CommentReply
		// Create/Update/Delete (Since it can be only one person, I put these actions together.)
		if (action.includes("CommentReply") && product.sellerId !== seller.id) {
			setModal2Text(`Only the Seller of the Product can ${actionType} a Comment Reply.`);
			setModal2(!modal2);
			return;
		}
		//// Comment
		// Create
		if (action === "CreateComment" && commonActions.objectIsEmpty(user)) {
			setModal2Text("You need to LogIn as a User to Comment.");
			setModal2(!modal2);
			return;
		}
		// Update/Delete
		if ((action === "UpdateComment" || action === "DeleteComment") && data.userId !== user.id) {
			setModal2Text(`Only the Writer of the Comment can ${actionType} the Comment.`);
			setModal2(!modal2);
			return;
		}

		setModal(!modal);
	};
	// To set the data that will be edited.
	useEffect(() => {
		if (modalData.title !== undefined) setModalTitle(modalData.title);
		if (modalData.text !== undefined) setModalText(modalData.text);
		if (modalData.rating !== undefined) setModalRating(modalData.rating);
	}, [modalData]);

	// Action Switches
	const modalToggle2 = () => {
		switch (modalAction) {
			case "CreateComment":
				createCommentClick();
				break;
			case "CreateCommentReply":
				createCommentReplyClick();
				break;
			case "UpdateComment":
				updateCommentClick();
				break;
			case "UpdateCommentReply":
				updateCommentReplyClick();
				break;

			default:
				break;
		}
		setModal(!modal);
	};

	// Props Actions
	const createCommentClick = () => {
		if (props.createCommentClick) {
			props.createCommentClick({
				title: modalTitle,
				text: modalText,
				rating: modalRating,
				userId: user.id,
				productId: product.id,
			});
		}
	};
	const createCommentReplyClick = () => {
		if (props.createCommentReplyClick) {
			props.createCommentReplyClick({
				text: modalText,
				commentId: modalData.commentId,
				productId: product.id,
				sellerId: seller.id,
			});
		}
	};
	const updateCommentClick = () => {
		if (props.updateCommentClick) {
			props.updateCommentClick(modalData.id, {
				title: modalTitle,
				text: modalText,
				rating: modalRating,
			});
		}
	};
	const updateCommentReplyClick = () => {
		if (props.updateCommentReplyClick) {
			props.updateCommentReplyClick(modalData.id, {
				text: modalText,
			});
		}
	};

	// Modal Datas
	const [modalTitle, setModalTitle] = useState("");
	const [modalText, setModalText] = useState("");
	const [modalRating, setModalRating] = useState(3);

	// Modal 2 For Unauthorized Actions

	const [modal2, setModal2] = useState(false);
	const [modal2Text, setModal2Text] = useState("");
	const modal2Toggle = () => {
		setModal2(!modal2);
	};

	//#endregion

	const like = (comment) => {
		if (commonActions.objectIsEmpty(user)) {
			toast.warning("You need to be LoggedIn as a User to like comments.");
		} else if (props.likeAction) {
			props.likeAction(comment);
		}
	};

	const dislike = (comment) => {
		if (!commonActions.objectIsEmpty(user)) {
			let like = likes.filter((like) => like.commentId === comment.id);
			like = like.find((like) => like.userId === user.id);
			if (props.dislikeAction) {
				props.dislikeAction(like);
			}
		}
	};

	return (
		<div id="singleproduct-content-container-wrapper" className="container">
			<div id="singleproduct-content-container" className="row">
				<div id="singleproduct-gallery-container" className="col-lg-6 col-md-12 col-sm-12">
					<div
						id="singleproduct-image"
						className="row"
						style={{
							background: randomImage(),
						}}
					></div>
				</div>
				<div id="singleproduct-info-container" className="col-lg-6 col-md-12 col-sm-12">
					<div id="singleproduct-info" className="col">
						<div id="singleproduct-name" className="row">
							<p>{product && product.categoryName} </p> <br />
							<h1>{product && product.name}</h1>
							<hr />
						</div>
						<div id="singleproduct-description" className="row">
							<p>Description</p> <br />
							<h3>{product && product.description} </h3>
							<hr />
						</div>
						<div id="singleproduct-price-stock" className="row">
							<div className="col-sm-6">
								<p>Price</p> <h1>{product && product.price}</h1>
								<hr />
							</div>
							<div className="col-sm-6">
								<p>Stock</p>
								<h1>
									{product && product.stock > 0 ? "Still in stock!" : "Out of stock."}
								</h1>
								<hr />
							</div>
						</div>
						<div id="singleproduct-seller" className="row">
							<div className="col-sm-6">
								<p>Product By</p>
								<h1>{product && productSeller.username}</h1>
								<hr />
							</div>
							<div className="col-sm-6">
								<p>Created At</p>
								<h1>{product && product.dateCreated.slice(0, 10)}</h1>
								<hr />
							</div>
						</div>
						<div id="singleproduct-order" className="row">
							<a
								className="btn btn-primary"
								href={`/store/profile/${user.id && user.id}/cart`}
								role="button"
								disabled={user.id ? false : true}
							>
								Order Now!
							</a>
							<button className="btn btn-success" onClick={() => addToCart()}>
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			</div>
			<div id="singleproduct-comment-section-container-wrapper" className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="singleproduct-comment">
							<div className="d-flex justify-content-between">
								<h3 className="text-success">Comments</h3>
								<button
									className="btn btn-success"
									onClick={(e) =>
										modalToggle(
											{ title: "", text: "", rating: 3 },
											"CreateComment",
											"Create"
										)
									}
								>
									Write a Comment
								</button>
							</div>
							<hr />
							<ul className="singleproduct-comments">
								{comments &&
									comments.length > 0 &&
									comments.slice(0, commentLimit).map((comment) => (
										<li className="singleproduct-comment-and-reply" key={comment.id}>
											<div
												className={`singleproduct-comment ${
													darkMode ? "dark-theme" : ""
												}`}
											>
												<div className="singleproduct-comment-top-title d-flex justify-content-between">
													<div className="singleproduct-title-date">
														{`Written : ` + `${comment.dateCreated}`.slice(0, 10)}
														{comment.dateUpdated &&
															` / Updated : ` +
																`${comment.dateUpdated}`.slice(0, 10)}
													</div>
													<div className="singleproduct-title-rating">
														<div className="singleproduct-rating">
															Rating : {comment.rating} / 5
														</div>
													</div>
												</div>
												<div className="singleproduct-comment-title d-flex justify-content-between">
													<div className="singleproduct-title-user">
														<a href={`/store/profile/${comment.userId}`}>
															{comment.userUsername}
														</a>
														says :
													</div>
													<div className="singleproduct-title-right-side d-flex align-items-center gap-3">
														<div className="singleproduct-title-likes d-flex">
															<div className="singleproduct-title-like-count mr-1">
																{likes
																	? likes.filter(
																			(like) => like.commentId === comment.id
																	  ).length
																	: "0"}
															</div>
															{likes &&
															likes
																.filter((like) => like.commentId === comment.id)
																.some((like) => like.userId === user.id) ? (
																<div
																	className="singleproduct-title-like-dislike-text"
																	onClick={() => dislike(comment)}
																>
																	Dislike
																</div>
															) : (
																<div
																	className="singleproduct-title-like-dislike-text"
																	onClick={() => like(comment)}
																>
																	Like
																</div>
															)}
														</div>
														<div className="singleproduct-title-reply">
															<div
																className="singleproduct-comment-reply-text"
																onClick={() =>
																	modalToggle(
																		{ commentId: comment.id, text: "" },
																		"CreateCommentReply",
																		"Create"
																	)
																}
															>
																Reply
															</div>
														</div>
														<div
															className="singleproduct-comment-edit-text"
															onClick={() =>
																modalToggle(comment, "UpdateComment", "Update")
															}
														>
															Edit
														</div>
													</div>
												</div>
												<h5 className="singleproduct-comment-title-text">
													{comment.title}
												</h5>
												<p className="singleproduct-comment-text-text">
													{comment.text}
												</p>
											</div>
											{commentReplies &&
												commentReplies.length > 0 &&
												commentReplies
													.filter(
														(commentReply) => commentReply.commentId === comment.id
													)
													.map((commentReply) => (
														<div
															className={`singleproduct-reply ${
																darkMode ? "dark-theme" : ""
															}`}
															key={commentReply.id}
														>
															<div className="singleproduct-reply-top-title d-flex justify-content-between">
																<div className="singleproduct-title-date">
																	{`Written : ` +
																		`${commentReply.dateCreated}`.slice(0, 10)}
																	{commentReply.dateUpdated &&
																		` / Updated : ` +
																			`${commentReply.dateUpdated}`.slice(0, 10)}
																</div>
															</div>
															<div className="singleproduct-comment-title d-flex justify-content-between">
																<div className="singleproduct-comment-title-left">
																	<p>Seller says :</p>
																</div>
																<div
																	className="singleproduct-comment-title-right"
																	onClick={() =>
																		modalToggle(
																			commentReply,
																			"UpdateCommentReply",
																			"Update"
																		)
																	}
																>
																	Edit
																</div>
															</div>
															<p>{commentReply.text}</p>
														</div>
													))}
										</li>
									))}
							</ul>
						</div>
					</div>
				</div>
				{comments && comments.length > 0 && comments.length > commentLimit && (
					<div className="row justify-content-center">
						<button
							className="btn btn-success"
							onClick={() => setCommentLimit((prev) => prev + 2)}
							style={{ width: "250px" }}
						>
							Load More Comments
						</button>
					</div>
				)}
			</div>
			{/* MODALS FOR ADD/UPDATE COMMENTS */}
			<Modal isOpen={modal} toggle={() => modalToggle({})} centered>
				<ModalHeader className="modal-form-item">{modalActionType}</ModalHeader>
				<ModalBody className="modal-form">
					{/* COMMENT TITLE */}
					{modalData.title !== undefined && (
						<div className="modal-form-item modal-form-title">
							<label htmlFor="modal-comment-form-title" className="form-label">
								Title
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-comment-form-title"
								placeholder="Title"
								value={modalTitle}
								onChange={(event) => setModalTitle(event.target.value)}
							/>
						</div>
					)}
					{/* COMMENT/REPLY TEXT */}
					{modalData.text !== undefined && (
						<div className="modal-form-item modal-form-text">
							<label htmlFor="modal-comment-form-text" className="form-label">
								Text
							</label>
							<textarea
								type="textarea"
								className="form-control form-input"
								id="modal-comment-form-text"
								placeholder="Text"
								value={modalText}
								onChange={(event) => setModalText(event.target.value)}
							/>
						</div>
					)}
					{/* COMMENT RATING */}
					{modalData.rating !== undefined && (
						<div className="modal-form-item modal-form-rating">
							<label htmlFor="modal-comment-form-rating" className="form-label">
								Rating
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-comment-form-rating"
								placeholder="Rating"
								value={modalRating}
								onChange={(event) => setModalRating(event.target.value)}
								min={1}
								max={5}
							/>
						</div>
					)}
				</ModalBody>
				<ModalFooter>
					<button
						className={`btn btn-${
							modalActionType === "Create"
								? "success"
								: modalActionType === "Update"
								? "warning"
								: modalActionType === "Delete"
								? "danger"
								: "primary"
						} form-input form-control`}
						onClick={modalToggle2}
					>
						{modalActionType}
					</button>
					<button
						className="btn btn-secondary form-input form-control"
						onClick={() => modalToggle()}
					>
						Close
					</button>
				</ModalFooter>
			</Modal>
			{/* MODALS FOR UNAUTHORIZED ACTIONS */}
			<Modal isOpen={modal2} toggle={() => modal2Toggle()} centered>
				<ModalHeader className="modal-form-item">Unauthorized Action</ModalHeader>
				<ModalBody className="modal-form">
					{/* TEXT */}
					{modal2Text ? modal2Text : "You are not Authorized for this Action."}
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-secondary form-input form-control"
						onClick={() => modal2Toggle()}
					>
						Close
					</button>
				</ModalFooter>
			</Modal>
		</div>
	);
}

export default SingleProduct;
