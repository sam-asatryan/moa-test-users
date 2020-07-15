import React, { useState }                 from 'react'
import { useHistory }                      from 'react-router-dom'
import TextField                           from '@material-ui/core/TextField'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Button                              from '@material-ui/core/Button'

import Notifications from '../components/notifications'
import Loading       from '../components/Loading'

import { saveUser }            from '../services/user-service'
import { validate }            from '../services/validation-service'
import { convertDateToString } from '../services/date-service'

import { TUser }    from '../types/user'
import { TMessage } from '../types/message'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root          : {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width : '25ch',
            },
        },
        buttonProgress: {
            marginTop : -30,
            marginLeft: -128,
        },
    }),
)

const Create = () => {
    const classes = useStyles()

    const [ loading, setLoading ]             = useState<boolean>(false)
    const [ user, setUser ]                   = useState<TUser>({
        id        : 'no-id',
        firstName : '',
        lastName  : '',
        email     : '',
        password  : '',
        birthDate : '1970-01-01',
        salary    : 0,
        postalCode: 0,
        address   : '',
    })
    const [ invalidFields, setInvalidFields ] = useState<string[]>([])
    const [ messages, setMessages ]           = useState<TMessage[]>()

    const history = useHistory()

    const handleChange = (name: string, value: string) => {
        setInvalidFields(fields => fields.filter(field => field !== name))
        // @ts-ignore
        setUser(user => ({
            ...user,
            [name]: value,
        }))
    }

    const saveUserHandler = async () => {
        // @ts-ignore
        const result = validate(user, [ 'birthDate', 'salary', 'postalCode' ])
        if (!result.isValid) {
            setInvalidFields(result.invalidFields)
            return
        }

        setLoading(true)
        try {
            // @ts-ignore
            await saveUser(user)
            history.push('/')
        } catch (e) {
            setMessages([ { message: e.message, type: 'error' } ])
            setLoading(false)
        }
    }

    return (
        <div style={{ width: '30%', minWidth: 500, margin: '0 auto', textAlign: 'center' }}>
            <h1>Create new user</h1>

            {!!messages?.length && (<Notifications notifications={messages}/>)}
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        id="first-name"
                        label="First name"
                        value={user?.firstName}
                        name='firstName'
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        error={invalidFields.includes('firstName')}
                        helperText={invalidFields.includes('firstName') ? 'Please fill this field' : ''}
                    />
                    <TextField
                        id="last-name"
                        label="Last name"
                        value={user?.lastName}
                        name='lastName'
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        error={invalidFields.includes('lastName')}
                        helperText={invalidFields.includes('lastName') ? 'Please fill this field' : ''}
                    />
                </div>
                <div>
                    <TextField
                        id="password"
                        label="Password"
                        value={user?.password}
                        name='password'
                        onChange={(e) => handleChange('password', e.target.value)}
                        type='password'
                        error={invalidFields.includes('password')}
                        helperText={invalidFields.includes('password') ? 'Please fill this field' : ''}
                    />
                    <TextField
                        id="phoneNumber"
                        label="Phone Number"
                        value={user?.phoneNumber}
                        name='phoneNumber'
                        onChange={(e) => handleChange('phoneNumber', e.target.value)}
                        type="string"
                        error={invalidFields.includes('phoneNumber')}
                        helperText={invalidFields.includes('phoneNumber') ? 'Please fill this field' : ''}
                    />
                </div>
                <div>
                    <TextField
                        id="email"
                        label="Email"
                        value={user?.email}
                        name='email'
                        onChange={(e) => handleChange('email', e.target.value)}
                        type="string"
                        error={invalidFields.includes('email')}
                        helperText={invalidFields.includes('email') ? 'Please fill this field' : ''}
                    />
                    <TextField
                        required
                        id="birthDate"
                        label="Birth Date"
                        value={user?.birthDate}
                        name='birthDate'
                        onChange={(e) => handleChange('birthDate', e.target.value)}
                        type="date"
                        error={invalidFields.includes('birthDate')}
                        helperText={invalidFields.includes('birthDate') ? 'Please fill this field' : ''}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="salary"
                        label="Salary"
                        value={user?.salary}
                        name='salary'
                        onChange={(e) => handleChange('salary', e.target.value)}
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        error={invalidFields.includes('salary')}
                        helperText={invalidFields.includes('salary') ? 'Please fill this field' : ''}
                    />
                    <TextField
                        required
                        id="postalCode"
                        label="Postal Code"
                        value={user?.postalCode}
                        name='postalCode'
                        onChange={(e) => handleChange('postalCode', e.target.value)}
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        error={invalidFields.includes('postalCode')}
                        helperText={invalidFields.includes('postalCode') ? 'Please fill this field' : ''}
                    />
                </div>
                <TextField
                    id="address"
                    label="Address"
                    value={user?.address}
                    name='address'
                    onChange={(e) => handleChange('address', e.target.value)}
                    type="string"
                    style={{ width: '90%' }}
                    error={invalidFields.includes('address')}
                    helperText={invalidFields.includes('address') ? 'Please fill this field' : ''}
                />
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        style={{ width: '90%' }}
                        onClick={saveUserHandler}
                        disabled={loading}
                    >
                        Save user
                    </Button>
                    {loading && <Loading size={24} className={classes.buttonProgress}/>}
                </div>
            </form>
        </div>
    )
}

export default Create