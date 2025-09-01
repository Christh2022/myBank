import { parseAdresse } from "../utils/Auth";
import type { User } from "../utils/Types";

const API_URL = import.meta.env.VITE_API_URL_DEV;

export const UpdateUser = async (data: User, newObj: Partial<{prenom : string, nom: string, telephone: string, adresse: string}>) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Response("Unauthorized access: No token found", { status: 401 });
    }

    // Représentation à plat des données de `data`
    const original = {
        prenom: data.firstName,
        nom: data.lastName,
        telephone: data.phone,
        adresse: `${data.address} ${data.zip} ${data.city}, ${data.country}`,
    };

    const updatesContent: Partial<{ prenom: string; nom: string; telephone: string; adresse: string }> = {};

    // Comparaison de `newObj` avec `original`
    for (const key of Object.keys(newObj) as Array<keyof typeof original>) {
        if (
            newObj[key] !== undefined &&
            Object.prototype.hasOwnProperty.call(original, key) &&
            newObj[key] !== original[key]
        ) {
            updatesContent[key] = newObj[key];
        }
        }

    // Rien à mettre à jour ?
    if (Object.keys(updatesContent).length === 0) {
        console.log("Aucune donnée modifiée");
        return data;
    }
    console.log(data.id);

    // Requête PUT vers Symfony
    const response = await fetch(`${API_URL}/api/user/${data.id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatesContent),
    });

    if (!response.ok) {
        throw new Response("Erreur lors de la mise à jour de l'utilisateur", { status: response.status });
    }

    const res = await response.json();
    const result = parseAdresse(res.adresse)
    const obj = {
        firstName: res.prenom,
        lastName: res.nom,
        email: res.email,
        city: result.city,
        country: result.country,
        phone: res.telephone,
        zip: result.zip,
        address: result.address,
        id: res.id,
        profile: res.profile ?? '',
    }
    return obj as User; // Retourne les données de l'utilisateur mises à jour
};
