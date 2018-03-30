package ee.cake.order;

import ee.cake.cake.Cake;
import ee.cake.cake.CakeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import static ee.cake.order.Order.StatusCode.SUBMITTED;

@Component
@Transactional
public class OrderDao {

    @Autowired
    private JdbcTemplate database;

    @Autowired
    private CakeDao cakeDao;

    public void insert(NewOrderJson json) {
        Long orderId = insertOrder(json.getCustomerName(), findTotalOrderPrice(json));

        insertOrderCake(orderId, json.getCakeId(), json.getAmount());
    }

    public List<Order> findAllOrders() {
        return database.query("SELECT * FROM ORDER;", new OrderMapper());
    }

    public void updateStatus(Long orderId, Order.StatusCode statusCode) {
        List<Object> args = new ArrayList<>();
        args.add(statusCode.toString());
        args.add(orderId);

        database.update("UPDATE ORDER SET STATUS_CODE = ? WHERE ID = ?;", args.toArray());
    }

    private List<OrderCake> findOrderedCakesByOrder(Long orderId) {
        List<Object> args = new ArrayList<>();
        args.add(orderId);

        return database.query("SELECT * FROM ORDER_CAKE WHERE ORDER_ID = ?;", args.toArray(), new OrderCakeMapper());

    }

    private BigDecimal findTotalOrderPrice(NewOrderJson json) {
        Cake cake = cakeDao.findById(json.getCakeId());

        return new BigDecimal(cake.getPrice().intValue() * json.getAmount());
    }

    private void insertOrderCake(Long orderId, Long cakeId, Integer amount) {
        List<Object> args = new ArrayList<>();
        args.add(orderId);
        args.add(cakeId);
        args.add(amount);

        database.update("INSERT INTO ORDER_CAKE (order_id, cake_id, amount) VALUES (?,?,?);", args.toArray());
    }

    private Long insertOrder(String customerName, BigDecimal amount) {
        List<Object> args = new ArrayList<>();
        args.add(customerName);
        args.add(amount);
        args.add(SUBMITTED.toString());

        database.update("INSERT INTO ORDER (customer_name, price, status_code) VALUES (?,?,?);", args.toArray());

        return database.queryForObject("CALL IDENTITY()", Long.class); //return last generated identity
    }

    private final class OrderMapper implements RowMapper<Order> {
        @Override
        public Order mapRow(ResultSet rs, int rowNum) throws SQLException {
            Order order = new Order();
            order.setId(rs.getLong("id"));
            order.setCustomerName(rs.getString("customer_name"));
            order.setPrice(rs.getBigDecimal("price"));
            order.setStatusCode(Order.StatusCode.valueOf(rs.getString("status_code")));
            order.setOrderedCakes(findOrderedCakesByOrder(order.getId()));
            return order;
        }
    }

    private final class OrderCakeMapper implements RowMapper<OrderCake> {
        @Override
        public OrderCake mapRow(ResultSet rs, int rowNum) throws SQLException {
            OrderCake orderCake = new OrderCake();
            orderCake.setId(rs.getLong("id"));
            orderCake.setAmount(rs.getInt("amount"));
            orderCake.setCake(cakeDao.findById(rs.getLong("cake_id")));
            return orderCake;
        }
    }
}
