package com.pic.picapp.dao;

import org.springframework.data.repository.CrudRepository;
import java.util.List;
import com.pic.picapp.domain.Sensitivity;

public interface SensitivityRepository extends CrudRepository<Sensitivity, Integer>{
    List<Sensitivity> findByStoryId(Integer senId);

}