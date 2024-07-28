const { celebrate, Joi, Segments } = require("celebrate");
const authConfig = require("../../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../models");

exports.signInGet = {
    controller : async(req,res)=>{
        try {
            if(req.cookies['api-auth']){
                return res.redirect('/close/dashboard');
            }
            res.render("../views/admin/auth.ejs")
        } catch (error) {
            res.send(error)
        }
    }
}

exports.signOut = {
    controller: async (req,res) => {
        try {
            res.clearCookie('api-auth');
            res.redirect('/close/login');
        } catch (error) {
            console.log(error.message)
            res.redirect('/close/login');
        }
    }
}



exports.signInPost = {
    validator: celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
        }),
    }),
    
    controller: async (req, res) => {
        const { email, password } = req.body;
        try {
            const existingUser = await db.admins.findOne({
                where: { email: email },
            });

            if (!existingUser) {
                return res.status(404).json({ message: "User not found!" });
            }

            const matchPassword = await bcrypt.compare(
                password,
                existingUser.password
            );
            if (!matchPassword) {
                return res
                    .status(404)
                    .json({ message: "Invalid credentionals" });
            }

            const token = jwt.sign(
                { name: existingUser.name, email: existingUser.email, id: existingUser.id },
                authConfig.JWT_SECRET_KEY,
                {
                    expiresIn: authConfig.JWT_TOKEN_EXP_TIME,
                }
            );
            res.cookie("api-auth",token,{
                httpOnly : true,
                secure : false
            })
            res.redirect('/close/dashboard')
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },
}; 