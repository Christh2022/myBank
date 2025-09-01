<?php

namespace App\Controller\Api;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use App\Repository\ExpenseRepository;
use Doctrine\ORM\EntityManagerInterface;
use Pagerfanta\Pagerfanta;
use Pagerfanta\Doctrine\ORM\QueryAdapter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/category')]
class CategoryController extends AbstractController
{
    #[Route('', methods: ['GET'], name: 'get_all_category')]
    public function index(Request $request,  CategoryRepository $categoryRepository): JsonResponse
    {
        // Paramètres de pagination depuis la requête
        $page = max(1, (int) $request->query->get('page', 1));
        $limit = max(1, (int) $request->query->get('limit', 12));

        // Utilisation d'un QueryBuilder pour la pagination
        $qb = $categoryRepository->createQueryBuilder('c');

        $adapter = new QueryAdapter($qb); // ✅ Bon adaptateur
        $pagerfanta = new Pagerfanta($adapter);
        $pagerfanta->setMaxPerPage($limit);
        $pagerfanta->setCurrentPage($page);

        // Données paginées
        $categories = iterator_to_array($pagerfanta->getCurrentPageResults());

        // Réponse JSON
        return $this->json([
            'data' => $categories,
            'pagination' => [
                'current_page' => $pagerfanta->getCurrentPage(),
                'total_pages' => $pagerfanta->getNbPages(),
                'total_items' => $pagerfanta->getNbResults(),
                'items_per_page' => $pagerfanta->getMaxPerPage(),
            ]
        ], 200, [], ['groups' => ['category:read', 'expense:read', 'user:read']]);
    }

    #[Route('/{id}', methods: ['GET'], name: 'get_category_by_id')]
    public function show(int $id, CategoryRepository $categoryRepository): JsonResponse
    {
        $category = $categoryRepository->find($id);
        if (!$category) {
            return $this->json(['error' => 'Category not found'], 404);
        }
        return $this->json($category, 200, [], ['groups' => ['category:read', 'expense:read', 'user:read']]);
    }

    #[Route('/{id}', methods: ['DELETE'], name: 'delete_category_by_id')]
    public function delete(int $id, CategoryRepository $categoryRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $category = $categoryRepository->find($id);
        if (!$category) {
            return $this->json(['error' => 'Category not found'], 404);
        }

        $category->setShowCategory(false);
        $entityManager->flush();

        return $this->json(['message' => 'Category deleted successfully']);
    }

    #[Route('', methods: ['POST'], name: 'create_category')]
    public function create(CategoryRepository $categoryRepository, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (empty($data['title']) && empty($data['icon_name'])) {
            return $this->json(['error' => 'Category title and icon name are required'], 400);
        }

        $category = new Category();
        $category->setShowCategory(true);
        $category->setTitle($data['title']);
        $category->setIconName($data['icon_name']);
        if (isset($data['description'])) {
            $category->setDescription($data['description']);
        }
        $category->setDate(new \DateTime());
        $category->setUser($this->getUser()); 
        
        $entityManager->persist($category);
        $entityManager->flush();

        return $this->json($category, 201, [], ['groups' => ['category:read', 'user:read', 'expense:read']]);
    }

    #[Route('/{id}', methods: ['PUT'], name: 'update_category_by_id')]
    public function update(int $id, CategoryRepository $categoryRepository, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Assuming the request body contains the updated category data
        $data = json_decode($request->getContent(), true);

        if (empty($data['title'])) {
            return $this->json(['error' => 'Category title is required'], 400);
        }

        $category = $categoryRepository->find($id);
        if (!$category) {
            return $this->json(['error' => 'Category not found'], 404);
        }

        // Update the category properties
        $category->setTitle($data['title']);
        if (isset($data['icon_name'])) {
            $category->setIconName($data['icon_name']);
        }

        if (isset($data['description'])) {
            $category->setDescription($data['description']);
        }

        $entityManager->flush();
        return $this->json($category, 200, [], ['groups' => ['category:read', 'expense:read', 'user:read']]);
    }

    

    #[Route('/expense/{id}', methods: ['GET'], name: 'get_expenses_by_category_id')]
    public function getExpensesByCategoryId(int $id, ExpenseRepository $expenseRepository): JsonResponse
    {
        $expenses = $expenseRepository->findBy(['category' => $id]);
        if (!$expenses) {
            return $this->json(['error' => 'No expenses found for this category'], 404);
        }
        return $this->json($expenses, 200, [], ['groups' => ['expense:read', 'category:read', 'user:read']]);
    }

    #[Route('/user/{id}', methods: ['GET'], name: 'get_categories_by_user_id')]
    public function getCategoriesByUserId(int $id, Request $request, CategoryRepository $categoryRepository): JsonResponse
    {
        $page = max(1, (int) $request->query->get('page', 1));
        $limit = max(1, (int) $request->query->get('limit', 15));

        $qb = $categoryRepository->createQueryBuilder('c')
            ->where('c.user = :user')
            ->setParameter('user', $id);

        $adapter = new QueryAdapter($qb);
        $pagerfanta = new Pagerfanta($adapter);
        $pagerfanta->setMaxPerPage($limit);
        $pagerfanta->setCurrentPage($page);

        $categories = iterator_to_array($pagerfanta->getCurrentPageResults());

        return $this->json([
            'data' => $categories,
            'pagination' => [
                'current_page' => $pagerfanta->getCurrentPage(),
                'total_pages' => $pagerfanta->getNbPages(),
                'total_items' => $pagerfanta->getNbResults(),
                'items_per_page' => $pagerfanta->getMaxPerPage(),
            ]
        ], 200, [], ['groups' => ['category:read', 'expense:read', 'user:read']]);
    }

    #[Route('/by-name/{name}', methods: ['GET'], name: 'get_category_by_name')]
    public function getCategoryByName(string $name, CategoryRepository $categoryRepository): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['error' => 'Unauthorized'], 401);
        }

        // Vérifie en une seule ligne si la catégorie appartient à l'utilisateur
        $category = $categoryRepository->findOneBy([
            'title' => $name,
            'user'  => $user,
            'showCategory' => true
        ]);

        if (!$category) {
            return $this->json(['error' => 'Category not found or does not belong to the user'], 404);
        }

        return $this->json(
            ['id'=> $category->getId()],
            200,
            [],
            ['groups' => ['category:read', 'expense:read', 'user:read']]
        );
    }
}
