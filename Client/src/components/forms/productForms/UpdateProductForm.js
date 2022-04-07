import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { productActions } from "../../../store/actions/productActions";
import "./css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { useSelector } from "react-redux";

export default function UpdateProductForm(props) {
	// FORM DATA
	const [nameValue, setNameValue] = useState("");
	const nameValueUpdate = (newName) => {
		setNameValue(newName);
	};
	const [categoryNameValue, setCategoryNameValue] = useState("No Category");
	const categoryNameValueUpdate = (newCategoryId) => {
		setCategoryNameValue(newCategoryId);
	};
	const [unitPriceValue, setUnitPriceValue] = useState(0);
	const unitPriceValueUpdate = (newUnitPrice) => {
		setUnitPriceValue(newUnitPrice);
	};
	const [unitsInStockValue, setUnitsInStockValue] = useState(0);
	const unitsInStockValueUpdate = (newUnitsInStock) => {
		setUnitsInStockValue(newUnitsInStock);
	};
	const [idValue, setIdValue] = useState("");
	const idValueUpdate = (newCategoryId) => {
		setIdValue(newCategoryId);
		if (newCategoryId >= 0) {
			let product = products.find(
				(product) => product.id === Number.parseInt(newCategoryId)
			);
			setNameValue(product.name);
			setCategoryNameValue(product.category);
			setUnitPriceValue(product.unitPrice);
			setUnitsInStockValue(product.unitsInStock);
		} else {
			setNameValue("");
			setCategoryNameValue("No Category");
			setUnitPriceValue(0);
			setUnitsInStockValue(0);
		}
	};

	const products = useSelector((state) => state.product.products);
	const categories = useSelector((state) => state.category.categories);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	// DISPATCH

	const dispatch = useDispatch();

	const navUpdateButtonComp = async () => {
		if (props.navUpdateButtonClick) {
			await props.navUpdateButtonClick(idValue, {
				name: nameValue,
				category: categoryNameValue,
				unitPrice: unitPriceValue,
				unitsInStock: unitsInStockValue,
			});
			dispatch(productActions.getProducts());
		}
		setNameValue("");
		setCategoryNameValue("No Category");
		setUnitPriceValue(0);
		setUnitsInStockValue(0);
		toggle();
	};

	return (
		<>
			<button className="btn btn-warning" onClick={toggle}>
				Update
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="acdFormItem">Update Product</ModalHeader>
				<ModalBody className="acdForm">
					<div className="acdFormItem updateFormProduct d-flex">
						<label htmlFor="updateForm-id" className="form-label">
							Old Product
						</label>
						<Input
							type="select"
							className="form-control form-input"
							id="updateForm-id"
							placeholder="Product"
							value={idValue}
							onChange={(event) => idValueUpdate(event.target.value)}
						>
							<option value={-1}>Choose a Product to Update</option>
							{products ? (
								products.map((product) => {
									return (
										<option key={product.id} value={product.id}>
											{product.name}
										</option>
									);
								})
							) : (
								<option value={-1}>No Products Found</option>
							)}
						</Input>
					</div>
					<div className="acdFormItem updateFormName d-flex">
						<label htmlFor="updateForm-name" className="form-label">
							Name
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="updateForm-name"
							placeholder="Name"
							value={nameValue}
							onChange={(event) => nameValueUpdate(event.target.value)}
						/>
					</div>
					<div className="acdFormItem updateFormCategory d-flex">
						<label htmlFor="updateForm-id" className="form-label">
							Category
						</label>
						<Input
							type="select"
							className="form-control form-input"
							id="updateForm-id"
							placeholder="Category"
							value={categoryNameValue}
							onChange={(event) =>
								categoryNameValueUpdate(event.target.value)
							}
						>
							<option value={"No Category"}>Choose a Category</option>
							{categories ? (
								categories.map((category) => {
									return (
										<option key={category.id} value={category.name}>
											{category.name}
										</option>
									);
								})
							) : (
								<option value={"No Category"}>
									No Categories Found
								</option>
							)}
						</Input>
					</div>
					<div className="acdFormItem updateform-unitPrice">
						<label htmlFor="updateForm-unitPrice" className="form-label">
							Unit Price
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="updateForm-unitPrice"
							placeholder="UnitPrice"
							value={unitPriceValue}
							onChange={(event) =>
								unitPriceValueUpdate(event.target.value)
							}
							min="0"
						/>
					</div>
					<div className="acdFormItem updateform-unitsInStock">
						<label
							htmlFor="updateForm-unitsInStock"
							className="form-label"
						>
							Units In Stock
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="updateForm-unitsInStock"
							placeholder="Units In Stock"
							value={unitsInStockValue}
							onChange={(event) =>
								unitsInStockValueUpdate(event.target.value)
							}
							min="0"
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-warning form-input form-control"
						onClick={() => navUpdateButtonComp()}
					>
						Update Product
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
}
