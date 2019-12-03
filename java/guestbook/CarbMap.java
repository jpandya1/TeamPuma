package guestbook;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import guestbook.CFentry;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class CarbMap {
		private volatile static CarbMap carbMap;
	  	@Id Long id;
	    @Index static Map<String, List<CFentry>> map = new HashMap<String, List<CFentry>>();
	    private CarbMap() {}
	    
	    public CarbMap(String name) {
	    	map = new HashMap<String, List<CFentry>>();
	    }
	    
	    public static CarbMap getInstance() {
	    	if(carbMap == null) {
	    		synchronized(CarbMap.class) {
	    			if(carbMap == null) {
	    				carbMap = new CarbMap();
	    				map = new HashMap<String, List<CFentry>>();
	    			}
	    		}
	    	}
	    	return carbMap;
	    }
	    
	    public List<CFentry> getByUser(String user) {
	    	return map.getOrDefault(user, null);
	    }
	    public Map<String, List<CFentry>> getMap() {
	    	return map;
	    }
	    public Integer getUserCount() {
	    	return map.size();
	    }
	    public boolean contains(String user) {
	    	return map.containsKey(user);
	    }
	    public void addUser(String user) {
	    	map.put(user, new ArrayList<CFentry>());
	    }
	    public void addEntry(String user, CFentry entry) {
	    	//get current entry list or make new one
	    	//System.out.println(map == null);
	    	List<CFentry> templist = map.getOrDefault(user, new ArrayList<CFentry>());
	    	templist.add(entry);
	    	map.put(user, templist);
	    }
	    public boolean delEntry(String user, CFentry entry){
	    	//get entries
	    	List<CFentry> entries = map.get(user);
	    	//System.out.println("first size: " + entries.size());
	    	boolean passed = entries.remove(entry);
	    	map.replace(user, entries);
	    	entries = map.get(user);
	    	//System.out.println("after size: " + entries.size());
	    	return passed;
	    }

}
