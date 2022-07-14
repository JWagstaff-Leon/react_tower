import React from 'react';
import { useState } from 'react';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import Comment from './Comment.jsx';
import CreateComment from './CreateComment.jsx';

const Comments = ({ comments, handleNewComment, handleDelete, account }) => {
    const [newComment, setNewComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

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
            setSubmitting(true);
            event.preventDefault();
            await handleNewComment(newComment.trim());
            setNewComment("");
            setSubmitting(false);
        }
        catch(error)
        {
            setSubmitting(false);
            logger.error("[Comments.jsx > doSubmitComment]", error.response.data);
            Pop.toast(error.response.data, "error");
        }
    }

    return ( 
        <div className="row my-4">
            <div className="col-12 col-lg-10 offset-lg-1">
                <div className="com">
                    <span className="text-light no-select">What people are saying</span>
                    <div className="bg-secondary py-2 rounded px-5 d-flex flex-column">
                        {account?.id && <CreateComment comment={newComment} handleChange={doChangeComment} handleSubmit={doSubmitComment} submitting={submitting} />}
                        { comments?.length > 0 ?
                        comments?.map(comment => { return(
                            <Comment comment={comment} account={account} handleDelete={handleDelete} key={comment.id} />
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