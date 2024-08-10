# Vending Machine Simulation

A comprehensive full-stack web application simulating a vending machine system. This project covers user interaction, wallet management, sales history, and admin functionalities.

## DEMO

[View Demo](https://itstanpi.github.io/Vending-machine/)

## Project Overview

The Vending Machine Simulation project allows users to interact with a virtual vending machine through their mobile device. Users can manage their accounts, view sales history, and handle transactions, while administrators can monitor sales, restock items, and update product information.

### Features

- **User Interaction:**
  - **QR Code Scanning:** Each purchase is associated with a unique QR code displayed on the vending machine. Scanning this QR code directs users to a signup/login page.
  - **Account Management:** Users sign up or log in using their phone number and a 4-digit PIN. If an account already exists, it displays the wallet balance; otherwise, a new account is created with a zero balance.
  - **Wallet Management:** Users can view their wallet balance, make purchases, and recharge their wallet.
  - **PIN Management:** Users can reset or change their PIN via OTP sent to their registered phone number.

- **Admin Dashboard:**
  - **Sales History:** Admins can view and filter sales history by date, product, and branch. Sales data is displayed in a bar graph and a detailed table showing purchased products, prices, dates, times, and revenue generated.
  - **Restocking:** Admins can restock products at specific vending machine locations.
  - **Product Replacement:** Allows for updating or replacing items in the vending machine.
  - **Price Updates:** Admins can update product prices as needed.

## Technologies Used

- **Frontend:**
  - HTML & CSS
  - JavaScript (with libraries such as [Matter.js](https://brm.io/matter-js/), [Chart.js](https://www.chartjs.org/), [jQuery](https://jquery.com/))
  - AJAX for seamless updates between the vending machine and the user's phone
  - Bootstrap for responsive design

- **Backend:**
  - PHP (with [PHP QR Code](https://sourceforge.net/projects/phpqrcode/) library for QR code generation)
  - MySQL for database management
  - [Twilio](https://www.twilio.com/) API for OTP message delivery

## Usage

1. **User Interaction:**
   - Scan the QR code on the vending machine display.
   - Follow the prompts to sign up or log in.
   - Manage your wallet and make purchases through your phone.

2. **Admin Dashboard:**
   - Log in to the admin dashboard.
   - View sales history, restock products, update prices, and manage inventory.

## Asset Credits

- Vending Machine assets used in this project are provided by [Freepik](https://www.freepik.com/free-vector/vending-machines-snacks-set-chips-bars-canned-drinks-automate-with-empty-shelves_12699886.htm#query=vending%20machine&position=29&from_view=keyword&track=ais_hybrid&uuid=96d21d59-c9e9-4c13-86cc-1719c52d6282).

## Contributing

Feel free to fork the repository, create a branch, and submit pull requests. Contributions are welcome!
