import {useState, useEffect} from 'react'

export function useAuth(){
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('login')
        setAuthenticated(!!token)
    }, [])

    const login = (token: string) =>{
        localStorage.setItem('login', token)
        setAuthenticated(true)
    }

    const logout = (token: string) => {
        localStorage.setItem('logout', token)
        setAuthenticated(false)
    }

    return { isAuthenticated, login, logout }
}