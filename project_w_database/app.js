const { Client } = require("pg");
let client = new Client({
  host: "/var/run/postgresql",
  port: 5432,
  user: "fwklaus",  
  database: 'films'
});


async function logQuery(queryText) {
  await client.connect();
  let data = await client.query(queryText);
  // console.log(data);
  // console.log(data.rows[0].title);
  // console.log(data.rows[1].duration);
  console.log(data.rows[2].count);
  client.end();
}

// let sqlStatement1 = `
// SELECT * FROM films JOIN directors
// ON films.director_id = directors.id
// WHERE name = 'Sidney Lumet';
// `;

// logQuery("SELECT * FROM directors");
// logQuery(sqlStatement1); // 12 Angry Men

// let sqlStatement2 = `
//   SELECT * FROM films JOIN directors
//     ON films.director_id = directors.id
//     WHERE name = 'Francis Ford Coppola'
//     ORDER BY duration DESC;
// `

// logQuery(sqlStatement2);

let sqlStatement3 = `
  SELECT count(id) FROM films
    WHERE duration < 110
    GROUP BY genre;
`;

logQuery(sqlStatement3);
