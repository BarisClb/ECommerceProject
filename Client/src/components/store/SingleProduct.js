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
	const [seller, setSeller] = useState(props.productPageData.seller);
	const [comments, setComments] = useState(props.productPageData.comments);
	const [commentReplies, setCommentReplies] = useState(props.productPageData.commentReplies);
	const [likes, setLikes] = useState(props.productPageData.likes);

	useEffect(() => {
		setSeller(props.productPageData.seller);
		setComments(props.productPageData.comments);
		setCommentReplies(props.productPageData.commentReplies);
		setLikes(props.productPageData.likes);
	}, [props.productPageData]);

	// User
	const user = useSelector((state) => state.account.user);

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
	const [modalData, setModalData] = useState(null);
	const [modalAction, setModalAction] = useState("");
	const [modalActionType, setModalActionType] = useState("");
	const modalToggle = (data, action, actionType) => {
		setModalData(data);
		setModalAction(action);
		setModalActionType(actionType);
		setModal(!modal);
	};
	const createCommentClick = (newComment) => {
		if (props.createCommentClick) {
			props.createCommentClick(newComment);
		}
	};
	const createCommentReplyClick = (newCommentReply) => {
		if (props.createCommentReplyClick) {
			props.createCommentReplyClick(newCommentReply);
		}
	};
	const editCommentClick = (updatedComment) => {
		if (props.editCommentClick) {
			props.editCommentClick(updatedComment);
		}
	};
	const editCommentReplyClick = (updatedCommentReply) => {
		if (props.editCommentReplyClick) {
			props.editCommentReplyClick(updatedCommentReply);
		}
	};
	const modalToggle2 = () => {
		switch (modalAction) {
			case "CreateComment":
				createCommentClick(modalData);
				break;
			case "CreateCommentReply":
				createCommentReplyClick(modalData);
				break;
			case "UpdateComment":
				editCommentClick(modalData);
				break;
			case "UpdateCommentReply":
				editCommentReplyClick(modalData);
				break;

			default:
				break;
		}
		setModal(!modal);
	};

	const [modalTitle, setModalTitle] = useState("");
	const [modalText, setModalText] = useState("");

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
			let like = likes
				.filter((like) => like.commentId === comment.id)
				.find((like) => like.userId === user.id);
			if (props.dislikeAction) {
				props.dislikeAction(like);
			}
		}
	};

	const writeComment = (comment) => {
		if (!commonActions.objectIsEmpty(user)) {
			props.writeComment(comment);
		}
	};

	const writeCommentReply = (comment) => {
		if (!commonActions.objectIsEmpty(user)) {
			props.writeCommentReply(comment);
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
							<h4>{product && product.description} </h4>
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
								<h1>{product && seller.username}</h1>
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
								<button className="btn btn-success">Write a Comment</button>
							</div>
							<hr />
							<ul className="singleproduct-comments">
								{comments &&
									comments.length > 0 &&
									comments.map((comment) => (
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
													<div className="singleproduct-title-right-side d-flex gap-3">
														<div className="singleproduct-title-likes d-flex align-items-center">
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
															<i className="pull-right">
																<a href="#">
																	<small>Reply</small>
																</a>
															</i>
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
																<div className="singleproduct-title-user">
																	<p>Seller says :</p>
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
			</div>
			{/* MODALS FOR ADD/UPDATE COMMENTS */}
			<Modal isOpen={modal} toggle={modalToggle} centered>
				<ModalHeader className="modal-form-item">About to {modalActionType} </ModalHeader>
				<ModalBody className="modal-form">
					<div className="modal-form-item d-flex">
						<label htmlFor="modal-form-confirmation" className="form-label">
							Are you sure?
						</label>
					</div>
					{/* COMMENT TITLE */}
					<div className="modal-form-item modal-form-title">
						<label htmlFor="modal-category-create-form-title" className="form-label">
							Description
						</label>
						<input
							type="textarea"
							className="form-control form-input"
							id="modal-category-create-form-title"
							placeholder="Title"
							value={modalTitle}
							onChange={(event) => setModalTitle(event.target.value)}
						/>
					</div>
					{/* COMMENT/REPLY TEXT */}
					<div className="modal-form-item modal-form-text">
						<label htmlFor="modal-category-create-form-text" className="form-label">
							Description
						</label>
						<input
							type="textarea"
							className="form-control form-input"
							id="modal-category-create-form-text"
							placeholder="Text"
							value={modalText}
							onChange={(event) => setModalText(event.target.value)}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<button className={`btn btn-primary form-input form-control`} onClick={modalToggle2}>
						Yes
					</button>
					<button className="btn btn-secondary form-input form-control" onClick={modalToggle}>
						Close
					</button>
				</ModalFooter>
			</Modal>
		</div>
	);
}

export default SingleProduct;
