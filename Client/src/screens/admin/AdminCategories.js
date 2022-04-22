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
	const navUpdateCategoryComp = (categoryId, updatedCategory) => {
		dispatch(
			categoryActions.updateCategory(
				categoryId,
				updatedCategory,
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

	const tableDeleteButtonComp = (oldCategory) => {
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
					// Table Content
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
					tableDeleteButtonClick={tableDeleteButtonComp}
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
