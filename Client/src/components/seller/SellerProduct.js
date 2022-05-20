import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { commonActions } from "../../store/actions";

function SellerProduct() {
	const randomImage = commonActions.randomImage;
	const { id } = useParams();
	const product = useSelector((state) => state.product.singleProduct);
	return (
		<div id="seller-singleproduct-content-container" className="row">
			<div id="seller-singleproduct-gallery-container" className="col-lg-6 col-md-12 col-sm-12">
				<div
					id="seller-singleproduct-image"
					className="row"
					style={{
						background: randomImage(),
					}}
				></div>
			</div>
			<div id="seller-singleproduct-info-container" className="col-lg-6 col-md-12 col-sm-12">
				<div id="seller-singleproduct-info" className="col">
					<div id="seller-singleproduct-name" className="row">
						<p>{product && product.categoryName} </p> <br />
						<h1>{product && product.name}</h1>
						<hr />
					</div>
					<div id="seller-singleproduct-description" className="row">
						<p>Description</p> <br />
						<h4>{product && product.description} </h4>
						<hr />
					</div>
					<div id="seller-singleproduct-price-stock" className="row">
						<div className="col-sm-6">
							<p>Price</p> <h1>{product && product.price}</h1>
							<hr />
						</div>
						<div className="col-sm-6">
							<p>Stock</p>
							<h1>{product && product.stock > 0 ? "Still in stock!" : "Out of stock."}</h1>
							<hr />
						</div>
					</div>
					<div id="seller-singleproduct-seller" className="row">
						<div className="col-sm-6">
							<p>Product By</p>
							<h1>sellername</h1>
							<hr />
						</div>
						<div className="col-sm-6">
							<p>Created At</p>
							<h1>{product && product.dateCreated.slice(0, 10)}</h1>
							<hr />
						</div>
					</div>
					<div id="seller-singleproduct-order" className="row">
						<a
							className="btn btn-primary"
							href={`/seller/product/${id}`}
							role="button"
							disabled={true}
						>
							Order Now!
						</a>
						<button className="btn btn-success">Add to Cart</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SellerProduct;
