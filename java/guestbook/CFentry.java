package guestbook;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import com.google.appengine.api.users.User;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.googlecode.objectify.annotation.Parent;


@Entity
public class CFentry extends Entry{
    Double carbon;
    String category;
    Double emission;

    private CFentry() {}
    public CFentry(String item, Double carbon, String category, Double quantity, Double emission) {
        this.item = item;
        this.carbon = carbon;
        this.category = category;
        this.quantity = quantity;
        this.emission = emission;
        this.date = new Date();
        behavior = new CFBehavior();
    }
    public String getItem() {
        return item;
    }
    public Double getCarbon() {
    	return carbon;
    }
    public String getCategory() {
    	return category;
    }
    public Double getQuantity() {
    	return quantity;
    }
    public Double getEmission() {
    	return emission;
    }
}