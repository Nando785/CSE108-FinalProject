import { useEffect, useState } from 'react';

export function loadData() {
    const [userData, returnData] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:5000/getInfo', {
                    method: 'POST',
                    credentials: 'include',
                });

                if(!response.ok){ throw new Error('Failed to fetch use data'); }

                const result = await response.json();
                
                returnData(result.data);
            } catch (err) {

            }
        }

        fetchUserInfo();
    }, []);

    return userData;
}

export function loadPosts() {
    const [postList, returnPosts] = useState(null);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/getPosts', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({}) // no username = use current_user
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }

                const data = await response.json();
                // console.log('Posts:', data.posts);
                returnPosts(data)
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
        }, []);

    return postList;
}