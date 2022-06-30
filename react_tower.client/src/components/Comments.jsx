import React from 'react';

const Comments = ({ comments }) => {
    return ( 
        <div className="row mt-4">
            <div className="col-12 col-lg-10 offset-lg-1">
                <div className="com">
                    <span className="text-light">What people are saying</span>
                    <div className="bg-secondary p-2 rounded">
                        {comments?.map(comment => { return(
                            <div className="d-flex px-4 py-2" key={comment.id}>
                                <img src={comment.creator.picture} />
                                <div className="d-flex flex-column bg-light px-3 py-2 ms-3 flex-grow-1 rounded shadow">
                                    <div className="d-flex">
                                        <span>{comment.creator.name}</span>
                                        {comment.isAttending && <i className="mdi mdi-human-handsup text-warning" title={`${comment.creator.name} is attending`}></i>}
                                    </div>
                                    <span className="mt-2">{comment.body}</span>
                                </div>
                            </div>
                        );})}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Comments;