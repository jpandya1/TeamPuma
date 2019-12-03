package guestbook;

import java.util.Date;

public class Entry{
	String item;
	Double quantity;
	Date date;
	Double valuePer;
	
	doExtraBehavior behavior;
	
	public String doBehavior(){
		return behavior.doExtra(this);
	}
	
	public Date getDate() {
    	return date;
    }
	
	public Double getQuantity() {
    	return quantity;
    }
	
	public String getItem() {
    	return item;
    }
	
	public Double getValue() {
    	return valuePer;
    }
	
	public void setBehavior(doExtraBehavior b) {
		behavior = b;
	}
	
}
