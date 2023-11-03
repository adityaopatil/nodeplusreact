const bcrypt = require("bcrypt");

//To has a password we need a salt
//Imagine our password is 1234->abcd this abcd can be reversed to 1234
//So we use salt i.e. added before or after this password. So the
//resulting hash password will be different from the hash i.e. used

//1st param represents the number of rounds
async function run() {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash("1234", salt);
  console.log(salt);
  console.log(hashed);
}

run();
