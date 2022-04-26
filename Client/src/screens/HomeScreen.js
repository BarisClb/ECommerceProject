import MainLayout from "../components/layout/MainLayout";

const HomeScreen = () => {
	return (
		<MainLayout>
			<div
				style={{
					height: "calc(100vh - 50px)",
					width: "100vw",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<h1 style={{ fontSize: "100px" }}>Welcome</h1>
			</div>
		</MainLayout>
	);
};

export default HomeScreen;
