package com.viktor.brainexpander.controllers;

import com.viktor.brainexpander.model.Question;
import com.viktor.brainexpander.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions(){
        List<Question> questions = questionService.findAllQuestions();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

//    @PostMapping("/upload")
//    public ResponseEntity<Question> uploadQuestion(
//            @RequestParam("questionText") String questionText,
//            @RequestParam("answerText") String answerText,
//            @RequestParam("category") String category,
//            @RequestParam(value = "image", required = false) MultipartFile image
//    )throws IOException {
//        LocalDate postDate = LocalDate.now();
//
//        Question question = new Question();
//        question.setQuestionText(questionText);
//        question.setAnswerText(answerText);
//        question.setCategory(category);
//        if (image != null && !image.isEmpty()) {
//            question.setImage(image.getBytes());
//        }
//
//        Question savedQuestion = questionService.saveQuestion(question);
//        return new ResponseEntity<>(savedQuestion, HttpStatus.CREATED);
//    }

    @PostMapping("/upload")
    public ResponseEntity<Question> uploadQuestion(
            @RequestParam("questionText") String questionText,
            @RequestParam("answerText") String answerText,
            @RequestParam("category") String category,
            @RequestParam(value = "image", required = false) MultipartFile image
    )throws IOException {
        LocalDate postDate = LocalDate.now();

        Question question = new Question();
        question.setQuestionText(questionText);
        question.setAnswerText(answerText);
        question.setCategory(category);
        if (image != null && !image.isEmpty()) {
            question.setImage(image.getBytes());
        }

        Question savedQuestion = questionService.saveQuestion(question);
        return new ResponseEntity<>(savedQuestion, HttpStatus.CREATED);
    }

//    @PostMapping("/upload")
//    public ResponseEntity<Question> uploadQuestion(@RequestBody QuestionDto questionDto)throws IOException {
//        LocalDate postDate = LocalDate.now();
//        System.out.println(questionDto);
//        Question question = new Question();
//        question.setQuestionText(questionDto.getQuestionText());
//        question.setAnswerText(questionDto.getAnswerText());
//        question.setCategory(questionDto.getCategory());
//        if (questionDto.getImage() != null) {
//            question.setImage(questionDto.getImage());
//        }
//
//        Question savedQuestion = questionService.saveQuestion(question);
//        return new ResponseEntity<>(savedQuestion, HttpStatus.CREATED);
//    }
    
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
}
