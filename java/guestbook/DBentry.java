package guestbook;

import java.math.BigDecimal;
import java.math.MathContext;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;



public class DBentry extends Entry{
	//Long id;
    //String item;
    //Double quantity;
    //Double valuePer;
    //DBBehavior db = new DBBehavior();
    private DBentry() {}
    public DBentry(String name, Double value, Double quantity) {
    	this.item = name;
    	//try catch for invalid input
    	this.valuePer = value;
    	this.quantity  = quantity;
    	behavior = new DBBehavior();
    }
    
}