import React from 'react';

const Comment = ({ comment, account, handleDelete }) => {
    return ( 
        <div className="d-flex py-2 no-select">
            <img src={comment.creator.picture} alt={"profile picture of " + comment.creator.name} />
            <div className="d-flex flex-column bg-light px-3 py-2 ms-3 flex-grow-1 rounded shadow position-relative">
                <div className="d-flex">
                    <span>{comment.creator.name}</span>
                    {comment.isAttending && <i className="mdi mdi-human-handsup text-warning" title={`${comment.creator.name} is attending`}></i>}
                </div>
                <span className="mt-2">{comment.body}</span>
                {comment.creator.id === account?.id && <i className="text-danger mdi mdi-delete selectable delete-button" title="delete your comment" onClick={() => handleDelete(comment.id)} role="button"></i>}
            </div>
        </div>
     );
}
 
export default Comment;