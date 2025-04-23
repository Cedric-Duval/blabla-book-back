BEGIN;

INSERT INTO "book"
    ("isbn", "title", "author", "summary", "image", "pages", "editor", "publication_year")
VALUES
    (9782070368228, 'Dracula', 'Bram Stoker', 'Le comte Dracula quitte la Transylvanie blablabla...', 'https://m.media-amazon.com/images/I/61yuKCUJiBL._AC_UF1000,1000_QL80_.jpg', 544, 'Lédition française illustré', 1920),
    (9782266023101, 'Le meilleur des mondes', 'Aldous Huxley', 'Une société futuriste contrôlée blablabla...', 'https://m.media-amazon.com/images/I/71iZzLwuZML.jpg', 285, 'Plon', 1932),
    (2070518426, 'Harry Potter à l’école des sorciers', 'JK Rowling', 'Harry découvre quil est un sorcier blablabla...', 'https://m.media-amazon.com/images/I/71N6SgkNlcL._AC_UF1000,1000_QL80_.jpg', 305, 'Gallimard Jeunesse', 1998)
;

INSERT INTO "genre"
    ("name")
VALUES
    ('Horreur'),
    ('Fantastique'),
    ('Dystopique'),
    ('Science-fiction'),
    ('Fantasy'),
    ('Jeunesse')
;

INSERT INTO "genre_book"
    ("genre_id", "book_id")
VALUES
    (1,1),
    (2,1),
    (3,2),
    (4,2),
    (5,3),
    (6,3)
;

COMMIT;