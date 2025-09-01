import { redirect, type ActionFunctionArgs } from 'react-router';
import { RegisterUser } from '../../Api/Auth';

export async function registerAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const lastname = formData.get('lastname');
  const surname = formData.get('surname');
  const email = formData.get('email');
  const address = formData.get('address'); // <-- Correction ici
  const phone = formData.get('phone');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword')

  // Vérification des types
  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof lastname !== 'string' ||
    typeof surname !== 'string' ||
    typeof address !== 'string' ||
    typeof phone !== 'string'
  ) {
    return { message: 'All fields are required.' };
  }
  
  
  if (confirmPassword !== password) {
    return { message: 'Passwords do not match.' };
  }

  

  try {
    await RegisterUser(email, password, lastname, surname, address, phone);
    return redirect('/Login');
  } catch (err) {
    let message = 'Registration failed';
    if (err && typeof err === 'object' && 'message' in err) {
      message = String((err as { message?: string }).message);
    }
    return { message };
  }
}
