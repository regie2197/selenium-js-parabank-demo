# ParaBank Demo Website Automation with Selenium JS 🚀

This test automation sample project contains **ParaBank Demo Website** using **Selenium WebDriver** and **Mocha** framework for testing. It includes tests for **Login** and **Registration** features with the flexibility to run them in **headless** and **headed** modes. 🌐

## Table of Contents 📚

- [Installation](#installation)
- [Running the Tests](#running-the-tests)
  - [Headless Mode](#headless-mode)
  - [Headed Mode](#headed-mode)
- [Features](#features)

---

## Installation 🛠️

### 1. Create a Project Folder
- First, create a project folder named SeleniumJS-Projects on your Desktop (or in your preferred location):

- Windows: Navigate to your Desktop, right-click, and select New Folder. Name it SeleniumJS-Projects.

- Mac/Linux: Open your terminal and run the following command to create a folder:

```bash
mkdir ~/Desktop/SeleniumJS-Projects
```
### 2. Clone the Repository

```bash
cd ~/Desktop/SeleniumJS-Projects
git clone https://github.com/regie2197/selenium-js-parabank-demo.git
```
### 3. Install Dependencies

```bash
cd selenium-parabank-demo
npm install
```

## Running the Tests 🏃‍♂️
- We have spec file (a Test Code/File) Login and Registration features, and they can be run in both headless and headed modes.

### Headless Mode 🧑‍💻 (Without Browser UI)

1. Login Test (Headless)
- To run the login test in headless mode:

```bash
npm run test:headless:login
```
2. Registration Test (Headless)
- To run the registration test in headless mode:

```bash
npm run register:headless
```
3. Open New Bank Account - Savings Test (Headless)
- To run the open new bank account - savings

```bash
npm run open-bank-acc:headless
```

### Headed Mode 🖥️ (With Browser UI)
- In headed mode, the browser runs with a visible UI. This mode is useful for debugging and visual verification of test actions.

1. Login Test (Headed)
- To run the login test in headed mode:

```bash
npm run test:headed:login
```

2. Registration Test (Headed)
- To run the registration test in headed mode:

```bash
npm run register:test
```

## Features ✨

- **Login Test**: Automates the login functionality using valid and invalid credentials on the ParaBank Demo website.
- **Registration Test**: Automates the user registration process on the ParaBank Demo website with various user data.
- **Open New Bank Account - Savings**: Automates the opening of a New Bank Account - SAVINGS.
- **Headless Mode**: Run the tests without opening the browser window for faster execution.
- **Headed Mode**: Run the tests with the browser window open, useful for debugging and visual checks.


