package webbanhngot.entity;

public class OptionCake {
	private Long option_cake_id;
	private String category_name;

	public OptionCake() {

	}

	public OptionCake(Long option_cake_id, String category_name) {
		this.option_cake_id = option_cake_id;
		this.category_name = category_name;
	}

	public Long getOption_cake_id() {
		return option_cake_id;
	}

	public void setOption_cake_id(Long option_cake_id) {
		this.option_cake_id = option_cake_id;
	}

	public String getCategory_name() {
		return category_name;
	}

	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}

	@Override
	public String toString() {
		return "OptionCake [option_cake_id=" + option_cake_id + ", category_name" + category_name + "]";
	}
}
