package com.pic.picapp.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity // This tells Hibernate to make a table out of this class
public class Scene {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private Integer storyId;

    private String story;

    @Lob
    private String scene;

    public String getStory() {
        return story;
    }

    public void setStory(String story) {
        this.story = story;
    }


	public Integer getStoryId() {
		return storyId;
	}

	public void setStoryId(Integer storyId) {
		this.storyId = storyId;
	}

	public String getScene() {
		return scene;
	}

	public void setScene(String scene) {
		this.scene = scene;
	}
}
