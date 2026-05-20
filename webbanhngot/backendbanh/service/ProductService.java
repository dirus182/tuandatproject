package webbanhngot.service;

import java.util.ArrayList;

import webbanhngot.entity.Product;

public class ProductService {

	private ArrayList<Product> productlist = new ArrayList<Product>();

	// C - Create
	public void addProduct(Product product) {
		productlist.add(product);
	}

	// R - Read all
	public ArrayList<Product> getAllProducts() {
		return productlist;
	}

	// R - Read by cake_id
	public Product getProductByCakeID(Long cake_id) {
		for (Product product : productlist) {
			if (product.getCake_id().equals(cake_id)) {
				return product;
			}
		}
		return null;
	}

	// U - Update
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

	// D - Delete
	public boolean deleteProduct(Long cake_id) {
		for (int i = 0; i < productlist.size(); i++) {
			if (productlist.get(i).getCake_id().equals(cake_id)) {
				productlist.remove(i);
				return true;
			}
		}
		return false;
	}
}