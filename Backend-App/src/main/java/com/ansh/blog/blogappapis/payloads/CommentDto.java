package com.ansh.blog.blogappapis.payloads;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDto {

    private int id;
    private String content;
    private String username;
}
