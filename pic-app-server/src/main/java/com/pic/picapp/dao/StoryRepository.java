package com.pic.picapp.dao;

import org.springframework.data.repository.CrudRepository;

import com.pic.picapp.domain.Story;

public interface StoryRepository extends CrudRepository<Story, Integer>{

}
