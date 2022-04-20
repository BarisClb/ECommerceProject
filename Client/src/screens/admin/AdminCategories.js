import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../store/actions/categoryActions";
import { useSelector } from "react-redux";

const AdminCategories = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(categoryActions.getCategories());
	}, []);

	const categories = useSelector((state) => state.category.categories);

	const navAddCategoryComp = async (newCategory) => {
		dispatch(
			categoryActions.addCategory(
				newCategory,
				categoryActions.getCategories()
			)
		);
	};
	const navUpdateCategoryComp = (oldCategory, newCategory) => {
		dispatch(
			categoryActions.updateCategory(
				oldCategory,
				newCategory,
				categoryActions.getCategories()
			)
		);
	};
	const navDeleteCategoryComp = (oldCategory) => {
		dispatch(
			categoryActions.deleteCategory(
				oldCategory,
				categoryActions.getCategories()
			)
		);
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
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"name"}
					tableData2={"description"}
					// Special
					isCategories={true}
					instaSearch={false}
					// Table Buttons
					tableButtons={true}
					tableAddButton={true}
					tableDeleteButton={true}
					tableUpdateButton={true}
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

export default AdminCategories;
