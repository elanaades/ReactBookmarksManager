import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { produce } from 'immer';

const AddBookmark = () => {

    const [formData, setFormData] = useState({
        Title: '',
        Url: '',
    });

    const navigate = useNavigate();

    const onTextChange = e => {
        const nextState = produce(formData, draft => {
            draft[e.target.name] = e.target.value;
        });
        setFormData(nextState);
    }

    const onFormSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/bookmarks/addbookmark', formData);
        navigate('/MyBookmarks');
    }

    return (

        <div className="row" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                <h3>Add Bookmark</h3>
                <form onSubmit={onFormSubmit}>
                    <input onChange={onTextChange} type="text" name="title" placeholder="Title" className="form-control"  />
                    <br />
                    <input onChange={onTextChange} type="text" name="url" placeholder="Url" className="form-control"  />
                    <br />
                    <button className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
    );

}

export default AddBookmark;