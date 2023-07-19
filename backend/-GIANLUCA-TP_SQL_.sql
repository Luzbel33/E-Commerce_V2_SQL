CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `confirmPassword` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `birthdate` datetime DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

select * from ecom.users;
insert into users (id, name, username, password, confirmPassword, email, country, phone)
values (1,'Pepe', 'Pepito99', 123, 123, 'pepito@gmail.com', 'Argentina', 3873366936);

CREATE TABLE `prods` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) DEFAULT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `alt` VARCHAR(255) DEFAULT NULL,
  `img` VARCHAR(255) DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


select * from ecom.prods;
insert into prods (id, title, description, alt, img)
values (1,'Remera de Anime Berserk', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, labore!', 'Remera de Anime Berserk', 'https://http2.mlstatic.com/D_NQ_NP_790739-MLA49643347477_042022-W.jpg');

insert into prods (id, title, description, alt, img)
values (2,'Remera de HE-MAN', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, labore!', 'Remera de HE-MAN', 'https://http2.mlstatic.com/D_NQ_NP_741441-MLA50532289282_062022-W.jpg');

insert into prods (id, title, description, alt, img)
values (3,'Remera de Ghost In The Shell', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, labore!', 'Remera de Ghost In The Shell', 'https://http2.mlstatic.com/D_NQ_NP_859483-MLA49320000031_032022-W.jpg');

insert into prods (id, title, description, alt, img)
values (4,'Remera de Chihiro', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, labore!', 'Remera de Chihiro', 'https://http2.mlstatic.com/D_NQ_NP_862702-MLA53193150379_012023-W.jpg');

insert into prods (id, title, description, alt, img)
values (5,'Remera de Matrix', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, labore!', 'Remera de Matrix', 'https://www.shirt-store.com/pub_images/original/WB-1-MTRX001-BK.jpg');
