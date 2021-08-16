package backend.flashcards.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.flashcards.exception.ResourceNotFoundException;
import backend.flashcards.model.Flashcard;
import backend.flashcards.repository.FlashcardRepository;

@RestController @CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class FlashcardController 
{
	@Autowired
	private FlashcardRepository flashcardRepository;

	@GetMapping("/flashcards")
	public List<Flashcard> getAllFlashcards() 
	{
		return flashcardRepository.findAll();
	}

	@GetMapping("/flashcards/{id}")
	public ResponseEntity<Flashcard> getFlashcardById(@PathVariable(value = "id") Long flashcardId)
	throws ResourceNotFoundException 
	{
		Flashcard flashcard = flashcardRepository.findById(flashcardId)
		.orElseThrow(() -> new ResourceNotFoundException("Flashcard not found for this id :: " + flashcardId));
		return ResponseEntity.ok().body(flashcard);
	}

	@PostMapping("/flashcards")
	public Flashcard createFlashcard(@Valid @RequestBody Flashcard flashcard) 
	{
		return flashcardRepository.save(flashcard);
	}

	@PutMapping("/flashcards/{id}")
	public ResponseEntity<Flashcard> updateFlashcard(@PathVariable(value = "id") Long flashcardId,
	@Valid @RequestBody Flashcard flashcardDetails) 
	throws ResourceNotFoundException 
	{
		Flashcard flashcard = flashcardRepository.findById(flashcardId)
		.orElseThrow(() -> new ResourceNotFoundException("Flashcard not found for this id :: " + flashcardId));

		flashcard.setAnswer(flashcardDetails.getAnswer());
		flashcard.setQuestion(flashcardDetails.getQuestion());
		flashcard.setSubject(flashcardDetails.getSubject());
		final Flashcard updatedFlashcard = flashcardRepository.save(flashcard);
		return ResponseEntity.ok(updatedFlashcard);
	}

	@DeleteMapping("/flashcards/{id}")
	public Map<String, Boolean> deleteFlashcard(@PathVariable(value = "id") Long flashcardId)
	throws ResourceNotFoundException 
	{
		Flashcard flashcard = flashcardRepository.findById(flashcardId)
		.orElseThrow(() -> new ResourceNotFoundException("Flashcard not found for this id :: " + flashcardId));

		flashcardRepository.delete(flashcard);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}
