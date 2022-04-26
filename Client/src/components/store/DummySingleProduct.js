import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { productActions } from "../../store/actions/productActions";

function DummySingleProduct() {
	//#region RandomProductImage
	const randomRgba = () => {
		let randomNum1 = Math.round(Math.random() * 255);
		let randomNum2 = Math.round(Math.random() * 255);
		let randomNum3 = Math.round(Math.random() * 255);
		return `rgba(${randomNum1},${randomNum2},${randomNum3},1)`;
	};
	const randomImage = () => {
		let rgb1 = randomRgba();
		let rgb2 = randomRgba();
		let rgb3 = randomRgba();
		return `linear-gradient(315deg, ${rgb1} 33%, ${rgb2} 66%, ${rgb3} 100%)`;
	};
	//#endregion

	return (
		<div id="sinlgeproduct-content-container-wrapper" className="container">
			<h1>DUMMY PAGE</h1>
			<div id="sinlgeproduct-content-container" className="row">
				<div
					id="sinlgeproduct-gallery-container"
					className="col-lg-6 col-md-12 col-sm-12"
				>
					<div
						id="sinlgeproduct-image"
						className="row"
						style={{
							background: randomImage(),
						}}
					></div>
				</div>
				<div
					id="sinlgeproduct-info-container"
					className="col-lg-6 col-md-12 col-sm-12"
				>
					<div id="sinlgeproduct-info" className="col">
						<div id="sinlgeproduct-name" className="row">
							<h3>Product Name: </h3> <br /> <p>Product Name</p>
						</div>
						<div id="sinlgeproduct-rating" className="row">
							<h3>Product Rating:</h3> <br /> <p>Rating</p>
						</div>
						<div id="sinlgeproduct-description" className="row">
							<h3>Product Description:</h3> <br /> <p>Description</p>
						</div>
						<div id="sinlgeproduct-seller" className="row">
							<h3>Product Seller:</h3> <br /> <p>SellerName</p>
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

export default DummySingleProduct;
