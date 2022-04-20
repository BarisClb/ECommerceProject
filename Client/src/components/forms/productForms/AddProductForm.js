import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { useSelector } from "react-redux";

const AddProductForm = (props) => {
	// FORM DATA
	const [nameValue, setNameValue] = useState("");
	const nameValueUpdate = (newWord) => {
		setNameValue(newWord);
	};
	const [categoryNameValue, setCategoryNameValue] = useState("No Category");
	const categoryNameValueUpdate = (newCategoryId) => {
		setCategoryNameValue(newCategoryId);
	};
	const [unitPriceValue, setUnitPriceValue] = useState(0);
	const unitPriceValueUpdate = (newWord) => {
		setUnitPriceValue(newWord);
	};
	const [unitsInStockValue, setUnitsInStockValue] = useState(0);
	const unitsInStockValueUpdate = (newWord) => {
		setUnitsInStockValue(newWord);
	};

	const categories = useSelector((state) => state.category.categories);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navAddButtonComp = () => {
		if (props.navAddButtonClick) {
			props.navAddButtonClick({
				name: nameValue,
				category: categoryNameValue,
				unitPrice: unitPriceValue,
				unitsInStock: unitsInStockValue,
			});
		}
		setNameValue("");
		setCategoryNameValue("No Category");
		setUnitPriceValue(0);
		setUnitsInStockValue(0);
		toggle();
	};

	return (
		<>
			<button className="btn btn-success" onClick={toggle}>
				Add
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="acdFormItem">Add Product</ModalHeader>
				<ModalBody className="acdForm">
					<div className="acdFormItem addFormName d-flex">
						<label htmlFor="addForm-name" className="form-label">
							Name
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="addForm-name"
							placeholder="Name"
							value={nameValue}
							onChange={(event) => nameValueUpdate(event.target.value)}
						/>
					</div>
					<div className="acdFormItem addFormCategory d-flex">
						<label htmlFor="addForm-id" className="form-label">
							Category
						</label>
						<Input
							type="select"
							className="form-control form-input"
							id="addForm-id"
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
					<div className="acdFormItem addform-unitPrice">
						<label htmlFor="addForm-unitPrice" className="form-label">
							Unit Price
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="addForm-unitPrice"
							placeholder="UnitPrice"
							value={unitPriceValue}
							onChange={(event) =>
								unitPriceValueUpdate(event.target.value)
							}
							min="0"
						/>
					</div>
					<div className="acdFormItem addform-unitsInStock">
						<label htmlFor="addForm-unitsInStock" className="form-label">
							Units In Stock
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="addForm-unitsInStock"
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
						className="btn btn-success form-input form-control"
						onClick={() => navAddButtonComp()}
					>
						Add Product
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

export default AddProductForm;
