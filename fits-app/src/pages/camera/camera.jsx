import { useState } from 'react'
import styles from './camera.module.css'
import { Sidebar, Header, FollowBar } from '../../components/index.js';

function Camera() {

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
                    Camera Content
                </div>
                <div className={styles.followBar}>
                    <FollowBar />
                </div>
            </div>
        </div>
    )
}

export default Camera