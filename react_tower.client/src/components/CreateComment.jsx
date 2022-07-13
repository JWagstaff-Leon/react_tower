import React from 'react';

const CreateComment = ({ comment, handleChange, handleSubmit }) => {
    return ( 
        <div className="d-flex flex-column align-items-end my-4">
            <span className="text-success lighten-10">Join the conversation</span>
            <form onSubmit={handleSubmit} className="w-100 d-flex flex-column">
                <label className="visually-hidden" htmlFor="newComment">New Comment</label>
                <textarea name="newComment" id="newComment" className="form-control my-2" placeholder="Tell the people" required value={comment} onChange={handleChange}></textarea>
                <button type="submit" className="btn btn-primary ms-auto">post comment</button>
            </form>
        </div>
     );
}
 
export default CreateComment;