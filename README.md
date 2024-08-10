# CodeBrewersHackathon

Code Brewers Hackathon 2024 - FullStack Track

Features -

1 - Code Playground and Question Bank - User can start solving any question they want from the question bank - User can give their own input and see the output - Users will get the output and the performance metrics of their code - Users can upload their own questions and test cases

2 - Code Battleground - Users can participate in the contest going in the website - Users can see the leaderboard - Users can conduct their own contest

3 - Security - Malicious code protection in the backend

4 - User Experience - Dark Mode - User Friendly UI - Vim Mode - Code editor with syntax highlighting and auto completion - Forum to discuss

```
|-- .gitignore
|-- docker
    |-- c
        |-- Dockerfile
    |-- cpp
        |-- Dockerfile
    |-- java
        |-- Dockerfile
    |-- javascript
        |-- Dockerfile
    |-- python
        |-- Dockerfile
    |-- rust
        |-- Dockerfile
|-- LICENSE
|-- package-lock.json
|-- package.json
|-- README.md
|-- src
    |-- Backend
        |-- .env
        |-- app.js
        |-- auth
            |-- passport.js
        |-- controllers
            |-- authController.js
            |-- codeExecutionController.js
        |-- middleware
            |-- globalLimiter.js
        |-- models
            |-- User.js
        |-- package-lock.json
        |-- package.json
        |-- routes
            |-- authRoutes.js
            |-- codeExecution.js
        |-- utils
            |-- fileCleanup.js
            |-- passwordUtils.js
    |-- Frontend
        |-- eslint.config.js
        |-- index.html
        |-- package-lock.json
        |-- package.json
        |-- src
            |-- assets
                |-- images
                    |-- hero_image.jpg
            |-- components
                |-- FeaturesSection
                    |-- FeaturesSection.jsx
                |-- Footer
                    |-- Footer.jsx
                |-- HeroSection
                    |-- HeroSection.jsx
                |-- Landing
                    |-- Landing.jsx
                |-- Layout
                    |-- Layout.jsx
                |-- Navbar
                    |-- Navbar.jsx
            |-- main.jsx
            |-- main.scss
            |-- routes
                |-- App.jsx
                |-- pages
                    |-- Addquestionpage.jsx
                    |-- Codingpage.jsx
                    |-- Contestpage.jsx
                    |-- Homepage.jsx
                    |-- Questionpage.jsx
                    |-- Userpage.jsx
        |-- vite.config.js
    |-- solutions
        |-- solutions
        |-- solutions.c
        |-- solutions.cpp
        |-- solutions.js
        |-- solutions.py
        |-- solutions.rs
    |-- src
        |-- solutions

```
