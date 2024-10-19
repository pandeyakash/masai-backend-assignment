const crypto = require("crypto");

//Algorithm used for Encryption and Decryption
const algorithm = "aes-256-cbc";

//A random 32-bytes key is generated
const key = crypto.randomBytes(32);
//A random 16-bytes iv is generated
const iv = crypto.randomBytes(16);

//Function to encrypt the text passed to it
const encrypt = (text) => {
  //Creating the cipher object
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  //Updating the cipher object with data
  let encrypted = cipher.update(text, "utf-8", "hex");
  //The final method completes the encryption process and adds any remaining encrypted data
  encrypted += cipher.final("hex");

  //Returning the encrypted text
  return encrypted;
};

//Function to decrypt the encrypted text
const decrypt = (encryptedText) => {
  //Creating the decipher object
  const cipher = crypto.createDecipheriv(algorithm, key, iv);
  //Updating the decipher object with data
  let decrypted = cipher.update(encryptedText, "hex", "utf-8");
  //The final method completes the decryption process and adds any remaining decrypted data
  decrypted += cipher.final("utf-8");

  //Returning thr decrypted data or original text.
  return decrypted;
};

const encrypted = encrypt("Hello, Good Morning");
const decrypted = decrypt(encrypted);

console.log(encrypted);
console.log(key.toString("hex"));
console.log(iv.toString("hex"));
console.log(decrypted);
