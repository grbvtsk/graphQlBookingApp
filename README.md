Application works with GraphQL.  
  
There are 3 mongoose schemas that represent the core of our application
User, Relestate and Bookings  
<img src="./readme-pictures/entities.png" width="550">  
User can be owner of many real-estates.  
Also, user can book real estates. Booking entity stores information about this.  
  
Application should handle the queries for receiving
 - all users ()
 - all real-estates
 - all bookings  
examples of queries:  
<img src="./readme-pictures/queries.png" width="550">  
 and also, for mutations thal allow:
 - create user (userCreate)
 - create real-estate (realestateCreate)
 - create booking (bookingCreate)
 - delete booking (bookingDelete)
 examples of mutations:
 <img src="./readme-pictures/mutations.png" width="550">

 Take the namings from provided examples.  
 Also, note that drilling through related properties should be possible at any depth.

Set connection string to your database in config.env. < PASSWORD > is substituted in server.js

Well, the finish result must be :
![image](https://github.com/grbvtsk/graphQlBookingApp/assets/115540128/dd1ea0b8-a024-42a7-92b2-41b2d1ba1621)

