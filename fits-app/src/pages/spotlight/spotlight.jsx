import { useState } from 'react'
import './spotlight.module.css'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import { Icon } from '@mui/material'

function Spotlight() {

    return(
        <div>
            SpotlightPage
            <ShoppingCartOutlinedIcon sx={{ fontSize: 30 }} className="icon"/> 
            <AddAPhotoOutlinedIcon sx={{ fontSize: 30 }} className="icon"/>
            <AccountCircleOutlinedIcon sx={{ fontSize: 30 }} className="icon"/>
            <EmojiObjectsOutlinedIcon sx={{ fontSize: 30 }} className="icon"/>
        </div>
    )
}

export default Spotlight