import React from 'react';

const Comment = ({ comment }) => {
    return ( 
        <div className="d-flex py-2 no-select">
            <img src={comment.creator.picture} alt={"profile picture of " + comment.creator.name} />
            <div className="d-flex flex-column bg-light px-3 py-2 ms-3 flex-grow-1 rounded shadow">
                <div className="d-flex">
                    <span>{comment.creator.name}</span>
                    {comment.isAttending && <i className="mdi mdi-human-handsup text-warning" title={`${comment.creator.name} is attending`}></i>}
                </div>
                <span className="mt-2">{comment.body}</span>
            </div>
        </div>
     );
}
 
export default Comment;