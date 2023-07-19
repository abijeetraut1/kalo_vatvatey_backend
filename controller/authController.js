const database = require("./../model/index");
const jwt = require("jsonwebtoken");
require("dotenv").config({
    path: "./config.env"
})
const bcrypt = require('bcrypt');
const catchAsync = require("../utils/catchAsync");
const statusFunc = require("../utils/statusFunc");
const sendMail = require("../utils/sendMail");

// deconstruction
const user = database.users;

const createCookies = (res, status, userSignin) => {
    const token = jwt_signin(userSignin.id);

    // cont 

    res.cookie('jwt', token, {
        maxAge: new Date(
            Date.now() + process.env.BROWSER_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: false
    });
    statusFunc(res, 201, {
        message: `verification code was send to ${userSignin.email}`,
        token
    });
}

const jwt_signin = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.COOKIE_EXPIRES_IN
    })
}

const DetectEmptyForm = (res, field) => {
    return statusFunc(res, 400, `${field} Is Empty`);
}

// SIGNUP
exports.signup = catchAsync(async (req, res) => {
    console.log(req.body);
    const {
        firstName,
        lastName,
        email,
        contact,
        password
    } = req.body;

    if (!firstName)
        return DetectEmptyForm(res, "firstName");
    else if (!lastName)
        return DetectEmptyForm(res, "lastName");
    else if (!email)
        return DetectEmptyForm(res, "Email");
    else if (!contact)
        return DetectEmptyForm(res, "contact");
    else if (!password)
        return DetectEmptyForm(res, "password");


    const checkAlreadyLogin = await user.findOne({
        where: {
            email
        }
    })


    if (checkAlreadyLogin) {
        return statusFunc(res, 404, "user already signup with that email"); // checks if the user already logged in
    } else {
        const code = Math.floor(Math.random() * (process.env.MAX_GENERATION - process.env.MIN_GENERATION + 1) + process.env.MIN_GENERATION);
        const createUserAccount = await user.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            contact: contact,
            password: await bcrypt.hash(password, 12),
            role: "user",
            isVerified: false,
            verificationCode: code
        })
        const id = createUserAccount.id;
        const verificatonLink = jwt.sign({
            id,
            code
        }, process.env.JWT_VERIFICATION_SECRET, {
            expiresIn: process.env.JWT_VERIFICATION_EXPIRESIN
        })
    }

    createCookies(res, 201, createUserAccount);
})

exports.checkVerificationCode = catchAsync(async (req, res, next) => {
    if (req.body.verificationCode) {
        const findUser = await user.findOne({
            where: {
                id: res.locals.userData.id
            }
        });

        if (findUser.verificationCode === req.body.verificationCode) {
            findUser.isVerified = 1 || true;
            findUser.verificationCode = undefined;
            findUser.save();
            return statusFunc(res, 200, "account verifined");
        } else {
            return statusFunc(res, 200, "wrong verifincation code");
        }
    }
})


// LOGIN
exports.login = catchAsync(async (req, res) => {
    const userSignin = await user.findOne({
        where: {
            email: req.body.email
        }
    })

    if (userSignin === null) {
        return statusFunc(res, 404, "user not found! PEASE CREATE AN ACCOUNT");
    }

    // if(userSignin.isVerified === false || userSignin.isVerified === 0) {
    //     // sendmail
    //     return sendMail(req.body.email, code, verificatonLink, req.body.name);
    // }

    if (await bcrypt.compare(req.body.password, userSignin.password)) {
        // userSignin.refreshToken = jwt.sign(userSignin, );
        createCookies(res, 200, userSignin);
    }
})


// FORGET PASSWORD
exports.forgetPassword = catchAsync(async (req, res, next) => {
    const findingUser = await user.findOne({
        email: req.body.email
    })

    if (!findingUser) {
        statusFunc(res, 404, "can't find user! please check your email once");
    }
    let id = findingUser.id;

    const token = jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.FORGET_PASSWORD_EXPIRES_AT
    })
    statusFunc(res, 201, token);
})

// RESET PASSWORD   
exports.resetPassword = catchAsync(async (req, res, next) => {
    try { // error handeling
        const {
            oldPassword,
            newPassword
        } = req.body;

        const forgetPSWuserId = jwt.verify(req.params.token, process.env.JWT_SECRET).id;
        const resetUser = await user.findOne({
            where: {
                id: forgetPSWuserId
            }
        });

        if (!(await bcrypt.compare(oldPassword, resetUser.password))) {
            return statusFunc(res, 400, "password doesnot match");
        }

        resetUser.password = await bcrypt.hash(newPassword, 12);
        resetUser.save();

        statusFunc(res, 200, "password updated successfully");
    } catch (err) {
        statusFunc(res, 200, `error: ${err.message}`);
    }
})



// update password
exports.updatePassword = catchAsync(async (req, res, next) => {
    const passportUpdateUser = await user.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!(await bcrypt.compare(req.body.password, passportUpdateUser.password))) {
        return statusFunc(res, 200, "password doesnot matched");
    }
    passportUpdateUser.password = await bcrypt.hash(req.body.passwordChange, 12);
    passportUpdateUser.save();
    statusFunc(res, 200, "password chagned successfully");
})


// check user is logged in or not
exports.isLoggedIn = catchAsync(async (req, res, next) => {
    if (!req.headers.token) {
        return statusFunc(res, 403, "please login")
    }

    const jwtDecode = jwt.verify(req.headers.token, process.env.JWT_SECRET);

    if (jwtDecode.iat > jwtDecode.exp) {
        return statusFunc(res, 400, "expired cookie");
    }

    const findUser = await user.findOne({
        where: {
            id: jwtDecode.id
        },
        attributes: {
            exclude: ["password", "refreshToken"]
        }
    });

    if (findUser === null) {
        return statusFunc(res, 400, "relogin");
    }

    res.locals.userData = findUser;
    next();
});

// change role
exports.changeRole = catchAsync(async (req, res) => {
    const userTochangeRole = await user.findOne({
        where: {
            id: res.locals.userData.id
        }
    })

    userTochangeRole.role = userTochangeRole.role === "seller" ? "user" : "seller";
    userTochangeRole.save();
    statusFunc(res, 200, userTochangeRole);
})

exports.checkVerifiedUser = catchAsync(async (req, res, next) => {
    const checkIfVerified = await user.findOne({
        where: {
            id: res.locals.userData.id
        }
    })

    if (!checkIfVerified) {
        return statusFunc(res, 400, "cannot find user with that ID");
    }

    if (!checkIfVerified.isVerified) {
        return statusFunc(res, 400, "user not verified! PLEASE VERIFY");
    }
    next();
})

exports.givePermissionTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(res.locals.userData.role)) {
            return statusFunc(res, 403, "you doesnot have permission to perform this action");
        }
        return next();
    }
}
