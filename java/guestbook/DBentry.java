package guestbook;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;



public class DBentry{
	//Long id;
    String item;
    Double quantity;
    Double valuePer;
    private DBentry() {}
    public DBentry(String name, Double value, Double quantity) {
    	this.item = name;
    	//try catch for invalid input
    	this.valuePer = value;
    	this.quantity  = quantity;
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
}