package guestbook;

import static org.junit.Assert.*;

import org.junit.*;

public class DBentryTest {
	String item = "";
	Double quantity = 1.0;
	Double valuePer = 1.0;
	static String user = "test";
	
	static MapStore mapstore = new MapStore("entries");
	DBentry entry = new DBentry(item, valuePer, quantity);
	
	@BeforeClass
	public static void doBefore() {
		mapstore.addUser(user);
	}

	@Test
	public void verifyAddThreeUsers() {
		int oldNum = mapstore.getUserCount();
		String user1 = "John";
		mapstore.addUser(user1);
		String user2 = "Jane";
		mapstore.addUser(user2);
		String user3 = "Joe";
		mapstore.addUser(user3);
		assertEquals(mapstore.getUserCount(), (Integer) (oldNum+3));
	}
	
	@Test
	public void addOneEntryToAUser() {
		int num = mapstore.getMap().get(user).size();
		entry = new DBentry(item, 4.5, 2.0);
		mapstore.addEntry(user, entry);
		assertEquals(mapstore.getMap().get(user).size(), num+1);
	}
	
	@Test
	public void verifyUsersAreDifferent() {
		String[] s = {"test", "John", "Jane", "Joe"};
		String[] r = new String[4];
		//assertEquals
	}
	
	@Test
	public void addOneEntry() {
		int numEntries = mapstore.getMap().get(user).size();
		entry = new DBentry(item, 2.0, 3.0);
		mapstore.addEntry(user, entry);
		assertEquals(mapstore.getMap().get(user).size(), numEntries+1);
	}
	
	@Test
	public void addOneEntryTwoUsers() {
		String user1 = "Dave";
		mapstore.addUser(user1);
		String user2 = "Don";
		mapstore.addUser(user2);
		
		int numEntries1 = mapstore.getMap().get(user1).size();
		entry = new DBentry(item, 2.0, 3.0);
		mapstore.addEntry(user1, entry);
		
		int numEntries2 = mapstore.getMap().get(user2).size();
		entry = new DBentry(item, 2.0, 3.0);
		mapstore.addEntry(user2, entry);
		assertTrue((mapstore.getMap().get(user1).size() > numEntries1) && (mapstore.getMap().get(user2).size() >numEntries2));
	}
	
	@Test
	public void verifyDeleteEntry() {
		int num = mapstore.getMap().get("Dave").size();
		DBentry e = mapstore.getMap().get("Dave").get(0);
		mapstore.delEntry("Dave", e);
		assertTrue(mapstore.getMap().get("Dave").size() < num);
	}
	
	@Test
	public void checkAllItemsProperlyAdded() {
		
	}
	
	@Test
	public void addItemOneString() {
		int num = mapstore.getMap().get(user).size();
		item = "Plastic";
		entry = new DBentry(item, 1.0, 3.0);
		mapstore.addEntry(user, entry);
		assertTrue(mapstore.getMap().get(user).size() > num);
	}
	
	@Test
	public void addItemWithSpace() {
		int num = mapstore.getMap().get(user).size();
		item = "Plastic Bags";
		entry = new DBentry(item, 1.0, 3.0);
		mapstore.addEntry(user, entry);
		assertTrue(mapstore.getMap().get(user).size() > num);
	}
	
	@Test
	public void addItemWithNumber() {
		int num = mapstore.getMap().get(user).size();
		item = "Plastic Bags 60";
		entry = new DBentry(item, 1.0, 3.0);
		mapstore.addEntry(user, entry);
		assertTrue(mapstore.getMap().get(user).size() > num);
	}
	
	@Test
	public void checkQuantityWholeNumber() {
		int num = mapstore.getMap().get(user).size();
		quantity = 4.0;
		entry = new DBentry(item, 1.0, quantity);
		mapstore.addEntry(user, entry);
		int num1 = mapstore.getMap().get(user).size();
		assertEquals(mapstore.getMap().get(user).get(num1-1).quantity, (Double) 4.0);
	}
	
	@Test
	public void checkQuantityDoubleNumber() {
		quantity = 4.4;
		entry = new DBentry(item, 1.0, quantity);
		mapstore.addEntry(user, entry);
		int num1 = mapstore.getMap().get(user).size();
		assertEquals(mapstore.getMap().get(user).get(num1-1).quantity, (Double) 4.4);
	}
	
	@Test
	public void checkQuantityZero() {
		quantity = 0.0;
		entry = new DBentry(item, 1.0, quantity);
		mapstore.addEntry(user, entry);
		int num1 = mapstore.getMap().get(user).size();
		assertEquals(mapstore.getMap().get(user).get(num1-1).quantity, (Double) 0.0);
	}
	
	@Test
	public void checkValueWholeNumber() {
		valuePer = 2.0;
		entry = new DBentry(item, valuePer, 1.0);
		mapstore.addEntry(user, entry);
		int num1 = mapstore.getMap().get(user).size();
		assertEquals(mapstore.getMap().get(user).get(num1-1).valuePer, (Double) 2.0);
	}
	
	@Test
	public void checkValueDoubleNumber() {
		valuePer = 2.7;
		entry = new DBentry(item, valuePer, 1.0);
		mapstore.addEntry(user, entry);
		int num1 = mapstore.getMap().get(user).size();
		assertEquals(mapstore.getMap().get(user).get(num1-1).valuePer, (Double) 2.7);
	}
	
	@Test
	public void checkContainsUser() {
		String user = "Jane";
		assertTrue(mapstore.contains(user));
	}

}
