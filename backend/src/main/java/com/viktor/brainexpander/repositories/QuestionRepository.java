package com.viktor.brainexpander.repositories;

import com.viktor.brainexpander.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface QuestionRepository extends JpaRepository<Question, Long> {

    Long countQuestionByUsernameAndCategory(String username, String category);

    List<Question> findQuestionsByUsername(String username);

    List<Question> findQuestionsByUsernameAndCategory(String username, String category);


}
