const database = require("./../model/index");
const jwt = require("jsonwebtoken");
require("dotenv").config({
    path: "./config.env"
})
const bcrypt = require('bcrypt');
const catchAsync = require("../utils/catchAsync");
const statusFunc = require("../utils/statusFunc");
const SendOtpCodeInEmail = require("../utils/EmailTemplate/SendOtpCodeInEmail");
const SendForgetPasswordTokenInEmail = require("../utils/EmailTemplate/ForgotPassword");

// deconstruction
const user = database.users;

const createCookies = (res, status, userSignin) => {
    const tenMinutesInMilliseconds = 10 * 60 * 1000; // 10 minutes in milliseconds

    const token = jwt_signin(userSignin.id, tenMinutesInMilliseconds);

    res.cookie('jwt', token, {
        maxAge: tenMinutesInMilliseconds,
        httpOnly: true,
        secure: false
    });
    statusFunc(res, 201, {
        message: `Account created successfully!!`,
        token
    });
}

const jwt_signin = (id, expireTime) => {
    return jwt.sign({
        id: id
    }, process.env.JWT_SECRET, {
        expiresIn: expireTime
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
            email: req.body.email
        }
    })

    if (checkAlreadyLogin) {
        return statusFunc(res, 409, "Email already registered"); // checks if the user already logged in
    }




    const createUserAccount = await user.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contact: req.body.contact,
        password: await bcrypt.hash(req.body.password, 12),
        role: "user",
        isVerified: false,
        verificationCode: undefined
    })

    createCookies(res, 201, createUserAccount);
})

exports.checkVerificationCode = catchAsync(async (req, res, next) => {
    const { OTP, email, otpToken } = req.body

    if (!otpToken && OTP && OTP.length !== 6) {
        return res.status(401).json({ message: "invalid otp!!" })
    }

    try {
        const findUser = await user.findOne({
            where: {
                email: email
            }
        });
        if (!findUser) {
            return statusFunc(res, 404, "user not found!")
        }

        if (otpToken) {
            const decode = jwt.verify(otpToken, process.env.JWT_SECRET);
            findUser.isVerified = 1 || true;
            findUser.verificationCode = undefined;
            findUser.save();
            statusFunc(res, 200, "email verifined");
        } else {
            const decoded = jwt.verify(findUser.verificationCode, process.env.JWT_SECRET);
            const decodeOTP = decoded.id
            if (decodeOTP === OTP) {
                findUser.isVerified = 1 || true;
                findUser.verificationCode = undefined;
                findUser.save();
                statusFunc(res, 200, "email verifined");
            } else {
                return statusFunc(res, 400, "wrong verifincation code");
            }
        }
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            res.status(401).json({ message: "OTP code expired!!" })
        } else {
            res.status(400).json({ message: "invalid Otp code" })
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

    if (userSignin.isVerified === false || userSignin.isVerified === 0) {
        // sendmail
        const code = Math.floor(Math.random() * (process.env.MAX_GENERATION - process.env.MIN_GENERATION + 1) + process.env.MIN_GENERATION);
        const otpToken = jwt_signin(code, "1h")
        if (otpToken) {
            userSignin.verificationCode = otpToken
            userSignin.save()
            return SendOtpCodeInEmail(userSignin.email, code, otpToken, message = "email is not verifyed, please check your inbox!!",);
        }
    }

    if (await bcrypt.compare(req.body.password, userSignin.password)) {
        createCookies(res, 200, userSignin);
    }
})


// FORGET PASSWORD
exports.forgetPassword = catchAsync(async (req, res, next) => {
    const findingUser = await user.findOne({
        where: {
            email: req.body.email
        }
    });

    if (!findingUser) {
        return statusFunc(res, 404, "Can't find user! Please check your email once.");
    }

    const id = findingUser.id;

    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.FORGET_PASSWORD_EXPIRES_AT // Set a reasonable expiration time
    });

    if (token) {
        SendForgetPasswordTokenInEmail(findingUser.email, token);
    }
});

// RESET PASSWORD
exports.resetPassword = catchAsync(async (req, res, next) => {
    try {
        const forgetPSWuserId = jwt.verify(req.params.token, process.env.JWT_SECRET).id;

        const resetUser = await user.findOne({
            where: {
                id: forgetPSWuserId
            }
        });

        if (!resetUser) {
            return statusFunc(res, 404, "User not found");
        }

        resetUser.password = await bcrypt.hash(req.body.password, 12);
        await resetUser.save();

        statusFunc(res, 200, "Password updated successfully");
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            next(ERROR(403, "token expired!!"));
        } else {
            return statusFunc(res, 500, "Password update failed");
        }
    }
});



// update password
exports.updatePassword = catchAsync(async (req, res, next) => {
    const passwordUpdateUser = await user.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!passwordUpdateUser) {
        return statusFunc(res, 404, "incorrecct password or userId");
    }

    const matchPassword = await bcrypt.compare(req.body.password, passwordUpdateUser.password);
    if (!matchPassword) {
        return statusFunc(res, 401, "Incorrect password!!");
    }

    const newPassword = await bcrypt.hash(req.body.newPassword, 12);

    passwordUpdateUser.password = newPassword;
    await passwordUpdateUser.save();

    return statusFunc(res, 200, "Password changed successfully");
});



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