import React from 'react';
import Comment from './Comment.jsx';
import CreateComment from './CreateComment.jsx';

const Comments = ({ comments }) => {
    return ( 
        <div className="row my-4">
            <div className="col-12 col-lg-10 offset-lg-1">
                <div className="com">
                    <span className="text-light">What people are saying</span>
                    <div className="bg-secondary p-2 rounded px-5">
                        <CreateComment />
                        {comments?.map(comment => { return(
                            <Comment comment={comment} />
                        );})}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Comments;