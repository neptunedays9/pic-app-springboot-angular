package com.pic.picapp.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class Pic {
	   @Id
	    @GeneratedValue(strategy=GenerationType.AUTO)
	    private Integer id;

	    private String title;

	    private String story;

	    private String author;
	    
	    private byte[ ] image;

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public String getStory() {
			return story;
		}

		public void setStory(String story) {
			this.story = story;
		}

		public byte[ ] getImage() {
			return image;
		}

		public void setImage(byte[ ] image) {
			this.image = image;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getAuthor() {
			return author;
		}

		public void setAuthor(String author) {
			this.author = author;
		}
	    
	    
}
