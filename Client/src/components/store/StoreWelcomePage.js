import React from "react";

function StoreWelcomePage() {
	return (
		<div id="store-welcomepage-content-wrapper">
			<div id="store-welcomepage-content">
				<div id="welcomepage-welcome-text" className="row">
					<h1>Welcome to the Store Front</h1>
				</div>
				<div id="welcomepage-dummypage-text" className="row">
					<h3>Here are some Dummy Pages, in case you are not working with data right now.</h3>
				</div>
				<div id="welcomepage-dummypage-links" className="row">
					<div className="col-md-6 col-sm-12 d-flex justify-content-center">
						<a className="welcomepage-dummypage-link nav-link" href="/store/category=0">
							Product List Page
						</a>
					</div>
					<div className="col-md-6 col-sm-12 d-flex justify-content-center">
						<a className="welcomepage-dummypage-link nav-link" href="/store/product=0">
							Single Product Page
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default StoreWelcomePage;
