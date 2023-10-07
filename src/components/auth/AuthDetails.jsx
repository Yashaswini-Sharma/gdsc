import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthDetails = () => {
	const [authUser, setAuthUser] = useState(null);
	useEffect(() => {
		const listen = onAuthStateChanged(auth, (user) => {
			if (user) {
				setAuthUser(user);
			} else {
				setAuthUser(null);
			}
		});

		return () => {
			listen();
		};
	});
	const userSignOut = () => {
		signOut(auth)
			.then(() => {
				console.log("log out successful");
			})
			.catch((error) => console.log(error));
	};

	return (
		<div>
			{authUser ? (
				<p style={{ color: "white" }}>Signed in as {authUser.email}</p>
			) : (
				<p>Signed out</p>
			)}
			<button onClick={userSignOut}>Sign out</button>
		</div>
	);
};

export default AuthDetails;
