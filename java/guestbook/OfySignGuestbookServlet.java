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

 

public class OfySignGuestbookServlet extends HttpServlet {
	
	

	static {

        //ObjectifyService.register(DBentry.class);
        ObjectifyService.register(MapStore.class);

    }
	

    public void doPost(HttpServletRequest req, HttpServletResponse resp)

                throws IOException {

        UserService userService = UserServiceFactory.getUserService();
        User user = userService.getCurrentUser();
        //get data from forms to make new dbentry
//        System.out.println(req.getParameter("quantity"));
//        System.out.println(req.getParameter("value"));
//        System.out.println(req.getParameter("material"));
        
        
        if(req.getParameter("whatDo").equalsIgnoreCase("add")) {
	        //System.out.println("adding");
	        String item = req.getParameter("material");
	        try {
	        Double value = Double.parseDouble(req.getParameter("value"));
	        Double quantity = Double.parseDouble(req.getParameter("quantity"));
	       
	        
	        DBentry newEntry = new DBentry(item, value, quantity);
	        //load mapstore
	        MapStore map = ofy().load().type(MapStore.class).list().get(0);
	        //add new entry
	        //TODO: deal with existing entry but new quantity
	        map.addEntry(user.getNickname(),newEntry);
	        //does this save map as new or overwrite?
	        ofy().save().entity(map).now();
	        
	        //reload page
	        resp.sendRedirect("/financialcalc.jsp");
	        } catch(Exception e) {
	        	System.out.print("Invalid input");
	        	resp.sendRedirect("/financialcalc.jsp");
	        	return;
	        }
        }
        if(req.getParameter("whatDo").equalsIgnoreCase("del")) {
        	String mat = req.getParameter("material");
        	//System.out.println("deleting " + mat);
        	//TODO: delete from dataStore
        	MapStore map = ofy().load().type(MapStore.class).list().get(0);
	        //we have a list of entries, need to update it
	        List<DBentry> entries = map.getMap().get(user.getNickname());
	        
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
        	resp.sendRedirect("/financialcalc.jsp");
        }

    }

}