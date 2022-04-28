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

	const navCreateCategoryClick = async (newCategory) => {
		dispatch(
			categoryActions.createCategory(
				newCategory,
				categoryActions.getCategories()
			)
		);
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
		dispatch(
			categoryActions.deleteCategory(
				oldCategory,
				categoryActions.getCategories()
			)
		);
	};

	const tableDeleteButtonClick = (oldCategory) => {
		dispatch(
			categoryActions.deleteCategory(
				oldCategory.id,
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
					isCategories={true}
					instaSearch={false}
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
				/>
			</div>
		</div>
	);
};

export default AdminCategories;
