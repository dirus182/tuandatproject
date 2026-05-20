package webbanhngot.service;

import java.util.ArrayList;

import webbanhngot.entity.OptionCake;

public class OptionCakeService {
	private ArrayList<OptionCake> optioncakelist = new ArrayList<OptionCake>();

// C
	public void addOptionCake(OptionCake optioncake) {
		optioncakelist.add(optioncake);
	}

	// R ALL
	public ArrayList<OptionCake> getAllOptionCakes() {
		return optioncakelist;
	}

	// R by ID
	public OptionCake getOptionCakeByID(Long option_cake_id) {
		for (OptionCake optioncake : optioncakelist) {
			if (optioncake.getOption_cake_id().equals(option_cake_id)) {
				return optioncake;
			}
		}
		return null;
	}

	// U tìm danh mục theo option_cake_id
	// nếu thấy thì cập nhật category_name
	public boolean updateOptionCake(Long option_cake_id, OptionCake newOpionCake) {
		for (OptionCake optioncake : optioncakelist) {
			if (optioncake.getOption_cake_id().equals(option_cake_id)) {
				optioncake.setCategory_name(newOpionCake.getCategory_name());
				return true;
			}
		}
		return false;
	}

	// Delete tìm theo option_cake_id
	public boolean deleteOptionCake(Long option_cake_id) {
		for (int i = 0; i < optioncakelist.size(); i++) {
			if (optioncakelist.get(i).getOption_cake_id().equals(option_cake_id)) {
				optioncakelist.remove(i);
				return true;
			}
		}
		return false;
	}

}
