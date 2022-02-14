import express from "express";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail"
import { client } from "../index.js"

const router = express.Router();
const CLIENT_URL = "http://localhost:3000"


router.route('/').put(async (req, res) => {
    const { email } = req.body;

    //get the email from db
    const existUser = await client.db("b28wd").collection("my_users").findOne({ email: email }) 

    //If email does not exists
    if (!existUser) {                                         
        return res.status(400).send({ message: "User with this email doesn't exists." })
    }

    // If email is exists create a token
    const token = jwt.sign({ _id: existUser._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: "20m" })

    //sending email to reset password
    sgMail.setApiKey(process.env.API_KEY)          
    const msg = {
        to: email,
        from: {
            name: "sendMail",
            email: process.env.ACCOUNT_EMAIL
        },
        subject: "Your New Password Resetting Link",
        html: `<h2>Please click on given link to reset your password</h2>
            <p>${CLIENT_URL}/reset-password/${token}</p>`
    }

    try {
        await client.db("b28wd").collection("my_users").updateOne({ email: email }, { $set: { resetLink: token } })      //update the token in db
        return sgMail
            .send(msg)
            .then(() => {
                return res.send({ message: "Email has been sent!" })        //mail will send only if the token is valid
            })
            .catch((error) => {
                return res.send({ message: error })
            })

    }
    catch (err) {
        return res.status(500).send({ message: err })
    }
});

export const forgotPasswordRouter = router;