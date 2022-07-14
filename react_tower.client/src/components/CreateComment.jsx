import React from 'react';
import LittleLoading from './LittleLoading.jsx';

const CreateComment = ({ comment, handleChange, handleSubmit, submitting }) => {
    return ( 
        <div className="d-flex flex-column align-items-end my-4">
            <span className="text-success lighten-10">Join the conversation</span>
            <form onSubmit={handleSubmit} className="w-100 d-flex flex-column">
                <label className="visually-hidden" htmlFor="newComment">New Comment</label>
                <textarea name="newComment" id="newComment" className="form-control my-2" placeholder="Tell the people" required value={comment} onChange={handleChange}></textarea>
                {
                    !submitting ?
                    <button type="submit" className="btn btn-primary ms-auto">post comment</button>
                    :
                    <div className="ms-auto">
                        <LittleLoading />
                    </div>
                }
            </form>
        </div>
     );
}
 
export default CreateComment;