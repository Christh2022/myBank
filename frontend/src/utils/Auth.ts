import type { User } from "./Types";


export async function requireAuth(): Promise<User> {
  const response = await fetch(`/auth/check`, {
    method: 'GET',
    credentials: 'include', // le cookie AUTH_TOKEN sera envoyé automatiquement
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Response("Unauthorized access", { status: 401 });
  }

  const data = await response.json();

  if (!data.user) {
    throw new Response("Unauthorized access: Token is not valid", { status: 401 });
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
  } as User;
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