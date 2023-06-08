"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (firstname, email, token) => {
    const transporter = nodemailer_1.default.createTransport({
        pool: true,
        maxConnections: 3,
        maxMessages: 5000000,
        service: 'Office365',
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: 'productaffair@productaffair.com',
        to: email,
        subject: process.env.NODE_ENV === 'production' ? 'ProductAffair - Verify Email' : 'Test Email',
        html: `<h4>Hi ${firstname}, you have successfully created a Productaffair account! Please enter the code below to verify your email address.</h4>
             <p>${token}</p>`,
    };
    transporter.sendMail(mailOptions, (err, response) => {
        if (response)
            transporter.close();
    });
};
exports.default = sendEmail;
//# sourceMappingURL=nodemailer.js.map