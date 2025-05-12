import { useState } from 'react'
import styles from './search.module.css'
import { Sidebar, Header, FollowBar } from '../../components/index.js';

function Search() {

    return(
        <div className={styles.container}>     
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.body}>
                <div className={styles.sidebar}>
                    <Sidebar />
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.content}>
                        <input className={styles.searchBar} placeholder='Enter a username'>
                        </input>
                    </div>
                </div>
                <div className={styles.followBar}>
                    <FollowBar />
                </div>
            </div>
        </div>
    )
}

export default Search