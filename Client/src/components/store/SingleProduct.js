import React, { useState } from "react";
import { toast } from "react-toastify";
import { commonActions } from "../../store/actions";
import { cartActions } from "../../store/actions/cartActions";
import "./css/index.css";
import { useDispatch, useSelector } from "react-redux";

function SingleProduct(params) {
	// DATA
	const product = params.productPageData.product;
	const seller = params.productPageData.seller;
	const comments = params.productPageData.comments;
	const commentReplies = params.productPageData.commentReplies;
	const likes = params.productPageData.likes;

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

	const randomImage = commonActions.randomImage;
	const darkMode = useSelector((state) => state.common.DarkMode);

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
							</div>
							<div className="col-sm-6">
								<p>Stock</p>
								<h1>
									{product && product.stock > 0 ? "Still in stock!" : "Out of stock."}
								</h1>
							</div>
							<hr />
						</div>
						<div id="singleproduct-seller" className="row">
							<div className="col-sm-6">
								<p>Product By</p>
								<h1>{product && seller.username}</h1>
							</div>
							<div className="col-sm-6">
								<p>Created At</p>
								<h1>{product && product.dateCreated.slice(0, 10)}</h1>
							</div>
							<hr />
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
													<div className="singleproduct-title-reply">
														<i className="pull-right">
															<a href="#">
																<small>Reply</small>
															</a>
														</i>
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
																<div className="singleproduct-title-user d-flex">
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
		</div>
	);
}

export default SingleProduct;
