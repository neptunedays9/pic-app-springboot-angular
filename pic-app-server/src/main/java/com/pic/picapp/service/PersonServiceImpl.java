package com.pic.picapp.service;

import java.util.List;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pic.picapp.domain.Person;
import com.pic.picapp.dao.PersonRepository;

/**
 * Service-Implementation for Persons.
 * 
 * @author robert
 */
@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class PersonServiceImpl implements PersonService {

  @NonNull
  private PersonRepository repo;

  @Override
  public List<Person> findAllPersons() {
    return repo.findAll();
  }
}
