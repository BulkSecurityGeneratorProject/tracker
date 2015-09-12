package io.github.vdubois.tracker.repository;

import io.github.vdubois.tracker.domain.Alert;
import io.github.vdubois.tracker.domain.Price;
import io.github.vdubois.tracker.domain.ProductToTrack;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Alert entity.
 */
public interface AlertRepository extends JpaRepository<Alert,Long> {

    @Query("select alert from Alert alert where alert.user.login = ?#{principal.username}")
    List<Alert> findAllForCurrentUser();

    List<Alert> findAllByProductToTrack(ProductToTrack productToTrack);
}
