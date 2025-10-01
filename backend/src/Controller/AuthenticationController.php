<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationSuccessResponse;
class AuthenticationController extends AbstractController
{

    #[Route('/auth/login', name: 'api_login', methods: ['POST'])]
    public function index(
        #[CurrentUser] ?User $user,
        JWTTokenManagerInterface $jwtManager
    ): JsonResponse {
        if (!$user) {
            return $this->json(['error' => 'invalid_credentials'], 401);
        }

        $token = $jwtManager->create($user);

        // Juste renvoyer le token en JSON, le cookie sera géré par le listener
        return new JsonResponse(['token' => $token]);
    }



    #[Route('/auth/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {
        // The logout route is handled by the security system, so we can just return a success message.
        return $this->json(['message' => 'Logged out successfully'], 200);
    }

    #[Route('/auth/refresh', name: 'api_refresh', methods: ['POST'])]
    public function refresh(#[CurrentUser] ?User $user, JWTTokenManagerInterface $jwtManager): JsonResponse
    {
        if (!$user) {
            return $this->json(['error' => 'invalid_credentials'], 401);
        }

        return $this->json(['token' => $jwtManager->create($user)], 200, [], ['groups' => ['user:read']]);
    }

    #[Route('/auth/check', name: 'api_check', methods: ['GET'])]
    public function check(#[CurrentUser] ?User $user): JsonResponse
    {
        if (!$user) {
            return $this->json(['error' => 'invalid_credentials'], 401);
        }

        return $this->json(['user' => $user], 200, [], ['groups' => ['user:read']]);
    }

    #[Route('/auth/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        UserRepository $userRepository,
        ValidatorInterface $validator
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (empty($data['nom']) || empty($data['prenom']) || empty($data['email']) || empty($data['password'])) {
            return $this->json(['error' => 'Invalid input'], 400);
        }

        // Nettoyage des données
        $nom = strip_tags(trim($data['nom']));
        $prenom = strip_tags(trim($data['prenom']));
        $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
        $adresse = isset($data['adresse']) ? strip_tags(trim($data['adresse'])) : null;
        $telephone = isset($data['telephone']) ? strip_tags(trim($data['telephone'])) : null;

        // Vérification utilisateur existant
        if ($userRepository->findOneBy(['email' => $email])) {
            // Réponse générique (éviter enumeration d’emails)
            return $this->json(['message' => 'If the registration is valid, you will receive an email'], 201);
        }

        // Création du user
        $user = new User();
        $user->setNom($nom);
        $user->setPrenom($prenom);
        $user->setEmail($email);
        $user->setPassword($passwordHasher->hashPassword($user, $data['password']));
        $user->setRole('ROLE_USER'); // toujours forcer côté serveur
        $user->setAdresse($adresse);
        $user->setTelephone($telephone);
        $user->setCreatedAt(new \DateTimeImmutable());

        // Validation entité
        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $errMsgs = [];
            foreach ($errors as $error) {
                $errMsgs[] = $error->getPropertyPath() . ': ' . $error->getMessage();
            }
            return $this->json(['error' => 'Invalid input data'], 400);
        }

        // Sauvegarde
        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json(['message' => 'User registered successfully'], 201);
    }
}
