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
		// Adding pageSize as a default value here
		// This one is a conditional one, we can also make it outside of a condition
		if (sortInfo.pageSize === undefined) {
			sortInfo = { ...sortInfo, pageSize: 20 };
		}
		dispatch(categoryActions.getSortedCategories(sortInfo));
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
		sortInfo = { ...sortInfo, ...listSortingValues };
		dispatch(categoryActions.getSortedCategories(sortInfo));
	};

	// Sort Data from API
	let sortInfo = useSelector((state) => state.common.SortInfo);

	// Used this as a starting, default value, before getting the SortInfo from the API but it causes the SortInfo to revert back to this after every reload(and also the action, to refresh data.) So, I put an alternative above(useEffect).

	//// Default Sort Values
	// let listSorting = {
	// 	reversed: false,
	// 	searchWord: "",
	// 	pageNumber: 1,
	// 	pageSize: 20,
	// 	orderBy: "Id",
	// };

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
