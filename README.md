# myBank
Objectif

Mettre en place un pipeline CI/CD pour :

Vérifier que le backend Symfony fonctionne (tests PHPUnit, migrations).

Construire et publier les images Docker du backend et du frontend sur le GitHub Container Registry (GHCR).

Déployer l’application avec Docker Compose (local/dev ou production).

⚙️ 1. Intégration Continue (CI)

Le fichier .github/workflows/ci.yml exécute les étapes suivantes à chaque push ou pull request sur main :

Étapes du pipeline

Checkout du code

- uses: actions/checkout@v4


Récupère le code source.

Préparation des clés JWT
Génération des clés privées/publiques nécessaires à Symfony.

Configuration de l’environnement Symfony
Copie du .env.test en .env.

Installation des dépendances PHP

composer install


Base de données de test

Lancement d’un service MySQL (via services: dans GitHub Actions).

Création de la DB de test.

Exécution des migrations.

Tests unitaires

php bin/phpunit


Build & Push Docker

Configuration de buildx.

Connexion à GHCR avec ${{ secrets.GITHUB_TOKEN }}.

Build + push de :

ghcr.io/christh2022/mybank/backend:latest

ghcr.io/christh2022/mybank/frontend:latest

👉 Résultat : chaque modification validée sur main génère automatiquement de nouvelles images Docker.

📦 2. Livraison Continue (CD)

Deux options :

🔹 Environnement local/dev

Utiliser le docker-compose.yml (build localement les images) :

docker-compose up --build


Frontend accessible sur http://localhost:3000

Backend Symfony sur http://localhost:8000

PhpMyAdmin sur http://localhost:8080

Nginx (reverse proxy) sur http://localhost

🔹 Environnement de production

Créer un fichier docker-compose.prod.yml qui récupère les images depuis GHCR au lieu de les builder localement :

version: "3.9"

services:
  frontend:
    image: ghcr.io/christh2022/mybank/frontend:latest
    container_name: mybank_frontend
    restart: always
    ports:
      - "3000:80"
    depends_on:
      - backend

  backend:
    image: ghcr.io/christh2022/mybank/backend:latest
    container_name: mybank_backend
    restart: always
    environment:
      - DATABASE_URL=mysql://root:root@db:3306/mybank?serverVersion=8.0
    ports:
      - "8000:8000"
    depends_on:
      - db

  db:
    image: mysql:8.3
    container_name: mybank_db
    restart: always
    environment:
      MYSQL_DATABASE: mybank
      MYSQL_ROOT_PASSWORD: root
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    volumes:
      - db_data:/var/lib/mysql
    ports:
      - "3306:3306"

  nginx:
    image: nginx:1.28.0-alpine-slim
    container_name: mybank_nginx
    ports:
      - "80:80"
    volumes:
      - ./docker/nginx/default.config:/etc/nginx/conf.d/default.config:ro
    depends_on:
      - frontend
      - backend

volumes:
  db_data:

🚀 Déploiement prod

Se connecter à GHCR sur le serveur :

echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin


(où GITHUB_TOKEN est un PAT (Personal Access Token) avec le scope read:packages).

Lancer le stack :

docker-compose -f docker-compose.prod.yml up -d

🧪 Résumé du flux CI/CD

Dev push sur main ⏩

GitHub Actions lance tests Symfony + build images ⏩

Images Docker envoyées sur GHCR ⏩

Serveur de prod tire les nouvelles images via docker-compose.prod.yml ⏩

Déploiement automatique et reproductible 🎉