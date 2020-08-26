db.users.deleteMany({});

db.users.insertOne({
  username: 'hanhanhan',
  password: 'hanhanhan',
  competence: 'superAdministrator',
});

db.users.insertMany([
  {
    username: 'xiaoming',
    password: 'woshixiaoming',
    competence: 'administrator',
  },
  {
    username: 'lihua',
    password: 'woshilihua',
    competence: 'administrator',
  },
  {
    username: 'xianyue',
    password: 'yueyueyue',
    competence: 'articlePublisher',
  },
]);
