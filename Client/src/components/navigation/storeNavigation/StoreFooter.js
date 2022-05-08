import React from "react";
import "./css/index.css";
import "../css/index.css";
import { useSelector } from "react-redux";

function StoreFooter() {
	const darkMode = useSelector((state) => state.common.DarkMode);
	return (
		<footer
			id="store-footer"
			className={`section-footer shadow ${
				darkMode ? "bg-dark white-link-text" : "bg-light dark-link-text store-nav-light"
			}`}
		>
			<div className="container">
				<section className="footer-main py-3">
					<div className="row">
						{/* COL 1 */}
						<div className="col-lg col-6">
							<h5 className="title">Company</h5>
							<ul className="list-menu border-top border-top ">
								<li>
									<a href="/">
										<span>About us</span>
									</a>
								</li>
								<li>
									<a href="/"> Career </a>
								</li>
								<li>
									<a href="/"> Rules and Terms </a>
								</li>
							</ul>
						</div>
						{/* COL 2 */}
						<div className="col-lg col-6">
							<h5 className="title"> Services </h5>
							<ul className="list-menu border-top border-top border-top border-top">
								<li>
									<a href="/">Help Center</a>
								</li>
								<li>
									<a href="/"> Order status </a>
								</li>
							</ul>
						</div>
						{/* COL 3 */}
						<div className="col-lg col-6">
							<h5 className="title"> User center </h5>
							<ul className="list-menu border-top border-top border-top">
								<li>
									<a href="/"> Register </a>
								</li>
								<li>
									<a href="/"> Sign in </a>
								</li>
							</ul>
						</div>
						{/* COL 4 */}
						<div className="col-lg col-6">
							<h5 className="title">Social</h5>
							<ul className="list-icon list-menu border-top border-top border-top">
								<li>
									<a href="/">
										<i className="icon fab fa-facebook" /> Facebook
									</a>
								</li>
								<li>
									<a href="/">
										<i className="icon fab fa-twitter" /> Twitter
									</a>
								</li>
								<li>
									<a href="/" className="white-link-text">
										<i className="icon fab fa-instagram" /> Instagram
									</a>
								</li>
								<li>
									<a href="/">
										<i className="icon fab fa-youtube" /> Youtube
									</a>
								</li>
							</ul>
						</div>
						{/* COL 5 */}
						<div className="col-lg-4 col-12">
							<article className="me-lg-4">
								<h5 className="title">Contact us</h5>
								<ul id="contact-list" className="list-icon list-menu border-top">
									<li className="mb-2">
										<i className="icon fa fa-map-marker" />
										<span>Istanbul, Turkey</span>
									</li>
									<li className="mb-2">
										<i className="icon fa fa-phone" />
										<span>(212) 123 45 67</span>
									</li>
									<li className="mb-2">
										<i className="icon fa fa-envelope" />
										<span>baris@celebi.com</span>
									</li>
								</ul>
							</article>
						</div>
					</div>
				</section>
				{/* BOTTOM SECTION */}
				<section className="footer-bottom d-flex justify-content-between border-top">
					<p className="text-muted mb-0">© 2022 Baris Celebi, All rights reserved.</p>
					<div id="footer-bottom-credit-cards">
						<i className="bi bi-credit-card" />
						<i className="bi bi-credit-card-2-front" />
						<i className="bi bi-credit-card-2-back" />
					</div>
				</section>
			</div>
		</footer>
	);
}

export default StoreFooter;
