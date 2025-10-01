import { toast } from "react-toastify";
import type { Expenses } from "../utils/Types";


export async function createTransaction(transaction: Expenses) {
  const response = await fetch(`/api/expense`, {
    method: "POST",
    headers: { "Content-Type": "application/json",},
    credentials: 'include',
    body: JSON.stringify(transaction),
  });

  if (!response.ok) {
    toast.error("Erreur lors de la création de la transaction");
    throw new Error("Erreur lors de la création");
  }
  const data = await response.json();
  console.log(data);
  
  return data;
}

export async function updateTransaction(id: number, updates: Expenses) {
  const response = await fetch(`/api/expense/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify(updates),
  });

  if (!response.ok) throw new Error("Erreur lors de la mise à jour");
  return await response.json();
}

export async function deleteTransaction(id: number) {
  const response = await fetch(`/api/expense/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
  });

  if (!response.ok) throw new Error("Erreur lors de la suppression");
  return await response.json();
}

export async function getTransactions() {
  const response = await fetch(`/api/expense/`, 
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    });
  if (!response.ok) throw new Error("Aucune transaction trouvée pour cet utilisateur");
  return await response.json();
}