import bcrypt from "bcrypt";

const saltRounds = 11;

const jonsHashedPassword =
  "$2b$11$9TAg.mwEpDX3JYFsgfJeYuNR5R9l57HJV8hG0L0CsT1TOqdOUYUkC";
const petersHashedPassword =
  "$2b$11$QYHqryxNYt/soc/mvSuy1e/8Dk3CSJ7u9F2iM88j0PCijIB.sARQC";

export const encryptPassword = async (password: string) => {
  return bcrypt.hash(password, saltRounds);
};

bcrypt
  .compare("peter_password", jonsHashedPassword)
  .then((result) => {
    console.log(result);
  });

// export const checkPassword = (password: string, passwordHash: string) => {
// bcrypt.compare(password, passwordHash)
// }
