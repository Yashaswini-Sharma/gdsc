import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const CreatePosts = () => {
    const [title, setTitle] = useState("")
    const [postText, setPostText] = useState("")
    const postsCollectionRef = collection(db, "posts")
    let navigate = useNavigate();
    const createPost = async () => {
        await addDoc(postsCollectionRef, { title, postText, author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },upvotes:0 });
        navigate("/")
    }
    

  return (
      <div>
          <div>
              <h1>Create a Post</h1>
              <div>
                  <label>Title: </label>
                  <input placeholder='Title...' onChange={(event) =>{setTitle(event.target.value)}}/>  
              </div>
              <div>
                  <label>Post: </label>
                  <textarea placeholder='Post...' onChange={(event) => { setPostText(event.target.value) }} />  
              </div>
              <button onClick={createPost}>Submit</button>
          </div>
      
    </div>
  )
}

export default CreatePosts
