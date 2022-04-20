import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { useSelector } from "react-redux";

const DeleteSellerForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(-1);
	const idValueUpdate = (newSellerId) => {
		setIdValue(newSellerId);
	};
	const sellers = useSelector((state) => state.seller.sellers);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navDeleteButtonComp = () => {
		if (props.navDeleteButtonClick && idValue >= 0) {
			props.navDeleteButtonClick(Number.parseInt(idValue));
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
				<ModalHeader className="acdFormItem">Delete Seller</ModalHeader>
				<ModalBody className="acdForm">
					<div className="acdFormItem deleteform-id">
						<label htmlFor="deleteForm-id" className="form-label">
							Seller
						</label>
						<Input
							type="select"
							className="form-control form-input"
							id="deleteForm-id"
							placeholder="Seller"
							value={idValue}
							onChange={(event) => idValueUpdate(event.target.value)}
						>
							<option value={-1}>Choose A Seller To Delete</option>
							{sellers ? (
								sellers.map((seller) => {
									return (
										<option key={seller.id} value={seller.id}>
											{seller.name}
										</option>
									);
								})
							) : (
								<option>No Sellers Found</option>
							)}
						</Input>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-danger form-input form-control"
						onClick={() => navDeleteButtonComp()}
					>
						Delete Seller
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

export default DeleteSellerForm;
