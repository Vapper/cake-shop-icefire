package ee.cake.cake;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Component
@Transactional
public class CakeDao {

    @Autowired
    private JdbcTemplate database;

    public List<Cake> findAvailableCakes() {
        return database.query("SELECT * FROM CAKE WHERE AVAILABLE = TRUE;", new CakeMapper());
    }

    public List<Cake> findAllCakes() {
        return database.query("SELECT * FROM CAKE;", new CakeMapper());
    }

    public void insert(NewCakeJson json) {
        List<Object> args = new ArrayList<>();
        args.add(json.getName());
        args.add(json.getPrice());
        args.add(true);

        database.update("INSERT INTO CAKE (name, price, available) VALUES (?,?,?);", args.toArray());
    }

    public Cake findById(Long cakeId) {
        List<Object> args = new ArrayList<>();
        args.add(cakeId);
        return database.query("SELECT * FROM CAKE WHERE id = ?;", args.toArray(), new CakeMapper()).get(0);
    }

    public void updateAvailability(Long cakeId, boolean availability) {
        List<Object> args = new ArrayList<>();
        args.add(availability);
        args.add(cakeId);

        database.update("UPDATE CAKE SET AVAILABLE = ? WHERE ID = ?;", args.toArray());
    }

    private final class CakeMapper implements RowMapper<Cake> {
        @Override
        public Cake mapRow(ResultSet rs, int rowNum) throws SQLException {
            Cake cake = new Cake();
            cake.setId(rs.getLong("id"));
            cake.setName(rs.getString("name"));
            cake.setPrice(rs.getBigDecimal("price"));
            cake.setAvailable(rs.getBoolean("available"));
            return cake;
        }
    }
}
