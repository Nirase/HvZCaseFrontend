# HvZCaseFrontend

## Landing page

The landing page displays all games available for the user. After the user has logged in they can open the available games and access additional information and functionality related to the selected game by pressing the open game button.

<img align="left" width=450 src="https://i.imgur.com/t3SpkHo.png">
<img width=450 src="https://i.imgur.com/W8brwqc.png">

## Game page

The game page is for showing the information about the game that the user has chosen on the landing page.
Here the user finds basic info, such as Game name, amount of players, zombies in game, start date and end date for the game.
If a user is not registered for the game, they can se a register button, the game plan which is a aria on the map, a list of player in the game, list of squads and markers on the map for where people died and the rules for the game.

When the user have registered, new things turn up. now they can se a chat with different channel's. They can also see there bite-code that they will give to the zombie when they are tagged. The squad list give you options to join, leave or info, the user can also create a squad. If i the user is killed, they will be able to enter another persons bite-code when they tag someone and have the option to add location and a description of the kill.

The map will show different markers,
for missions:
all <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/triangle-exclamation.svg" width="50" height="50">,
humans <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/snowflake.svg" width="50" height="50"> or
zombies <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/biohazard.svg" width="50" height="50">.
squad checkIn markers: <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/users-rays.svg" width="50" height="50">
and death markers: <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/skull-crossbones.svg" width="50" height="50">

## Squad page

Here the user will se info about the squad. A list of all the members in the squad and it shows if they are alive or not. They user can create new check in markers for the squad, by clicking the map. and if they want to see information about another check in they can click the symbol and a info window will open.

## Admin page

The admin page will only be available if the user has a admin role in keycloak. There the user can create new games, update and delete games.

A list of all the available games is displayed and the user can select them in order to add, update and delete players and missions related to the game.

-do images later with bigger monitor

## Written Using

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

[Node.js](https://nodejs.org/en/)

[react-bootstrap](https://react-bootstrap.github.io)

[Visual Studio Code](https://code.visualstudio.com)

[Javascript](https://getbootstrap.com/)

[Github](https://github.com/)

[keycloak](https://www.keycloak.org/)

## Made by

Danielle Hamrin

Keman Nguyen

Mattias Smedman
