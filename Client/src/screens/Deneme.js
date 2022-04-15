import React from "react";
import { useDispatch } from "react-redux";
import Header from "../components/header/Header";
import MainLayout from "../components/layout/MainLayout";
import Table from "../components/table/Table";
import { categoryActions } from "../store/actions/categoryActions";

const Deneme = () => {
	const dispatch = useDispatch();

	const capitalize = (word) =>
		console.log(word[0].toUpperCase() + word.slice(1));

	const helloWorld = () => console.log("Hello World");

	const tableCustomButtonClick = () => {
		dispatch(categoryActions.getCategories());
	};

	return (
		<MainLayout>
			<Header
				title={"Deneme Title"}
				headerButtons={true}
				headerAddButton={true}
				headerDeleteButton={true}
				headerUpdateButton={true}
				headerCustomButton={"Custom Name"}
				headerCustomButtonColor={"light"}
			/>
			<div style={{ marginLeft: "45%" }}>
				<button onClick={() => helloWorld()}>Deneme 1</button>
				<button onClick={() => capitalize("baba")}>Deneme 2</button>
				<button>Deneme 3</button>
				<button>Deneme 4</button>
			</div>
			<Table
				// The Data
				apiData={[
					{ id: 1, name: "Deneme Name", quantity: 34 },
					{ id: 2, name: "Deneme Name 2", quantity: 24 },
					{ id: 3, name: "Deneme Name 3", quantity: 44 },
				]}
				// Table Content
				// Table Headings
				tableHead={"DENEME"}
				tableHead2={"DENEME 2"}
				buttonHeadName={"Cart Actions"}
				// Table Datas
				tableData={"name"}
				tableData2={"quantity"}
				// Table Buttons
				tableButtons={true}
				tableAddButton={true}
				tableDeleteButton={true}
				tableUpdateButton={true}
				// Custom Button Add/Name
				tableCustomButton={"Custom Name"}
				tableCustomButton2={"Custom Name 2"}
				tableCustomButton3={"Custom Name 3"}
				// Custom Button Colors
				tableCustomButtonColor={"success"}
				tableCustomButtonColor2={"warning"}
				tableCustomButtonColor3={"danger"}
				// Table Button Clicks
				tableAddButtonClick={helloWorld}
				tableCustomButtonClick={tableCustomButtonClick}
				// Nav
				isNav={true}
				// Nav Buttons
				navAddButton={true}
				navUpdateButton={true}
				navDeleteButton={true}
				// Nav Custom Button Names
				navCustomButton={"Custom Name"}
				// Nav Custom Button Color
				navCustomButtonColor={"light"}
				// Special
				isCart={true}
				instaSearch={true}
			/>
		</MainLayout>
	);
};

export default Deneme;
