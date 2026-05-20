package webbanhngot.service;

import java.util.ArrayList;

import webbanhngot.entity.Payment;

public class PaymentService {
	private ArrayList<Payment> paymentlist = new ArrayList<Payment>();

//C - Create
	public void addPayment(Payment payment) {
		paymentlist.add(payment);
	}

//R - Read all
	public ArrayList<Payment> getAllPayments() {
		return paymentlist;
	}

// R - read by payment_id
	public Payment getPaymentByID(Integer payment_id) {
		for (Payment payment : paymentlist) {
			if (payment.getPayment_id().equals(payment_id)) {
				return payment;
			}
		}
		return null;
	}

	// R - Read by order_id

	public Payment getPaymentByOrderID(Integer order_id) {
		for (Payment payment : paymentlist) {
			if (payment.getOrder_id().equals(order_id)) {
				return payment;
			}
		}
		return null;
	}

//U - Update 
	public boolean updatePayment(Integer payment_id, Payment newPayment) {
		for (Payment payment : paymentlist) {
			if (payment.getPayment_id().equals(payment_id)) {
				payment.setOrder_id(newPayment.getOrder_id());
				payment.setPayment_method(newPayment.getPayment_method());
				payment.setPayment_status(newPayment.getPayment_status());
				payment.setPayment_date(newPayment.getPayment_date());
				return true;
			}
		}
		return false;
	}

	// D - Delete
	public boolean deletePayment(Integer payment_id) {
		for (int i = 0; i < paymentlist.size(); i++) {
			if (paymentlist.get(i).getPayment_id().equals(payment_id)) {
				paymentlist.remove(i);
				return true;
			}
		}
		return false;
	}
}
