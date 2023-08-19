package com.ansh.blog.blogappapis.payloads;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RoleDto {

    private int id;
    private String name;

    @JsonIgnore
    public int getId(){
        return this.id;
    }

    @JsonProperty
    public void setId(int id) {
        this.id = id;
    }
}
