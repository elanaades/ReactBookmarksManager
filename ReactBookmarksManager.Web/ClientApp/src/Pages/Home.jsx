import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {

    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const loadBookmarks = async () => {
            const { data } = await axios.get('/api/bookmarks/gettopbookmarks');
            setBookmarks(data);
        }

        loadBookmarks();
    }, []);

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <main role="main" className="pb-3">
                <div>
                    <h1>Welcome to the React Bookmark Application.</h1>
                    <h3>Top 5 most bookmarked links</h3>
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Url</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookmarks.map(b => {
                                return <tr key={b.bookmark.id}>
                                    <td><a href='{b.bookmark.url}' target='_blank'>{b.bookmark.url}</a></td>
                                    <td>{b.count}</td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default Home;
