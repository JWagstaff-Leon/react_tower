import React from 'react';
import { useState } from 'react';
import Comment from './Comment.jsx';
import CreateComment from './CreateComment.jsx';

const Comments = ({ comments, handleNewComment, userSignedIn }) => {

    const [newComment, setNewComment] = useState("");

    const doChangeComment = ({ currentTarget: target }) =>
    {
        if(target.value.trim().length == 0)
        {
            setNewComment("");
            return;
        }

        setNewComment(target.value);
    }

    const doSubmitComment = async (event) =>
    {
        try
        {
            event.preventDefault();
            handleNewComment(newComment.trim());
            setNewComment("");
        }
        catch(error)
        {
            console.error("[Comments.jsx > doSubmitComment]", error.message);
        }
    }

    return ( 
        <div className="row my-4">
            <div className="col-12 col-lg-10 offset-lg-1">
                <div className="com">
                    <span className="text-light no-select">What people are saying</span>
                    <div className="bg-secondary py-2 rounded px-5 d-flex flex-column">
                        {userSignedIn && <CreateComment comment={newComment} handleChange={doChangeComment} handleSubmit={doSubmitComment}/>}
                        { comments?.length > 0 ?
                        comments?.map(comment => { return(
                            <Comment comment={comment} key={comment.id} />
                        );})
                        :
                        <span className="fs-1 text-success darken-5 no-select fst-italic align-self-center my-2">No comments yet</span>
                        }
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Comments;