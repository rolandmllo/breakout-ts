# Breakout Game - TypeScript

Welcome to the Breakout Game! This project is a simple implementation of the classic Breakout game using TypeScript, HTML, and CSS. The project is built using Vite for a fast and optimized development experience.

## Table of Contents

- [Game Overview](#game-overview)
- [Features](#features)
- [Installation](#installation)
- [How to Play](#how-to-play)
- [Build and Development](#build-and-development)

## Game Overview

Breakout is a classic arcade game where the player controls a paddle to bounce a ball and break all the bricks on the screen. The game ends when the player either breaks all the bricks (winning the game) or loses all their lives by letting the ball fall below the paddle.

## Features

- **Responsive Design:** The game adjusts to different screen sizes.
- **Multiple Levels:** Different levels of increasing difficulty.
- **Scoring System:** Points are awarded for each brick broken.
- **Lives:** The player starts with three lives.

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/rolandmllo/breakout-ts.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd breakout-game
    ```
3. **Install the dependencies:**
    ```bash
    npm install
    ```
4. **Start the development server:**
    ```bash
    npm run dev
    ```
    Vite will start a local development server, and you can view the game in your browser by navigating to the URL provided in the terminal (typically `http://localhost:5173`).

## How to Play

- **Movement:** Use the left and right arrow keys on your keyboard to move the paddle.
- **Goal:** Break all the bricks to advance to the next level.
- **Lives:** You have three lives. If the ball falls below the paddle, you lose a life. The game ends when all lives are lost.

## Build and Development

To build the project for production, use the following command:

```bash
npm run build
```

This will generate a dist/ directory containing the optimized and minified output. You can deploy this directory to your web server.

For linting and formatting the code, you can use:

Linting:
```bash
npm run lint
```
Formatting:
```bash
npm run format
```

