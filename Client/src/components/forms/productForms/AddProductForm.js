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
	const [descriptionValue, setDescriptionValue] = useState("");
	const descriptionValueUpdate = (newWord) => {
		setDescriptionValue(newWord);
	};
	const [unitPriceValue, setUnitPriceValue] = useState(0);
	const unitPriceValueUpdate = (newWord) => {
		setUnitPriceValue(newWord);
	};
	const [unitsInStockValue, setUnitsInStockValue] = useState(0);
	const unitsInStockValueUpdate = (newWord) => {
		setUnitsInStockValue(newWord);
	};
	const [categoryIdValue, setCategoryIdValue] = useState(0);
	const categoryIdValueUpdate = (newWord) => {
		setCategoryIdValue(newWord);
	};
	const [sellerIdValue, setSellerIdValue] = useState(0);
	const sellerIdValueUpdate = (newWord) => {
		setSellerIdValue(newWord);
	};

	const categories = useSelector((state) => state.category.categories);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navAddButtonComp = () => {
		if (props.navAddButtonClick) {
			props.navAddButtonClick({
				name: nameValue,
				description: descriptionValue,
				price: unitPriceValue,
				stock: unitsInStockValue,
				categoryId: categoryIdValue,
				sellerId: sellerIdValue,
			});
		}
		setNameValue("");
		setDescriptionValue("");
		setUnitPriceValue(0);
		setUnitsInStockValue(0);
		setCategoryIdValue(0);
		setSellerIdValue(0);
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
					<div className="acdFormItem d-flex">
						<label htmlFor="updateForm-id" className="form-label">
							Only Seller Accounts can Add Products.
						</label>
					</div>
				</ModalBody>
				<ModalFooter>
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
