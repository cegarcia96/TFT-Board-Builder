# TFT Board Builder

## Description

A tool to theorycraft and save possible boards for the game [Teamfight Tactics](https://teamfighttactics.leagueoflegends.com/en-us/).

## Tech Stack
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)

## Features

Drag and drop units onto the board. Traits will be displayed based on the units and active traits indicated by a color change.

![Drag and drop gif](https://user-images.githubusercontent.com/93167286/214697580-62263649-046f-49b6-a3a9-cd4ba41defd5.gif)

Give a board a title and save. The positioning of the units will be saved along with any notes.

![Save and load board gif](https://user-images.githubusercontent.com/93167286/214697890-6a9e4f16-62fd-4e86-b20d-62af3be79a9c.gif)

### Additional Features
- Search the pool of units based on name, trait, or cost
- Hover over a unit to see more information
- Create an account with authentication through Firebase
- Saved boards are associated with your account

## Installation
1. Fork and clone the repo
2. Install MongoDB at https://www.mongodb.com/docs/manual/tutorial/getting-started/
3. Install dependencies with `npm install`
4. Run the command `npm start`
5. In a separate terminal run the command `npm run server-start`
