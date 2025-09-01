import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL_DEV;

export const getPaginatedCategory = async (id: number, page: number, limit: number) => {
  const token = localStorage.getItem("token");

  if (!token) {
      throw new Response("Unauthorized access: No token found", { status: 401 })
  }

  const response = await fetch(`${API_URL}/api/category/user/${id}?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
  });

  const res = await response.json();

  return res
}

export const addCategory = async (
  icon_name: string,
  title: string,
  description: string
) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Response("Unauthorized access: No token found", { status: 401 });
  }

  const response = await fetch(`${API_URL}/api/category`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      icon_name,
      title,
      description,
    })
  });

  const res = await response.json();
  return res;
};


export const updateCategory = async (data: {title: string, icon_name: string, description: string}, id: number) => {
  const token = localStorage.getItem('token')
  if (!token) throw new Response("Unauthorized access: No token found", { status: 401 })
  
  
  const response = await fetch(`${API_URL}/api/category/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })

  const res = await response.json()

  return res
}

export const deleteCategory = async (id: number) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Response("Unauthorized access: No token found", { status: 401 });

  const response = await fetch(`${API_URL}/api/category/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erreur API (${response.status}): ${text}`);
  }

  return await response.json();
};


export async function getCategoryByName(categoryName: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/category/by-name/${categoryName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    toast.error("une erreur s'est produite lors de la récupération de la catégorie");
    throw new Error("Impossible de récupérer la catégorie");
  }
   const categoryData = await response.json(); 
  console.log(categoryData);
  return categoryData;
}
