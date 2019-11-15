package guestbook;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import guestbook.DBentry;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class MapStore {

	  	@Id Long id;
	    @Index static Map<String, List<DBentry>> map = new HashMap<String, List<DBentry>>();
	    private MapStore() {}
	    public MapStore(String name) {
	    	map = new HashMap<String, List<DBentry>>();
	    }
	    public List<DBentry> getByUser(String user) {
	    	return map.getOrDefault(user, null);
	    }
	    public Map<String, List<DBentry>> getMap() {
	    	return map;
	    }
	    public Integer getUserCount() {
	    	return map.size();
	    }
	    public boolean contains(String user) {
	    	return map.containsKey(user);
	    }
	    public void addUser(String user) {
	    	map.put(user, new ArrayList<DBentry>());
	    }
	    public void addEntry(String user, DBentry entry) {
	    	//get current entry list or make new one
	    	//System.out.println(map == null);
	    	List<DBentry> templist = map.getOrDefault(user, new ArrayList<DBentry>());
	    	templist.add(entry);
	    	map.put(user, templist);
	    }
	    public boolean delEntry(String user, DBentry entry){
	    	//get entries
	    	List<DBentry> entries = map.get(user);
	    	//System.out.println("first size: " + entries.size());
	    	boolean passed = entries.remove(entry);
	    	map.replace(user, entries);
	    	entries = map.get(user);
	    	//System.out.println("after size: " + entries.size());
	    	return passed;
	    }

}
