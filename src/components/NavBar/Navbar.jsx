import React from "react";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { Link } from "react-router-dom";
import { auth, provider } from "../../firebase";
import "./Navbar.css";

const Navbar = (props) => {
	const [authUser, setAuthUser] = useState(null);
	useEffect(() => {
		const listen = onAuthStateChanged(auth, (user) => {
			if (user) {
				setAuthUser(user);
			} else setAuthUser(null);
		});
	}, []);
	const userSignOut = () => {
		signOut(auth)
			.then(() => {
				console.log("log out successful");
			})
			.catch((error) => console.log(error));
	};

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
						<div className="btn">
							<Link
								to="/login"
								style={{
									textDecoration: "None",
									color: "black",

									float: "right",
								}}>
								Sign In
							</Link>
						</div>
					)}
				</div>

				{props.name ? (
					<button className="rlinks" onClick={userSignOut}>
						Sign out
					</button>
				) : (
					<Link to="signup" className="rlinks">
						Create Account
					</Link>
				)}
			</div>
		</div>
	);
};

export default Navbar;
