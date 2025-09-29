<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\BrowserKit\Cookie;

class AuthenticationControllerTest extends WebTestCase
{
    public function testRegister(): void
    {
        $client = static::createClient();

        $client->request(
            'POST',
            '/register',
            [],
            [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'email' => 'testuser100@example.com',
                'password' => 'TestPassword123!',
                'nom' => 'Test16',
                'prenom' => 'User',
                'adresse' => '123 rue de test',
                'telephone' => '0600000000'
            ])
        );

        $this->assertResponseStatusCodeSame(201);
        $this->assertJson($client->getResponse()->getContent());
        $this->assertStringContainsString('User registered successfully', $client->getResponse()->getContent());
        fwrite(STDOUT, "1) {Status: 201, Message: 'User registered successfully'}\n");
    }

    public function testGetUser(): void
    {
        $client = static::createClient();

        $client->request(
            'POST',
            '/login',
            [],
            [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'email' => 'testuser100@example.com',
                'password' => 'TestPassword123!'
            ])
        );

        $this->assertResponseIsSuccessful();

        $response = $client->getResponse();
        $data = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('token', $data);

        $cookies = $response->headers->getCookies();
        $this->assertIsArray($cookies); 

        foreach ($cookies as $cookie) {
            $this->assertInstanceOf(\Symfony\Component\HttpFoundation\Cookie::class, $cookie);
        }
        $token = $data['token'];

        // Accéder à la route protégée en utilisant le JWT
        $client->request(
            'GET',
            '/check',
            [],
            [],
            ['HTTP_Authorization' => 'Bearer ' . $token]
        );

        $this->assertResponseIsSuccessful();
        $this->assertJson($client->getResponse()->getContent());

        // Vérifier les données utilisateur
        $userData = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('user', $userData);
        fwrite(STDOUT, "{Status: 200, data: 'Connexion Réussie'}\n");
    }

    public function testAccessWithoutToken(): void
    {
        $client = static::createClient();

        // Pas de login → pas de cookie AUTH_TOKEN injecté
        $client->request('GET', '/check');

        // On attend un 401 Unauthorized
        $this->assertResponseStatusCodeSame(401);

        // Vérifie que le message d'erreur est bien présent dans la réponse
        $content = $client->getResponse()->getContent();
        $this->assertNotEmpty($content, 'Response content should not be empty on unauthorized request');
        $this->assertStringContainsString('Accès non autorisé', $content);
    }


    public function testAccessWithInvalidToken(): void
    {
        $client = static::createClient();

        // Simuler un cookie AUTH_TOKEN invalide
        $invalidCookie = new Cookie(
            'AUTH_TOKEN',
            'fake.invalid.jwt.token',
            time() + 3600,
            '/',
            'localhost',
            true,
            true
        );

        $client->getCookieJar()->set($invalidCookie);

        // Tentative d'accès à la route protégée
        $client->request('GET', '/check');

        // On attend un 403 Forbidden (ou 401 selon ton firewall)
        $this->assertResponseStatusCodeSame(403);

        fwrite(STDOUT, "{Status: 403, data: 'Invalid token' }\n");
    }


    public function testAccessWithExpiredToken(): void
    {
        $client = static::createClient();

        // Ici tu peux soit mettre un vrai JWT expiré, soit une valeur bidon 
        // (le but étant de simuler un cookie dont l'expiration est passée)
        $expiredToken = 'fake.expired.jwt.token';

        // Cookie AUTH_TOKEN expiré (date dans le passé)
        $expiredCookie = new Cookie(
            'AUTH_TOKEN',
            $expiredToken,
            time() - 3600,  // ⏳ déjà expiré
            '/',
            'localhost',
            true,   // secure
            true    // httponly
        );

        $client->getCookieJar()->set($expiredCookie);

        // Tentative d'accès à la route protégée
        $client->request('GET', '/check');

        // On attend une erreur 401 Unauthorized
        $this->assertResponseStatusCodeSame(401);

        // Vérifie que la réponse contient bien une indication "token expiré"
        $this->assertStringContainsString('Token expired', $client->getResponse()->getContent());
    }
}
