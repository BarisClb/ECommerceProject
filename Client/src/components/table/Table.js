import React, { useEffect, useState } from "react";
import "./css/index.css";
import MiniCart from "./MiniCart";
//#region Add Forms
import AddCategoryForm from "../forms/categoryForms/AddCategoryForm";
import AddCommentForm from "../forms/commentForms/AddCommentForm";
import AddCommentReplyForm from "../forms/commentReplyForms/AddCommentReplyForm";
import AddLikeForm from "../forms/likeForms/AddLikeForm";
import AddOrderForm from "../forms/orderForms/AddOrderForm";
import AddProductForm from "../forms/productForms/AddProductForm";
import AddSellerForm from "../forms/sellerForms/AddSellerForm";
import AddUserForm from "../forms/userForms/AddUserForm";
//#endregion
//#region Update Forms
import UpdateCategoryForm from "../forms/categoryForms/UpdateCategoryForm";
import UpdateCommentForm from "../forms/commentForms/UpdateCommentForm";
import UpdateCommentReplyForm from "../forms/commentReplyForms/UpdateCommentReplyForm";
import UpdateLikeForm from "../forms/likeForms/UpdateLikeForm";
import UpdateOrderForm from "../forms/orderForms/UpdateOrderForm";
import UpdateProductForm from "../forms/productForms/UpdateProductForm";
import UpdateSellerForm from "../forms/sellerForms/UpdateSellerForm";
import UpdateUserForm from "../forms/userForms/UpdateUserForm";
//#endregion
//#region Delete Forms
import DeleteCategoryForm from "../forms/categoryForms/DeleteCategoryForm";
import DeleteCommentForm from "../forms/commentForms/DeleteCommentForm";
import DeleteCommentReplyForm from "../forms/commentReplyForms/DeleteCommentReplyForm";
import DeleteLikeForm from "../forms/likeForms/DeleteLikeForm";
import DeleteOrderForm from "../forms/orderForms/DeleteOrderForm";
import DeleteProductForm from "../forms/productForms/DeleteProductForm";
import DeleteSellerForm from "../forms/sellerForms/DeleteSellerForm";
import DeleteUserForm from "../forms/userForms/DeleteUserForm";
//#endregion
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Table = (props) => {
	// Data
	const [apiData, setApiData] = useState(props.apiData);
	// This Is For Search
	const [originalApiData, setOriginalApiData] = useState(props.apiData);
	const [instaSearch] = useState(props.instaSearch);
	// Table Content
	// Table Headers
	const [tableHead] = useState(props.tableHead);
	const [tableHead2] = useState(props.tableHead2);
	const [tableHead3] = useState(props.tableHead3);
	const [tableHead4] = useState(props.tableHead4);
	const [buttonHeadName] = useState(props.buttonHeadName);
	// Table Data
	const [tableData] = useState(props.tableData);
	const [tableData2] = useState(props.tableData2);
	const [tableData3] = useState(props.tableData3);
	const [tableData4] = useState(props.tableData4);
	// Special
	const [isNav] = useState(props.isNav);
	const [isCart] = useState(props.isCart);
	const [isAdmin] = useState(props.isAdmin);
	// Table Buttons
	const [tableButtons] = useState(props.tableButtons);
	const [tableAddButton] = useState(props.tableAddButton);
	const [tableUpdateButton] = useState(props.tableUpdateButton);
	const [tableDeleteButton] = useState(props.tableDeleteButton);
	const [tableCustomButton] = useState(props.tableCustomButton);
	const [tableCustomButton2] = useState(props.tableCustomButton2);
	const [tableCustomButton3] = useState(props.tableCustomButton3);
	// Table Button Clicks / Functions
	const tableAddButtonClick = (newData) => {
		if (props.tableAddButtonClick) {
			props.tableAddButtonClick(newData);
		}
	};
	const tableUpdateButtonClick = (oldData, newData) => {
		if (props.tableUpdateButtonClick) {
			props.tableUpdateButtonClick(oldData, newData);
		}
	};
	const tableDeleteButtonClick = (oldData) => {
		if (props.tableDeleteButtonClick) {
			props.tableDeleteButtonClick(oldData);
		}
	};
	const tableCustomButtonClick = (data) => {
		if (props.tableCustomButtonClick) {
			props.tableCustomButtonClick(data);
		}
	};
	const tableCustomButton2Click = (data) => {
		if (props.tableCustomButtonClick) {
			props.tableCustomButton2Click(data);
		}
	};
	const tableCustomButton3Click = (data) => {
		if (props.tableCustomButtonClick) {
			props.tableCustomButton3Click(data);
		}
	};
	// Custom Button Colors
	const [tableCustomButtonColor] = useState(props.tableCustomButtonColor);
	const [tableCustomButtonColor2] = useState(props.tableCustomButtonColor2);
	const [tableCustomButtonColor3] = useState(props.tableCustomButtonColor3);
	// Nav Buttons
	const [navAddButton] = useState(props.navAddButton);
	const [navUpdateButton] = useState(props.navUpdateButton);
	const [navDeleteButton] = useState(props.navDeleteButton);
	const [navCustomButton] = useState(props.navCustomButton);
	// Nav Button Clicks
	const navAddButtonClick = (newData) => {
		if (props.navAddButtonClick) {
			props.navAddButtonClick(newData);
		}
		setAddForm(!addForm);
		setUpdateForm(false);
		setDeleteForm(false);
	};
	const navUpdateButtonClick = (oldData, newData) => {
		if (props.navUpdateButtonClick) {
			props.navUpdateButtonClick(oldData, newData);
		}
		setAddForm(false);
		setUpdateForm(!updateForm);
		setDeleteForm(false);
	};
	const navDeleteButtonClick = (oldData) => {
		if (props.navDeleteButtonClick) {
			props.navDeleteButtonClick(oldData);
		}
		setAddForm(false);
		setUpdateForm(false);
		setDeleteForm(!deleteForm);
	};
	const navCustomButtonClick = () => {
		if (props.navCustomButtonClick) {
			props.navCustomButtonClick();
		}
	};
	// Nav Custom Button Color
	const [navCustomButtonColor] = useState(props.navCustomButtonColor);
	// Nav Search
	const [searchValue, setSearchValue] = useState("");
	const searchValueUpdate = (newWord) => {
		setSearchValue(newWord);
	};
	const searchTheWord = () => {
		setApiData(
			originalApiData.filter((element) => {
				if (tableData) {
					if (element[tableData] != null) {
						return element[tableData]
							.toLowerCase()
							.includes(searchValue.toLowerCase());
					}
				} else {
					return element.toLowerCase().includes(searchValue.toLowerCase());
				}
			})
		);
	};
	// Modals
	//#region AddForm
	const navAddForm = () => {
		switch (isNav) {
			case "Category":
				return <AddCategoryForm navAddButtonClick={navAddButtonClick} />;
			case "Comment":
				return <AddCommentForm navAddButtonClick={navAddButtonClick} />;
			case "CommentReply":
				return (
					<AddCommentReplyForm navAddButtonClick={navAddButtonClick} />
				);
			case "Like":
				return <AddLikeForm navAddButtonClick={navAddButtonClick} />;
			case "Order":
				return <AddOrderForm navAddButtonClick={navAddButtonClick} />;
			case "Product":
				return <AddProductForm navAddButtonClick={navAddButtonClick} />;
			case "Seller":
				return <AddSellerForm navAddButtonClick={navAddButtonClick} />;
			case "User":
				return <AddUserForm navAddButtonClick={navAddButtonClick} />;
			default:
				break;
		}
	};
	//#endregion
	//#region UpdateForm
	const navUpdateForm = () => {
		switch (isNav) {
			case "Category":
				return (
					<UpdateCategoryForm
						navUpdateButtonClick={navUpdateButtonClick}
					/>
				);
			case "Comment":
				return (
					<UpdateCommentForm navUpdateButtonClick={navUpdateButtonClick} />
				);
			case "CommentReply":
				return (
					<UpdateCommentReplyForm
						navUpdateButtonClick={navUpdateButtonClick}
					/>
				);
			case "Like":
				return (
					<UpdateLikeForm navUpdateButtonClick={navUpdateButtonClick} />
				);
			case "Order":
				return (
					<UpdateOrderForm navUpdateButtonClick={navUpdateButtonClick} />
				);
			case "Product":
				return (
					<UpdateProductForm navUpdateButtonClick={navUpdateButtonClick} />
				);
			case "Seller":
				return (
					<UpdateSellerForm navUpdateButtonClick={navUpdateButtonClick} />
				);
			case "User":
				return (
					<UpdateUserForm navUpdateButtonClick={navUpdateButtonClick} />
				);
			default:
				break;
		}
	};
	//#endregion
	//#region DeleteForm
	const navDeleteForm = () => {
		switch (isNav) {
			case "Category":
				return (
					<DeleteCategoryForm
						navDeleteButtonClick={navDeleteButtonClick}
					/>
				);
			case "Comment":
				return (
					<DeleteCommentForm navDeleteButtonClick={navDeleteButtonClick} />
				);
			case "CommentReply":
				return (
					<DeleteCommentReplyForm
						navDeleteButtonClick={navDeleteButtonClick}
					/>
				);
			case "Like":
				return (
					<DeleteLikeForm navDeleteButtonClick={navDeleteButtonClick} />
				);
			case "Order":
				return (
					<DeleteOrderForm navDeleteButtonClick={navDeleteButtonClick} />
				);
			case "Product":
				return (
					<DeleteProductForm navDeleteButtonClick={navDeleteButtonClick} />
				);
			case "Seller":
				return (
					<DeleteSellerForm navDeleteButtonClick={navDeleteButtonClick} />
				);
			case "User":
				return (
					<DeleteUserForm navDeleteButtonClick={navDeleteButtonClick} />
				);
			default:
				break;
		}
	};
	//#endregion

	// Form Buttons
	const [addForm, setAddForm] = useState(false);
	const [updateForm, setUpdateForm] = useState(false);
	const [deleteForm, setDeleteForm] = useState(false);

	// Modal
	const [modal, setModal] = useState(false);
	const [modalData, setModalData] = useState();
	const [modalAction, setModalAction] = useState();

	const modalToggle = (data, action) => {
		setModalData(data);
		setModalAction(action);
		setModal(!modal);
	};
	const modalToggle2 = () => {
		switch (modalAction) {
			case "Add":
				tableAddButtonClick(modalData);
				break;
			case "Update":
				tableUpdateButtonClick(modalData);
				break;
			case "Delete":
				tableDeleteButtonClick(modalData);
				break;
			case "CustomButton1":
				tableCustomButtonClick(modalData);
				break;
			case "CustomButton2":
				tableCustomButton2Click(modalData);
				break;
			case "CustomButton3":
				tableCustomButton3Click(modalData);
				break;

			default:
				break;
		}
		setModal(!modal);
	};

	// UseEffect
	// Updating the Values
	useEffect(() => {
		setApiData(props.apiData);
		setOriginalApiData(props.apiData);
	}, [props.apiData]);

	// Search on write
	useEffect(() => {
		if (instaSearch) {
			searchTheWord();
		}
	}, [searchValue]);
	console.log(apiData);
	return (
		// NAV
		<div className="table-body">
			{isNav && (
				<nav className="navbar table-nav navbar-light bg-secondary">
					<div className="container-fluid">
						<div className="navbar-buttons">
							{(navAddButton || navUpdateButton || navDeleteButton) && (
								<span>Operations:</span>
							)}
							{navAddButton && navAddForm()}
							{navUpdateButton && navUpdateForm()}
							{navDeleteButton && navDeleteForm()}
							{navCustomButton && (
								<button
									className={`btn btn-${
										navCustomButtonColor
											? navCustomButtonColor
											: "light"
									}`}
									onClick={() => navCustomButtonClick()}
								>
									{navCustomButton && navCustomButton}
								</button>
							)}
						</div>
						<div className="nav-search">
							<input
								className="form-control me-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
								value={searchValue}
								onChange={(event) =>
									searchValueUpdate(event.target.value)
								}
							/>
							{!instaSearch && (
								<button
									className="btn btn-primary"
									type="submit"
									onClick={() => searchTheWord()}
								>
									Search
								</button>
							)}
						</div>
					</div>
				</nav>
			)}
			{/* TABLE */}
			<table className="table table-striped table-secondary">
				<thead>
					<tr>
						<th scope="col">{isAdmin ? "#Id" : "#"}</th>
						<th scope="col">{`${
							tableHead ? tableHead : "Table Head"
						}`}</th>
						{/* Optional Headers */}
						{tableHead2 && <th scope="col">{tableHead2}</th>}
						{tableHead3 && <th scope="col">{tableHead3}</th>}
						{tableHead4 && <th scope="col">{tableHead4}</th>}
						{/* Buttons PlaceHolder */}
						{isCart ? (
							<MiniCart />
						) : (
							tableButtons && (
								<th scope="col" className="thead-buttons text-end">
									{buttonHeadName ? buttonHeadName : "Operations"}
								</th>
							)
						)}
					</tr>
				</thead>
				<tbody>
					{apiData &&
						apiData.map((data, index) => {
							return (
								<tr key={data.id ? data.id : index}>
									<th scope="row">{isAdmin ? data.id : index + 1}</th>
									{tableData && <td>{data[tableData]}</td>}
									{tableData2 && <td>{data[tableData2]}</td>}
									{tableData3 && <td>{data[tableData3]}</td>}
									{tableData4 && <td>{data[tableData4]}</td>}
									{tableButtons && (
										<td className="table-buttons text-end">
											{tableAddButton && (
												<button
													className="btn btn-success"
													onClick={() => modalToggle(data, "Add")}
												>
													Add
												</button>
											)}
											{tableUpdateButton && (
												<button
													className="btn btn-warning"
													onClick={() =>
														modalToggle(data, "Update")
													}
												>
													Update
												</button>
											)}
											{tableDeleteButton && (
												<button
													className="btn btn-danger"
													onClick={() =>
														modalToggle(data, "Delete")
													}
												>
													Delete
												</button>
											)}
											{tableCustomButton && (
												<button
													className={`btn btn-${
														tableCustomButtonColor
															? tableCustomButtonColor
															: "secondary"
													}`}
													onClick={() =>
														modalToggle((data, "CustomButton1"))
													}
												>
													{tableCustomButton && tableCustomButton}
												</button>
											)}
											{tableCustomButton2 && (
												<button
													className={`btn btn-${
														tableCustomButtonColor2
															? tableCustomButtonColor2
															: "secondary"
													}`}
													onClick={() =>
														modalToggle((data, "CustomButton2"))
													}
												>
													{tableCustomButton2 &&
														tableCustomButton2}
												</button>
											)}
											{tableCustomButton3 && (
												<button
													className={`btn btn-${
														tableCustomButtonColor3
															? tableCustomButtonColor3
															: "secondary"
													}`}
													onClick={() =>
														modalToggle((data, "CustomButton3"))
													}
												>
													{tableCustomButton3 &&
														tableCustomButton3}
												</button>
											)}
										</td>
									)}
								</tr>
							);
						})}
				</tbody>
			</table>
			<Modal isOpen={modal} toggle={modalToggle} centered>
				<ModalHeader className="acdFormItem">Add Product</ModalHeader>
				<ModalBody className="acdForm">
					<div className="acdFormItem d-flex">
						<label htmlFor="updateForm-id" className="form-label">
							Are you sure?
						</label>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-warning form-input form-control"
						onClick={modalToggle2}
					>
						Yes
					</button>
					<button
						className="btn btn-secondary form-input form-control"
						onClick={modalToggle}
					>
						Close
					</button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default Table;
