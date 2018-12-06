package com.pic.picapp.util;

import java.util.Date;
import java.util.List;

public class StoryModel {

	private String title;
	
	private String email;
	
	private List<SceneModel> scenes;

	public List<SceneModel> getScenes() {
		return scenes;
	}

	public void setScenes(List<SceneModel> scenes) {
		this.scenes = scenes;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
}
