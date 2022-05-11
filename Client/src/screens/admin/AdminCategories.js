import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../store/actions/categoryActions";
import { useSelector } from "react-redux";

const AdminCategories = () => {
	const dispatch = useDispatch();

	// Table Data
	const categories = useSelector((state) => state.category.categories);
	useEffect(() => {
		dispatch(categoryActions.getSortedCategories(listSorting));
	}, []);

	// Nav Form Actions
	const navCreateCategoryClick = (newCategory) => {
		dispatch(
			categoryActions.createCategory(newCategory, categoryActions.getSortedCategories(sortInfo))
		);
	};
	const navUpdateCategoryClick = (categoryId, updatedCategory) => {
		dispatch(
			categoryActions.updateCategory(
				categoryId,
				updatedCategory,
				categoryActions.getSortedCategories(sortInfo)
			)
		);
	};
	const navDeleteCategoryClick = (oldCategory) => {
		dispatch(
			categoryActions.deleteCategory(oldCategory, categoryActions.getSortedCategories(sortInfo))
		);
	};

	// Table Side Button Actions
	const tableDeleteButtonClick = (oldCategory) => {
		dispatch(
			categoryActions.deleteCategory(
				oldCategory.id,
				categoryActions.getSortedCategories(sortInfo)
			)
		);
	};

	// Table Sort Button Action
	const tableSortButtonClick = (listSortingValues) => {
		listSorting = { ...listSorting, ...listSortingValues };
		dispatch(categoryActions.getSortedCategories(listSorting));
	};
	// Default Sort Values
	let listSorting = {
		reversed: false,
		searchWord: "",
		pageNumber: 1,
		pageSize: 20,
		orderBy: "Id",
	};
	// Sort Data from API
	const sortInfo = useSelector((state) => state.common.SortInfo);

	return (
		<div id="admin-category-screen-wrapper">
			<Header title={"Categories"} />
			<div id="admin-category-table-wrapper" className="container-fluid">
				<Table
					// The Data
					apiData={categories}
					//// Table Content
					// Table Headings
					tableHead={"Category"}
					tableHead2={"Description"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"name"}
					tableData2={"description"}
					// Special
					isAdmin={true}
					// Table Buttons
					tableButtons={true}
					tableAddButton={false}
					tableUpdateButton={false}
					tableDeleteButton={true}
					// Table Button Clicks
					tableDeleteButtonClick={tableDeleteButtonClick}
					// Nav
					isNav={"Category"}
					navCreateButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navCreateButtonClick={navCreateCategoryClick}
					navUpdateButtonClick={navUpdateCategoryClick}
					navDeleteButtonClick={navDeleteCategoryClick}
					// Nav Search
					navSearch={false}
					instaSearch={false}
					// Nav SortBy
					sortInfo={sortInfo}
					tableSortBy={true}
					tableSortBy1={"Id"}
					tableSortBy2={"Name"}
					tableSortAction={tableSortButtonClick}
				/>
			</div>
		</div>
	);
};

export default AdminCategories;
