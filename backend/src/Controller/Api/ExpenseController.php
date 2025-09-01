<?php

namespace App\Controller\Api;

use App\Entity\Expense;
use App\Repository\BankCardsRepository;
use App\Repository\CategoryRepository;
use App\Repository\ExpenseRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;


#[Route('/api/expense')]
class ExpenseController extends AbstractController
{
    #[Route('', methods: ['GET'], name: 'app_api_expense')]
    public function index(ExpenseRepository $expenseRepository): JsonResponse
    {
        $user = $this->getUser();
        $expenses = $expenseRepository->findBy(['user' => $user]);

        return $this->json($expenses, 200, [], ['groups' => ['expense:read', 'category:read', 'bankcards:read']]);
    }


    #[Route('', methods: ['POST'], name: 'create_expense')]
    public function create(
        BankCardsRepository $bankCardsRepository,
        Request $request,
        EntityManagerInterface $em,
        CategoryRepository $categoryRepository,
        ValidatorInterface $validator,
    ): JsonResponse {
        

        $data = json_decode($request->getContent(), true);
        $user = $this->getUser();

        $expense = new Expense();
        $expense->setDate(new \DateTime());
        $expense->setAmount($data['amount'] ?? null);
        $expense->setStatus($data['status'] ?? null);
        $expense->setLabel($data['label'] ?? null);

        // Vérifier la carte bancaire si fournie
        if (!empty($data['bankCards'])) {
            $bankCard = $bankCardsRepository->find($data['bankCards']);
            if (!$bankCard || $bankCard->getUser() !== $user) {
                return $this->json(['error' => 'Invalid bank card'], 400);
            }
            $expense->setBankCards($bankCard);
        }

        // Vérifier la catégorie
        if (!empty($data['category'])) {
            $category = $categoryRepository->find($data['category']);
            if (!$category || $category->getUser() !== $user) {
                return $this->json(['error' => 'Invalid category'], 400);
            }
            $expense->setCategory($category);
        }

        // Utiliser toujours l’utilisateur connecté
        $expense->setUser($user);

        // Validation des données
        $errors = $validator->validate($expense);
        if (count($errors) > 0) {
            return $this->json(['error' => 'Invalid data provided'], 400);
        }

        $em->persist($expense);
        $em->flush();

        return $this->json($expense, 201, [], ['groups' => ['expense:read', 'category:read']]);
    }

    #[Route('/{id}', methods: ['PUT'], name: 'update_expense_by_id')]
    public function update(
        int $id,
        Request $request,
        ExpenseRepository $expenseRepository,
        EntityManagerInterface $em,
        CategoryRepository $categoryRepository,
        ValidatorInterface $validator,
    ): JsonResponse {
        

        $user = $this->getUser();
        $expense = $expenseRepository->find($id);

        if (!$expense || $expense->getUser() !== $user) {
            return $this->json(['error' => 'Resource not accessible'], 403);
        }

        $data = json_decode($request->getContent(), true);

        $expense->setAmount($data['amount'] ?? $expense->getAmount());
        $expense->setStatus($data['status'] ?? $expense->getStatus());
        $expense->setLabel($data['label'] ?? $expense->getLabel());

        if (!empty($data['category'])) {
            $category = $categoryRepository->find($data['category']);
            if ($category) {
                $expense->setCategory($category);
            }
        }

        // Validation
        $errors = $validator->validate($expense);
        if (count($errors) > 0) {
            return $this->json(['error' => 'Invalid data provided'], 400);
        }

        $em->flush();

        return $this->json($expense, 200, [], ['groups' => ['expense:read', 'category:read']]);
    }

    #[Route('/{id}', methods: ['DELETE'], name: 'delete_expense_by_id')]
    public function delete(int $id, ExpenseRepository $expenseRepository, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        $expense = $expenseRepository->find($id);

        if (!$expense || $expense->getUser() !== $user) {
            return $this->json(['error' => 'Resource not accessible'], 403);
        }

        $em->remove($expense);
        $em->flush();

        return $this->json(['message' => 'Expense deleted successfully'], 200);
    }
}
