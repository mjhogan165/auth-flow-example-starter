import jwt from "jsonwebtoken";

//not store password on jwt
// const data = {
//   name: "Jon",
// };

//so the token really just describes the information inside of it, the secret is really all you need to verify it

const actualJWTToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.lj_KZEPZr0UBILb0QAGgZPpPRT2y5qy4gqVw4XdA-F0";

const editedJWTToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmFuZSBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.zVKr1cogEzs5uJiPLxS6RWw8JU3aF2drcet5hq88iWk";

//const myJwt = jwt.sign(data, "super-secret");
const data = jwt.verify(editedJWTToken, "super-secret");

console.log({
  data,
});
