package com.pic.picapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pic.picapp.domain.Person;

/**
 * {@link JpaRepository} for a Person.
 * 
 * @author robert
 */
public interface PersonRepository extends JpaRepository<Person, Long> {
}
