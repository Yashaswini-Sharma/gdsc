import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";
import "./Home.css";
import easy from "./Background.jpg";

const Home = (props) => {
	const [postLists, setPostLists] = useState([]);
	const postsCollectionRef = collection(db, "posts");
	const [upvotedOn, setUpvotedOn] = useState([]);
	const [userName, setUserName] = useState("");

	// Function to increment the count
	const getPosts = async () => {
		const data = await getDocs(postsCollectionRef);
		setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	useEffect(() => {
		getPosts();
		auth.onAuthStateChanged((user) => {
			if (user) {
				setUserName(user.displayName);
			} else setUserName("");
		});
	});

	/*const upvote = async () => {
		await addDoc(postsCollectionRef, {
			author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
			upvotedOn,
		});
	};*/

	return (
		<div>
			<div
				style={{
					backgroundImage: `url(${easy})`,
					width: "100vw",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					imageRendering: "pixelated",
				}}>
				<div>
					<Navbar name={userName} />
					<h1>Home</h1>
					<div>
						{postLists.map((post) => {
							return (
								<div className="bx">
									<h1>{post.title}</h1>
									<p>{post.postText}</p>
									<button>{post.upvotes}</button>
								</div>
							);
						})}
					</div>

					<Link to="/login">Sign In</Link>
					<br />
					<Link to="/SignUp">Sign up</Link>
					{props.name ? (
						<Link to="createPosts">Create Posts</Link>
					) : (
						<button className="btn">
							<Link
								to="/login"
								style={{ textDecoration: "None", color: "white" }}>
								Sign In
							</Link>
						</button>
					)}

					<h2>{props.name ? `${props.name}` : "Login please"}</h2>
				</div>
			</div>
		</div>
	);
};

export default Home;
