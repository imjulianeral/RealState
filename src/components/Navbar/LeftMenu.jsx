import React from 'react'
import { Link } from 'gatsby'
import { List, ListItem, ListItemText, Divider } from '@material-ui/core'
import { AccountBox, AddBox, Business, MailOutline } from '@material-ui/icons'

export default function LeftMenu({ classes }) {
  return (
    <div className={classes.list}>
      <List>
        <ListItem component={Link} button to="/app/profile">
          <AccountBox />
          <ListItemText className={classes.listItemText} primary="Profile" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem component={Link} button to="">
          <AddBox />
          <ListItemText
            className={classes.listItemText}
            primary="Add new property"
          />
        </ListItem>
        <ListItem component={Link} button to="">
          <Business />
          <ListItemText className={classes.listItemText} primary="Properties" />
        </ListItem>
        <ListItem component={Link} button to="">
          <MailOutline />
          <ListItemText className={classes.listItemText} primary="Messages" />
        </ListItem>
      </List>
    </div>
  )
}
