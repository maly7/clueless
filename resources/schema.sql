CREATE TABLE `player` (
  `player_id`        BIGINT(20)  NOT NULL AUTO_INCREMENT,
  `socket_id`        VARCHAR(255),
  `character`        VARCHAR(30),
  `display_name`     VARCHAR(30) NOT NULL,
  `current_position` VARCHAR(10),
  `active`           TINYINT(1)  NOT NULL DEFAULT 1,
  PRIMARY KEY (`player_id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE `game` (
  `game_id`          BIGINT(20) NOT NULL AUTO_INCREMENT,
  `is_game_running`  TINYINT(1) NOT NULL DEFAULT 1,
  `solution_suspect` VARCHAR(30),
  `solution_weapon`  VARCHAR(30),
  `solution_room`    VARCHAR(30),
  PRIMARY KEY (`game_id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE `card` (
  `card_id` BIGINT(20)  NOT NULL AUTO_INCREMENT,
  `type`    VARCHAR(30) NOT NULL,
  `name`    VARCHAR(30) NOT NULL,
  PRIMARY KEY (`card_id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE `game_players` (
  `player_id` BIGINT(20) NOT NULL,
  `game_id`   BIGINT(20) NOT NULL,
  CONSTRAINT `fk_player_id` FOREIGN KEY (`player_id`) REFERENCES `player` (`player_id`),
  CONSTRAINT `fk_game_id` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`),
  PRIMARY KEY (`player_id`, `game_id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE `player_cards` (
  `player_id` BIGINT(20) NOT NULL,
  `card_id`   BIGINT(20) NOT NULL,
  CONSTRAINT `fk_player_card_id` FOREIGN KEY (`player_id`) REFERENCES `player` (`player_id`),
  CONSTRAINT `fk_card_id` FOREIGN KEY (`card_id`) REFERENCES `card` (`card_id`),
  PRIMARY KEY (`player_id`, `card_id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

