BEGIN;


INSERT INTO "user"
    ("name", "firstname", "email", "password")
VALUES
    ('Toto', 'Tata', 'toto.tata@gmail.com', 'admin')
;


INSERT INTO "library"
    ("name", "user_id")
VALUES
    ('Bibliothèque de Toto', 1)
;


INSERT INTO "book"
    ("isbn", "title", "author", "summary", "image", "pages", "editor", "publication_year")
VALUES
    (9782070368217, 'Dracula', 'Bram Stoker', 'Le comte Dracula quitte la Transylvanie blablabla...', 'https://m.media-amazon.com/images/I/61yuKCUJiBL._AC_UF1000,1000_QL80_.jpg', 544, 'Lédition française illustré', 1920),
    (9782266023101, 'Le meilleur des mondes', 'Aldous Huxley', 'Une société futuriste contrôlée blablabla...', 'https://m.media-amazon.com/images/I/71iZzLwuZML.jpg', 285, 'Plon', 1932),
    (2070518426, 'Harry Potter à l’école des sorciers', 'JK Rowling', 'Harry découvre quil est un sorcier blablabla...', 'https://m.media-amazon.com/images/I/71N6SgkNlcL._AC_UF1000,1000_QL80_.jpg', 305, 'Gallimard Jeunesse', 1998),
    (9782070518494, 'Harry Potter et la Chambre des secrets', 'JK Rowling', 'Des événements mystérieux surviennent à Poudlard, mettant en danger les élèves. Harry et ses amis enquêtent pour découvrir la source de ces incidents.', 'https://m.media-amazon.com/images/I/91OSvPibmJL._AC_UF1000,1000_QL80_.jpg', 360, 'Gallimard Jeunesse', 1999),
    (9782070518517, 'Harry Potter et le Prisonnier d''Azkaban', 'JK Rowling', 'Sirius Black, un dangereux prisonnier, s''échappe d''Azkaban. Harry découvre des vérités sur son passé et affronte de nouvelles menaces.', 'https://cdn1.booknode.com/book_cover/502/full/harry-potter-tome-3-harry-potter-et-le-prisonnier-dazkaban-502273.jpg', 474, 'Gallimard Jeunesse', 1999),
    (9782070518531, 'Harry Potter et la Coupe de feu', 'JK Rowling', 'Harry est mystérieusement inscrit au Tournoi des Trois Sorciers, une compétition dangereuse. Il doit affronter des épreuves périlleuses tout en découvrant un complot.', 'https://m.media-amazon.com/images/I/91huviltGUL._AC_UF1000,1000_QL80_.jpg', 656, 'Gallimard Jeunesse', 2000),
    (9782070541270, 'Harry Potter et l''Ordre du Phénix', 'JK Rowling', 'Face au retour de Voldemort, Harry rejoint l''Ordre du Phénix. Il doit faire face à l''incrédulité du ministère et à une nouvelle professeure tyrannique', 'https://m.media-amazon.com/images/I/51ww5Q085BL._AC_UF1000,1000_QL80_.jpg', 984, 'Gallimard Jeunesse', 2003),
    (9782070612413, 'Harry Potter et le Prince de sang-mêlé', 'JK Rowling', 'Dumbledore montre à Harry des souvenirs clés pour comprendre Voldemort. Pendant ce temps, des événements sombres se déroulent à Poudlard.', 'https://m.media-amazon.com/images/I/A130pKUtoeL._AC_UF1000,1000_QL80_.jpg', 720, 'Gallimard Jeunesse', 2005),
    (9782070612758, 'Harry Potter et les Reliques de la Mort', 'JK Rowling', 'Harry, Ron et Hermione quittent Poudlard pour détruire les Horcruxes restants et vaincre Voldemort une fois pour toutes.', 'https://m.media-amazon.com/images/I/71cismcCmGL._AC_UF1000,1000_QL80_.jpg', 816, 'Gallimard Jeunesse', 2007),
    (9782070388228, 'Le Grand Meaulnes', 'Alain-Fournier', 'Un roman d''initiation où un adolescent découvre un monde mystérieux et l''amour idéalisé.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Ai0Te8DzPg73Bc8HtCUojHT5j60Uktayzw&s', 320, 'Émile-Paul Frères', 1913),
    (9782070368229, 'Ne tirez pas sur l''oiseau moqueur', 'Harper Lee', 'Une jeune fille observe les injustices raciales à travers le procès de son père avocat.', 'https://media.hachette.fr/fit-in/780x1280/imgArticle/GRASSETFASQUELLE/2015/9782246857730-001-X.jpeg?source=web', 384, 'J. B. Lippincott & Co', 1961),
    (9782070368221, 'L''Étranger', 'Albert Camus', 'Meursault, un homme indifférent au monde, commet un meurtre et fait face à l''absurdité de la vie.', 'https://m.media-amazon.com/images/I/8130inT26AL.jpg', 184, 'Edition Gallimard', 1942),
    (9782070368222, 'Le Petit Prince', 'Antoine de Saint-Exupéry', 'Un aviateur rencontre un jeune prince venu d''une autre planète, qui lui enseigne des leçons de vie.', 'https://cdn.shopify.com/s/files/1/0398/4202/1535/products/Le-Petit-Prince_Rounded.png?v=1669032038', 96, 'Reynal & Hitchcock', 1943),
    (9782070368223, 'Les Misérables', 'Victor Hugo', 'L’histoire de Jean Valjean, un ancien forçat en quête de rédemption.', 'https://images.epagine.fr/063/9782075128063_1_75.jpg', 1488, 'Albert Lacroix et Compagnie', 1862),
    (9782070368224, 'Madame Bovary', 'Gustave Flaubert', 'Emma Bovary cherche l’évasion dans des passions destructrices.', 'https://static.fnac-static.com/multimedia/Images/FR/NR/e1/78/02/162017/1507-1/tsp20230906085034/Madame-Bovary.jpg', 384, 'Michel Lévy Frères', 1857),
    (9782070368225, 'Le Rouge et le Noir', 'Stendhal', 'Julien Sorel tente de s’élever dans la société française post-napoléonienne.', 'https://www.babelio.com/couv/CVT_Le-Rouge-et-le-Noir_4565.jpeg', 576, 'Levasseur', 1830),
    (9782070368226, 'Crime et Châtiment', 'Stendhal', 'Raskolnikov, étudiant pauvre, commet un meurtre et lutte avec sa conscience.', 'https://images.epagine.fr/978/9782080277978_1_75.jpg', 576, 'Levasseur', 1884),
    (9782070368218, 'Le Nom de la rose', 'Umberto Eco', 'Enquête médiévale sur une série de meurtres dans une abbaye bénédictine', 'https://m.media-amazon.com/images/I/81W6mh0rv1L.jpg', 640, 'Grasset et Fasquelle', 1982),
    (9782070368219, 'Bel-Ami', 'Guy de Maupassant', 'Georges Duroy gravit les échelons de la société parisienne grâce à son charme.', 'https://media.groupe.gallimard.fr/couvHD/J04975.jpg', 394, 'Victor Havard', 1885),
    (9782070409181, 'Le Comte de Monte-Cristo', 'Alexandre Dumas', 'Edmond Dantès, trahi et emprisonné à tort, s''évade et devient le Comte de Monte-Cristo pour se venger de ses ennemis', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe4W-nF432b_u0uvAW81ELNAMdQIBg_yVvxA&s', 1889, 'Journal des débats', 1846),
    (9782070409182, '1984', 'George Orwell', 'Dans un régime totalitaire, Winston Smith tente de résister à la surveillance omniprésente du Parti.', 'https://static.fnac-static.com/multimedia/PE/Images/FR/NR/10/35/01/79120/1507-1/tsp20250103092736/1984.jpg', 352, 'Gallimard', 1949),
    (9782071368219, 'Le Seigneur des Anneaux', 'J.R.R. Tolkien', 'Frodon Sacquet entreprend un périlleux voyage pour détruire l''Anneau Unique et vaincre Sauron', 'https://www.gallimard-jeunesse.fr/assets/media/cache/cover_medium/gallimard_img/image/J02275.jpg', 1216, 'Christian Bourgois', 1973),
    (9785071368219, 'Don Quichotte', 'Miguel de Cervantes', 'Un noble espagnol, obsédé par les romans de chevalerie, devient le chevalier errant Don Quichotte.', 'https://static.fnac-static.com/multimedia/PE/Images/FR/NR/4c/c0/12/1228876/1507-1/tsp20241229162639/L-Ingenieux-Hidalgo-Don-Quichotte-de-la-Manche-Tome-1.jpg', 1056, 'Juan de la Cuesta', 1615),
    (9582070368219, 'Moby Dick', 'Herman Melville', 'Le capitaine Achab poursuit obsessionnellement le cachalot blanc Moby Dick.', 'https://m.media-amazon.com/images/I/81dYQsEpgkL._AC_UF1000,1000_QL80_.jpg', 720, 'Gedalge', 1928),
    (9791041993215, 'Orgueil et Préjugés', 'Jane Austen', 'L’histoire d’Elizabeth Bennet, une jeune femme vive et intelligente, qui défie les normes sociales de l’Angleterre du XIXe siècle tout en découvrant l’amour.', 'https://editions-hauteville.fr/media/cache/book/00/9791093835600.jpg', 372, 'Gallimard', 2007),
    (9782072762086, 'Le Vieil Homme et la Mer', 'Ernest Hemingway', 'Un vieux pêcheur cubain lutte contre un énorme marlin dans un combat symbolique entre l’homme et la nature.', 'https://m.media-amazon.com/images/I/8135PHCWIXL._AC_UF1000,1000_QL80_.jpg', 191, 'Gallimard', 1952),
    (9782070388219, 'Frankenstein ou le Prométhée moderne', 'Mary Shelley', 'Le docteur Victor Frankenstein crée une créature vivante, qui se retourne contre lui.', 'https://m.media-amazon.com/images/I/71FK+gdrOVL._AC_UF1000,1000_QL80_.jpg', 288, 'Correard', 1821),
    (9382070388219, 'Le Parfum', 'Patrick Süskind', 'Jean-Baptiste Grenouille, un homme doté d’un odorat exceptionnel, tue pour créer le parfum parfait', 'https://www.librairie-passerelle.fr/cache/images/product/0007873-image-9782253044901.jpg', 384, 'Fayard', 1986),
    (9782070368228, 'L’Alchimiste', 'Paulo Coelho', 'Un jeune berger andalou part en quête de sa légende personnelle à travers le désert.', 'https://m.media-amazon.com/images/I/51sDdxuQVNL._AC_UF1000,1000_QL80_.jpg', 253, 'Anne Carriere', 1994),
    (9782970368228, 'La Peste', 'Albert Camus', 'Une épidémie frappe Oran, révélant les réactions humaines face à l’absurde.', 'https://static.fnac-static.com/multimedia/Images/FR/NR/2e/f9/01/129326/1507-0/tsp20191030071015/La-Peste.jpg', 336, 'Gallimard', 1947),
    (9382070368219, 'Jane Eyre', 'Charlotte Brontë', 'Une orpheline indépendante devient gouvernante et découvre un sombre secret au manoir de Thornfield', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqE0aRhQg9XiyneZB4oxsUWYqsKEEzLoO7cg&s', 761, 'Hachette', 1855),
    (9782072943874, 'Les Raisins de la colère', 'John Steinbeck', 'Une famille de fermiers ruinés migre vers la Californie pendant la Grande Dépression.', 'https://www.gallimard.fr/system/files/migrations/ouvrages/couvertures/G08260.jpg', 640, 'Gallimard', 1947)
;


INSERT INTO "genre"
    ("name")
VALUES
    ('Horreur'),
    ('Fantastique'),
    ('Dystopique'),
    ('Science-fiction'),
    ('Fantasy'),
    ('Jeunesse'),
    ('Roman initiatique'),
    ('Roman social'),
    ('Roman existentialiste'),
    ('Conte philosophique'),
    ('Roman historique'),
    ('Roman réaliste'),
    ('Roman psychologique'),
    ('Policier'),
    ('Roman naturaliste'),
    ('Roman d''aventure'),
    ('Roman satirique'),
    ('Aventure'),
    ('Roman sentimental'),
    ('Thriller historique'),
    ('Allégorie'),
    ('Roman gothique')
;


INSERT INTO "genre_book"
    ("genre_id", "book_id")
VALUES
    (1,1),
    (2,1),
    (3,2),
    (4,2),
    (5,3),
    (6,3),
    (5,4),
    (6,4),
    (5,5),
    (6,5),
    (5,6),
    (6,6),
    (5,7),
    (6,7),
    (5,8),
    (6,8),
    (5,9),
    (6,9),
    (7,10),
    (8,11),
    (9,12),
    (10,13),
    (11,14),
    (12,15),
    (13,16),
    (10,17),
    (11,18),
    (14,18),
    (15,19),
    (16,20),
    (11,20),
    (3,21),
    (4,21),
    (5,22),
    (17,23),
    (18,23),
    (18,24),
    (10,24),
    (19,25),
    (10,26),
    (16,26),
    (1,27),
    (4,27),
    (20,28),
    (7,29),
    (10,29),
    (10,30),
    (21,30),
    (22,31),
    (19,31),
    (8,32),
    (11,32)
;


INSERT INTO "library_book"
    ("library_id", "book_id", "read")
VALUES
    (1, 1, true),
    (1, 2, false)
;


COMMIT;