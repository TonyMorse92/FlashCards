package backend.flashcards.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "flashcards")
public class Flashcard
{
	private long id;
	private String subject;
	private String question;
	private String answer;

	public Flashcard() {}

	public Flashcard(String subject, String question, String answer)
	{
		this.subject = subject;
		this.question = question;
		this.answer = answer;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long getId()
	{
		return id;
	}
	public void setId(long id)
	{
		this.id = id;
	}

	@Column(name = "subject", nullable = false)
	public String getSubject()
	{
		return subject;
	}
	public void setSubject(String subject)
	{
		this.subject = subject;
	}

	@Column(name = "question", nullable = false)
	public String getQuestion()
	{
		return question;
	}
	public void setQuestion(String question)
	{
		this.question = question;
	}

	@Column(name = "answer", nullable = false)
	public String getAnswer()
	{
		return answer;
	}
	public void setAnswer(String answer)
	{
		this.answer = answer;
	}

	@Override
	public String toString()
	{
		return "Flashcard [id=" + id + ", subject=" + subject + ", question=" + question + ", answer=" + answer + "]";
	}
}
