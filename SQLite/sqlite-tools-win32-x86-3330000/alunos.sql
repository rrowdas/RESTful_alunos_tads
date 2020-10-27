
CREATE TABLE alunos(
    id                      INT PRIMARY KEY               NOT NULL,
    nome                    VARCHAR(100)                  NOT NULL,
    rga                     VARCHAR(50)                   NOT NULL,
    curso                   VARCHAR(50),
    registro_em             DATETIME,
    situacao                VARCHAR(50)
);