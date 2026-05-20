package webbanhngot.service;

import java.util.ArrayList;

import webbanhngot.entity.OrderDetail;

public class OrderDetailService {
	private ArrayList<OrderDetail> orderdetaillist = new ArrayList<OrderDetail>();

//C
	public void addOrderDetail(OrderDetail orderdetail) {
		orderdetaillist.add(orderdetail);
	}

	// R ALL
	public ArrayList<OrderDetail> getAllOrderDetails() {
		return orderdetaillist;
	}

	// R BY ID
	public OrderDetail getOrderDetailByID(Integer order_detail_id) {
		for (OrderDetail orderdetail : orderdetaillist) {
			if (orderdetail.getOrder_detail_id().equals(order_detail_id)) {
				return orderdetail;
			}
		}
		return null;
	}

	// U
	public boolean updateOrderDetail(Integer order_detail_id, OrderDetail newOrderDetail) {
		for (OrderDetail orderdetail : orderdetaillist) {
			if (orderdetail.getOrder_detail_id().equals(order_detail_id)) {
				orderdetail.setOrder_id(newOrderDetail.getOrder_id());
				orderdetail.setCake_id(newOrderDetail.getCake_id());
				orderdetail.setQuantity(newOrderDetail.getQuantity());
				orderdetail.setSub_total(newOrderDetail.getSub_total());
				return true;
			}
		}
		return false;
	}

	// D
	public boolean deleteOrderDetail(Integer order_detail_id) {
		for (int i = 0; i < orderdetaillist.size(); i++) {
			if (orderdetaillist.get(i).getOrder_detail_id().equals(order_detail_id)) {
				orderdetaillist.remove(i);
				return true;
			}
		}
		return false;
	}
}
