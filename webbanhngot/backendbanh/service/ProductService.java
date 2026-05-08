package webbanhngot.service;

import java.util.ArrayList;

import webbanhngot.entity.Product;

public class ProductService {
	private ArrayList<Product> productlist = new ArrayList<Product>();

	// C
	public void addProduct(Product product) {
		productlist.add(product);
	}

	// R All
	public ArrayList<Product> getAllProducts() {
		return productlist;
	}

	// R BY ID
	public Product getProductByCakeIDd(Long cake_id) {
		for (Product product : productlist) {
			if (product.getCake_id().equals(cake_id)) {
				return product;
			}
		}
		return null;
	}

	// U
	public boolean updateProduct(Long cake_id, Product newProduct) {
		for (Product product : productlist) {
			if (product.getCake_id().equals(cake_id)) {
				product.setOption_cake_id(newProduct.getOption_cake_id());
				product.setQuantity(newProduct.getQuantity());
				product.setPrice(newProduct.getPrice());
				product.setDescription(newProduct.getDescription());
				product.setCake_name(newProduct.getCake_name());
				product.setCreate_at(newProduct.getCreate_at());
				return true;
			}
		}
		return false;
	}
	// D
}
