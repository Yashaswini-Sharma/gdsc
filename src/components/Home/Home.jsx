import React from "react";
import Navbar from "../NavBar/Navbar";
import CreatePosts from "../Posts/CreatePosts";
import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { getDocs, collection, addDoc, orderBy } from "firebase/firestore";
import "./Home.css";
import empty from "./pngaaa.com-3704030.png";
import fill from "./Filled_thumbsup-removebg-preview-PhotoRoom.png-PhotoRoom - Copy.png";
import emptydown from "./Downvote.png";
import filldown from "./downvotefilled.png";
import Comment from "../Posts/Comment";
import { Link } from "react-router-dom";
const Home = (props) => {
	const [postLists, setPostLists] = useState([]);
	const postsCollectionRef = collection(db, "posts");
	const [userName, setUserName] = useState("");
	const [name, setName] = useState(empty);
	const [name1, setName1] = useState(emptydown);

	const changeName = (post) => {
		let value = name;

		if (value === fill) {
			setName(empty);
		} else {
			setName(fill);
		}
	};
	const changeName1 = () => {
		let value = name1;

		if (value === filldown) {
			setName1(emptydown);
		} else {
			setName1(filldown);
		}
	};

	// Function to increment the count
	const getPosts = async () => {
		const data = await getDocs(
			postsCollectionRef,
			orderBy("post.title", "desc")
		);
		setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	useEffect(() => {
		getPosts();
		auth.onAuthStateChanged((user) => {
			if (user) {
				setUserName(user.displayName);
			} else setUserName("");
		});
	}, []);

	/*const upvote = async () => {
		await addDoc(postsCollectionRef, {
			author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
			upvotedOn,
		});
	};*/

	return (
		<div>
			<div className="bg">
				<div>
					<Navbar name={userName} />
					<h1 style={{ color: "white" }}>GDSC Discussion Board</h1>
					<div>
						{postLists.map((post) => {
							return (
								<div className="square-wrapper">
									<div className="square">
										<p
											style={{
												textTransform: "capitalize",
												fontWeight: "bold",
											}}>
											Title: {post.title}
										</p>
										<p style={{ fontStyle: "italic" }}>~{post.name}</p>

										<p>
											{" "}
											{/*postLists.author.map((author) => (
											<li key={author.id}>
												<p>ID: {author.id}</p>
												<p>Name: {author.name}</p>
											</li>
										))*/}
										</p>

										<p>{post.postText}</p>
										<p>
											<button onClick={changeName}>
												<img
													src={name}
													style={{
														width: "15px",
														backgroundColor: "transparent",
													}}
												/>
											</button>
											<button onClick={changeName1}>
												<img
													src={name1}
													style={{
														width: "15px",
														backgroundColor: "transparent",
													}}
												/>
											</button>
											<p>
												<Comment post={post.id} />
												<Link
													to="showcomments"
													style={{
														textDecoration: "None",
														color: "white",
														fontWeight: "Bold",
													}}>
													Show comments
												</Link>
											</p>
										</p>
									</div>
								</div>
							);
						})}
					</div>

					<div
						style={{
							float: "left",
							position: "fixed",
							bottom: 0,
							margin: "1%",
						}}>
						{props.name ? (
							<CreatePosts />
						) : (
							<button className="btn">
								<Link
									to="/signup"
									style={{ textDecoration: "None", color: "black" }}>
									Signup
								</Link>
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
