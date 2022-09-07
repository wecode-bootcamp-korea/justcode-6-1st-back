-- migrate:up
INSERT INTO `reviews` (`id`,`user_id`,`product_id`,`content`,`rating`,`created_at`) VALUES (1,1,1,'너무 맛있어요',5,'2022-09-06 22:20:43');
INSERT INTO `reviews` (`id`,`user_id`,`product_id`,`content`,`rating`,`created_at`) VALUES (2,1,2,'구성도 좋고 배송도 빠르고 맛있게 잘먹었어요!',4,'2022-09-06 22:20:43');
INSERT INTO `reviews` (`id`,`user_id`,`product_id`,`content`,`rating`,`created_at`) VALUES (3,1,3,'이번에도 역시 맛있게 먹었습니다~',5,'2022-09-06 22:20:43');
INSERT INTO `reviews` (`id`,`user_id`,`product_id`,`content`,`rating`,`created_at`) VALUES (4,2,6,'너무 맛나요',4,'2022-09-06 22:20:43');
INSERT INTO `reviews` (`id`,`user_id`,`product_id`,`content`,`rating`,`created_at`) VALUES (5,2,7,'제가 원하던 맛과는 조금 다르네요',2,'2022-09-06 22:20:43');
INSERT INTO `reviews` (`id`,`user_id`,`product_id`,`content`,`rating`,`created_at`) VALUES (6,2,8,'처음먹어보는데 너무 맛있어요.',5,'2022-09-06 22:20:43');
INSERT INTO `reviews` (`id`,`user_id`,`product_id`,`content`,`rating`,`created_at`) VALUES (7,3,11,'지인 추천으로 구매했는데, 대만족입니다.',5,'2022-09-06 22:20:43');
INSERT INTO `reviews` (`id`,`user_id`,`product_id`,`content`,`rating`,`created_at`) VALUES (8,3,12,'항상 맛있게 먹어서 추천드립니다~',5,'2022-09-06 22:20:43');
INSERT INTO `reviews` (`id`,`user_id`,`product_id`,`content`,`rating`,`created_at`) VALUES (9,3,13,'추천한 지인이 자기는 안먹어봤대요...',2,'2022-09-06 22:20:43');
INSERT INTO `reviews` (`id`,`user_id`,`product_id`,`content`,`rating`,`created_at`) VALUES (10,4,16,'벌써 8번째 시켰습니다.',5,'2022-09-06 22:20:43');
INSERT INTO `reviews` (`id`,`user_id`,`product_id`,`content`,`rating`,`created_at`) VALUES (11,4,17,'4번째 주문했어요!',4,'2022-09-06 22:20:43');
INSERT INTO `reviews` (`id`,`user_id`,`product_id`,`content`,`rating`,`created_at`) VALUES (12,4,18,'12번 주문했는데 뭐 없나요?',5,'2022-09-06 22:20:43');
INSERT INTO `reviews` (`id`,`user_id`,`product_id`,`content`,`rating`,`created_at`) VALUES (13,5,21,'맛은 있는데 가격이 좀 부담되네요',3,'2022-09-06 22:20:43');
INSERT INTO `reviews` (`id`,`user_id`,`product_id`,`content`,`rating`,`created_at`) VALUES (14,5,22,'양이 너무 적어요',2,'2022-09-06 22:20:43');
INSERT INTO `reviews` (`id`,`user_id`,`product_id`,`content`,`rating`,`created_at`) VALUES (15,5,23,'배송 중에 회손됬나봐요ㅠ',1,'2022-09-06 22:20:43');




-- migrate:down

