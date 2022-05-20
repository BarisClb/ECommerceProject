import React from "react";
import { useSelector } from "react-redux";
import { commonActions } from "../../store/actions";

function DummySingleProduct() {
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
							<p>Category Name </p> <br />
							<h1>Product Name</h1>
							<hr />
						</div>
						<div id="singleproduct-description" className="row">
							<p>Description</p> <br />
							<h4>Product Description </h4>
							<hr />
						</div>
						<div id="singleproduct-price-stock" className="row">
							<div className="col-sm-6">
								<p>Price</p> <h1>Product Price</h1>
								<hr />
							</div>
							<div className="col-sm-6">
								<p>Stock</p>
								<h1>Stock Status</h1>
								<hr />
							</div>
						</div>
						<div id="singleproduct-seller" className="row">
							<div className="col-sm-6">
								<p>Product By</p>
								<h1>Seller Username</h1>
								<hr />
							</div>
							<div className="col-sm-6">
								<p>Created At</p>
								<h1>Date Created</h1>
								<hr />
							</div>
						</div>
						<div id="singleproduct-order" className="row">
							<a className="btn btn-primary" href={`/store/product/0`} role="button">
								Order Now!
							</a>
							<button className="btn btn-success">Add to Cart</button>
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
								<li className="singleproduct-comment-and-reply">
									<div className={`singleproduct-comment ${darkMode ? "dark-theme" : ""}`}>
										<div className="singleproduct-comment-top-title d-flex justify-content-between">
											<div className="singleproduct-title-date">
												Written : 'Comment Date Created' / Updated : 'Comment Date
												Updated'
											</div>
											<div className="singleproduct-title-rating">
												<div className="singleproduct-rating">
													Rating : Comment Rating / 5
												</div>
											</div>
										</div>
										<div className="singleproduct-comment-title d-flex justify-content-between">
											<div className="singleproduct-title-user">
												<a href={`/store/product/0`}>Username</a>
												says :
											</div>
											<div className="singleproduct-title-reply">
												<i className="pull-right">
													<a href="/store/product/0">
														<small>Reply</small>
													</a>
												</i>
											</div>
										</div>
										<h5 className="singleproduct-comment-title-text">Comment Title</h5>
										<p className="singleproduct-comment-text-text">Comment Text</p>
									</div>

									<div className={`singleproduct-reply ${darkMode ? "dark-theme" : ""}`}>
										<div className="singleproduct-reply-top-title d-flex justify-content-between">
											<div className="singleproduct-title-date">
												Written : 'CommentReply Date Created' / Updated : 'CommentReply
												Date Updated'
											</div>
										</div>
										<div className="singleproduct-comment-title d-flex justify-content-between">
											<div className="singleproduct-title-user d-flex">
												<p>Seller says :</p>
											</div>
										</div>
										<p>CommentReply Text</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DummySingleProduct;
