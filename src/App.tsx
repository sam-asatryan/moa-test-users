import React                               from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
}                                          from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import AppBar                              from '@material-ui/core/AppBar'
import Toolbar                             from '@material-ui/core/Toolbar'
import IconButton                          from '@material-ui/core/IconButton'
import Typography                          from '@material-ui/core/Typography'
import Badge                               from '@material-ui/core/Badge'
import CreateIcon                          from '@material-ui/icons/Create'

import List   from './pages/List'
import Create from './pages/Create'
import Update from './pages/Update'

import './App.css'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow          : {
            flexGrow: 1,
        },
        title         : {
            display                     : 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
            cursor                      : 'pointer',
            color                       : 'white',
        },
        link          : {
            textDecoration: 'none',
        },
        sectionDesktop: {
            display                     : 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        createIcon    : {
            color: 'white',
        },
    }),
)

export default function App() {
    const classes = useStyles()

    return (
        <Router>
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Link to={'/'} className={classes.link}>
                            <Typography className={classes.title} variant="h6" noWrap>
                                Moa Users
                            </Typography>
                        </Link>
                        <div className={classes.grow}/>
                        <div className={classes.sectionDesktop}>
                            <Link to={'/create'}>
                                <IconButton aria-label="create new user" className={classes.createIcon}>
                                    <Badge>
                                        <CreateIcon/>
                                    </Badge>
                                </IconButton>
                            </Link>
                        </div>
                    </Toolbar>
                </AppBar>

                <Switch>
                    <Route path="/create">
                        <Create/>
                    </Route>
                    <Route path="/update/:id">
                        <Update/>
                    </Route>
                    <Route path="/">
                        <List/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}