package ee.cake.order;

import java.math.BigDecimal;
import java.util.List;

public class Order {
    private Long id;
    private String customerName;
    private BigDecimal price;
    private StatusCode statusCode;
    private List<OrderCake> orderedCakes;

    public enum StatusCode {
        SUBMITTED, READY, DELIVERED, CANCELLED
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public StatusCode getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(StatusCode statusCode) {
        this.statusCode = statusCode;
    }

    public List<OrderCake> getOrderedCakes() {
        return orderedCakes;
    }

    public void setOrderedCakes(List<OrderCake> orderedCakes) {
        this.orderedCakes = orderedCakes;
    }
}
