import React, { useEffect, useState } from "react";
import { auth, provider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import AuthDetails from "./AuthDetails";
import { Link } from "react-router-dom";
import "./Auth.css";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [value, setValue] = useState("");
	const handleClick = () => {
		signInWithPopup(auth, provider).then((data) => {
			setValue(data.user.email);
			localStorage.setItem("email", data.user.email);
		});
	};
	useEffect(() => {
		setValue(localStorage.getItem("email"));
	});

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
			<div className="bx">
				<form onSubmit={signIn} className="pos">
					<h1 style={{ color: "white" }}>Log In</h1>
					<p style={{ color: "white" }}>
						Email
						<input
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}></input>
					</p>
					<p style={{ color: "white" }}>
						Password
						<input
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}></input>
					</p>
					<button type="submit">Log In</button>
				</form>
				<AuthDetails />
				{value ? (
					<button onClick={handleClick}>Sign In with Google</button>
				) : (
					<Link to="/">Home</Link>
				)}
			</div>
		</div>
	);
};

export default SignIn;
