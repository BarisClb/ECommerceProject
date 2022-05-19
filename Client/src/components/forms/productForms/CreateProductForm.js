import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CreateProductForm = (props) => {
	// FORM DATA
	const [nameValue, setNameValue] = useState("");
	const [descriptionValue, setDescriptionValue] = useState("");
	const [priceValue, setPriceValue] = useState(0);
	const [stockValue, setStockValue] = useState(0);
	const [categoryIdValue, setCategoryIdValue] = useState(0);
	const [sellerIdValue, setSellerIdValue] = useState(0);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = (e) => {
		e.preventDefault();
		setModal(!modal);
	};
	const navCreateButtonClick = (e) => {
		e.preventDefault();
		if (props.navCreateButtonClick) {
			props.navCreateButtonClick({
				name: nameValue,
				description: descriptionValue,
				price: priceValue,
				stock: stockValue,
				categoryId: categoryIdValue,
				sellerId: sellerIdValue,
			});
		}
		setNameValue("");
		setDescriptionValue("");
		setPriceValue(0);
		setStockValue(0);
		setCategoryIdValue(0);
		setSellerIdValue(0);
		toggle();
	};

	return (
		<>
			<button className="btn btn-success" onClick={toggle}>
				Create
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<form onSubmit={(e) => navCreateButtonClick(e)}>
					<ModalHeader className="modal-form-item">Create Seller</ModalHeader>
					<ModalBody className="modal-form">
						{/* WARNING */}
						<div className="modal-form-item">
							<label className="form-label">
								Only Seller Accounts should Create Products.
							</label>
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
								value={nameValue}
								onChange={(event) => setNameValue(event.target.value)}
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
								value={descriptionValue}
								onChange={(event) => setDescriptionValue(event.target.value)}
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
								value={priceValue}
								onChange={(event) => setPriceValue(event.target.value)}
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
								value={stockValue}
								onChange={(event) => setStockValue(event.target.value)}
								min="0"
							/>
						</div>
						{/* PRODUCTION CATEGORYID */}
						<div className="modal-form-item modal-form-categoryId">
							<label htmlFor="modal-product-create-form-categoryId" className="form-label">
								CategoryId
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-product-create-form-categoryId"
								placeholder="CategoryId"
								value={categoryIdValue}
								onChange={(event) => setCategoryIdValue(event.target.value)}
								min="0"
							/>
						</div>
						{/* PRODUCTION SELLERID */}
						<div className="modal-form-item modal-form-sellerId">
							<label htmlFor="modal-product-create-form-sellerId" className="form-label">
								SellerId
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-product-create-form-sellerId"
								placeholder="SellerId"
								value={sellerIdValue}
								onChange={(event) => setSellerIdValue(event.target.value)}
								min="0"
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<button className="btn btn-success form-input form-control" type="submit">
							Create Product
						</button>
						<button
							className="btn btn-secondary form-input form-control"
							onClick={(e) => toggle(e)}
						>
							Close
						</button>
					</ModalFooter>
				</form>
			</Modal>
		</>
	);
};

export default CreateProductForm;
