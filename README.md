# Angular User Portal

Angular User Portal is a web application that allows users to manage and display a list of random users retrieved from a provided API. Users can also add and remove their favorite users, with a maximum of 10 favorites. The application includes the following features:

- Fetch 10 random users from the provided API on page load.
- Display the fetched users in a list.
- Toggle a timer to automatically fetch a new user every 5 seconds. The list of users is limited to a maximum of 10 items, with the oldest user being removed when the maximum is reached.
- Add and remove users as favorites, with a maximum of 10 favorites.
- View the list of favorite users on a separate page.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [Features](#features)
- [Unit test](#test)

## Getting Started

- **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

Follow these steps to install and run the application on your local machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/angular-user-portal.git
   cd angular-user-portal
   ```
2. Install project dependencies using npm:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   ng serve
   ```
   The application should now be running locally. You can access it in your web browser at http://localhost:4200/.

## Features

1. **Random User Fetch**: On page load, the application fetches 10 random users from the provided API and displays them in a list.

2. **Auto-fetch Timer**: Users can toggle a timer that automatically fetches a new random user every 5 seconds. The list of users is limited to a maximum of 10 items. When the maximum is reached, the oldest user is automatically removed from the list.

3. **Favorite Users**: Users have the ability to add and remove users as favorites. Each user row in the list has an icon button to set as favorite or remove. Users can have a maximum of 10 favorite users.

4. **Separate Favorites Page**: A separate page is available for users to view their list of favorite users. This page provides easy access to the users they have marked as favorites.

## Features

To run the unit tests:

```bash
npm run test
```
