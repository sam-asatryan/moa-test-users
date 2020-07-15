import { request }             from '../request'
import { TUser }               from '../types/user'
import { convertStringToDate } from './date-service'

const saveUser = async (user: TUser) => {
    user.birthDate = convertStringToDate(user.birthDate)
    return request.post('/user', user)
}

const getUsers = async () => {
    const response = await request.get('/users')
    return response.data
}

const getUser = async (id: string) => {
    const response = await request.get(`/users/${id}`)
    return response.data
}

const updateUser = async (user: TUser) => {
    await request.put(`/users/${user.id}`, user)
}

const deleteUser = async (id: string) => {
    const response = await request.delete(`/users/${id}`)
    return response.data
}

export {
    saveUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
}