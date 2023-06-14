package com.viktor.brainexpander.controllers;

import com.viktor.brainexpander.model.Question;
import com.viktor.brainexpander.service.QuestionService;
import jakarta.websocket.server.PathParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

//    @GetMapping
//    public ResponseEntity<List<Question>> getAllQuestions(){
//        List<Question> questions = questionService.findAllQuestions();
//        return new ResponseEntity<>(questions, HttpStatus.OK);
//    }

    @GetMapping
    public ResponseEntity<List<Question>> getQuestions(
            @RequestParam(value = "username", required = true) String username,
            @RequestParam(value = "category", required = false) String category) {

        List<Question> questions;

        if (category == null) {
            // If no category is provided, fetch all questions for the user
            questions = questionService.getQuestionsByUsername(username.describeConstable());
        } else {
            // If a category is provided, fetch questions for the user in that category
            questions = questionService.getQuestionsByUsernameAndCategory(username, category);
        }

        return new ResponseEntity<>(questions, HttpStatus.OK);
    }


    @PostMapping("/upload")
    public ResponseEntity<Question> uploadQuestion(
            @RequestParam("questionText") String questionText,
            @RequestParam("answerText") String answerText,
            @RequestParam("category") String category,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("username") String username
    )throws IOException {
        LocalDate postDate = LocalDate.now();

        Question question = new Question();
        question.setPostDate(postDate);
        question.setQuestionText(questionText);
        question.setAnswerText(answerText);
        question.setCategory(category);
        if (image != null && !image.isEmpty()) {
            question.setImage(image.getBytes());
        }
        question.setUsername(username);

        Question savedQuestion = questionService.saveQuestion(question);
        return new ResponseEntity<>(savedQuestion, HttpStatus.CREATED);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id){
        questionService.deleteQuestionById(id);
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(
            @PathVariable Long id,
            @RequestBody Question question
    ){
        Question updatedQuestion = questionService.updateQuestionById(id, question);
        if(updatedQuestion == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedQuestion);
    }

//    @GetMapping("/{username}/{category}")
//    public Long findNumberOfQuestionsByUsernameAndCategory(@PathVariable String username, @PathVariable String category){
//        return questionService.numberOfQuestionsByUsernameAndCategory(username, category);
//    }


}
