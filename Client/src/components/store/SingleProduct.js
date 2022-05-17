import React from "react";
import { commonActions } from "../../store/actions";
import "./css/index.css";

function SingleProduct(params) {
	// DATA
	const product = params.productPageData.product;
	const seller = params.productPageData.seller;
	const comments = params.productPageData.comments;
	const commentReplies = params.productPageData.commentReplies;
	const likes = params.productPageData.likes;

	const randomImage = commonActions.randomImage;

	return (
		<div id="sinlgeproduct-content-container-wrapper" className="container">
			<div id="sinlgeproduct-content-container" className="row">
				<div id="sinlgeproduct-gallery-container" className="col-lg-6 col-md-12 col-sm-12">
					<div
						id="sinlgeproduct-image"
						className="row"
						style={{
							background: randomImage(),
						}}
					></div>
				</div>
				<div id="sinlgeproduct-info-container" className="col-lg-6 col-md-12 col-sm-12">
					<div id="sinlgeproduct-info" className="col">
						<div id="sinlgeproduct-name" className="row">
							<p>{product && product.categoryName} </p> <br />
							<h1>{product && product.name}</h1>
							<hr />
						</div>
						<div id="sinlgeproduct-description" className="row">
							<p>Description</p> <br />
							<h4>{product && product.description} </h4>
							<hr />
						</div>
						<div id="sinlgeproduct-price-stock" className="row">
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
						<div id="sinlgeproduct-seller" className="row">
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
						<div id="sinlgeproduct-order" className="row">
							<button className="btn btn-warning">Order Now!</button>
							<button className="btn btn-success">Add to Cart</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SingleProduct;
