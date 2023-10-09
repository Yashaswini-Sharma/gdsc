import React, { useState } from "react";
import { setDoc, doc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Comment = (post) => {
	const [openReplyForm, setOpenReplyForm] = useState(false);
	const [reply, setReply] = useState("");
	const postsCollectionRef = collection(db, "Reply");
	let navigate = useNavigate();
	const createReply = async () => {
		await setDoc(doc(postsCollectionRef), {
			post,
			name: auth.currentUser.displayName,
			uid: auth.currentUser.uid,
			comment: reply,
		});

		window.location.reload();
	};

	return (
		<div>
			{openReplyForm ? (
				<div>
					<textarea
						placeholder="Do reply..."
						onChange={(e) => setReply(e.target.value)}></textarea>
					<button onClick={createReply}>Submit</button>
					<button onClick={() => setOpenReplyForm(false)}>Cancel</button>
				</div>
			) : (
				<button
					style={{
						border: "None",
						backgroundColor: "white",
						borderRadius: "50px",
					}}
					type="button"
					onClick={() => setOpenReplyForm(true)}>
					Reply
				</button>
			)}
		</div>
	);
};

export default Comment;
