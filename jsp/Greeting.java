package guestbook;

import java.util.ArrayList;
import java.util.Date;

import com.google.appengine.api.users.User;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.googlecode.objectify.annotation.Parent;


@Entity
public class Greeting implements Comparable<Greeting> {
    @Parent Key<Guestbook> guestbookName;
    @Id Long id;
    @Index User user;
    @Index String item;
    @Index String carbon;
    @Index String category;
    @Index String quantity;
    @Index String emission;
    @Index String htmlDate;
    @Index Date date;
    private Greeting() {}
    public Greeting(User user, String item, String carbon, String category, String quantity, String emission, String htmlDate, String guestbookName) {
    	this.user = user;
        this.item = item;
        this.carbon = carbon;
        this.category = category;
        this.quantity = quantity;
        this.emission = emission;
        date = new Date();
        this.htmlDate = htmlDate;
        this.guestbookName = Key.create(Guestbook.class, guestbookName);
    }
    public User getUser() {
        return user;
    }
    public String getItem() {
        return item;
    }
    public String getCarbon() {
    	return carbon;
    }
    public String getCategory() {
    	return category;
    }
    public String getQuantity() {
    	return quantity;
    }
    public String getEmission() {
    	return emission;
    }
    public String getHTMLDate() {
    	return htmlDate;
    }
    public Date getDate() {
    	return date;
    }

    @Override
    public int compareTo(Greeting other) {
        if (date.after(other.date)) {
            return -1;
        } else if (date.before(other.date)) {
            return 1;
        }
        return 0;
     }
}
















