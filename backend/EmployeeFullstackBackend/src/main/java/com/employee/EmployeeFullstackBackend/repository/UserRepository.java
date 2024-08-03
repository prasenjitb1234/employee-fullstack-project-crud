package com.employee.EmployeeFullstackBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee.EmployeeFullstackBackend.model.User;



public interface UserRepository extends JpaRepository<User, Long>{

}
