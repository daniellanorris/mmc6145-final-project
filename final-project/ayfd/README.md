# ayfd? 

## (are you from denver?)
### an event application to access events occurring in and around Denver

### **Techstack**
+ Next.js
+ JavaScript
+ React.js
+ Mongoose and Mongodb
+ Vercel (for deployment)
+ Bcrypt for auth purposes
+ Bootstrap for CSS styling 
+ 
  

### **External API:**
>**TicketMaster API**

![ticketmaster](https://www.livenation.com/ticketmaster/img/ticketmaster-banner2500w.png)

>> https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/

+ Bringing in data uploaded to TicketMaster and compiling the data into a list format.
+ The data can be filtered using filter buttons appearing on the home page. The URL instantly updates when a filter is applied.
+ Users can also save events to their favorites, which is hosted on it's own page, and pulls from the api endpoint /api/favorites.
  
> ### Logging in / out
+ Users have the ability to create an account, which will be maintained in a MongoDb Atlas database, utilizing the MongoDb Atlas integration with GitHub.
+ Passwords cannot yet be changed once a user is created, but this is a goal for the expanded functionality of the application.
+ Once a user has been created and logged in, the user is routed to the '/' page, which is the main page where events are displayed.
  

> ### **Future Functionality Goals:**
  + Allowing users to delete events once saved
  + Allowing user upload of events 
  + Integrating a Google Maps iframe to allow location data to be broadcasted onto individual event location maps.
  + Load more events in a pagination format.

> ### **Project Contribution:**
+ To contribute to this project, developers must obtain the following:
  + A MongoDb Local URI for development (the Vercel MongoDb integration is used in production)
  + A TicketMaster API, creating a free tier account. This allows for up to 5,000 API calls a day
  + The creation of an IRON_PASS password, which is your string of choosing. 

>> ayfd application layout
## Tables

| ayfd | page |
| ------ | ----------- |
| .next   | next modules |
| node_modules| node_module packages|
| components | button, dropdown, footer, header, layout, list, map (all .jsx) |
| config   | session.js |
| context   | actions.js, index.jsx, ListContext.jsx, reducer.js, state.js (to manage event data context and list context for filter|
| db   | |
| controllers  | |
|util   | connection.js, index.js
||auth.js, event.js, user.js | 
|models | event.js, user.js|
|| index.js |
|hooks| useLogout.js|
|pages ||
|api||
|auth| [action.js]|
||event.js|
|event| [ id ].jsx|
|| _app.js, favorites.jsx, index.jsx, login.jsx, signup.jsx|
|public  ||
|styles| global.css, headerfootermodule.css, home.module.css, login.module.css|
| | delete_icon.png, LOGO-white.png|
|root| .env.local, .gitignore, jsconfig.json, next.config.js, package-lock.json, package.json, README.md, vite.config.js|




  


