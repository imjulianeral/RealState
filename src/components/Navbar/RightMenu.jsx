import React from 'react'
import { Link } from 'gatsby'
import { List, ListItem, Avatar, ListItemText } from '@material-ui/core'

export default function RightMenu({ classes, user, picture, logout }) {
  return (
    <div className={classes.list}>
      <List>
        <ListItem button component={Link} to="/signup">
          <Avatar className={classes.avatarSize} src={picture} />
          <ListItemText
            className={classes.listItemText}
            primary={`${user.name} ${user.lastname}`}
          />
        </ListItem>
        <ListItem button onClick={logout}>
          <ListItemText className={classes.listItemText} primary="Log Out" />
        </ListItem>
      </List>
    </div>
  )
}
