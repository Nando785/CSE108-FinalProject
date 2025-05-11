import { useEffect, useState } from 'react'
import styles from './profile.module.css'
import { loadData, loadPosts } from './useProfile';
import { Sidebar, Header, FollowBar } from '../../components/index.js';

function Profile() {
    const userData = loadData();
    const postList = loadPosts();
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState(userData ? userData[0][3] : '');

    useEffect(() => {
    if (userData) setBio(userData[0][3]);
    }, [userData]);

    const handleBioSave = async () => {
        setIsEditing(false);

        try {
            const res = await fetch('http://localhost:5000/updateBio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ bio }),
            });

            if (!res.ok) { console.error('Failed to update bio'); }
        } catch (err) {
            console.error('Error updating bio:', err);
        }
    };

    console.log(postList);

    return(
        <div className={styles.container}>     
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.body}>
                <div className={styles.sidebar}>
                    <Sidebar />
                </div>
                <div className={styles.content}>
                    <div className={styles.pad}>
                        <div className={styles.profileHeader}>
                            <div className={styles.iconContainer}></div>
                            <div className={styles.statsContainer}>
                                <div>{userData && <p>{userData[0][0]}</p>}</div>
                                <div>{userData && <p>Post Count: {userData[0][6]}</p>}</div>
                                <div>{userData && <p>{userData[0][1]} {userData[0][2]}</p>}</div>
                                <div>{userData && <p>Followers: {userData[0][4]} Following: {userData[0][5]}</p>}</div>
                            </div>
                        </div>
                        <div className={styles.bioContainer} onClick={() => setIsEditing(true)}>
                            {userData && !isEditing ? (<p>{bio}</p>):(
                            <input
                                type="text"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                onBlur={handleBioSave}
                                autoFocus
                            />)}
                        </div>
                        <div className={styles.postContainer}>
                            {postList && postList.posts.map((post, index) => (
                                <div key={index} className={styles.postCard}>
                                    <img src={`data:image/png;base64,${post.image}`} alt={`Post ${index}`} />
                                    <p>{post.description}</p>
                                    <p>Likes: {post.likeCnt}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.followBar}>
                    <FollowBar />
                </div>
            </div>
        </div>
    )
}

export default Profile