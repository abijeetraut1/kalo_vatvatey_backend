module.exports = {
    HOST: "localhost",
    USER: "root",
    PASS: "",


    // database identification
    db: "second_hand",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        accurate: 30000,
        idle: 10000
    }
}