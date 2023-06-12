package com.viktor.brainexpander.service;

import com.viktor.brainexpander.model.Question;
import com.viktor.brainexpander.repositories.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question saveQuestion(Question question){
        return questionRepository.save(question);
    }

    public List<Question> findAllQuestions(){
        return questionRepository.findAll();
    }

    public void deleteQuestionById(Long id){
        questionRepository.deleteById(id);
    }

    public Question updateQuestionById(Long id, Question questionData){
        Optional<Question> optionalQuestion = questionRepository.findById(id);
        if(optionalQuestion.isPresent()){
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
            return questionRepository.save(question);
        }
        return null;
    }

};