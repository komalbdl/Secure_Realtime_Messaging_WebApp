import React from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat.js'

function Sidebar() {
    return (
        <div className = 'sidebar' >
          <div className="sidebar__header">
            <Avatar src="https://cdn140.picsart.com/350542042022201.jpg?type=webp&to=min&r=640" />

            {/*icons section*/}
            <div className="sidebar__headerRight">
              <IconButton >
                <DonutLargeIcon />
              </IconButton >
              <IconButton >
                <ChatIcon />
              </IconButton >
              <IconButton >
                <MoreVertIcon />
              </IconButton >
            </div>
          </div>

          {/*search section*/}
          <div className="sidebar__search">
            <div className="sidebar__searchContainer">
              <SearchIcon />
              <input placeholder="Search or start new chat" type = "text" />
            </div>
          </div>

          {/*Chat rooms sectoin*/}
          <div className="sidebar__chats">
            <SidebarChat />
            <SidebarChat />
            <SidebarChat />
          </div>
        </div>
    )
}

export default Sidebar;
