import type { User } from "./Types";

const API_URL = import.meta.env.VITE_API_URL_DEV;

export async function requireAuth(): Promise<User> {
    const token = localStorage.getItem('token');
    if (!token) {
       throw new Response("Unauthorized access: No token found", {status: 401});
    }

    // Check if the token is valid by making a request to the backend
    const response = await fetch(`${API_URL}/check`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    // If the response is not ok, throw an error
    if (!response.ok) {
        localStorage.removeItem('token');
        throw new Response("Unauthorized access: Invalid token", {status: 401});
    }

    // If the response is ok, parse the JSON and return the user data
    const data = await response.json();

    // Check if the token is valid
    if (!data.user) {
        throw new Response("Unauthorized access: Token is not valid", {status: 401});
    }
    const result = parseAdresse(data.user.adresse);
    return {
        firstName: data.user.prenom,
        lastName: data.user.nom,
        email: data.user.email,
        city: result.city,
        country: result.country,
        phone: data.user.telephone,
        zip: result.zip,
        address: result.address,
        id: data.user.id,
        profile: data.user.profile ?? '',
    } as User; // Return user data if needed
}

export function parseAdresse(adresse: string) {
  const regex = /^(.*)\s(\d{5})\s([^,]+)\s*,\s*(.+)$/;
  const match = adresse.match(regex);

  if (!match) {
    return {
      address: adresse,
      zip: '',
      city: '',
      country: ''
    };
  }

  return {
    address: match[1].trim(),
    zip: match[2],
    city: match[3].trim(),
    country: match[4].trim()
  };
}