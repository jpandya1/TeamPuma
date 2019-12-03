package guestbook;

import java.math.*;

public class DBBehavior implements doExtraBehavior{
	
	public DBBehavior() {};

	@Override
	public String doExtra(Entry entry) {
		BigDecimal bd = new BigDecimal(entry.getValue() * entry.getQuantity());
		bd = bd.round(new MathContext(3));
		Double rounded = bd.doubleValue();
		return rounded.toString();
	}

}
