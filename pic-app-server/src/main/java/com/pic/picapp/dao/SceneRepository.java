package com.pic.picapp.dao;

import org.springframework.data.repository.CrudRepository;
import java.util.List;
import com.pic.picapp.domain.Scene;

public interface SceneRepository extends CrudRepository<Scene, Integer>{
    List<Scene> findByStoryId(Integer storyId);

}
