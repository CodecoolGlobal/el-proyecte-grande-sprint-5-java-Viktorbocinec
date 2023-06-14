package com.viktor.brainexpander.service;

import com.viktor.brainexpander.model.Question;
import com.viktor.brainexpander.repositories.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question saveQuestion(Question question) {
        return questionRepository.save(question);
    }

    public List<Question> findAllQuestions() {
        return questionRepository.findAll();
    }

    public void deleteQuestionById(Long id) {
        questionRepository.deleteById(id);
    }

    public Question updateQuestionById(Long id, Question questionData) {
        Optional<Question> optionalQuestion = questionRepository.findById(id);
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            if (questionData.getQuestionText() != null) {
                question.setQuestionText(questionData.getQuestionText());
            }
            if (questionData.getAnswerText() != null) {
                question.setAnswerText(questionData.getAnswerText());
            }
            if (questionData.getCategory() != null) {
                question.setCategory(questionData.getCategory());
            }
            if (questionData.getUsername() != null) {
                question.setUsername(questionData.getUsername());
            }
            return questionRepository.save(question);
        }
        return null;
    }

    public Long numberOfQuestionsByUsernameAndCategory(String username, String category) {
        return questionRepository.countQuestionByUsernameAndCategory(username, category);
    }

    public List<Question> getQuestionsByUsername(Optional<String> username) {
        return username.map(questionRepository::findQuestionsByUsername)
                .orElse(questionRepository.findAll());
    }

    public List<Question> getQuestionsByUsernameAndCategory(String username, String category) {
        if (username != null && category != null) {
            return questionRepository.findQuestionsByUsernameAndCategory(username, category);
        } else if (username != null) {
            return questionRepository.findQuestionsByUsername(username);
        } else {
            return questionRepository.findAll();
        }
    }

}