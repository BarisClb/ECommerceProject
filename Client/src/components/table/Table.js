import React, { useEffect, useState } from "react";
import "./css/index.css";
//#region Create Forms
import CreateCategoryForm from "../forms/categoryForms/CreateCategoryForm";
import CreateCommentForm from "../forms/commentForms/CreateCommentForm";
import CreateCommentReplyForm from "../forms/commentReplyForms/CreateCommentReplyForm";
import CreateLikeForm from "../forms/likeForms/CreateLikeForm";
import CreateOrderForm from "../forms/orderForms/CreateOrderForm";
import CreateProductForm from "../forms/productForms/CreateProductForm";
import CreateSellerForm from "../forms/sellerForms/CreateSellerForm";
import CreateUserForm from "../forms/userForms/CreateUserForm";
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
import { useSelector } from "react-redux";

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
	const [isAdmin] = useState(props.isAdmin);
	// Table Buttons
	const [tableButtons] = useState(props.tableButtons);
	const [tableCreateButton] = useState(props.tableCreateButton);
	const [tableUpdateButton] = useState(props.tableUpdateButton);
	const [tableDeleteButton] = useState(props.tableDeleteButton);
	const [tableCustomButton] = useState(props.tableCustomButton);
	const [tableCustomButton2] = useState(props.tableCustomButton2);
	const [tableCustomButton3] = useState(props.tableCustomButton3);
	// Table Button Clicks / Functions
	const tableCreateButtonClick = (newData) => {
		if (props.tableCreateButtonClick) {
			props.tableCreateButtonClick(newData);
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
	const [navButtonTitle] = useState(props.navButtonTitle);
	const [navCreateButton] = useState(props.navCreateButton);
	const [navUpdateButton] = useState(props.navUpdateButton);
	const [navDeleteButton] = useState(props.navDeleteButton);
	const [navCustomButton] = useState(props.navCustomButton);
	// Nav Button Clicks
	const navCreateButtonClick = (newData) => {
		if (props.navCreateButtonClick) {
			props.navCreateButtonClick(newData);
		}
		setCreateForm(!createForm);
		setUpdateForm(false);
		setDeleteForm(false);
	};
	const navUpdateButtonClick = (oldData, newData) => {
		if (props.navUpdateButtonClick) {
			props.navUpdateButtonClick(oldData, newData);
		}
		setCreateForm(false);
		setUpdateForm(!updateForm);
		setDeleteForm(false);
	};
	const navDeleteButtonClick = (oldData) => {
		if (props.navDeleteButtonClick) {
			props.navDeleteButtonClick(oldData);
		}
		setCreateForm(false);
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
	const [navSearch] = useState(props.navSearch);
	const [searchValue, setSearchValue] = useState("");
	const searchValueUpdate = (newWord) => {
		setSearchValue(newWord);
	};
	const searchTheWord = () => {
		setApiData(
			originalApiData.filter((element) => {
				if (tableData && element[tableData]) {
					return element[tableData].toLowerCase().includes(searchValue.toLowerCase());
				} else {
					return element.toLowerCase().includes(searchValue.toLowerCase());
				}
			})
		);
	};
	// Modals
	//#region CreateForm
	const navCreateForm = () => {
		switch (isNav) {
			case "Category":
				return <CreateCategoryForm navCreateButtonClick={navCreateButtonClick} />;
			case "Comment":
				return <CreateCommentForm navCreateButtonClick={navCreateButtonClick} />;
			case "CommentReply":
				return <CreateCommentReplyForm navCreateButtonClick={navCreateButtonClick} />;
			case "Like":
				return <CreateLikeForm navCreateButtonClick={navCreateButtonClick} />;
			case "Order":
				return <CreateOrderForm navCreateButtonClick={navCreateButtonClick} />;
			case "Product":
				return <CreateProductForm navCreateButtonClick={navCreateButtonClick} />;
			case "Seller":
				return <CreateSellerForm navCreateButtonClick={navCreateButtonClick} />;
			case "User":
				return <CreateUserForm navCreateButtonClick={navCreateButtonClick} />;
			default:
				break;
		}
	};
	//#endregion
	//#region UpdateForm
	const navUpdateForm = () => {
		switch (isNav) {
			case "Category":
				return <UpdateCategoryForm navUpdateButtonClick={navUpdateButtonClick} />;
			case "Comment":
				return <UpdateCommentForm navUpdateButtonClick={navUpdateButtonClick} />;
			case "CommentReply":
				return <UpdateCommentReplyForm navUpdateButtonClick={navUpdateButtonClick} />;
			case "Like":
				return <UpdateLikeForm navUpdateButtonClick={navUpdateButtonClick} />;
			case "Order":
				return <UpdateOrderForm navUpdateButtonClick={navUpdateButtonClick} />;
			case "Product":
				return <UpdateProductForm navUpdateButtonClick={navUpdateButtonClick} />;
			case "Seller":
				return <UpdateSellerForm navUpdateButtonClick={navUpdateButtonClick} />;
			case "User":
				return <UpdateUserForm navUpdateButtonClick={navUpdateButtonClick} />;
			default:
				break;
		}
	};
	//#endregion
	//#region DeleteForm
	const navDeleteForm = () => {
		switch (isNav) {
			case "Category":
				return <DeleteCategoryForm navDeleteButtonClick={navDeleteButtonClick} />;
			case "Comment":
				return <DeleteCommentForm navDeleteButtonClick={navDeleteButtonClick} />;
			case "CommentReply":
				return <DeleteCommentReplyForm navDeleteButtonClick={navDeleteButtonClick} />;
			case "Like":
				return <DeleteLikeForm navDeleteButtonClick={navDeleteButtonClick} />;
			case "Order":
				return <DeleteOrderForm navDeleteButtonClick={navDeleteButtonClick} />;
			case "Product":
				return <DeleteProductForm navDeleteButtonClick={navDeleteButtonClick} />;
			case "Seller":
				return <DeleteSellerForm navDeleteButtonClick={navDeleteButtonClick} />;
			case "User":
				return <DeleteUserForm navDeleteButtonClick={navDeleteButtonClick} />;
			default:
				break;
		}
	};
	//#endregion

	// Form Buttons
	const [createForm, setCreateForm] = useState(false);
	const [updateForm, setUpdateForm] = useState(false);
	const [deleteForm, setDeleteForm] = useState(false);

	// Modal
	const [modal, setModal] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [modalAction, setModalAction] = useState("");

	//#region ModalToggle
	const modalToggle = (data, action) => {
		setModalData(data);
		setModalAction(action);
		setModal(!modal);
	};
	const modalToggle2 = () => {
		switch (modalAction) {
			case "Create":
				tableCreateButtonClick(modalData);
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
	//#endregion

	//#region TableDataSort

	const sortInfo = useSelector((state) => state.common.SortInfo);
	// SortBy
	const [tableSortBy] = useState(props.tableSortBy);
	const [tableSortBy1] = useState(props.tableSortBy1 ? props.tableSortBy1 : "Id");
	const [tableSortBy2] = useState(props.tableSortBy2);
	const [tableSortBy3] = useState(props.tableSortBy3);
	const [tableSortBy4] = useState(props.tableSortBy4);
	const [tableSortBy5] = useState(props.tableSortBy5);
	const [tableSortByValue1] = useState(
		props.tableSortByValue1
			? props.tableSortByValue1
			: props.tableSortBy1
			? props.tableSortBy1
			: "Id"
	);
	const [tableSortByValue2] = useState(
		props.tableSortByValue2 ? props.tableSortByValue2 : props.tableSortBy2 && props.tableSortBy2
	);
	const [tableSortByValue3] = useState(
		props.tableSortByValue3 ? props.tableSortByValue3 : props.tableSortBy3 && props.tableSortBy3
	);
	const [tableSortByValue4] = useState(
		props.tableSortByValue4 ? props.tableSortByValue4 : props.tableSortBy4 && props.tableSortBy4
	);
	const [tableSortByValue5] = useState(
		props.tableSortByValue5 ? props.tableSortByValue5 : props.tableSortBy5 && props.tableSortBy5
	);

	// Sort Values
	const [tableSortReversed, setTableSortReversed] = useState(false);
	const [tableSortWord, setTableSortWord] = useState("");
	const [tableSortPageNumber, setTableSortPageNumber] = useState(1);
	const [tableSortPageSize, setTableSortPageSize] = useState(20);
	const [tableSortOrderBy, setTableSortOrderBy] = useState("Id");

	// Sort Actions
	const sortTable = (changedData) => {
		if (props.tableSortAction) {
			let sortData = {
				reversed: tableSortReversed,
				searchWord: tableSortWord,
				pageNumber: tableSortPageNumber,
				pageSize: tableSortPageSize,
				orderBy: tableSortOrderBy,
			};
			if (changedData) {
				sortData = { ...sortData, ...changedData };
			}
			props.tableSortAction(sortData);
		}
	};
	const tableSortButtonClick = () => {
		if (props.tableSortAction) {
			sortTable();
		}
	};
	// For QuickSorting (PageNumber and PageSize)
	const tableQuickSort = (data) => {
		sortTable(data);
	};
	// Pagination Buttons Mapping
	const [pageButtons, setPageButtons] = useState([]);

	const pageButtonMapping = (totalCount = 1, pageSize = 1) => {
		// Show at least 1 page. For example; if there is no entity, don't let it show 0 / 1 = 0 pages.
		if (totalCount === 0 || pageSize === 0) {
			return setPageButtons(() => [1]);
		}
		let pageNumber = Math.ceil(totalCount / pageSize);
		let newPageButtons = [];

		// If its less than 11 pages, print all of them
		if (pageNumber < 11) {
			for (let i = 1; i <= pageNumber; i++) {
				newPageButtons.push(i);
			}
		}
		// Else, apply logic
		else {
			for (let i = 1; i <= pageNumber; i++) {
				if (i < 4 || i > pageNumber - 3) {
					newPageButtons.push(i);
				} else if (sortInfo && i === sortInfo.pageNumber) {
					newPageButtons.push(i);
				} else if (newPageButtons[newPageButtons.length - 1] !== "...") {
					newPageButtons.push("...");
				}
			}
		}
		setPageButtons(() => [...newPageButtons]);
	};

	const [sortCustomPageButton, setSortCustomPageButton] = useState(1);

	//#endregion

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

	// Sort
	useEffect(() => {
		if (sortInfo) {
			pageButtonMapping(sortInfo.totalCount, sortInfo.pageSize);
		} else {
			pageButtonMapping();
		}
	}, []);

	useEffect(() => {
		setTableSortReversed(props.sortInfo.reversed);
		setTableSortWord(props.sortInfo.searchWord);
		setTableSortPageNumber(props.sortInfo.pageNumber);
		setTableSortPageSize(props.sortInfo.pageSize);
		setTableSortOrderBy(props.sortInfo.orderBy);
	}, [props.sortInfo]);

	useEffect(() => {
		if (sortInfo) {
			pageButtonMapping(sortInfo.totalCount, sortInfo.pageSize);
		} else {
			pageButtonMapping();
		}
	}, [sortInfo]);

	return (
		// NAV
		<div className="table-body">
			{isNav && (
				<nav className="navbar table-nav navbar-light bg-secondary">
					<div className="container-fluid">
						{/* TABLE FORM */}
						<div className="navbar-buttons">
							{navButtonTitle && <span>{navButtonTitle}:</span>}
							{navCreateButton && navCreateForm()}
							{navUpdateButton && navUpdateForm()}
							{navDeleteButton && navDeleteForm()}
							{navCustomButton && (
								<button
									className={`btn btn-${
										navCustomButtonColor ? navCustomButtonColor : "light"
									}`}
									onClick={() => navCustomButtonClick()}
								>
									{navCustomButton && navCustomButton}
								</button>
							)}
						</div>
						{/* TABLE SORT */}
						{tableSortBy && (
							<div className={`table-navbar-sort-by`}>
								<div
									className={`table-navbar-sort-by-left ${
										navSearch !== true && "table-navbar-sort-by-left-flex"
									}`}
								>
									<div className="table-navbar-sort-by-left-top">
										<label htmlFor="table-sort-by-value">Sort By :</label>
										<select
											name="table-sort-by-value"
											id="table-sort-by-value"
											className="form-select"
											value={tableSortOrderBy !== null ? tableSortOrderBy : tableSortBy1}
											onChange={(e) => setTableSortOrderBy(e.target.value)}
										>
											{tableSortBy1 && (
												<option value={tableSortByValue1}>{tableSortBy1}</option>
											)}
											{tableSortBy2 && (
												<option value={tableSortByValue2}>{tableSortBy2}</option>
											)}
											{tableSortBy3 && (
												<option value={tableSortByValue3}>{tableSortBy3}</option>
											)}
											{tableSortBy4 && (
												<option value={tableSortByValue4}>{tableSortBy4}</option>
											)}
											{tableSortBy5 && (
												<option value={tableSortByValue5}>{tableSortBy5}</option>
											)}
										</select>
									</div>
									<div className="table-navbar-sort-by-left-bottom">
										<label htmlFor="table-sort-by-reversed">Reversed :</label>
										<select
											name="table-sort-by-reversed"
											id="table-sort-by-reversed"
											className="form-select"
											value={tableSortReversed}
											onChange={(e) => setTableSortReversed(e.target.value)}
										>
											<option value={false}>False</option>
											<option value={true}>True</option>
										</select>
									</div>
								</div>
								<div className="table-navbar-sort-by-right">
									<div className="nav-search">
										<input
											className="form-control"
											type="search"
											placeholder="Search Word"
											aria-label="Search"
											value={tableSortWord}
											onChange={(event) => setTableSortWord(event.target.value)}
										/>
										<button
											className="btn btn-primary"
											type="submit"
											onClick={() => tableSortButtonClick()}
										>
											Sort
										</button>
									</div>
								</div>
							</div>
						)}
						{/* TABLE SEARCH */}
						{navSearch && (
							<div className="nav-search">
								<input
									className="form-control me-2"
									type="search"
									placeholder="Search"
									aria-label="Search"
									value={searchValue}
									onChange={(event) => searchValueUpdate(event.target.value)}
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
						)}
					</div>
				</nav>
			)}
			{/* TABLE */}
			<table id="table-data" className="table table-striped table-secondary">
				<thead>
					<tr>
						<th scope="col">{isAdmin ? "#Id" : "#"}</th>
						<th scope="col">{`${tableHead ? tableHead : "Table Head"}`}</th>
						{/* Optional Headers */}
						{tableHead2 && <th scope="col">{tableHead2}</th>}
						{tableHead3 && <th scope="col">{tableHead3}</th>}
						{tableHead4 && <th scope="col">{tableHead4}</th>}
						{/* Buttons PlaceHolder */}
						{tableButtons && (
							<th scope="col" className="thead-buttons text-end">
								{buttonHeadName ? buttonHeadName : "Operations"}
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{apiData &&
						apiData.map((data, index) => (
							<tr key={data.id ? data.id : index}>
								<th scope="row">{isAdmin ? data.id : index + 1}</th>
								{/* Used Template Literals to turn Booleans into String, they are not visible otherwise */}
								{tableData && (
									<td>
										{`${data[tableData]}`.length > 50
											? `${data[tableData]}`.substring(0, 47) + "..."
											: `${data[tableData]}`}
									</td>
								)}
								{tableData2 && (
									<td>
										{`${data[tableData2]}`.length > 50
											? `${data[tableData2]}`.substring(0, 47) + "..."
											: `${data[tableData2]}`}
									</td>
								)}
								{tableData3 && (
									<td>
										{`${data[tableData3]}`.length > 50
											? `${data[tableData3]}`.substring(0, 47) + "..."
											: `${data[tableData3]}`}
									</td>
								)}
								{tableData4 && (
									<td>
										{`${data[tableData4]}`.length > 50
											? `${data[tableData4]}`.substring(0, 47) + "..."
											: `${data[tableData4]}`}
									</td>
								)}
								{tableButtons && (
									<td className="table-buttons text-end">
										{tableCreateButton && (
											<button
												className="btn btn-success"
												onClick={() => modalToggle(data, "Create")}
											>
												Create
											</button>
										)}
										{tableUpdateButton && (
											<button
												className="btn btn-warning"
												onClick={() => modalToggle(data, "Update")}
											>
												Update
											</button>
										)}
										{tableDeleteButton && (
											<button
												className="btn btn-danger"
												onClick={() => modalToggle(data, "Delete")}
											>
												Delete
											</button>
										)}
										{tableCustomButton && (
											<button
												className={`btn btn-${
													tableCustomButtonColor ? tableCustomButtonColor : "secondary"
												}`}
												onClick={() => modalToggle(data, "CustomButton1")}
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
												onClick={() => modalToggle(data, "CustomButton2")}
											>
												{tableCustomButton2 && tableCustomButton2}
											</button>
										)}
										{tableCustomButton3 && (
											<button
												className={`btn btn-${
													tableCustomButtonColor3
														? tableCustomButtonColor3
														: "secondary"
												}`}
												onClick={() => modalToggle(data, "CustomButton3")}
											>
												{tableCustomButton3 && tableCustomButton3}
											</button>
										)}
									</td>
								)}
							</tr>
						))}
				</tbody>
			</table>
			{/* TABLE PAGINATION */}
			<nav
				id="table-nav-pagination"
				className="navbar table-nav navbar-light bg-secondary"
				aria-label="Page navigation example"
			>
				<div id="table-nav-pagination-select-currentPage">
					<p>Current Page: {sortInfo && sortInfo.pageNumber ? sortInfo.pageNumber : 1}</p>
				</div>
				<ul className="pagination pagination-list">
					{/* PREVIOUS BUTTON */}
					<li
						key={"previous"}
						className={`page-item ${
							(sortInfo && sortInfo.pageNumber
								? sortInfo.pageNumber === 1
								: tableSortPageNumber === 1) && "disabled"
						}`}
					>
						<button
							className={`page-link ${
								(
									sortInfo && sortInfo.pageNumber
										? sortInfo.pageNumber === 1
										: tableSortPageNumber === 1
								)
									? "bg-secondary text-light"
									: "bg-light text-secondary"
							}`}
							onClick={() =>
								tableQuickSort({
									pageNumber: sortInfo && sortInfo.pageNumber && sortInfo.pageNumber - 1,
								})
							}
						>
							Previous
						</button>
					</li>
					{/* MAPPING BUTTONS ACCORDING TO DATA */}
					{sortInfo && sortInfo.pageNumber ? (
						pageButtons.map((pageNumber, index) => {
							// ADDING A SPECIAL BUTTON IF THERE ARE MORE THAN 10 PAGES
							if (pageNumber === "...") {
								return (
									<li
										key={`...${index}`}
										id="table-pagination-custom-page-list-item"
										className="page-item"
									>
										<a
											href="/"
											className="d-flex align-items-center text-decoration-none dropdown-toggle page-link bg-light text-secondary"
											id="table-pagination-custom-page-button"
											data-bs-toggle="dropdown"
										>
											<div className="info">
												<div className="d-block">...</div>
											</div>
										</a>
										<ul
											className="dropdown-menu dropdown-menu-dark text-small shadow"
											aria-labelledby="table-pagination-custom-page-button"
										>
											<li id="table-pagination-custom-page-button">
												<label
													htmlFor="table-pagination-custom-page-button-input"
													className="form-label"
												>
													Page
												</label>
												<input
													type="number"
													className="form-control"
													id="table-pagination-custom-page-button-input"
													placeholder="Page"
													value={sortCustomPageButton}
													onChange={(event) =>
														setSortCustomPageButton(event.target.value)
													}
													min="1"
													max={pageButtons[pageButtons.length - 1]}
												/>
												<button
													className="btn btn-secondary"
													onClick={() =>
														tableQuickSort({ pageNumber: sortCustomPageButton })
													}
												>
													Go to Page
												</button>
											</li>
										</ul>
									</li>
								);
							} else {
								return (
									<li
										key={pageNumber}
										className={`page-item ${
											(sortInfo.pageNumber
												? sortInfo.pageNumber === pageNumber
												: tableSortPageNumber === pageNumber) && "bg-secondary"
										}`}
									>
										<button
											className={`page-link ${
												sortInfo.pageNumber === pageNumber
													? "bg-secondary text-light"
													: "bg-light text-secondary"
											}`}
											onClick={() => tableQuickSort({ pageNumber: pageNumber })}
										>
											{pageNumber}
										</button>
									</li>
								);
							}
						})
					) : (
						<li key={1} className="page-item disabled">
							<button className="page-link bg-secondary text-light">1</button>
						</li>
					)}
					{/* NEXT BUTTON */}
					<li
						key={"next"}
						className={`page-item ${
							(sortInfo && sortInfo.pageNumber
								? sortInfo.pageNumber === pageButtons[pageButtons.length - 1]
								: tableSortPageNumber === 1) && "disabled"
						}`}
					>
						<button
							className={`page-link ${
								(
									sortInfo && sortInfo.pageNumber
										? sortInfo.pageNumber === pageButtons[pageButtons.length - 1]
										: tableSortPageNumber === pageButtons[pageButtons.length - 1]
								)
									? "bg-secondary text-light"
									: "bg-light text-secondary"
							}`}
							onClick={() =>
								tableQuickSort({
									pageNumber: sortInfo && sortInfo.pageNumber && sortInfo.pageNumber + 1,
								})
							}
						>
							Next
						</button>
					</li>
				</ul>
				<select
					id="table-nav-pagination-select-pageSize"
					className="form-select"
					onChange={(e) => tableQuickSort({ pageSize: parseInt(e.target.value) })}
					value={sortInfo ? sortInfo.pageSize : 20}
				>
					<option disabled>Page Size</option>
					<option value={3}>3</option>
					<option value={10}>10</option>
					<option value={15}>15</option>
					<option value={20}>20</option>
					<option value={25}>25</option>
				</select>
			</nav>
			{/* TABLE DELETE BUTTON MODAL */}
			<Modal isOpen={modal} toggle={modalToggle} centered>
				{modalAction === "Delete" && (
					<ModalHeader className="modal-form-item">
						About to Delete {isNav && isNav}
					</ModalHeader>
				)}
				<ModalBody className="modal-form">
					<div className="modal-form-item d-flex">
						<label htmlFor="modal-form-confirmation" className="form-label">
							Are you sure?
						</label>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className={`btn btn-${
							modalAction === "Delete" ? "danger" : "primary"
						} form-input form-control`}
						onClick={modalToggle2}
					>
						Yes
					</button>
					<button className="btn btn-secondary form-input form-control" onClick={modalToggle}>
						Close
					</button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default Table;
