package guestbook;

import java.text.*;

public class CFBehavior implements doExtraBehavior{
	
	public CFBehavior() {};

	@Override
	public String doExtra(Entry entry) {
		String pattern = "yyyy-MM-dd";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		String date = simpleDateFormat.format(entry.getDate());
		return date;
	}

}
