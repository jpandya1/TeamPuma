
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.List" %>

<%@ page import="java.util.Collections" %>

<%@ page import="com.google.appengine.api.users.User" %>

<%@ page import="com.google.appengine.api.users.UserService" %>

<%@ page import="com.google.appengine.api.users.UserServiceFactory" %>


<%@ page import="com.googlecode.objectify.Objectify" %>

<%@ page import="com.googlecode.objectify.ObjectifyService" %>

<%@ page import="com.googlecode.objectify.*" %>

<%@ page import="java.math.BigDecimal" %>
<%@ page import="java.math.MathContext" %>
<%@ page import="guestbook.CFentry" %>
<%@ page import="guestbook.CarbMap" %>
<%@ page import="java.util.Properties" %>



<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>


<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>Carbon Footprint Tracker</title>
        <link rel="stylesheet" href="./stylesheet.css">

        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js"></script>
        <script src="https://cdnjs.com/libraries/Chart.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script type="text/javascript" src="./api/jsonparser.js"></script>
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <style>
        #data_table {
          font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }

        #data_table td, #data_table th {
          border: 1px solid #ddd;
          padding: 8px;
        }

        #data_table tr:nth-child(even){background-color: #f2f2f2;}

        #data_table tr:hover {background-color: #ddd;}

        #data_table th {
          padding-top: 12px;
          padding-bottom: 12px;
          text-align: left;
          background-color: #4CAF50;
          color: white;
        }
        h1{
            font-family: "Helvetica";
            font-weight: bold;
        }
        .line{
            display: inline;
        }

    </style>



    </head>
    <body>

        <div id="navigationBanner">
            <ul>
                <li><a href="./splashpage.html">Home</a></li>
                <li><a href="./about.html">About</a></li>
                <li><a href="./searchpage.html">Search</a></li>
            </ul>
        </div>

        <div id="titleBanner">
            <div id="titleBannerImage">
                <img src="images/recycle_image1.png" alt="image0" height="100">
            </div>
            <div id="titleBannerText">
                <h1>Green Routine</h1>
                <h2>Empowering users to recycle responsibly</h2>
            </div>
        </div>

        <h1>Carbon Footprint Calculator</h1>









<%

    UserService userService = UserServiceFactory.getUserService();

    User user = userService.getCurrentUser();

    if (user != null) {

        pageContext.setAttribute("user", user);

		%>
		<p>Hello, ${fn:escapeXml(user.nickname)}! (You can
		
		<a href="<%= userService.createLogoutURL(request.getRequestURI()) %>">sign out</a>.)</p>
		
		<%
			ObjectifyService.register(CarbMap.class);
			CarbMap tempmap;
			List<CarbMap> maps = ObjectifyService.ofy().load().type(CarbMap.class).list();
			//makes first mapstore if we don't have one already
			if(maps.size() < 1){
				System.out.println("making new mapstore##########");
				tempmap = new CarbMap(" ");
			}
			else{
				tempmap = maps.get(0);
			}
			//we have a mapstore which contains a hashmap
			
			if(!tempmap.contains(user.getNickname())){
				//if we dont already store info for user, make a new list for entries for this user
				tempmap.addUser(user.getNickname());
			}
			// list of entries from user
			List<CFentry> entries = tempmap.getByUser(user.getNickname());
			
%>

			<div id="wrapper">
		        <table align='center' cellspacing=2 cellpadding=5 id="data_table" border=1>
		            <tr>
		                <th>Item (material)</th>
		                <th>Carbon content (lbs)</th>
		                <th>Category</th>
		                <th>Quantity</th>
		                <th>Total Emission (lbs)</th>
		                <th>Date</th>
		                <th>Actions</th>
		            </tr>    


<%
			int count = 0;
			int total = 0;
			for (CFentry entry : entries) {
				
		            pageContext.setAttribute("greeting_item",entry.getItem());
		            pageContext.setAttribute("greeting_carbon",entry.getCarbon());
		            pageContext.setAttribute("greeting_category",entry.getCategory());
		            pageContext.setAttribute("greeting_quantity",entry.getQuantity());
		            pageContext.setAttribute("greeting_emission",entry.getEmission());                 
					
					String pattern = "yyyy-MM-dd";
					SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
					String date = simpleDateFormat.format(entry.getDate());
					pageContext.setAttribute("greeting_Date", date);
					total += entry.getEmission();
						//TODO: replace buttons below
			%>		
					
				<tr id="row${fn:escapeXml(countStr)}">
		            <td id="name_row">${fn:escapeXml(greeting_item)}</td>
		            <td id="country_row">${fn:escapeXml(greeting_carbon)}</td>
		            <td id="age_row">${fn:escapeXml(greeting_category)}</td>
		            <td>${fn:escapeXml(greeting_quantity)}</td>
		            <td>${fn:escapeXml(greeting_emission)}</td>
		            <td>${fn:escapeXml(greeting_Date)}</td> 
		            <td>
		            	<form action="/carbsign" method="post">
						      <div><input type="submit" value="Delete" /></div>
						      <input type="hidden" name="material" value="${fn:escapeXml(greeting_item)}" />
						      <input type="hidden" name="whatDo" value="del"/>
					    </form>
		            </td>      
		        </tr>
		<%		
				
					count++;	
				}
			pageContext.setAttribute("totalCarb", total);
			%>
			<tr>
                <form action="/carbsign" method="post"> 
                
                    <td><input type="text" name="material" id="new_name"></td>
                    <td><input type="text" name="carbon" id="new_country"></td>
                    <td><select name="category" id="category">
                        <option value="Plastic">Plastic</option>
                        <option value="Glass">Glass</option>
                        <option value="Metal">Metal</option>
                        <option value="Paper">Paper</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Household">Household</option>
                        <option value="Construction">Construction</option>
                        <option value="Automotive">Automotive</option>
                    </select></td>
                    <td><input type="text" name="quantity" id="new_quantity"></td>
                    <td>TOTAL: ${fn:escapeXml(totalCarb)} lbs</td>
                    <td></td>

                    <td><input type="submit" name="submit"class="add line" value="Add Row"></td>    
                    <input type="hidden" name="whatDo" value="add"/>               
                </form>
                </tr>
          </table>
    </div>
         <div>
            <h1>Your Total Emission Breakdown</h1>
            <div style="height: 700px">
                <canvas id="pieChart"></canvas>
            </div>
        </div>
			<%
			ObjectifyService.ofy().save().entity(tempmap);
    }
    else{

%>

<p><a href="<%= userService.createLoginURL(request.getRequestURI()) %>">Sign in</a>

to create you own blog posts!</p>

<%
    }

	
		%>



    <div id="bottomBanner">
        <p>University of Texas at Austin (October 2019)   .</p>
    </div>



    <!-- partial -->
    <script src="./script.js"></script>
    <script>

        var table = document.getElementById("data_table")
        var tableLen = table.rows.length
        var data = {
            labels: [],
            population: [],
            area: []
        }

        for (var i = 1; i < tableLen-1; i++) {
            data.labels.push(table.rows[i].cells[0].innerText)
            data.population.push(table.rows[i].cells[4].innerText)
            data.area.push(table.rows[i].cells[2].innerText)
        }

        var canvasP = document.getElementById("pieChart")
        var ctxP = canvasP.getContext('2d')
        var chart = new Chart(ctxP, {
            type: 'pie',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.population,
                    backgroundColor: ["#FFA000", "#1976D2", "#64B5F6", "#FFD54F", "#2196F3", "#FFC107", "#0D47A1"],
                    hoverBackgroundColor: ["#B2EBF2", "#FFCCBC", "#4DD0E1", "#FF8A65", "#00BCD4", "#FF5722", "#0097A7"]
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: "right"
                }
            }
        });

</script>

    </body>
</html>
