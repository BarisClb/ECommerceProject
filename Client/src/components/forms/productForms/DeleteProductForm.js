import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { productActions } from "../../../store/actions/productActions";
import "./css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { useSelector } from "react-redux";

export default function DeleteProductForm(props) {
	// FORM DATA
	const [idValue, setIdValue] = useState("");
	const idValueUpdate = (newWord) => {
		setIdValue(newWord);
	};

	const products = useSelector((state) => state.product.products);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	// DISPATCH

	const dispatch = useDispatch();

	const navDeleteButtonComp = async () => {
		if (props.navDeleteButtonClick && idValue >= 0) {
			await props.navDeleteButtonClick(Number.parseInt(idValue));
			dispatch(productActions.getProducts());
		}
		setIdValue(-1);
		toggle();
	};

	return (
		<>
			<button className="btn btn-danger" onClick={toggle}>
				Delete
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="acdFormItem">Delete Product</ModalHeader>
				<ModalBody className="acdForm">
					<div className="acdFormItem deleteFormProduct d-flex">
						<label htmlFor="deleteForm-id" className="form-label">
							Product
						</label>
						<Input
							type="select"
							className="form-control form-input"
							id="deleteForm-id"
							placeholder="Product"
							value={idValue}
							onChange={(event) => idValueUpdate(event.target.value)}
						>
							<option value={-1}>Choose A Product To Delete</option>
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
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-danger form-input form-control"
						onClick={() => navDeleteButtonComp()}
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
}
