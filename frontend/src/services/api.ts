const API_URL = import.meta.env.VITE_API_URL || '';

export async function registerUser(email: string, password: string){
    const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    });
    return await res.json();
}

export async function loginUser(email: string, password: string){
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    });
    return await res.json();
}