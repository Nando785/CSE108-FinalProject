import { useState } from 'react'
import styles from './profile.module.css'
import { Sidebar, Header, FollowBar } from '../../components/index.js';

function Profile() {

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
                            <div className={styles.statsContainer}></div>
                        </div>
                        <div className={styles.bioContainer}>

                        </div>
                        <div className={styles.postContainer}>

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