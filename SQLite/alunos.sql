CREATE TABLE alunos(
    id                 INTEGER             PRIMARY KEY          AUTOINCREMENT,
    nome               VARCHAR(255)                             NOT NULL,
    rga                VARCHAR(255)                             NOT NULL,
    curso              VARCHAR(255),
    registro_em        DATETIME            DEFAULT CURRENT_TIMESTAMP,
    situacao           VARCHAR(255)
);

INSERT INTO alunos(nome, rga, curso, situacao)
VALUES 
    ("Roger Daniel Rôdas", "2018.1907.023-9", "Sistemas de Informação", "ativo"),
    ("Victor Koji Oshiro Shinohara", "2018.1907.020-4", "Sistemas de Informação", "ativo")

-- DELETE FROM alunos WHERE id = 1