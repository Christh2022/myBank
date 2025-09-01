const API_URL = import.meta.env.VITE_API_URL_DEV;

export async function LoginUser(email: string, password: string): Promise<string>{
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })

    if (!response.ok) throw new Error('Login failed');
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.token;
}


export async function RegisterUser(
    email: string,
    password: string,
    nom: string,
    prenom: string,
    adresse: string,
    telephone: string
  ): Promise<string> {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, nom, prenom, adresse, telephone }),
    });

    console.log(response, API_URL);
    console.log(API_URL);
    
  
    // 🟡 Vérifie que la réponse est bien 201
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Registration error:', errorText);
      throw new Error('Registration failed');
    }
  
    // 🟡 Essaie de lire la réponse en JSON de manière sûre
    let data;
    try {
      data = await response.json();
    } catch{
      throw new Error('Invalid JSON in response');
    }
  
    // ✅ Vérifie que le token est bien là
    if (!data.message) {
      console.error('Missing token in response:', data);
      throw new Error('Registration succeeded but token is missing');
    }

    return data.message;
  }


  