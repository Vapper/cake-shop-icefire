package ee.cake.cake;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("cakes")
public class CakeController {

    @Autowired
    private CakeDao cakeDao;

    @PostMapping("new")
    public void createNewCake(@RequestBody NewCakeJson json) {
        cakeDao.insert(json);
    }

    @GetMapping("all")
    public List<Cake> findAllCakes() {
        return cakeDao.findAllCakes();
    }

    @GetMapping("available")
    public List<Cake> findAvailableCakes() {
        return cakeDao.findAvailableCakes();
    }

    @PostMapping("{cakeId}/deactivate")
    public void findAvailableCakes(@PathVariable Long cakeId) {
        cakeDao.updateAvailability(cakeId, false);
    }
}
