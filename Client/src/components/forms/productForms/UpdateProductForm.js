import React, { useEffect, useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../store/actions";

const UpdateProductForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(0);
	const [entityFound, setEntityFound] = useState(false);

	const product = useSelector((state) => state.common.EntityToUpdate);

	const dispatch = useDispatch();
	const findEntity = () => {
		dispatch(commonActions.getEntityToUpdate("Products", idValue));
	};

	useEffect(() => {
		if (product.id) {
			setIdValue(product.id);
			setNameValue(product.name);
			setDescriptionValue(product.description);
			setPriceValue(product.price);
			setStockValue(product.stock);
			setCategoryIdValue(product.categoryId);
			setSellerIdValue(product.sellerId);
			setEntityFound(true);
		} else {
			setIdValue(0);
			setNameValue("");
			setDescriptionValue("");
			setPriceValue(0);
			setStockValue(0);
			setCategoryIdValue(0);
			setSellerIdValue(0);
			setEntityFound(false);
		}
	}, [product]);

	const [nameValue, setNameValue] = useState("");
	const [descriptionValue, setDescriptionValue] = useState("");
	const [priceValue, setPriceValue] = useState(0);
	const [stockValue, setStockValue] = useState(0);
	const [categoryIdValue, setCategoryIdValue] = useState(0);
	const [sellerIdValue, setSellerIdValue] = useState(0);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navUpdateButtonClick = () => {
		if (props.navUpdateButtonClick && idValue > 0) {
			let updatedProduct = {};
			if (changeName) {
				updatedProduct = { ...updatedProduct, name: nameValue };
			}
			if (changeDescription) {
				updatedProduct = {
					...updatedProduct,
					description: descriptionValue,
				};
			}
			if (changePrice) {
				updatedProduct = {
					...updatedProduct,
					price: priceValue,
				};
			}
			if (changeStock) {
				updatedProduct = {
					...updatedProduct,
					stock: stockValue,
				};
			}
			if (changeCategoryId) {
				updatedProduct = {
					...updatedProduct,
					categoryId: categoryIdValue,
				};
			}
			if (changeSellerId) {
				updatedProduct = {
					...updatedProduct,
					sellerId: sellerIdValue,
				};
			}

			props.navUpdateButtonClick(Number.parseInt(idValue), {
				...updatedProduct,
			});
		}
		setIdValue(0);
		setNameValue("");
		setDescriptionValue("");
		setPriceValue(0);
		setStockValue(0);
		setCategoryIdValue(0);
		setSellerIdValue(0);
		setEntityFound(false);
		setChangeName(true);
		setChangeDescription(true);
		setChangePrice(true);
		setChangeStock(true);
		setChangeCategoryId(true);
		setChangeSellerId(true);
		dispatch(commonActions.getEntityToUpdate("Products", 0));
		toggle();
	};

	// Update or Not

	const [changeName, setChangeName] = useState(true);
	const [changeDescription, setChangeDescription] = useState(true);
	const [changePrice, setChangePrice] = useState(true);
	const [changeStock, setChangeStock] = useState(true);
	const [changeCategoryId, setChangeCategoryId] = useState(true);
	const [changeSellerId, setChangeSellerId] = useState(true);

	return (
		<>
			<button className="btn btn-warning" onClick={toggle}>
				Update
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="modal-form-item">Update Product</ModalHeader>
				<ModalBody className="modal-form">
					{/* PRODUCT ID */}
					<div className="modal-form-item modal-form-id">
						<label htmlFor="modal-product-update-form-id" className="form-label">
							Id
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-product-update-form-id"
							placeholder="Id"
							value={idValue}
							onChange={(event) => setIdValue(event.target.value)}
							min="1"
						/>
						<button
							className="btn btn-primary get-entity-to-update-button"
							onClick={() => findEntity()}
						>
							Get Product
						</button>
					</div>
					{/* PRODUCT NAME */}
					<div className="modal-form-item modal-form-name">
						<label htmlFor="modal-product-update-form-name" className="form-label">
							Name
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-product-update-form-name"
							placeholder="Product Name"
							value={nameValue}
							onChange={(event) => setNameValue(event.target.value)}
							disabled={!changeName}
						/>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								id="modal-form-product-update-name-check"
								onChange={() => setChangeName(!changeName)}
								checked={!changeName}
							/>
							<label
								className="form-check-label"
								htmlFor="modal-form-product-update-name-check"
							>
								Don't Change
							</label>
						</div>
					</div>
					{/* PRODUCT DESCRIPTION */}
					<div className="modal-form-item modal-form-description">
						<label htmlFor="modal-product-update-form-description" className="form-label">
							Description
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-product-update-form-description"
							placeholder="Description"
							value={descriptionValue}
							onChange={(event) => setDescriptionValue(event.target.value)}
							disabled={!changeDescription}
						/>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								id="modal-form-product-update-description-check"
								onChange={() => setChangeDescription(!changeDescription)}
							/>
							<label
								className="form-check-label"
								htmlFor="modal-form-product-update-description-check"
							>
								Don't Change
							</label>
						</div>
					</div>
					{/* PRODUCT PRICE */}
					<div className="modal-form-item modal-form-price">
						<label htmlFor="modal-product-update-form-price" className="form-label">
							Price
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-product-update-form-price"
							placeholder="Price"
							value={priceValue}
							onChange={(event) => setPriceValue(event.target.value)}
							min="0"
							disabled={!changePrice}
						/>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								id="modal-form-product-update-price-check"
								onChange={() => setChangePrice(!changePrice)}
							/>
							<label
								className="form-check-label"
								htmlFor="modal-form-product-update-price-check"
							>
								Don't Change
							</label>
						</div>
					</div>
					{/* PRODUCT STOCK */}
					<div className="modal-form-item modal-form-stock">
						<label htmlFor="modal-product-update-form-stock" className="form-label">
							Stock
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-product-update-form-stock"
							placeholder="Stock"
							value={stockValue}
							onChange={(event) => setStockValue(event.target.value)}
							min="0"
							disabled={!changeStock}
						/>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								id="modal-form-product-update-stock-check"
								onChange={() => setChangeStock(!changeStock)}
							/>
							<label
								className="form-check-label"
								htmlFor="modal-form-product-update-stock-check"
							>
								Don't Change
							</label>
						</div>
					</div>
					{/* PRODUCT CATEGORYID */}
					<div className="modal-form-item modal-form-categoryId">
						<label htmlFor="modal-product-update-form-categoryId" className="form-label">
							CategoryId
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-product-update-form-categoryId"
							placeholder="CategoryId"
							value={categoryIdValue}
							onChange={(event) => setCategoryIdValue(event.target.value)}
							min="0"
							disabled={!changeCategoryId}
						/>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								id="modal-form-product-update-categoryId-check"
								onChange={() => setChangeCategoryId(!changeCategoryId)}
							/>
							<label
								className="form-check-label"
								htmlFor="modal-form-product-update-categoryId-check"
							>
								Don't Change
							</label>
						</div>
					</div>
					{/* PRODUCT SELLERID */}
					<div className="modal-form-item modal-form-sellerId">
						<label htmlFor="modal-product-update-form-sellerId" className="form-label">
							SellerId
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-product-update-form-sellerId"
							placeholder="SellerId"
							value={sellerIdValue}
							onChange={(event) => setSellerIdValue(event.target.value)}
							min="0"
							disabled={!changeSellerId}
						/>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								id="modal-form-product-update-sellerId-check"
								onChange={() => setChangeSellerId(!changeSellerId)}
							/>
							<label
								className="form-check-label"
								htmlFor="modal-form-product-update-sellerId-check"
							>
								Don't Change
							</label>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-warning form-input form-control"
						onClick={() => navUpdateButtonClick()}
						disabled={!entityFound}
					>
						Update Product
					</button>
					<button className="btn btn-secondary form-input form-control" onClick={toggle}>
						Close
					</button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default UpdateProductForm;
