# 💳 MyBank – Fullstack App

MyBank est une application bancaire fullstack composée d’un **backend Symfony** et d’un **frontend React**, déployée avec **Docker** et automatisée via **GitHub Actions** + **GitHub Container Registry (GHCR)**.

---

## 🚀 Fonctionnalités principales
- Backend **Symfony 6** (API, gestion utilisateurs, sécurité JWT).
- Frontend **React** (interface utilisateur).
- Base de données **MySQL 8**.
- Interface de gestion **phpMyAdmin**.
- Proxy **Nginx**.
- CI/CD avec **GitHub Actions** et **Docker**.

---

## 🐳 Installation de Docker & Docker Compose

### Windows / macOS
1. Télécharger **Docker Desktop** :  
   👉 [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)  
2. Lancer Docker Desktop.  
3. Vérifier l’installation :  
   ```bash
   docker --version
   docker compose version

### Linux (Ubuntu/Debian)
    sudo apt update
    sudo apt install ca-certificates curl gnupg lsb-release
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt update
    sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin

## Génération des clés JWT (obligatoire)

Le backend utilise LexikJWTAuthenticationBundle pour sécuriser les API.
Avant de démarrer l’application pour la première fois, il faut générer les clés RSA :

mkdir -p backend/config/jwt
openssl genrsa -out backend/config/jwt/private.pem 2048
openssl rsa -in backend/config/jwt/private.pem -pubout -out backend/config/jwt/public.pem

👉 Ces fichiers doivent être présents dans backend/config/jwt/.
👉 Ne jamais partager la clé privée (private.pem) publiquement.

## Lancer l’application en local (dev)
docker compose -f docker-compose.dev.yml up --build


### Services disponibles :

Frontend → http://localhost:3000

Backend (Symfony API) → http://localhost:8000

PhpMyAdmin → http://localhost:8080

Nginx → http://localhost

### Arrêter les conteneurs :

docker compose down

## Tests
### Backend (Symfony + PHPUnit)
    Le backend inclut des tests unitaires et fonctionnels avec PHPUnit.
    
    Copier le fichier .env.test :
    
    cp backend/.env.test backend/.env


### Créer la base de données de test :
    docker compose exec backend php bin/console doctrine:database:create --env=test
    docker compose exec backend php bin/console doctrine:migrations:migrate --no-interaction --env=test


### Lancer les tests :

docker compose exec backend php bin/phpunit


👉 Exemple pour lancer uniquement un test spécifique :

docker compose exec mybank_backend php bin/phpunit --filter testRegister


## CI/CD (Intégration & Déploiement Continu)
Intégration Continue (CI)

Chaque push sur main déclenche un workflow GitHub Actions qui :

Lance les tests PHPUnit du backend.

Construit les images Docker (backend + frontend).

Publie ces images sur le GitHub Container Registry (GHCR).

Déploiement Continu (CD)

Sur le serveur de production, on utilise docker-compose.prod.yml (basé sur les images GHCR).

Mise à jour en production :

docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d


👉 Cela télécharge les dernières images générées par GitHub Actions et redémarre les conteneurs.
