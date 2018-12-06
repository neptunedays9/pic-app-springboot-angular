package com.pic.picapp.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.pic.picapp.domain.Person;

/**
 * Service-Interface for Persons.
 * 
 * @author robert
 */
@Service
public interface PersonService {

  List<Person> findAllPersons();
}
