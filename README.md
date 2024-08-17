# Signup Page (Practise) <img src="https://github.com/iamwatchdogs/Signup-Form-Practice/actions/workflows/static.yml/badge.svg" alt="deployment status" align="right"/><img src="https://github.com/iamwatchdogs/Signup-Form-Practice/actions/workflows/linter.yml/badge.svg" alt="linting status" align="right"/>

<div align="center">
<br />

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

<br />

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

<br />
</div>

A sample sign-up page was created while practicing a few concepts in HTML, CSS and JavaScript. This is a typical submission form that has minimum responsiveness with totally different functionality.

## Motivation

This project was created to practice HTML, CSS and JavaScript concepts while following good and standard practices. Instead of standard making API requests upon form submission, I have used JavaScript to implement some of the storage APIs present within the browser environment.

## Project Details

### Used technologies

- HTML5
- CSS3
- JavaScript
- Dependencies
  - Webpack bundler
  - Loaders
  - Minifiers
  - Babel transpiler
  - ESLint linter
- React
- GitHub Actions

### Functionality

The sign-up form has been implemented in such a way while following some common practices of designing the DOM structure and basic CSS for the required responsiveness. The page consists of the following post-submission functionalities,

- Custom Form validation using the browser web APIs _(`setCustomValidity`)_
  - [x] Implemented Text validation
  - [x] Implemented Email validation
  - [x] Implemented Password validation _(including `repeat-password`)_
- Storing the data into browser storage APIs
  - [x] Stored the data within cookies after URI encoding
  - [x] Stored the data within local storage after hashing with the `sha-256` algorithm.
- Storing the data into an external file within the browser environment

Note that the whole JavaScript source code is implemented within an anonymous callback that gets executed when the `window` object is completed loading. This avoids access to the functions that are binded with events or other helper functions that can be manipulated through the console.

### Changelog

- [`v0.0.0`](https://github.com/iamwatchdogs/Signup-Form-Practice/releases/tag/v0.0.0 "goto releases") - Basic implementation of signup page with HTML, CSS and JavaScript.
- [`v1.0.0`](https://github.com/iamwatchdogs/Signup-Form-Practice/releases/tag/v1.0.0 "goto releases") - More sophisticated implementation to overcome some of the edge cases and concerns. _(visually and functionally no diff for output)_
- [`v2.0.0`](https://github.com/iamwatchdogs/Signup-Form-Practice/release/tag/v2.0.0 "goto releases") - Migration of Javascript application into React application. Less concerned about edge cases, focused more on migration. _(visually and functionally no diff for output)_

## Learning outcomes

Through this implementation, I was able to learn the following concept from this single practice project,

- HTML structuring _(including the semantics, and common practices)_.
- Basic responsive design _(CSS)_
- JavaScript DOM manipulation
- Event Handling _(event delegation, etc)_
- Array methods
  - `map`
  - `forEach`
- Regex
- Form Handling
  - Custom validation
- Asynchronous programming
  - Promises
  - `async` & `await`
- Error Handling
- Web APIs
  - Storage APIs
    - cookies
    - local storage
  - Encoding APIs
    - `TextEncoder`
  - Web Crypto APIs
    - `crypto.subtle`
  - File System APIs
    - `showSaveFilePicker`
    - `createWritable`
    - `FileSystemWritableFileStream.write`
    - `FileSystemWritableFileStream.close`
- Functional Programming
- Object-oriented Programming
- Modular Programming
- Dependencies
- Bundler configuration
- Linter configuration
- React
  - Configuration
  - Hooks
- GitHub Action _(CI/CD)_

## Output

![output](https://github.com/user-attachments/assets/406a570f-891a-4aa4-b524-0201cea09b0b)