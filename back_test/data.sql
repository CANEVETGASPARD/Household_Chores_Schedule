INSERT INTO family (FamilyName, password)
VALUES
  ('canevet', 'pbkdf2:sha256:50000$TCI4GzcX$0de171a4f4dac32e3364c7ddc7c14f3e2fa61f2d17574483f7ffbb431b4acb2f'),
  ('berthier', 'pbkdf2:sha256:50000$kJPKsz6N$d2d4784f1b030a9761f5ccaeeaca413f27f2ecb76d6168407af962ddce849f79');

INSERT INTO people (familyId, username, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
VALUES
  (1, "gas",1,2,1,1,1,3,1),
  (1, "pitchoune",1,2,1,NULL,1,1,NULL);

INSERT INTO calendar (familyId, created, title, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
VALUES
  (1, '2018-01-01 00:00:00', "weekly task","gas", "pitchoune",NULL,"pitchoune",NULL,"pitchoune",NULL);
