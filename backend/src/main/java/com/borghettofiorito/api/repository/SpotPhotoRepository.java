package com.borghettofiorito.api.repository;

import com.borghettofiorito.api.domain.entity.SpotPhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpotPhotoRepository extends JpaRepository<SpotPhoto, Long> {

    List<SpotPhoto> findAllBySpotIdOrderByDisplayOrderAscIdAsc(Long spotId);
}
