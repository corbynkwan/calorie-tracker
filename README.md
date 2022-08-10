<h1>Calorie-Tracker </h1>

<h2>Project Description </h2>

Calorie-Tracker is a web application designed to support UBC students’ dietary goals. Create your first food diary with Calorie-Tracker’s exclusive menu selection from UBC restaurants, and view your personal nutrient reports and food recommendations on UBC campus to make healthy food choices!


<h3>Who is it for: </h3>
<ul>
  <li>UBC students</li>
</ul>

<h3>What will it do:</h3> 
<ul>
<li>Allow students to filter restaurant options based on allergies and dietary requirements</li>
<li>Allow students to visualize their dietary patterns</li>
</ul>

<h3>What type of data will it store:</h3>  

<ul>
  <li>Restaurant & menu (calories) </li>
  <li> User profile: name, diatery preference, weight, height, authentication: (username, password) </li>
  <li>Session (tokens)</li>
</ul>
 
<h3>What will user be able to do with the data:</h3>   

<ul>
  <li>Recieve food recommendations food options based on caloric intake, location and time</li>
  <li>Input and track their calories goals</li>
</ul>

<h3>Addtional Features based on time constraint:</h3> 
<ul>
  <li>Snack recommendations</li> 
</ul>
<h2>Project task requirements:</h2> 

 <h3>3-5 minimal requirements (will definitely complete):</h3>
<ul> 
   <li> User can input daily calories and macronutrient intake:white_check_mark:</li> 
    <ul>
    <li> Make UI for them to do this </li>
    <li> REST API to save and fetch data from the database </li>
    <li> Make a Schema to sanitise and validate data to be stored in the database document </li> 
    <li> Make a document in the database to store user's calorie and macronutrient intake </li>
    </ul>
   <li> User can select food items from restaurants' menus:white_check_mark:</li> 
    <ul> 
      <li> Make ui for them to do this </li> 
      <li> Create database schema to store items of restaurants </li>
      <li> Update api to fetch database for this database document </li>
    </ul>
  <li> User can log their meals and track their calorie and macronutrient by date:white_check_mark:</li>
  <li> User can view restaurants' menu items and their calorie and macronutrient information:white_check_mark:</li>
</ul> 

<h3>3-7 "standard" requirements (will most likely complete):</h3>
<ul>
  <li> User can search for restaurants ✅</li>
  <li> User can view restaurant recommendations based on opening hours, location and suggested remaining calorie intake  ✅ </li>
  <li> User can visualize their calorie and macronutrient reports  ✅ </li>
  <li> Google map for navigation ✅ </li>
  <li> Filter items from restaurants based on dietary/alergies/cuisine :grey_exclamation: (completed on backend)</li>
</ul>

<h3>2-3 stretch requirements (plan to complete at least 1!):</h3>
<ul>
  <li> Crawler(s) to fetch resturant data ✅ </li>
  <li> Push notificaitons for recommendations </li>
  <li> Machine learning for food recommendations </li>
  <li> Food reviews/rating feature </li>
</ui>
<h2>Unit 1 - HTML, CSS, JS & Unit 2 - React </h2>
<p>Our web application is developed with JavaScript as our primary language, we utilized the React Library to gain access to a variety of npm packages such as google-map-react for Google map integration and recharts for data visualization. Our web application is built mainly with functional React components with Hooks to manage state, and components are reused and maintained consistently across the application with customized Material UI styling. Essential information such as food, restaurants and users are splitted into slices to store Redux reducer logic and actions, with async actions achieved by using Thunk. React’s ability to update the virtual DOM, and Redux’s ability to ensure one-way data flow and centralized state management allow for a fast, stable and scalable frontend. </p>
<h2> Unit 3 - Node & Express </h2>
<p>The backend is built using Express, a NodeJS framework to handle REST API requests about food log, user and restaurant  from the frontend, and to return appropriate responses. Express allows for easy customization in defining routes and passing various request parameters to perform CRUD operations  such as getting food recommendations from the database given latitude and longitude of user’s geolocation. Our application has made effective use of Express’s middleware to support authorization, and format parser. Express is an efficient choice over Django as a flexible and opinionated web application framework with fundamental functionalities that boosts development speed, and is accessible to support from NPM packages and an active community.  </p>
<h2> Unit 4 - NoSQL with MongoDB </h2>
<p>MongoDB is our choice for database storage with all persistent data(name, email, foodlog), restaurants, and items stored as collections in the database. The Node & Express routes are connected to MongoDB to allow for create, read, update and delete operations on data. For example, checking if a user exists by verifying email, then retrieving corresponding food log of the user. MongoDB is optimized for basic queries as well as complex aggregation such as filtering food logs by time frame and  grouping the calorie consumption over that period which gives insights into nutrient data for the user. Our application defined mongoose Schema for each of our collections to ensure required and id fields such as the user's email are uniquely identified and correctly inputted. MongoDB provides a more intuitive data storage mechanism compared to SQL’s relational table structure, it is an effective choice for our app as it allows for flexible model structure and data type changes to handle missing fields such as calorie amount in food items. </p>
<h2>Unit 5 Releasing Engineering</h2>
<p>Our application is deployed using Ocean Digital with frontend and backend folders separately. We chose the monorepo structure as this was easier to maintain, and allows the team to be able to work full stack more seamlessly. We chose digital ocean over Heroku for its simplicity of use. </p>
<h2>Above and Beyond Functionalities</h2>
<h3>Crawler</h3>
<p>To solve the difficulty of data collection, we introduced a crawler to collect data instead of collecting manually. The crawler uses Axios to fetch data such as UBC’s restaurants and food item information including name, location (lat, lng) and nutrient information from https://ubc.nutrislice.com/ and convert them into food collection and restaurant collection format using mongoose. The conversion includes date format transformation and data combination.  We scheduled it to collect data once a day to make the data up to date. </p>
<h3>Auth0 Authentication System</h3>
<p>We Used Auth0 as an authentication provider that manages the login process between the user and their identity provider. Auth0 supports multi-tenant authentication, which not only allows users to use third-party authentication Google and Microsoft emails to log in, Auth0 will also  recognize the users account’s if provided the same email across different authentication channels. Upon successful authentication, Auth0 provides a token to our app, through a callback to the frontend. This token is used to verify the user each time an API call is made between the frontend and backend.The backend validates the token using a private key and fetches basic details including email, name, login status from Auth0. </p>
<h3>TypeSense Search Engine</h3>
<p>We use TypeSense as the search engine for the app.This allows us to provide a quick search experience with typo tolerance.TypeSense runs as a separate process on the server and provides an API for our app to communicate with it. Whenever new documents are added to the searchable collection (Restaurants) in our MongoDB database, it triggers a function on our backend to send relevant parts of the new documents to TypeSense.TypeSense then indexes this data and stores it in a cache for a faster response time.The frontend directly sends a GET request to the TypeSense API when the user performs a search on the UI and fetches the results.</p>
<h3>Google Map </h3>
<p>Our application integrated a Google map for users to find restaurants available on campus. Geometry API is used to identify a user's geolocation by latitude and longitude, which returns the user's address and displays a marker identifying the user’s location at map center. Restaurants within a user's walking distance are then fetched and displayed on map markers with restaurant name, address, and google map navigation. </p>
<h2>Next Steps </h2>
<p>There are a few in-progress goals we hope we could enhance in the future to increase our app’s functionality, this includes implementing the frontend for users to filter restaurants based on dietary requirements, making UI responsive, and crowdsourcing more restaurants and food options available on UBC campus. </p>
<h2>List of Contributions</h2>
<h3>Dhruv</h3>

     
Authentication system:
Uses Auth0 as an authentication provider that manages the login process between the user and their identity provider (or stores their email and password securely if the user chooses not to use an external provider)
Upon successful authentication, Auth0 provides a token to our app, through a callback to the frontend.
This token is used to verify the user each time an API call is made between the frontend and backend.
The backend validates the token using a private key and fetches basic details of the user (email, name, whether they are still logged in, etc) from Auth0.
  
  Search Engine: The search engine for the app is built using a framework called TypeSense - this allows us to provide a quick search experience with typo tolerance.
TypeSense runs as a separate process on the server and provides an API for our app to communicate with it.
Whenever new documents are added to the searchable collection (Restaurants) in our MongoDB database, it triggers a function on our backend to send relevant parts of the new documents to TypeSense.
TypeSense then indexes this data and stores it in a cache for a faster response time..
The frontend directly sends a GET request to the TypeSense API when the user performs a search on the UI and fetches the results.

<h3>Corbyn</h3>
 <p>Setup of redux stuff 
Created multiple slices that store the redux reducer logic and actions. Has the user slice, restaurants slice, foods slice. 
These slices include API calls to the backend, and the state of the user, restaurants, foods so that data is managed cleanly 
Header + Footer
Copy and pasted from material-ui 
Restaurants page
Table template was from material-ui
restaurant id is on the URL which then makes an API call to the backend to get the restaurant information which then loads all the restaurant’s foods into the table 
+ button on the restaurant page makes an api call to the backend to add add the foods to the user’s calories
</P>
<h3>Zehao</h3>

      
Crawler:Using Axios to send requests and get responses. Finding the data to be collected, including the restaurant data and the item data. Connect them with the restaurant id.
converting the data to the format we want to store.
Using mongoose to save the result into the mongoDB
      Recommendation frontend/backend Api: 
 Recommendation is based on distance, calories of food, remaining calories of users, opening time and current time.
First, it will find the nearest four restaurants. 
Then it will randomly pick one item in that restaurant that is meeting some requirements, including the restaurant being open and the food calories does not exceed the remaining calories. 

<h3>Amy</h3>
<p>
  Google map
Used Google Map Geometry API to identify user’s geolocation by latitude and longitude, retrieve user’s address and display at map center.
Used Places API to display a marker on map with restaurant details such as location, opening hours
Food Log Report 
Used the rechart library to allow an area graph representation of each nutrient category’s (y-axis  sum of nutrient’s consumption) intake over a period of time (x-axis dates)
Convert local date to ISOstring representation. Since date info and represented and stored in UTC timezone, the date/times are first being identified as before or after local time 5pm(the next day in UTC), then used UTC time frame that has considered the timezone offset to aggregate nutrient consumption over the period of time 

</P>


<h2>Prototypes: </h2>
<img src="https://github.com/corbynkwan/calorie-tracker/blob/main/Paper%20Prototype%201%20.png" alt="Paper Prototype 1" width="800"/>
<img src="https://github.com/corbynkwan/calorie-tracker/blob/main/UI%20Prototype%201%20.png" alt="UI Prototype 2" width="800"/>
<img src="https://github.com/corbynkwan/calorie-tracker/blob/main/UI%20Prototype%202.png" alt="UI Prototype 3" width="800"/>
<img src="https://github.com/corbynkwan/calorie-tracker/blob/main/UI%20Prototype%203.png" alt="UI Prototype 4" width="800"/>



