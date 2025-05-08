-- User table
CREATE TABLE user (
    u_userId INT PRIMARY KEY AUTO_INCREMENT,
    u_username VARCHAR(50) UNIQUE NOT NULL,
    u_password VARCHAR(255) NOT NULL,
    u_firstName VARCHAR(50),
    u_lastName VARCHAR(50),
    u_bio TEXT,
    u_followerCnt INT DEFAULT 0,
    u_followingCnt INT DEFAULT 0,
    u_postCnt INT DEFAULT 0
);

-- User Posts
CREATE TABLE userPosts (
    up_postId INT PRIMARY KEY AUTO_INCREMENT,
    up_userId INT NOT NULL,
    up_body TEXT,
    up_likeCnt INT DEFAULT 0,
    up_commentCnt INT DEFAULT 0,
    up_creationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (up_userId) REFERENCES user(u_userId)
);

-- Post Comments
CREATE TABLE postComments (
    pc_commentId INT PRIMARY KEY AUTO_INCREMENT,
    pc_postId INT NOT NULL,
    pc_userId INT NOT NULL,
    pc_body TEXT,
    pc_creationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pc_postId) REFERENCES userPosts(up_postId),
    FOREIGN KEY (pc_userId) REFERENCES user(u_userId)
);

-- Follows
CREATE TABLE follows (
    f_userId INT NOT NULL,
    f_followingId INT NOT NULL,
    PRIMARY KEY (f_userId, f_followingId),
    FOREIGN KEY (f_userId) REFERENCES user(u_userId),
    FOREIGN KEY (f_followingId) REFERENCES user(u_userId)
);

-- Saved Posts
CREATE TABLE savedPosts (
    sp_userId INT NOT NULL,
    sp_postId INT NOT NULL,
    PRIMARY KEY (sp_userId, sp_postId),
    FOREIGN KEY (sp_userId) REFERENCES user(u_userId),
    FOREIGN KEY (sp_postId) REFERENCES userPosts(up_postId)
);
