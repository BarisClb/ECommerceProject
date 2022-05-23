import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { commonActions } from "../../store/actions";

function SellerProduct(props) {
	const randomImage = commonActions.randomImage;
	const [id] = useState(props.product.id);
	const [product] = useState(props.product);

	const seller = useSelector((state) => state.account.seller);
	const categories = useSelector((state) => state.category.categories);

	const [categoryId, setCategoryId] = useState(
		props.product.categoryId ? props.product.categoryId : 1
	);
	const [name, setName] = useState(props.product.name ? props.product.name : "");
	const [description, setDescription] = useState(
		props.product.description ? props.product.description : ""
	);
	const [price, setPrice] = useState(props.product.price ? props.product.price : "");
	const [stock, setStock] = useState(props.product.stock ? props.product.stock : "");

	const createOrUpdate = () => {
		if (id === 0) {
			if (props.createProduct) {
				props.createProduct({
					name: name,
					description: description,
					price: price,
					stock: stock,
					categoryId: categoryId,
					sellerId: seller.id,
				});
			}
		} else {
			if (props.updateProduct && product.sellerId === seller.id) {
				props.updateProduct(product.id, {
					name: name,
					description: description,
					price: price,
					stock: stock,
					categoryId: categoryId,
				});
			}
		}
	};

	// Show Changes

	useEffect(() => {
		setCategoryId(props.product.categoryId ? props.product.categoryId : 1);
		setName(props.product.name ? props.product.name : "");
		setDescription(props.product.description ? props.product.description : "");
		setPrice(props.product.price ? props.product.price : "");
		setStock(props.product.stock ? props.product.stock : "");
	}, [props.product]);

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
					{/* PRODUCTION CATEGORY */}
					<div className="modal-form-item modal-form-category">
						<label htmlFor="modal-product-create-form-category" className="form-label">
							Category
						</label>
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
					</div>
					{/* PRODUCT NAME */}
					<div className="modal-form-item modal-form-name">
						<label htmlFor="modal-product-create-form-name" className="form-label">
							Name
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-product-create-form-name"
							placeholder="Name"
							value={name}
							onChange={(event) => setName(event.target.value)}
						/>
					</div>
					{/* PRODUCT DESCRIPTION */}
					<div className="modal-form-item modal-form-description">
						<label htmlFor="modal-product-create-form-description" className="form-label">
							Description
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-product-create-form-description"
							placeholder="Description"
							value={description}
							onChange={(event) => setDescription(event.target.value)}
						/>
					</div>
					{/* PRODUCTION PRICE */}
					<div className="modal-form-item modal-form-price">
						<label htmlFor="modal-product-create-form-price" className="form-label">
							Price
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-product-create-form-price"
							placeholder="Price"
							value={price}
							onChange={(event) => setPrice(event.target.value)}
							min="0"
						/>
					</div>
					{/* PRODUCTION STOCK */}
					<div className="modal-form-item modal-form-stock">
						<label htmlFor="modal-product-create-form-stock" className="form-label">
							Stock
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-product-create-form-stock"
							placeholder="Stock"
							value={stock}
							onChange={(event) => setStock(event.target.value)}
							min="0"
						/>
					</div>
					<div id="singleproduct-order" className="row">
						<a
							className={`btn btn-${id === 0 ? "success" : "warning"}`}
							href={`/seller/product/${id}`}
							role="button"
							disabled={id === 0 ? true : false}
							onClick={() => createOrUpdate()}
						>
							{id === 0 ? "Create Product" : "Update Product"}
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SellerProduct;
