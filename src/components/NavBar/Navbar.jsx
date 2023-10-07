import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = (props) => {
	return (
		<div className="Navbar">
			<div className="box">
				<div className="Home">
					<Link to="/" className="links">
						Home
					</Link>
					<Link to="/" className="links">
						About
					</Link>
					<Link to="/" className="links">
						Contact Us
					</Link>
				</div>
				{""}
				<div className="Signin">
					{props.name ? (
						`${props.name}`
					) : (
						<button className="btn">
							<Link
								to="/login"
								style={{ textDecoration: "None", color: "white" }}>
								Sign In
							</Link>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
