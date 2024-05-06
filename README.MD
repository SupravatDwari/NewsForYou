## News For You using ASP.Net MVC

Integrate RSS Feeds from leading News agencies and feed only relevant News based on user's preferance.

### Configure localhost to your domain
#### Add your domain to the Host File in C:\Windows\System32\drivers\etc
```Eg -127.0.0.1    www.NewsForYou.com```<br />
![image](https://github.com/supravatd/Mindfire/blob/main/NewsForYou/img1.PNG)

### IIS Configurations
1. Open IIS Manager
2. Add the domain configured aboved in Sites
3. Add the path to the Web.config file of your project
4. Add an Application Pool
5. Add the domain to the Host name in the side binding<br />
![image](https://github.com/supravatd/Mindfire/blob/main/NewsForYou/img2.PNG)
![image](https://github.com/supravatd/Mindfire/blob/main/NewsForYou/img3.PNG)

### Build the Project
```(ctrl+shift+ B)```

### Browse the project from given url
```http://www.NewsForYou.com/```

### Sign In using a default user
Admin => Email = sdr@gmail.com , Password  = qwerty123 <br />
![image](https://github.com/supravatd/Mindfire/blob/main/NewsForYou/signin.PNG)

### Initialization of Data
#### Click the Add Fields button to add new categories, agencies, feed links that maps to Agency and Category or to clear all the data 
from news table
#### Click on any of the agency to view it's news<br />
![image](https://github.com/supravatd/Mindfire/blob/main/NewsForYou/agency.PNG)

### Fetch News
#### Fetch and store News reference into database when a category is selected. User can select multiple categories at a time and the
selection are preserved at browser level so that when the user loads next time it loads news from only those categories selected during 
last use.<br />
![image](https://github.com/supravatd/Mindfire/blob/main/NewsForYou/categories.PNG)

### News Click Count Report
#### Shows report for no of click counts for all the news between the selected date.<br />
![image](https://github.com/supravatd/Mindfire/blob/main/NewsForYou/report.PNG)
