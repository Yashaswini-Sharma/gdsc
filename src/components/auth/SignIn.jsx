import React, { useEffect, useState } from "react";
import { auth, provider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import google from "./google.png";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import Navbar from "../NavBar/Navbar";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [value, setValue] = useState("");
	const navigate = useNavigate();

	const handleClick = () => {
		signInWithPopup(auth, provider).then((data) => {
			setValue(data.user.email);
			localStorage.setItem("email", data.user.email);
		});
		navigate("/");
	};
	useEffect(() => {
		setValue(localStorage.getItem("email"));
	}, []);

	const signIn = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				console.log(userCredentials);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div className="bgclr">
			<Navbar />
			<div className="bx">
				<form onSubmit={signIn} className="pos">
					<h1>Log In</h1>
					<p>
						Email
						<input
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}></input>
					</p>
					<p>
						Password
						<input
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}></input>
					</p>
					<button className="login" type="submit">
						Log In
					</button>
				</form>
				<p>OR</p>

				<button onClick={handleClick} style={{ marginTop: "0.1%" }}>
					<img
						src={google}
						style={{ width: "15px", paddingRight: "5px", paddingTop: "3px" }}
					/>
					Sign In with Google
				</button>
			</div>
		</div>
	);
};

export default SignIn;
