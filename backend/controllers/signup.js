import DB from '../models/index.js';

const User = DB.user;

const signup = async (req, res, next) => {
    try {
        const user = await User.create(req.body);

        const token = user.getJwtToken();

        const options = {
            expires: new Date(
                Date.now() + parseFloat(process.env.JWT_EXPIRE * 1000)
            ),
            httpOnly: true,
            sameSite: 'strict'
        };

        res.status(201).cookie('token', token, options).send({
            success: true,
            data: {
                message: 'user created',
                user
            },
            error: null,
        });
    } catch (err) {
        next(err);
    }
};

export { signup };