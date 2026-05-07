const API_URL = import.meta.env.VITE_API_URL || '';

async function parseAuthResponse(res: Response) {
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.error || data.message || "Authentication failed");
    }
    if (!data.token) {
        throw new Error("Authentication response did not include a token");
    }
    return data as { token: string; message?: string };
}

export async function registerUser(email: string, password: string, name?: string, nativeLanguage: string = "uz"){
    const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password, name, nativeLanguage})
    });
    return parseAuthResponse(res);
}

export async function loginUser(email: string, password: string){
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    });
    return parseAuthResponse(res);
}

// Fetch current user with authentication token
export async function getCurrentUser(token: string){
    const res = await fetch(`${API_URL}/api/auth/me`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch user data');
    }

    return await res.json();
}

export async function sendAiChat(token: string, message: string, systemPrompt?: string) {
    const res = await fetch(`${API_URL}/api/ai/chat`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message, systemPrompt })
    });

    const text = await res.text();
    if (!res.ok) {
        let errorMessage = "AI chat failed";
        try {
            const data = JSON.parse(text);
            errorMessage = data.error || data.message || errorMessage;
        } catch {
            errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
    }

    return text;
}
