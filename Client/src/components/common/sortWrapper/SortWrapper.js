import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./css/index.css";

function SortWrapper(props) {
	// DarkMode
	const darkMode = useSelector((state) => state.common.DarkMode);

	// Data
	const sortInfo = useSelector((state) => state.common.SortInfo);

	// SortBy
	const [sortBy1] = useState(props.sortBy1 ? props.sortBy1 : "Date");
	const [sortBy2] = useState(props.sortBy2);
	const [sortBy3] = useState(props.sortBy3);
	const [sortBy4] = useState(props.sortBy4);
	const [sortBy5] = useState(props.sortBy5);
	const [sortByValue1] = useState(
		props.sortByValue1 ? props.sortByValue1 : props.sortBy1 ? props.sortBy1 : "Date"
	);
	const [sortByValue2] = useState(
		props.sortByValue2 ? props.sortByValue2 : props.sortBy2 && props.sortBy2
	);
	const [sortByValue3] = useState(
		props.sortByValue3 ? props.sortByValue3 : props.sortBy3 && props.sortBy3
	);
	const [sortByValue4] = useState(
		props.sortByValue4 ? props.sortByValue4 : props.sortBy4 && props.sortBy4
	);
	const [sortByValue5] = useState(
		props.sortByValue5 ? props.sortByValue5 : props.sortBy5 && props.sortBy5
	);

	// Sort Values
	const [sortReversed, setTableSortReversed] = useState(false);
	const [sortWord, setTableSortWord] = useState("");
	const [sortPageNumber, setTableSortPageNumber] = useState(1);
	const [sortPageSize, setTableSortPageSize] = useState(20);
	const [sortOrderBy, setTableSortOrderBy] = useState("Id");

	// Sort Actions

	const sortTable = (changedData) => {
		if (props.sortAction) {
			let sortData = {
				reversed: sortReversed,
				searchWord: sortWord,
				pageNumber: sortPageNumber,
				pageSize: sortPageSize,
				orderBy: sortOrderBy,
			};
			if (changedData) {
				sortData = { ...sortData, ...changedData };
			}
			props.sortAction(sortData);
		}
	};
	const sortButtonClick = () => {
		if (props.sortAction) {
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

	// Pagination Custom Page Button
	const [sortCustomPageButton, setSortCustomPageButton] = useState(1);
	const [customPageButtonValues] = useState(
		props.customPageButtonValues ? props.customPageButtonValues : [5, 10, 15, 20, 25]
	);

	// useEffect
	useEffect(() => {
		if (sortInfo) {
			pageButtonMapping(sortInfo.totalCount, sortInfo.pageSize);
		} else {
			pageButtonMapping();
		}
	}, []);

	useEffect(() => {
		if (props.sortInfo) {
			setTableSortReversed(props.sortInfo.reversed);
			setTableSortWord(props.sortInfo.searchWord);
			setTableSortPageNumber(props.sortInfo.pageNumber);
			setTableSortPageSize(props.sortInfo.pageSize);
			setTableSortOrderBy(props.sortInfo.orderBy);
		}
	}, [props.sortInfo]);

	useEffect(() => {
		if (sortInfo) {
			pageButtonMapping(sortInfo.totalCount, sortInfo.pageSize);
		} else {
			pageButtonMapping();
		}
	}, [sortInfo]);

	return (
		<div
			id="sortwrapper-wrapper"
			className={`container ${darkMode ? "sortwrapper-wrapper-darkMode" : ""}`}
		>
			{/* SORTWRAPPER TOP SORT NAV */}
			<div className={`sortWrapper-sortNav-sort-by`}>
				<div className={`sortWrapper-sortNav-sort-by-left`}>
					<div className="sortWrapper-sortNav-sort-by-left-top">
						<label htmlFor="sortWrapper-sort-by-value">Sort By :</label>
						<select
							name="sortWrapper-sort-by-value"
							id="sortWrapper-sort-by-value"
							className="form-select"
							value={sortOrderBy !== null ? sortOrderBy : sortBy1}
							onChange={(e) => setTableSortOrderBy(e.target.value)}
						>
							{sortBy1 && <option value={sortByValue1}>{sortBy1}</option>}
							{sortBy2 && <option value={sortByValue2}>{sortBy2}</option>}
							{sortBy3 && <option value={sortByValue3}>{sortBy3}</option>}
							{sortBy4 && <option value={sortByValue4}>{sortBy4}</option>}
							{sortBy5 && <option value={sortByValue5}>{sortBy5}</option>}
						</select>
					</div>
					<div className="sortWrapper-sortNav-sort-by-left-bottom">
						<label htmlFor="sortWrapper-sort-by-reversed">Reversed :</label>
						<select
							name="sortWrapper-sort-by-reversed"
							id="sortWrapper-sort-by-reversed"
							className="form-select"
							value={sortReversed}
							onChange={(e) => setTableSortReversed(e.target.value)}
						>
							<option value={false}>False</option>
							<option value={true}>True</option>
						</select>
					</div>
				</div>
				<div className="sortWrapper-sortNav-sort-by-right">
					<div className="nav-search">
						<input
							className="form-control"
							type="search"
							placeholder="Search Word"
							aria-label="Search"
							value={sortWord}
							onChange={(event) => setTableSortWord(event.target.value)}
						/>
						<button
							className="btn btn-primary"
							type="submit"
							onClick={() => sortButtonClick()}
						>
							Sort
						</button>
					</div>
				</div>
			</div>
			{/* SORTWRAPPER CHILDREN */}
			<div>{props.children && props.children}</div>
			{/* SORTWRAPPER PAGINATION */}
			<nav
				id="sortWrapper-nav-pagination"
				className={`navbar sortWrapper-pagination-nav navbar-light ${
					darkMode ? "bg-secondary" : "navbar-light"
				}`}
				aria-label="Page navigation example"
			>
				<div id="sortWrapper-nav-pagination-select-currentPage">
					<p>Current Page: {sortInfo && sortInfo.pageNumber ? sortInfo.pageNumber : 1}</p>
				</div>
				<ul className="pagination pagination-list">
					{/* PREVIOUS BUTTON */}
					<li
						key={"previous"}
						className={`page-item ${
							(sortInfo && sortInfo.pageNumber
								? sortInfo.pageNumber === 1
								: sortPageNumber === 1) && "disabled"
						}`}
					>
						<button
							className={`page-link ${
								(
									sortInfo && sortInfo.pageNumber
										? sortInfo.pageNumber === 1
										: sortPageNumber === 1
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
										id="sortWrapper-pagination-custom-page-list-item"
										className="page-item"
									>
										<a
											href="/"
											className="d-flex align-items-center text-decoration-none dropdown-toggle page-link bg-light text-secondary"
											id="sortWrapper-pagination-custom-page-button"
											data-bs-toggle="dropdown"
										>
											<div className="info">
												<div className="d-block">...</div>
											</div>
										</a>
										<ul
											className="dropdown-menu dropdown-menu-dark text-small shadow"
											aria-labelledby="sortWrapper-pagination-custom-page-button"
										>
											<li id="sortWrapper-pagination-custom-page-button">
												<label
													htmlFor="sortWrapper-pagination-custom-page-button-input"
													className="form-label"
												>
													Page
												</label>
												<input
													type="number"
													className="form-control"
													id="sortWrapper-pagination-custom-page-button-input"
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
												: sortPageNumber === pageNumber) && "bg-secondary"
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
								: sortPageNumber === 1) && "disabled"
						}`}
					>
						<button
							className={`page-link ${
								(
									sortInfo && sortInfo.pageNumber
										? sortInfo.pageNumber === pageButtons[pageButtons.length - 1]
										: sortPageNumber === pageButtons[pageButtons.length - 1]
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
					id="sortWrapper-nav-pagination-select-pageSize"
					className="form-select"
					onChange={(e) => tableQuickSort({ pageSize: parseInt(e.target.value) })}
					value={sortInfo ? sortInfo.pageSize : 24}
				>
					<option disabled>Page Size</option>
					{customPageButtonValues?.map((buttonValue) => (
						<option value={buttonValue} key={buttonValue}>
							{buttonValue}
						</option>
					))}
				</select>
			</nav>
		</div>
	);
}

export default SortWrapper;
