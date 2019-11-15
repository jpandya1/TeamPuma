package guestbook;


import com.googlecode.objectify.*;

import static com.googlecode.objectify.ObjectifyService.ofy;

import com.google.appengine.api.users.User;

import com.google.appengine.api.users.UserService;

import com.google.appengine.api.users.UserServiceFactory;

 

import java.io.IOException;

import java.util.Date;

 

import javax.servlet.http.HttpServlet;

import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;

 

public class OfySignGuestbookServlet extends HttpServlet {
	
	

	static {

        ObjectifyService.register(Greeting.class);

    }
	

    public void doPost(HttpServletRequest req, HttpServletResponse resp)

                throws IOException {

        UserService userService = UserServiceFactory.getUserService();

        User user = userService.getCurrentUser();

        String carbon = req.getParameter("carbon");
        String quantity = req.getParameter("quantity");
        Integer emission = Integer.parseInt(carbon) * Integer.parseInt(quantity);
        
        Greeting nuser = new Greeting(user, req.getParameter("item"),req.getParameter("carbon"), req.getParameter("category"), req.getParameter("quantity"), 
        		Integer.toString(emission), req.getParameter("htmlDate"),req.getParameter("guestbookName"));

        ofy().save().entity(nuser).now();
        
 
        resp.sendRedirect("/carbonfootprint.jsp?guestbookName=" + req.getParameter("guestbookName"));

    }

}