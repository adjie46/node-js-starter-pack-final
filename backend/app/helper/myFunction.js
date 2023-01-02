//Checking the crypto module
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const config = require("../config/config");
const jose = require('jose')

const fs = require('fs');

const sharp = require("sharp");

async function resizeImage(path, filename, type) {
    return new Promise(async (resolve, reject) => {
        try {
            await sharp(path)
                .toFormat("jpeg", {
                    quality: 10,
                })
                .toFile(`public/upload/${type}/small/${filename}`);

            await sharp(path)
                .toFormat("jpeg", {
                    quality: 50,
                })
                .toFile(`public/upload/${type}/medium/${filename}`);

            await sharp(path)
                .toFormat("jpeg", {
                    quality: 100,
                    chromaSubsampling: '4:4:4'
                })
                .toFile(`public/upload/${type}/original/${filename}`);
            resolve(true)

        } catch (error) {
            reject(error)
        }
    })

}


//Encrypting text
async function encrypt(text) {
    return new Promise(async (resolve, reject) => {
        try {
            let iv = crypto.randomBytes(16);
            let salt = crypto.randomBytes(16);
            let key = crypto.scryptSync(config.jwtSecret, salt, 32);

            let cipher = crypto.createCipheriv(algorithm, key, iv);
            let encrypted = cipher.update(text, "utf8", "hex");
            encrypted += cipher.final("hex");
            resolve(`${iv.toString("hex")}:${salt.toString("hex")}:${encrypted}`);
        } catch (error) {
            reject(error)
        }

    });
}

function base64_encode(file, mimeType) {
    return `data:${mimeType};base64,` + fs.readFileSync(file, 'base64');
}

const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

// Decrypting text
async function decrypt(text) {
    return new Promise(async (resolve, reject) => {
        try {
            let [ivs, salts, data] = text.split(":");
            let iv = Buffer.from(ivs, "hex");
            let salt = Buffer.from(salts, "hex");
            let key = crypto.scryptSync(config.jwtSecret, salt, 32);

            let decipher = crypto.createDecipheriv(algorithm, key, iv);
            let decrypted = decipher.update(data, "hex", "utf8");
            decrypted += decipher.final("utf8");
            resolve(decrypted.toString());
        } catch (error) {
            reject(error)
        }
    });
}

const generateEncryptedJwt = (subject, payload, secret, expired) => {
    return new jose.EncryptJWT(payload)
        .setProtectedHeader({
            alg: "dir",
            enc: "A256GCM"
        })
        .setIssuedAt()
        .setSubject(subject)
        .setIssuer(config.baseUrl)
        .setAudience(config.baseUrl)
        .setExpirationTime(expired)
        .encrypt(secret);
};

const decryptJwt = async (jwt, secret) => {
    const options = {
        issuer: config.baseUrl,
        audience: config.baseUrl,
        contentEncryptionAlgorithms: ["A256GCM"],
        keyManagementAlgorithms: ["dir"],
    };
    return jose.jwtDecrypt(jwt, secret, options);
};

//Random String
async function randomString(length) {
    return new Promise(async (resolve, reject) => {
        try {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            resolve(result)
        } catch (error) {
            reject(error)
        }
    });
}

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
}

module.exports = {
    encrypt,
    decrypt,
    randomString,
    isEmpty,
    generateEncryptedJwt,
    decryptJwt,
    resizeImage,
    asyncForEach,
    waitFor
}