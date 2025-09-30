import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL_DEV; 

export async function   getBankCardByNumber(cardNumber: string) {

    const response = await fetch(`${API_URL}/api/bankcards/by-number/${cardNumber}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: 'include',
    });

    if (!response.ok) {
        toast.error('Impossible de récupérer la carte bancaire');
        throw new Error("Impossible de récupérer la carte bancaire");
    }
    const cardData = await response.json();
    console.log(cardData);
    return cardData;
}

export async function addBankCard(cardData: number) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(cardData),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la carte bancaire");
    }

    return await response.json();
}





