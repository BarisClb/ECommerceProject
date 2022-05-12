import MainLayout from "../../components/layout/MainLayout";

const HomeScreen = () => {
	return (
		<MainLayout>
			<div id="main-homescreen-wrapper">
				<h1>Welcome</h1>
				<div className="row">
					<div className="col-md-6 col-sm-12 d-flex justify-content-center">
						<a className="main-authpage-auth-link nav-link" href="/login">
							LogIn
						</a>
					</div>
					<div className="col-md-6 col-sm-12 d-flex justify-content-center">
						<a className="main-authpage-auth-link nav-link" href="/register">
							Register
						</a>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default HomeScreen;
