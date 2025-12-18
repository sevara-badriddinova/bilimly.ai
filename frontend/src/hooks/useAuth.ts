import {useState, useEffect} from 'react'

export function useAuth(){
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token')
        setAuthenticated(!!token)
    }, [])

    const login = (token: string) =>{
        localStorage.setItem('token', token)
        setAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setAuthenticated(false)
    }

    const getToken = () => {
        return localStorage.getItem('token')
    }

    return { isAuthenticated, login, logout, getToken }
}