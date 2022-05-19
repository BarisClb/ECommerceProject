import React from "react";
import { commonActions } from "../../store/actions";

function DummySingleProduct() {
	const randomImage = commonActions.randomImage;

	return (
		<div id="singleproduct-content-container-wrapper" className="container">
			<h1>DUMMY PAGE</h1>
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
							<h3>Product Name: </h3> <br /> <p>Product Name</p>
						</div>
						<div id="singleproduct-rating" className="row">
							<h3>Product Rating:</h3> <br /> <p>Rating</p>
						</div>
						<div id="singleproduct-description" className="row">
							<h3>Product Description:</h3> <br /> <p>Description</p>
						</div>
						<div id="singleproduct-seller" className="row">
							<h3>Product Seller:</h3> <br /> <p>SellerName</p>
						</div>
						<div id="singleproduct-order" className="row">
							<button className="btn btn-warning">Order Now!</button>
							<button className="btn btn-success">Add to Cart</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DummySingleProduct;
