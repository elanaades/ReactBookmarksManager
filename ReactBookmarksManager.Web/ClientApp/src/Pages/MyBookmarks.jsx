import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useUserAuth } from '../Components/UserAuthContext';
import { produce } from 'immer';


const MyBookmarks = () => {

    const navigate = useNavigate();
    const { user } = useUserAuth();

    const [bookmarks, setBookmarks] = useState([]);
    const [isEditing, setIsEditing] = useState([]);
    const [title, setTitle] = useState();

    useEffect(() => {
        const loadBookmarks = async () => {
            const { data } = await axios.get('/api/bookmarks/getbookmarksbyuser');
            setBookmarks(data);
        }

        loadBookmarks();
    }, []);


    const onEditClick = (b) => {
        setIsEditing([...isEditing, b.id]);
        setTitle(b.title)
    }

    const onCancelClick = (bookmarkId) => {
        setIsEditing(isEditing.filter((id) => id !== bookmarkId));
    }

    const onUpdateClick = async (bookmarkId) => {
        await axios.post('/api/bookmarks/updatebookmark', { id: bookmarkId, title });
        const updatedBookmarks = bookmarks.map((b) => {
            if (b.id === bookmarkId) {
                return { ...b, title: title };
            }
            return b;
        });
        setBookmarks(updatedBookmarks);
        onCancelClick(bookmarkId);
    }

    const onDeleteClick = async (bookmarkId) => {
        await axios.post('/api/bookmarks/deletebookmark', { id: bookmarkId });
        const nextState = produce(bookmarks, draft => {
            return draft.filter(item => item.id !== bookmarkId);;
        });
        setBookmarks(nextState);
    }

    return (
        <div style={{ marginTop: '20px' }}>
            <div className="row" >
                <div className="col-md-12" style={{ marginTop: '30px' }}>
                    <h1>Welcome back {user.firstName}</h1>
                    <Link to='/addbookmark' className="btn btn-primary btn-block" style={{ marginTop: '20px' }}>Add Bookmark</Link>
                </div>
            </div>
            <div className="row" style={{ marginTop: '20px' }}>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Url</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookmarks.map(b => {
                            return <tr key={b.id}>
                                <td>
                                    {isEditing.includes(b.id) && <input type="text" className="form-control" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />}
                                    {!isEditing.includes(b.id) && b.title }
                                </td>
                                <td><a href='{b.url}' target='_blank'>{b.url}</a></td>
                                <td>
                                    {isEditing.includes(b.id) &&
                                        <><button className="btn btn-warning" onClick={() => onUpdateClick(b.id)}>Update</button>
                                            <button className="btn btn-info" onClick={() => onCancelClick(b.id)}>Cancel</button> </>}
                                    {!isEditing.includes(b.id) && <button className="btn btn-success" onClick={() => onEditClick(b)}>Edit Title</button>}

                                    <button className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={() => onDeleteClick(b.id)}>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyBookmarks;