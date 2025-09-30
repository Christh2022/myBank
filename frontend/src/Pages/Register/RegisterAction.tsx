import { redirect, type ActionFunctionArgs } from 'react-router';
import { RegisterUser } from '../../Api/Auth';

export async function registerAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  // Récupération des champs
  const lastname = String(formData.get('lastname') || '').trim();
  const surname = String(formData.get('surname') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const address = String(formData.get('address') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const password = String(formData.get('password') || '');
  const confirmPassword = String(formData.get('confirmPassword') || '');

  // Regex pour validation
  const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=.?]).{8,}$/, // mot de passe fort
    text: /^[^<>]+$/, // texte sans < ou >
  };

  // Helper pour nettoyer les champs contre XSS
  const sanitizeInput = (value: string) => value.replace(/[<>]/g, '');

  // Nettoyage
  const clean = {
    lastname: sanitizeInput(lastname),
    surname: sanitizeInput(surname),
    email: sanitizeInput(email),
    address: sanitizeInput(address),
    phone: sanitizeInput(phone),
    password,
    confirmPassword,
  };

  // Vérification des champs requis
  if (
    !clean.email ||
    !clean.password ||
    !clean.lastname ||
    !clean.surname ||
    !clean.address ||
    !clean.phone
  ) {
    return { message: 'All fields are required.' };
  }

  // Vérification regex
  if (!regex.email.test(clean.email)) {
    return { message: 'Invalid email format.' };
  }
  if (!regex.password.test(clean.password)) {
    return {
      message:
        'Password must be at least 8 characters long and include uppercase, lowercase, number and special character.',
    };
  }
  if (
    !regex.text.test(clean.lastname) ||
    !regex.text.test(clean.surname) ||
    !regex.text.test(clean.address)
  ) {
    return { message: 'Invalid characters detected in text fields.' };
  }

  if (clean.confirmPassword !== clean.password) {
    return { message: 'Passwords do not match.' };
  }

  if (clean.phone.length > 10) {
    return { message: 'Phone number is too long' };
  }

  try {
    await RegisterUser(
      clean.email,
      clean.password,
      clean.lastname,
      clean.surname,
      clean.address,
      clean.phone
    );
    return redirect('/Login');
  } catch (err) {
    let message = 'Registration failed';
    if (err && typeof err === 'object' && 'message' in err) {
      message = String((err as { message?: string }).message);
    }
    return { message };
  }
}
