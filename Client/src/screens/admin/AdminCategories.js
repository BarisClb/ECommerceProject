import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../store/actions/categoryActions";
import { useSelector } from "react-redux";

const AdminCategories = () => {
	const dispatch = useDispatch();

	const categories = useSelector((state) => state.category.categories);

	// Nav Button Actions
	const navCreateCategoryClick = async (newCategory) => {
		dispatch(categoryActions.createCategory(newCategory, categoryActions.getCategories()));
	};
	const navUpdateCategoryClick = (categoryId, updatedCategory) => {
		dispatch(
			categoryActions.updateCategory(
				categoryId,
				updatedCategory,
				categoryActions.getCategories()
			)
		);
	};
	const navDeleteCategoryClick = (oldCategory) => {
		dispatch(categoryActions.deleteCategory(oldCategory, categoryActions.getCategories()));
	};
	// Table Button Actions
	const tableDeleteButtonClick = (oldCategory) => {
		dispatch(categoryActions.deleteCategory(oldCategory.id, categoryActions.getCategories()));
	};
	// Nav Sort Action
	const tableSortButtonClick = (listSortingValues) => {
		listSorting = { ...listSortingValues };
		dispatch(categoryActions.getSortedCategories(listSorting));
	};
	// Sort Default / Start values
	const [pageSize] = useState(20);
	let listSorting = {
		reversed: false,
		searchWord: "",
		pageNumber: 1,
		pageSize: pageSize,
		orderBy: "Id",
	};

	const sortInfo = useSelector((state) => state.common.SortInfo);

	useEffect(() => {
		dispatch(categoryActions.getSortedCategories(listSorting));
	}, []);

	console.log(window.location.href.toLowerCase().includes("Admin".toLowerCase()));

	return (
		<div className="">
			<Header title={"Categories"} />
			<div className="container-fluid">
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
					tableSortBy={true}
					tableSortBy1={"Id"}
					tableSortBy2={"Name"}
					tableSortPageSize={pageSize}
					tableSortAction={tableSortButtonClick}
					sortInfo={sortInfo}
				/>
			</div>
		</div>
	);
};

export default AdminCategories;
