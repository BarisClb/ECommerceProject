import React, { useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import { useDispatch } from "react-redux";
import { categoryActions } from "../store/actions/categoryActions";
import { useSelector } from "react-redux";

const Categories = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(categoryActions.getCategories());
	}, []);

	const categories = useSelector((state) => state.category.categories);

	const navAddCategoryComp = async (newCategory) => {
		dispatch(categoryActions.addCategory(newCategory));
		// dispatch(categoryActions.getCategories());
	};
	const navUpdateCategoryComp = (oldCategory, newCategory) => {
		dispatch(categoryActions.updateCategory(oldCategory, newCategory));
		// dispatch(categoryActions.getCategories());
	};
	const navDeleteCategoryComp = (oldCategory) => {
		dispatch(categoryActions.deleteCategory(oldCategory));
		// dispatch(categoryActions.getCategories());
	};

	return (
		<div className="">
			<Header title={"Categories"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={categories}
					// Table Content
					// Table Headings
					tableHead={"Category"}
					tableHead2={"Description"}
					// Table Datas
					tableData={"name"}
					tableData2={"description"}
					// Special
					isCategories={true}
					instaSearch={false}
					// Table Buttons
					tableButtons={false}
					tableAddButton={false}
					tableDeleteButton={false}
					tableUpdateButton={false}
					// Table Button Clicks
					// Nav
					isNav={"Category"}
					navAddButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navAddButtonClick={navAddCategoryComp}
					navUpdateButtonClick={navUpdateCategoryComp}
					navDeleteButtonClick={navDeleteCategoryComp}
				/>
			</div>
		</div>
	);
};

export default Categories;
