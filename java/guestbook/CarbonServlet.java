package guestbook;


import com.googlecode.objectify.*;

import static com.googlecode.objectify.ObjectifyService.ofy;

import com.google.appengine.api.users.User;

import com.google.appengine.api.users.UserService;

import com.google.appengine.api.users.UserServiceFactory;

 

import java.io.IOException;
import java.math.BigDecimal;
import java.math.MathContext;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServlet;

import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;

 

public class CarbonServlet extends HttpServlet {
	
	

	static {
        ObjectifyService.register(CarbMap.class);
    }
	

    public void doPost(HttpServletRequest req, HttpServletResponse resp)

                throws IOException {

        UserService userService = UserServiceFactory.getUserService();
        User user = userService.getCurrentUser();        
        
        if(req.getParameter("whatDo").equalsIgnoreCase("add")) {
        	String item = req.getParameter("material");
	        System.out.println("adding " + item);
	        String category = req.getParameter("category");
	        Double carbon;
	        Double quantity;
	        Double emission;
	        
	        try {
	        	carbon = Double.parseDouble(req.getParameter("carbon"));
	        	quantity = Double.parseDouble(req.getParameter("quantity"));
		        BigDecimal bd = new BigDecimal(carbon * quantity);
				bd = bd.round(new MathContext(2));
				emission = bd.doubleValue();
	        
	        CFentry newEntry = new CFentry(item, carbon, category, quantity, emission);
	        //load mapstore
	        CarbMap map = ofy().load().type(CarbMap.class).list().get(0);
	        //add new entry
	        //TODO: deal with existing entry but new quantity
	        map.addEntry(user.getNickname(),newEntry);
	        //does this save map as new or overwrite?
	        ofy().save().entity(map).now();
	        
	        //reload page
	        resp.sendRedirect("/carbonfootprint.jsp");
	        } catch(Exception e) {
	        	System.out.print("Invalid input");
	        	resp.sendRedirect("/carbonfootprint.jsp");
	        	return;
	        }
        }
        if(req.getParameter("whatDo").equalsIgnoreCase("del")) {
        	String mat = req.getParameter("material");
        	System.out.println("deleting " + mat);
        	//TODO: delete from dataStore
        	CarbMap map = ofy().load().type(CarbMap.class).list().get(0);
	        //we have a list of entries, need to update it
	        List<CFentry> entries = map.getMap().get(user.getNickname());
	        
	        for(int i = 0; i < entries.size(); i++) {
	        	//if strings match, remove this from list
	        	if(entries.get(i).getItem().equals(mat)){
	        		//delete this entry from store
	        		map.delEntry(user.getNickname(), entries.get(i));
	        	}
	        }
	      //does this save map as new or overwrite?
	        ofy().save().entity(map).now();
	        
	        
        	
        	
        	//redirect back
        	resp.sendRedirect("/carbonfootprint.jsp");
        }

    }

}