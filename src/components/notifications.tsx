import React, { useEffect }              from 'react'
import { SnackbarProvider, useSnackbar } from 'notistack'

import { TMessage } from '../types/message'

const NotificationMaker = ({ notifications }: { notifications: TMessage[] }) => {
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        notifications.forEach(notification => {
            enqueueSnackbar(notification.message, { variant: notification.type })
        })
    })

    return null
}

type TProps = {
    notifications: TMessage[]
}

export default ({ notifications }: TProps) => {
    return (
        <SnackbarProvider maxSnack={10} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} preventDuplicate>
            <NotificationMaker notifications={notifications}/>
        </SnackbarProvider>
    )
}