# JobApplicationTracker
This repo is a web application that provide a job application tracker for users to record all needed information about their applications.

**Author:**
 Xinlei Hu
 hu.xinl@northeastern.edu

**Website Link**
[Project3](https://github.com/XinleiSherry/JobApplicationTracker)

**Demo Link**
[Project3 Video Demo](https://youtu.be/YGS9fBCfKOg)

**Presentation Link**
[Google Slides Link](https://docs.google.com/presentation/d/1jNK9H21Iy7H18Z45O1fF39J8oSFyB3cggLarHquPji8/edit?usp=sharing)

**Design Document**
[Design Document](https://docs.google.com/document/d/1ClD_y5na-4N0zE849l8INxw8mceb8D2tSydhyy07rUc/edit?usp=sharing)

**Class Link**
[CS5610 Web Development Course](https://johnguerra.co/classes/webDevelopment_fall_2022/)

**Project Objective:**
Job Application Tracker
This is a web application that provides users with a platform to track their job application status.
Users can create account, record all job application information, and search for specific record.
 
## Installation
1. Clone the repository
2. Open it in your favourite editor
3. Run yarn install/ npm install to install node modules
4. install required dependencies and open website on heroku

## Build Dependencies and Instructions
npm init -y

npm i express

npm i --save--dev nodemon

npm start

npm build

npm i bcrypt

npm install mongodb

npm install eslint

npm install prettier

## Features
1. Users: users can create their own profile, including user name, contact information, and password. Users can view and edit their profiles as well. The user account created can also be deleted if not needed.
2. Application List View: users can search a specific application record by entering the company name in the search box at the top of the page. Also, users can jump to the previous or next page by using buttons at the bottom of the page.
3. Application List: here user can create a new application record with information including company name, position, status, date, and so on. There will be a button named “edit” to revise all the above information as well as delete that specific record. As for status, users have four options, which are “Applied”, “OA”, “VO”, and “Results”.

## Tech Requirements
1. HTML5
2. CSS3
3. JavaScript
4. Node.js 
5. express
6. React

## How this website looks like:
1. Sign Up and Log In
![](./front/document/edit.png)
2. User Management
![](./front/document/user.png)
3. View Application Record
![](./front/document/list.png)
4. Edit Application
![](./front/document/edit.png)