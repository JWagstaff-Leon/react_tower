import React from 'react';

const CreateComment = () => {
    return ( 
        <div className="d-flex flex-column align-items-end my-4">
            <span className="text-light">Join the conversation</span>
            <label className="visually-hidden" htmlFor="new-comment">New Comment</label>
            <textarea name="new-comment" id="new-comment" className="form-control my-2" placeholder="Tell the people"></textarea>
            <button className="btn btn-primary">post comment</button>
        </div>
     );
}
 
export default CreateComment;