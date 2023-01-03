require("dotenv").config();

module.exports = {
    baseUrl: process.env.BASE_URL,
    hex: process.env.HEX,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpireWeb: process.env.JWT_EXPIRE,
    jwtExpireMobile: process.env.JWT_EXPIRE_MOBILE,
    mode: process.env.MODE,
    nameSpace: process.env.MY_NAMESPACE,
    limitBody: process.env.LIMIT_BODY,
    apiKey: process.env.API_KEY,
    uploadPath: process.env.UPLOAD_PATH,
    imagePath: "public/images/"
}