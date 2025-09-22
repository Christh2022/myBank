<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

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

        // Login avec utilisateur existant
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
        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('token', $data);

        $token = $data['token'];

        // Accès à une route protégée avec token valide
        $client->request(
            'GET',
            '/check', // remplacer par ta route protégée
            [],
            [],
            [
                'HTTP_Authorization' => 'Bearer ' . $token,
                'CONTENT_TYPE' => 'application/json'
            ]
        );

        $this->assertResponseIsSuccessful();
        $this->assertJson($client->getResponse()->getContent());

        $userData = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('user', $userData);
        $this->assertSame('testuser100@example.com', $userData['user']['email']);
        fwrite(STDOUT, "{Status: 200, data: `{$userData['user']['email']}`}\n");
    }

    public function testAccessWithoutToken(): void
    {
        $client = static::createClient();

        $client->request(
            'GET',
            '/check', // route protégée
            [],
            [],
            ['CONTENT_TYPE' => 'application/json']
        );

        $this->assertResponseStatusCodeSame(401);
        $this->assertStringContainsString('Accès non autorisé', $client->getResponse()->getContent());
    }

    public function testAccessWithInvalidToken(): void
    {
        $client = static::createClient();

        $client->request(
            'GET',
            '/check',
            [],
            [],
            [
                'HTTP_Authorization' => 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTA2MzEzNzAsImV4cCI6MTc1MDYzNDk3MCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidGVzdHVzZXIwNEBleGFtcGxlLmNvbSJ9.ob19itXt_UXtqiUM_lZmkk0r0l7sxHlkMTDePmuNtBskt8x1Qc7lqz_pHwyDkaWaEqM0qFVapQj4v_HYPWr897p7vu8AQXOwYPAAFdaGZTOZgPbLZNK6IxrMV5zOI1b-8xnu7dLBjMnBow2OOicTEIJypxxqVF7zXzt22EuSWj0I2U9QSI8yhCB9Bgi9PyWh8j5I9yF3zevRz88p-u7V-uKTJdF1CszUNmzsIzlIAzHMFAYB6gFAEZr1H6xqmV4IX1mF8nTujGFZ6YwkDo3m7YuK6QUd5dLI0KZTbgtcy5MIFrU_L5Z77dMDfendZnc-3Ke5wY1HNaqhzQY6XNjFeAPgCHAGUX-E6RuXVyaZHqoyHhWfgOgNuagFlB55Fs22StDCBFe81vYEhEIo0nNKc1vBxP3xHgXXokIVt9qQSj1HwBROb7j2B_uplr3DMDsalsMBp7wrI3ebSfGWMVQ6m42kh4av4sDaxLZ7ZEUkbgrfg6Mxdl7ST00FlVGu_3_dmmwS2leTMHAAZLDf2IaE1-sn1pHsmRhE8MUF3YvjlwPsHFCNIUY2kCV89lwOX6i0_LMrJcwkijxX--a_ex14j1JFkaBJkoe1YF9Akqr94Fd5DOjW7rLh04VzJQbhsBtUpyDSFE2CsnOhqKHFaht1dna5tPs6CsqeG3kZA5z8DCg',
                'CONTENT_TYPE' => 'application/json'
            ]
        );

        $this->assertResponseStatusCodeSame(403);
        fwrite(STDOUT, "{Status: 403, data: 'Invalid token' }\n");
        // $this->assertStringContainsString('Invalid token', $client->getResponse()->getContent());
    }

    public function testAccessWithExpiredToken(): void
    {
        $client = static::createClient();

        $expiredToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTA2MzEzNzAsImV4cCI6MTc1MDYzNDk3MCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidGVzdHVzZXIwNEBleGFtcGxlLmNvbSJ9.ob19itXt_UXtqiUM_lZmkk0r0l7sxHlkMTDePmuNtBskt8x1Qc7lqz_pHwyDkaWaEqM0qFVapQj4v_HYPWr897p7vu8AQXOwYPAAFdaGZTOZgPbLZNK6IxrMV5zOI1b-8xnu7dLBjMnBow2OOicTEIJypxxqVF7zXzt22EuSWj0I2U9QSI8yhCB9Bgi9PyWh8j5I9yF3zevRz88p-u7V-uKTJdF1CszUNmzsIzlIAzHMFAYB6gFAEZr1H6xqmV4IX1mF8nTujGFZ6YwkDo3m7YuK6QUd5dLI0KZTbgtcy5MIFrU_L5Z77dMDfendZnc-3Ke5wY1HNaqhzQY6XNjFeAPgCHAGUX-E6RuXVyaZHqoyHhWfgOgNuagFlB55Fs22StDCBFe81vYEhEIo0nNKc1vBxP3xHgXXokIVt9qQSj1HwBROb7j2B_uplr3DMDsalsMBp7wrI3ebSfGWMVQ6m42kh4av4sDaxLZ7ZEUkbgrfg6Mxdl7ST00FlVGu_3_dmmwS2leTMHAAZLDf2IaE1-sn1pHsmRhE8MUF3YvjlwPsHFCNIUY2kCV89lwOX6i0_LMrJcwkijxX--a_ex14j1JFkaBJkoe1YF9Akqr94Fd5DOjW7rLh04VzJQbhsBtUpyDSFE2CsnOhqKHFaht1dna5tPs6CsqeG3kZA5z8DCg'; // remplace par un vrai token expiré si possible

        $client->request(
            'GET',
            '/check',
            [],
            [],
            [
                'HTTP_Authorization' => 'Bearer ' . $expiredToken,
                'CONTENT_TYPE' => 'application/json'
            ]
        );

        $this->assertResponseStatusCodeSame(401); 
        $this->assertStringContainsString('Token expired', $client->getResponse()->getContent());
    }
}
