package backend.flashcards.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.flashcards.model.Flashcard;

@Repository
public interface FlashcardRepository extends JpaRepository<Flashcard, Long> {}
