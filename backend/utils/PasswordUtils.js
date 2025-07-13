const bcrypt = require("bcrypt");

// 12 is a good balance between security and performance
const saltRounds = 12;

module.exports = {
  /**
   * Hashes a password using bcrypt
   * @param {string} password - Plain text password
   * @returns {Promise<string>} Hashed password
   * @throws {Error} If password is invalid or hashing fails
   */
  hashPassword: async (password) => {
    if (
      !password ||
      typeof password !== "string" ||
      password.trim().length === 0
    ) {
      throw new Error("Invalid password");
    }

    return await bcrypt.hash(password, saltRounds);
  },

  /**
   * Compares a plain text password with a hash
   * @param {string} password - Plain text password
   * @param {string} hash - Hashed password to compare against
   * @returns {Promise<boolean>} True if match, false otherwise
   * @throws {Error} If inputs are invalid
   */
  comparePassword: async (password, hash) => {
    if (
      !password ||
      !hash ||
      typeof password !== "string" ||
      typeof hash !== "string" ||
      password.trim().length === 0 ||
      hash.trim().length === 0
    ) {
      throw new Error("Invalid password or hash");
    }

    return await bcrypt.compare(password, hash);
  },
};
