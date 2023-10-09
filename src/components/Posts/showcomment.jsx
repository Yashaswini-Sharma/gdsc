import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import Navbar from "../NavBar/Navbar";

const Showcomment = (a) => {
	const [commentLists, setCommentLists] = useState([]);
	const [post, setPost] = useState([]);
	const [userName, setUserName] = useState("");

	const commentRef = collection(db, "Reply");

	/*const q = query(collection(db, "Reply"), where("post", "==", true));*/

	const getPosts = async () => {
		const data = await getDocs(commentRef);
		setCommentLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	useEffect(() => {
		getPosts();
		auth.onAuthStateChanged((user) => {
			if (user) {
				setUserName(user.displayName);
			} else setUserName("");
		});
	}, []);

	return (
		<div className="bg">
			<Navbar name={userName} />
			<h1 style={{ color: "white" }}>Discussion Board</h1>

			{commentLists.map((post) => {
				return (
					<div className="square-wrapper">
						<div className="square">
							<p>~{post.name}</p>
							{post.comment}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Showcomment;
