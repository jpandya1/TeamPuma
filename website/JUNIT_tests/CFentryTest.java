package guestbook;

import static org.junit.Assert.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.junit.*;

public class CFentryTest {
	String item = "";
	Double carbon = 0.0;
	String category = "Plastic";
	Double quantity = 0.0;
	Double emission = carbon*quantity;
	static String user = "test";

	CFentry entry;
	static CarbMap hashMap = new CarbMap("entries");
	
	@BeforeClass
	public static void doFirst() {
		hashMap.addUser(user);
	}
	

	@Test
	public void addUser() {
		item = "plastic";
		entry = new CFentry(item, carbon, category, quantity, carbon*quantity);
		hashMap.addUser("test2");
		assertEquals(hashMap.map.size(), 2);
	}
	
	@Test
	public void checkAddEntry() {
		item = "Paper";
		entry = new CFentry(item, carbon, category, quantity, carbon*quantity);
		hashMap.addEntry(user, entry);
		assertTrue(hashMap.getMap().get(user).size() == 1);
	}
	
	@Test
	public void addEntryWithItemAsNumber() {
		hashMap = new CarbMap("entries");
		int numEntries1 = hashMap.getMap().get(user).size();
		item = "001";
		entry = new CFentry(item, carbon, category, quantity, carbon*quantity);
		hashMap.addEntry(user, entry);
		int numEntries2 = hashMap.getMap().get(user).size();
		assertTrue(numEntries2 > numEntries1);
		
	}
	
	@Test
	public void checkRemoveEntry() {
		if(hashMap.getMap() != null) {
			hashMap.getMap();
			entry = new CFentry(item, carbon, category, quantity, carbon*quantity);
			hashMap.getMap().get(user).add(entry);
			int numEntries1 = hashMap.getMap().get(user).size();
			hashMap.delEntry(user, entry);
			int numEntries2 = hashMap.getMap().get(user).size();
			assertNotEquals(numEntries1, numEntries2);
		}
	}
	
	@Test
	public void addEntryWithItemStringWithSpaces() {
		item = "plastic bag";
		int numEntries1 = hashMap.getMap().get(user).size();
		entry = new CFentry(item, carbon, category, quantity, carbon*quantity);
		hashMap.addEntry(user, entry);
		int numEntries2 = hashMap.getMap().get(user).size();
		assertTrue(numEntries1 < numEntries2);
	}
	
	@Test
	public void addEntryWithItemStringWithSpacesAndNumbers() {
		item = "Plastic Bag 101";
		int numEntries1 = hashMap.getMap().get(user).size();
		entry = new CFentry(item, carbon, category, quantity, carbon*quantity);
		hashMap.addEntry(user, entry);
		int numEntries2 = hashMap.getMap().get(user).size();
		assertTrue(numEntries1 - numEntries2 == 1);
	}
	
	@Test
	public void removeEntryItemWithSpaces() {
		if(hashMap != null) {
			if(hashMap.getMap().get(user).size() < 2) {
				entry = new CFentry(item, carbon, category, quantity, carbon*quantity);
				hashMap.addEntry(user, entry);
			}
			int numEntries = hashMap.getMap().get(user).size();
			CFentry ent = hashMap.getMap().get(user).get(numEntries-1);
			hashMap.delEntry(user, ent);
			assertTrue(hashMap.getMap().get(user).size() < numEntries);
		}
	}
	
	@Test
	public void addCarbonWholeNumber() {
		carbon = (Double) 3.0;
		entry = new CFentry(item, carbon, category, quantity, carbon*quantity);
		hashMap.addEntry(user, entry);
		int numEntries = hashMap.getMap().get(user).size();
		Double d = hashMap.getMap().get(user).get(numEntries - 1).carbon;
		assertEquals(d, (Double) 3.0);
	}
	
	@Test
	public void addCarbonDoubleNumber() {
		carbon = 6.8;
		entry = new CFentry(item, carbon, category, quantity, carbon*quantity);
		hashMap.addEntry(user, entry);
		int numEntries = hashMap.getMap().get(user).size();
		Double d = hashMap.getMap().get(user).get(numEntries - 1).carbon;
		assertEquals(d, (Double) 6.8);
	}
	
	@Test
	public void addCategoryString() {
		category = "Paper";
		int numEntries1 = hashMap.getMap().get(user).size();
		entry = new CFentry(item, carbon, category, quantity, carbon*quantity);
		hashMap.addEntry(user, entry);
		int numEntries2 = hashMap.getMap().get(user).size();
		assertTrue(numEntries1 < numEntries2);
	}
	
	@Test
	public void addQuantityWholeNumber() {
		quantity = (Double) 4.0;
		entry = new CFentry(item, carbon, category, quantity, carbon*quantity);
		hashMap.addEntry(user, entry);
		int numEntries = hashMap.getMap().get(user).size();
		assertEquals(hashMap.getMap().get(user).get(numEntries - 1).quantity, (Double) 4.0);
	}
	
	@Test
	public void addQuanitityDoubleNumber() {
		quantity = 9.2;
		entry = new CFentry(item, carbon, category, quantity, carbon*quantity);
		hashMap.addEntry(user, entry);
		int numEntries = hashMap.getMap().get(user).size();
		assertEquals(hashMap.getMap().get(user).get(numEntries - 1).quantity, (Double) 9.2);
	}
	
	@Test
	public void addQuanitityZero() {
		quantity = 0.0;
		entry = new CFentry(item, carbon, category, quantity, carbon*quantity);
		hashMap.addEntry(user, entry);
		int numEntries = hashMap.getMap().get(user).size();
		assertEquals(hashMap.getMap().get(user).get(numEntries - 1).quantity, (Double) 0.0);
	}
	
	@Test
	public void addQuanitityLarge() {
		quantity = 1000000000.9;
		entry = new CFentry(item, carbon, category, quantity, carbon*quantity);
		hashMap.addEntry(user, entry);
		int numEntries = hashMap.getMap().get(user).size();
		assertTrue(hashMap.getMap().get(user).get(numEntries - 1).quantity > 1000000000);
	}
	
	@Test
	public void checkEmissionWholeNumbers() {
		carbon = 3.0;
		quantity = 4.0;
		entry = new CFentry(item, carbon, category, quantity, carbon*quantity);
		hashMap.addEntry(user, entry);
		int numEntries = hashMap.getMap().get(user).size();
		assertEquals(hashMap.getMap().get(user).get(numEntries).emission, (Double) 12.0);
	}
	
	@Test
	public void checkEmissionDoubleNumbers() {
		carbon = 2.2;
		quantity = 1.0;
		entry = new CFentry(item, carbon, category, quantity, carbon*quantity);
		hashMap.addEntry(user, entry);
		int numEntries = hashMap.getMap().get(user).size();
		assertEquals(hashMap.getMap().get(user).get(numEntries).emission, (Double) 2.2);
	}
	
	@Test
	public void checkEmissionWithZeroQuantity() {
		carbon = 2.2;
		quantity = 0.0;
		entry = new CFentry(item, carbon, category, quantity, carbon*quantity);
		hashMap.addEntry(user, entry);
		int numEntries = hashMap.getMap().get(user).size();
		assertEquals(hashMap.getMap().get(user).get(numEntries).emission, (Double) 0.0);
	}
	
	@Test
	public void checkEmissionWithZeroCarbon() {
		carbon = 0.0;
		quantity = 1.0;
		entry = new CFentry(item, carbon, category, quantity, carbon*quantity);
		hashMap.addEntry(user, entry);
		int numEntries = hashMap.getMap().get(user).size();
		assertEquals(hashMap.getMap().get(user).get(numEntries).emission, (Double) 0.0);
	}
	
	@Test
	public void checkDate() {
		entry = new CFentry("caps", 3.0, "Plastic", 2.0, 3.0*2.0);
		int numEntries = hashMap.getMap().get(user).size();
		assertEquals(hashMap.getMap().get(user).get(numEntries).getDate(), hashMap.getMap().get(user).get(numEntries).date);
	}
	
	@Test
	public void verifyAddThreeUsers() {
		int oldNum = hashMap.getUserCount();
		String user1 = "John";
		hashMap.addUser(user1);
		String user2 = "Jane";
		hashMap.addUser(user2);
		String user3 = "Joe";
		hashMap.addUser(user3);
		assertEquals(hashMap.getUserCount(), (Integer) (oldNum+3));
	}
	
	@Test
	public void addOneEntryToAUser() {
		int num = hashMap.getMap().get(user).size();
		entry = new CFentry("caps", 3.0, "Plastic", 2.0, 3.0*2.0);
		hashMap.addEntry(user, entry);
		assertEquals(hashMap.getMap().get(user).size(), num+1);
	}
	
	@Test
	public void addOneEntry() {
		int numEntries = hashMap.getMap().get(user).size();
		entry = new CFentry("caps", 3.0, "Plastic", 2.0, 3.0*2.0);
		hashMap.addEntry(user, entry);
		assertEquals(hashMap.getMap().get(user).size(), numEntries+1);
	}
	
	@Test
	public void addOneEntryTwoUsers() {
		String user1 = "Dave";
		hashMap.addUser(user1);
		String user2 = "Don";
		hashMap.addUser(user2);
		
		int numEntries1 = hashMap.getMap().get(user1).size();
		entry = new CFentry("caps", 3.0, "Plastic", 2.0, 3.0*2.0);
		hashMap.addEntry(user1, entry);
		
		int numEntries2 = hashMap.getMap().get(user2).size();
		entry = new CFentry("caps", 3.0, "Plastic", 2.0, 3.0*2.0);
		hashMap.addEntry(user2, entry);
		assertTrue((hashMap.getMap().get(user1).size() > numEntries1) && (hashMap.getMap().get(user2).size() >numEntries2));
	}
	
	@Test
	public void verifyDeleteEntry() {
		int num = hashMap.getMap().get(user).size();
		CFentry e = hashMap.getMap().get(user).get(0);
		hashMap.delEntry(user, e);
		assertTrue(hashMap.getMap().get("Dave").size() < num);
	}

}
