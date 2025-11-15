# Zillion 

Zillion is a modern web platform built with Next.js and Prisma. It delivers fast data handling and rich analytics.

## Features

- **Next.js** with Turbopack for rapid builds  
- **Prisma ORM** for type-safe database access  
- **Clerk Auth** for secure user sign-in  
- **Serverless Neon DB** for scalable storage  
- **ImageKit** for optimized image uploads  
- **Inngest** for event-driven automation  
- **Redux Toolkit** for predictable state management  

## Tech Stack

- Language: **JavaScript**  
- Framework: **Next.js v15.3.5**  
- Database: **Neon (serverless PostgreSQL)**  
- ORM: **Prisma v6.19.0**  
- Authentication: **@clerk/nextjs v6.34.5**  
- Styling: **Tailwind CSS v4.1.17**  
- Build Tools: **LightningCSS v1.30.2**  

## Prerequisites

- **Node.js** v18 or higher  
- **npm** v8 or higher  
- **Git** (command-line)  

If Node or Git are not installed, follow these steps:

- Windows:
  - Download Node.js LTS from https://nodejs.org and run the installer.
  - Download NVM (Node Version Manager) from https://github.com/coreybutler/nvm-windows/releases/download/1.2.2/nvm-setup.exe  and run the installer.
  - Download Git for Windows from https://git-scm.com and run the installer.
- macOS (Homebrew):
  - Install Homebrew.
  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
  - Install Node and Git.
  ```bash
  brew install node git
  ```
- Ubuntu/Debian:
  - Install Node, npm, and Git.
  ```bash
  sudo apt update && sudo apt install -y nodejs npm git
  ```
  - Install NVM
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
    ```
    or
    ```bash
    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
    ```
    For more info or if facing any errors look here :-https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating
    

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Kanadb30/Zillion.git
cd Zillion
cp .env.example .env
nvm install 20.17.0
nvm use 20.17.0
npm install
```

## Available Scripts

Zillion provides these npm scripts:

- `npm run dev` – Start development server  
- `npm run build` – Generate Prisma client and build  
- `npm run start` – Launch production server  
- `npm run lint` – Run code linter  
- `npm test` – Execute test suite  

## Running Locally

Start the development environment:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Building for Production

Generate a production build and start:

```bash
npm run build
npm run start
```

The app listens on port 3000 by default.

## Hidden Pages

- **Admin Panel**: Can only be accessed by adminId[zillion.infinity.co@gmail.com].
- **Store Page**: Can be accessed by any store if approved by admin.
 
 To get access to **admin panel** or **store page** contact me. 

## Common Use Cases

- **User Registration**: Sign up and manage profiles  
- **Image Uploads**: Store and serve images via ImageKit  
- **Analytics Dashboard**: Visualize data with charts  
- **Real-Time Events**: Trigger and handle workflows  

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository  
2. Create a branch (`git checkout -b feature/your-feature`)  
3. Commit your changes (`git commit -m "Add feature"`)  
4. Push to your branch (`git push origin feature/your-feature`)  
5. Open a pull request  

## License

This project is open source under the **MIT License**.
