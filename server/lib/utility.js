import bcrypt from 'bcrypt';
import passwordValidator from 'password-validator';


const schema = new passwordValidator();

schema
  .is().min(8)        // Minimum length 8
  .is().max(100)      // Maximum length 100
  .has().uppercase()   // Must have at least one uppercase letter
  .has().lowercase()   // Must have at least one lowercase letter
  .has().digits(1);    // Must have at least one digit


function validatePassword(password) {
 return schema.validate(password);  // Returns true if password is valid, false otherwise
}

//hash the password
async function hashPassword(plaintextPassword){
    const hash = await bcrypt.hash(plaintextPassword, 10);
    return hash;
}

//Validate the password
async function comparePassword(plaintextPassword, hash){
    return await bcrypt.compare(plaintextPassword, hash);
}

export {hashPassword,comparePassword,validatePassword};
