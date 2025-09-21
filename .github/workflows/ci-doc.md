# 🚀 CI/CD Pipeline – MyBank

Ce projet utilise **GitHub Actions** pour automatiser les tests, la construction d’images Docker et le déploiement.

## 🔄 Étapes du pipeline

1. **CI (Continuous Integration)**
   - Installation des dépendances Symfony
   - Préparation de la base MySQL pour les tests
   - Lancement des migrations
   - Exécution des tests PHPUnit
   - Build de l’application React (frontend)

2. **CD (Continuous Deployment)**
   - Construction des images Docker (backend & frontend)
   - Publication automatique sur GitHub Container Registry (GHCR)
   - Déploiement automatique selon l’environnement cible

## 🌍 Environnements
- **dev** → Développeurs en local  
- **test** → Tests automatisés CI (GitHub Actions)  
- **staging** → Pré-production (branche `develop`)  
- **production** → Prod (branche `main`)  

## 📦 Tags Docker
- `ghcr.io/chrimoigfse/mybank/backend:dev`
- `ghcr.io/chrimoigfse/mybank/backend:staging`
- `ghcr.io/chrimoigfse/mybank/backend:prod`
- Idem pour `frontend`

## 🔐 Secrets utilisés
- `MYSQL_PASSWORD`
- `JWT_SECRET`
- `PROD_SERVER_HOST`, `PROD_SERVER_USER` (pour déploiement)
