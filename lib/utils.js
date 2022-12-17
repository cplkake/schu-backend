const crypto = require('crypto');

function validPassword(password, hash, salt) {
  crypto.scrypt(password, salt, 64, (err, derivedKey) => {
    if (err) throw err;
    return hash === derivedKey.toString('hex');
  });
}

function genPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex')
  crypto.scrypt(password, salt, 64, (err, derivedKey) => {
    if (err) throw err;

    return {
      salt: salt,
      hash: derivedKey.toString('hex'),
    };
  });
}


module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;


// // returns an escaped mongo key
// const escape = function(key) {
//   return key.replace(/~/g, '~s')
//             .replace(/\./g, '~p')
//             .replace(/^\$/g, '~d')
// }

// // returns an unescaped mongo key
// const unescape = function(escapedKey) {
//   return escapedKey.replace(/^~d/g, '$')
//                    .replace(/~p/g, '.')
//                    .replace(/~s/g, '~')
// }

// // iterate through the keys of an object, escaping decimal, tilde characters and keys starting with $
// // originally meant to be used when storing size object in shoe.js that have decimals in the keys
// exports.escapeKeys = function(origObj) {
//   const keyValues = Object.keys(origObj).map(key => {
//     const newKey = escape(key.toString());
//     return { [newKey]: origObj[key] };
//   });
//   return Object.assign({}, ...keyValues);
// }

// exports.unescapeKeys = function(origObj) {
//   const keyValues = Object.keys(origObj).map(key => {
//     const newKey = unescape(key);
//     return { [newKey]: origObj[key] };
//   });
//   return Object.assign({}, ...keyValues);
// }

