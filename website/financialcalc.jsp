<%@ page contentType="text/html;charset=UTF-8" language="java" %>

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
<%@ page import="guestbook.DBentry" %>
<%@ page import="guestbook.MapStore" %>
<%@ page import="java.util.Properties" %>


<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
	<head>
		<title>Financial Calculator </title>
		<link rel="stylesheet" href="./stylesheet.css">

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

		<h2 id="calcTitle">Calculate your cash returns based on traded-in recyclables</h2>

<%
	UserService userService = UserServiceFactory.getUserService();
	
	User user = userService.getCurrentUser();
	
	if (user != null) {
		 pageContext.setAttribute("user", user);

		 %>

		 <p>Hello, ${fn:escapeXml(user.nickname)}! (You can

		 <a href="<%= userService.createLogoutURL(request.getRequestURI()) %>">sign out</a>.)</p>

		 <%
		 ObjectifyService.register(MapStore.class);
			MapStore tempmap;
			List<MapStore> maps = ObjectifyService.ofy().load().type(MapStore.class).list();
			//makes first mapstore if we don't have one already
			if(maps.size() < 1){
				System.out.println("making new mapstore##########");
				tempmap = new MapStore(" ");
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
			List<DBentry> entries = tempmap.getByUser(user.getNickname());
		%>
		<p id="calcSubTitle">Insert your recyclables info here</p>
		<div id="calcInput">
			<form action="/ofysign" method="post">
				Material type:<br>
				<textarea name="material" rows="1" cols="10"></textarea>
				<br>$/ lb:<br>
				<textarea name="value" rows="1" cols="10"></textarea>
				<br>Weight (lbs):<br>
				<textarea name="quantity" rows="1" cols="10"></textarea>
				<br>
				<div><input type="submit" value="Submit Post" /></div>
				<input type="hidden" name="whatDo" value="add"/>
	    	</form>
    	</div>
			
		<div id="calcTableBox">
			<table id="calcTable">
				<tr>
					<th>Material</th>
					<th>Cash Return ($)</th>
					<th>Weight (lbs)</th>
					<th>$/lb</th>
					<th>Actions</th>
				</tr>
				<!-- hard-coded values below are used as an example for the user (which can be deleted by the user) -->
				<%
					//TODO: for loop
					int count = 1;
					Double total = 0.0;
					for(DBentry entry : entries){
						pageContext.setAttribute("currCount", count);
						pageContext.setAttribute("material", entry.getItem());
						pageContext.setAttribute("quantity", entry.getQuantity());
						pageContext.setAttribute("valuePer", entry.getValue());
						//pageContext.setAttribute("value", entry.getValue());
						//idk if this works
						//BigDecimal bd = new BigDecimal(entry.getValue() * entry.getQuantity());
						//bd = bd.round(new MathContext(3));
						//Double rounded = bd.doubleValue();
						Double rounded = Double.parseDouble(entry.doBehavior());
						pageContext.setAttribute("value", rounded);
						//TODO: add $/lb
						//TODO: add total value
						//using placeholder $/lb
						total += rounded;
						%>
						
						<tr id="row"+count>
							<td>${fn:escapeXml(material)}</td>
							<td id="costVal${fn:escapeXml(count)}">${fn:escapeXml(value)}</td>
							<td>${fn:escapeXml(quantity)} lbs</td>
							<td>${fn:escapeXml(valuePer)}</td>
							<td>
								<form action="/ofysign" method="post">
							      <div><input type="submit" value="Delete" /></div>
							      <input type="hidden" name="material" value="${fn:escapeXml(material)}" />
							      <input type="hidden" name="whatDo" value="del"/>
							    </form>
							</td>
						</tr>
						<%
						// increment count reference by 1 at end
						count++;
					}
					pageContext.setAttribute("totalVal", total);
				
				%>
			</table>
		</div>
		<div>
			<p id="totalCost">Total cash return: <b>$${fn:escapeXml(totalVal)}</b></p>
			
		</div>
		<%
		//Not sure if above needs addRow as well
		//does this save the mapstore?
		ObjectifyService.ofy().save().entity(tempmap);
	}
	else{
		%>

		<h1>Welcome to the Financial Calculator</h1>

		<p><a href="<%= userService.createLoginURL(request.getRequestURI()) %>">Sign in</a>

		to update your stats!</p>
		<%
	}
%>
	<div id="bottomBanner">
        <p>University of Texas at Austin (October 2019)   .</p>
    </div>
	</body>
</html>