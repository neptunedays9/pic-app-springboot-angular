package com.pic.picapp.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class Sensitivity {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private Integer sceneId;

    private Integer storyId;

    private float neg;

    private float neu;

    private float pos;

    private float compound;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSceneId() {
        return sceneId;
    }

    public void setSceneId(Integer sceneId) {
        this.sceneId = sceneId;
    }

    public float getNeg() {
        return neg;
    }

    public void setNeg(float neg) {
        this.neg = neg;
    }

    public float getNeu() {
        return neu;
    }

    public void setNeu(float neu) {
        this.neu = neu;
    }

    public float getPos() {
        return pos;
    }

    public void setPos(float pos) {
        this.pos = pos;
    }

    public float getCompound() {
        return compound;
    }

    public void setCompound(float compound) {
        this.compound = compound;
    }

    public Integer getStoryId() {
        return storyId;
    }

    public void setStoryId(Integer storyId) {
        this.storyId = storyId;
    }

}
