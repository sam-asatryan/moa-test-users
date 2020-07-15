import React                               from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import CircularProgress                    from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display       : 'flex',
            justifyContent: 'center',
            '& > * + *'   : {
                marginLeft: theme.spacing(2),
            },
        },
    }),
)

type TProps = {
    color?: 'primary' | 'secondary'
    size?: number | string
    thickness?: number
    className?: string
}

export default ({ color = 'primary', size = 64, thickness = 4, className = '' }: TProps) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <CircularProgress
                color={color}
                size={size}
                thickness={thickness}
                className={className}
            />
        </div>
    )
}