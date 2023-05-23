const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Eureka Cloud Server",
            description:
                "Development of a robot arm control methods in a cloud computing platform with AR/MR based imitation learning algorithm",
        },
        servers: [
            {
                url: "http://192.168.3.6:3000", // 요청 URL
            },
        ],
    },
    apis: ["./routes/user.js", "./routes/site.js", "./routes/equip.js", "./routes/cobot.js", "./routes/amr.js", "./routes/operation.js", "./swagger/product.yaml"],
}
const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }