import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './CreatePosts.css';

const CreatePosts = () => {
    const [title, setTitle] = useState("")
    const [postText, setPostText] = useState("")
    const postsCollectionRef = collection(db, "posts")
    let navigate = useNavigate();
    const createPost = async () => {
        await addDoc(postsCollectionRef, { title, postText, author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }, upvotes: 0,name: auth.currentUser.displayName,uid: auth.currentUser.uid, comment:[""] }); 
        
        window.location.reload();
    }


    

  return (
      <div>
          <div className='fix'>
              <div>
                  <input className="inp" placeholder='Title...' onChange={(event) => { setTitle(event.target.value) }} />  
                  
                  <textarea className='TextA' placeholder='Post...' onChange={(event) => { setPostText(event.target.value) }} />  
                  <button style={{marginLeft:"72vw", border:"None",borderRadius:"50px", border:"None", paddingTop:"5px", paddingBottom:"5px"}} onClick={createPost}>Submit</button>

              </div>
          </div>
      
    </div>
  )
}

export default CreatePosts
