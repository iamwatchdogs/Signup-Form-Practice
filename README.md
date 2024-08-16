# Signup Page (Practise)

A sample sign-up page was created while practicing a few concepts in HTML, CSS and JavaScript. This is a typical submission form that has minimum responsiveness with totally different functionality.

## Motivation

This project was created to practice HTML, CSS and JavaScript concepts while following good and standard practices. Instead of standard making API requests upon form submission, I have used JavaScript to implement some of the storage APIs present within the browser environment.

## Project Details

### Used technologies

- HTML5
- CSS3
- JavaScript

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