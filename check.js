import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { commonActions } from "../../store/actions";

function SellerProduct(props) {
	const randomImage = commonActions.randomImage;
	const [id] = useState(props.product.id);
	const [product] = useState(props.product);

	const seller = useSelector((state) => state.account.seller);
	const categories = useSelector((state) => state.category.categories);

	const [categoryId, setCategoryId] = useState(product.categoryId ? product.categoryId : 1);
	const [name, setName] = useState(product.name ? product.name : "");
	const [description, setDescription] = useState(product.description ? product.description : "");
	const [price, setPrice] = useState(product.price ? product.price : "");
	const [stock, setStock] = useState(product.stock ? product.stock : "");
	const [dateCreated, setDateCreated] = useState(
		product.dateCreated ? product.dateCreated.slice(0, 10) : "Soon"
	);
	// const [dateUpdated, setDateUpdated] = useState(product.dateUpdated ? product.dateUpdated : "");

	return (
		<div
			id="singleproduct-content-container"
			className="row"
			style={{ border: "none", width: "100%" }}
		>
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
						<select
							name="modal-category-update-form-category"
							id="modal-category-update-form-category"
							className="form-control form-select form-input"
							placeholder="Category"
							value={categoryId}
							onChange={(e) => setCategoryId(e.target.value)}
						>
							<option value={0}>Choose a Category to Update</option>
							{categories[0] ? (
								categories.map((category) => {
									return (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									);
								})
							) : (
								<option disabled={true}>No Categories Found</option>
							)}
						</select>
						<br />
						<input
							type="text"
							className="form-control form-input"
							id="modal-comment-form-name"
							placeholder="Name"
							value={name}
							onChange={(event) => setName(event.target.value)}
							style={{ border: "none" }}
						/>
						<hr />
					</div>
					<div id="singleproduct-description" className="row">
						<p>Description</p> <br />
						<input
							type="text"
							className="form-control form-input"
							id="modal-comment-form-description"
							placeholder="Description"
							value={description}
							onChange={(event) => setDescription(event.target.value)}
							style={{ border: "none" }}
						/>
						<hr />
					</div>
					<div id="singleproduct-price-stock" className="row">
						<div className="col-sm-6">
							<p>Price</p>
							<input
								type="number"
								className="form-control form-input"
								id="modal-comment-form-price"
								placeholder="Price"
								value={price}
								onChange={(event) => setPrice(event.target.value)}
								style={{ border: "none" }}
								min="0"
							/>
							<h1>{product && product.price}</h1>
							<hr />
						</div>
						<div className="col-sm-6">
							<p>Stock</p>
							<h1>{product && product.stock > 0 ? "Still in stock!" : "Out of stock."}</h1>
							<hr />
						</div>
					</div>
					<div id="singleproduct-seller" className="row">
						<div className="col-sm-6">
							<p>Product By</p>
							<h1>{seller && seller.username}</h1>
							<hr />
						</div>
						<div className="col-sm-6">
							<p>Created At</p>
							<h1>{dateCreated}</h1>
							<hr />
						</div>
					</div>
					<div id="singleproduct-order" className="row">
						<a
							className="btn btn-primary"
							href={`/seller/product/${id}`}
							role="button"
							disabled={id === 0 ? true : false}
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
