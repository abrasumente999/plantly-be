const db = require("../../db/connection")

exports.selectUsers = () => {
    return db.query(`
    SELECT * FROM users;
    `)
    .then((result) => {
        return result.rows
    })
}

exports.selectUserByUsername = (username) => {
  return db.query(`
    SELECT * from users WHERE username = $1
  `, [ username ])
  .then((result) => {
    if(result.rows.length === 0) {
      return Promise.reject({
        status: 404, msg: "Not found"
      })
    }
    return result.rows[0]
  })
}

exports.addUser = (newUser) => {
  if ("username" in newUser && "password" in newUser && "email" in newUser && "profile_picture" in newUser) {
    return db
      .query(
        `
    INSERT INTO users (username, password, profile_picture, email)
    VALUES 
    ($1, $2, $3, $4) RETURNING *;
    `,
        [newUser.username, newUser.password, newUser.profile_picture, newUser.email]
      )
      .then((result) => {
        return result.rows[0];
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
};