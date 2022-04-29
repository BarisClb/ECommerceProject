import React, { useEffect, useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../store/actions";

const DeleteProductForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(0);
	const [entityFound, setEntityFound] = useState(false);

	const product = useSelector((state) => state.common.EntityToUpdate);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navDeleteButtonClick = () => {
		if (props.navDeleteButtonClick && idValue > 0) {
			props.navDeleteButtonClick(Number.parseInt(idValue));
		}
		setIdValue(-1);
		toggle();
	};

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

	return (
		<>
			<button className="btn btn-danger" onClick={toggle}>
				Delete
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="modal-form-item">
					Delete Product
				</ModalHeader>
				<ModalBody className="modal-form">
					{/* PRODUCT ID */}
					<div className="modal-form-item modal-form-id">
						<label
							htmlFor="modal-product-delete-form-id"
							className="form-label"
						>
							Id
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-product-delete-form-id"
							placeholder="Id"
							value={idValue}
							onChange={(event) => setIdValue(event.target.value)}
							min="1"
						/>
						<button
							className="btn btn-primary get-entity-to-delete-button"
							onClick={() => findEntity()}
						>
							Get Product
						</button>
					</div>
					{/* PRODUCT NAME */}
					<div className="modal-form-item modal-form-name">
						<label
							htmlFor="modal-product-delete-form-name"
							className="form-label"
						>
							Name
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-product-delete-form-name"
							placeholder="Product Name"
							value={nameValue}
							disabled={true}
						/>
					</div>
					{/* PRODUCT DESCRIPTION */}
					<div className="modal-form-item modal-form-description">
						<label
							htmlFor="modal-product-delete-form-description"
							className="form-label"
						>
							Description
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-product-delete-form-description"
							placeholder="Description"
							value={descriptionValue}
							disabled={true}
						/>
					</div>
					{/* PRODUCT PRICE */}
					<div className="modal-form-item modal-form-price">
						<label
							htmlFor="modal-product-delete-form-price"
							className="form-label"
						>
							Price
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-product-delete-form-price"
							placeholder="Price"
							value={priceValue}
							disabled={true}
						/>
					</div>
					{/* PRODUCT STOCK */}
					<div className="modal-form-item modal-form-stock">
						<label
							htmlFor="modal-product-delete-form-stock"
							className="form-label"
						>
							Stock
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-product-delete-form-stock"
							placeholder="Stock"
							value={stockValue}
							disabled={true}
						/>
					</div>
					{/* PRODUCT CATEGORYID */}
					<div className="modal-form-item modal-form-categoryId">
						<label
							htmlFor="modal-product-delete-form-categoryId"
							className="form-label"
						>
							CategoryId
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-product-delete-form-categoryId"
							placeholder="CategoryId"
							value={categoryIdValue}
							disabled={true}
						/>
					</div>
					{/* PRODUCT SELLERID */}
					<div className="modal-form-item modal-form-sellerId">
						<label
							htmlFor="modal-product-delete-form-sellerId"
							className="form-label"
						>
							SellerId
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-product-delete-form-sellerId"
							placeholder="SellerId"
							value={sellerIdValue}
							disabled={true}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-danger form-input form-control"
						onClick={() => navDeleteButtonClick()}
						disabled={!entityFound}
					>
						Delete Product
					</button>
					<button
						className="btn btn-secondary form-input form-control"
						onClick={toggle}
					>
						Close
					</button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default DeleteProductForm;
