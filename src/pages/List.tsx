import React, { useEffect, useState }                  from 'react'
import { useHistory }                                  from 'react-router-dom'
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Table                                           from '@material-ui/core/Table'
import TableBody                                       from '@material-ui/core/TableBody'
import TableCell                                       from '@material-ui/core/TableCell'
import TableContainer                                  from '@material-ui/core/TableContainer'
import TableHead                                       from '@material-ui/core/TableHead'
import TableRow                                        from '@material-ui/core/TableRow'
import Paper                                           from '@material-ui/core/Paper'
import DeleteIcon                                      from '@material-ui/icons/Delete'
import EditIcon                                        from '@material-ui/icons/Edit'
import IconButton                                      from '@material-ui/core/IconButton'
import Dialog                                          from '@material-ui/core/Dialog'
import DialogActions                                   from '@material-ui/core/DialogActions'
import DialogContent                                   from '@material-ui/core/DialogContent'
import DialogContentText                               from '@material-ui/core/DialogContentText'
import DialogTitle                                     from '@material-ui/core/DialogTitle'
import Button                                          from '@material-ui/core/Button'

import Notifications from '../components/notifications'
import Loading       from '../components/Loading'

import { convertDateToString }  from '../services/date-service'
import { deleteUser, getUsers } from '../services/user-service'

import { TError }   from '../types/error'
import { TUser }    from '../types/user'
import { TMessage } from '../types/message'

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color          : theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.background.default,
            },
        },
    }),
)(TableRow)

const useStyles = makeStyles({
    table: {
        width : '100%',
        margin: '0 auto',
    },
})

const List = () => {
    const classes = useStyles()
    const history = useHistory()

    const [ loading, setLoading ]             = useState<boolean>(true)
    const [ deleteLoading, setDeleteLoading ] = useState<boolean>(false)
    const [ users, setUsers ]                 = useState<TUser[]>([])
    const [ messages, setMessages ]           = useState<TMessage[]>()
    const [ openDialog, setOpenDialog ]       = useState(false)
    const [ selectedUser, setSelectedUser ]   = useState<{ name: string, id: string }>()

    const handleClickOpenDialog = (name: string, id: string) => {
        setSelectedUser({ name, id })
        setOpenDialog(true)
    }

    const handleCloseDialog = (response: boolean) => {
        if (!response) {
            setOpenDialog(false)
            return
        }

        setDeleteLoading(true)

        // @ts-ignore
        deleteUser(selectedUser.id)
            .then((response: any) => {
                const messages: TMessage[] = response.errors.map((error: TError) => ({
                    type   : 'error',
                    message: error.message,
                    details: error.details,
                }))

                if (response.message) {
                    messages.push({
                        type   : 'success',
                        message: response.message,
                    })
                }

                messages.push({
                    type   : 'success',
                    message: 'User successfully deleted',
                })

                setMessages(messages)

                // @ts-ignore
                setUsers(users.filter(user => user.id !== selectedUser.id))
            })
            .catch((e: Error) => {
                setMessages([ { message: e.message, type: 'error' } ])
            })
            .finally(() => {
                setOpenDialog(false)
                setDeleteLoading(false)
            })
    }

    useEffect(() => {
        setLoading(true)
        getUsers()
            .then((response: any) => {
                    setUsers(response.data.map((user: TUser) => ({
                        ...user,
                        birthDate: convertDateToString(user.birthDate),
                    })))
                    const messages: TMessage[] = response.errors.map((error: TError) => ({
                        type   : 'error',
                        message: error.message,
                        details: error.details,
                    }))

                    if (response.message) {
                        messages.push({
                            type   : 'success',
                            message: response.message,
                        })
                    }

                    setMessages(messages)
                },
            )
            .catch((e: Error) => {
                setMessages([ { message: e.message, type: 'error' } ])
            })
            .finally(() => setLoading(false))

    }, [])

    return (
        <div style={{ width: '75%', textAlign: 'center', margin: '0 auto' }}>
            <h1>Users</h1>
            <>
                {loading ? (
                    <Loading/>
                ) : (
                    <>
                        {!!messages?.length && (
                            <Notifications notifications={messages}/>
                        )}
                        {!!users.length ? (
                            <>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>First name</StyledTableCell>
                                                <StyledTableCell>Last name</StyledTableCell>
                                                <StyledTableCell>Email</StyledTableCell>
                                                <StyledTableCell>Phone Number</StyledTableCell>
                                                <StyledTableCell>Birth Date</StyledTableCell>
                                                <StyledTableCell>Salary</StyledTableCell>
                                                <StyledTableCell>Address</StyledTableCell>
                                                <StyledTableCell>Postal Code</StyledTableCell>
                                                <StyledTableCell align='right'>Actions</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users.map(user => (
                                                <StyledTableRow key={user.id}>
                                                    <StyledTableCell component="th"
                                                                     scope="row">{user.firstName}</StyledTableCell>
                                                    <StyledTableCell>{user.lastName}</StyledTableCell>
                                                    <StyledTableCell>{user.email}</StyledTableCell>
                                                    <StyledTableCell>{user.phoneNumber}</StyledTableCell>
                                                    <StyledTableCell>{user.birthDate}</StyledTableCell>
                                                    <StyledTableCell>{user.salary}</StyledTableCell>
                                                    <StyledTableCell>{user.address}</StyledTableCell>
                                                    <StyledTableCell>{user.postalCode}</StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        <IconButton
                                                            aria-label="edit user"
                                                            color="primary"
                                                            onClick={() => {
                                                                history.push(`/update/${user.id}`)
                                                            }}
                                                        >
                                                            <EditIcon/>
                                                        </IconButton>
                                                        <IconButton
                                                            aria-label="delete user"
                                                            color="secondary"
                                                            onClick={() => handleClickOpenDialog(`${user.firstName} ${user.lastName}`, user.id || '')}
                                                        >
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Dialog
                                    disableBackdropClick
                                    disableEscapeKeyDown
                                    open={openDialog}
                                    onClose={handleCloseDialog}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        Delete user {selectedUser?.name}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            {deleteLoading ? <Loading size={24}/> : 'Are you sure?'}
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            onClick={() => handleCloseDialog(false)}
                                            color="primary"
                                            disabled={deleteLoading}
                                        >
                                            No
                                        </Button>
                                        <Button
                                            onClick={() => handleCloseDialog(true)}
                                            color="primary"
                                            disabled={deleteLoading}
                                            autoFocus
                                        >
                                            Yes
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </>
                        ) : (
                            <h3>There are no users</h3>
                        )}
                    </>
                )}
            </>
        </div>
    )
}

export default List