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
            domain: 'localhost',
            path: '/',
            sameSite: 'Lax',
        };

        res.status(201).cookie('token', token, options).send({
            success: true,
            data: {
                message: 'user created',
                user: {
                    fullname: user.fullname,
                    email: user.email
                },
                tasks: user.tasks

            },
            error: null,
        });
    } catch (err) {
        next(err);
    }
};

const signin = async (req, res, next) => {
    try {
        if (!req.body.email) {
            throw new Error('Validation failed: No email address provided')
        }

        if (!req.body.password) {
            throw new Error('Validation failed: No password provided')
        }

        const user = await User.findOne({ email: req.body.email })
            .select("+password").populate("tasks");

        if (!user) {
            throw new Error(`user with email ${req.body.email} not found`);
        }

        const isPasswordCorrect = user.compatePasswords(req.body.password);

        if (!isPasswordCorrect) {
            throw new Error('Unauthorized: Incorrect Password');
        }

        const token = user.getJwtToken();

        const options = {
            expires: new Date(
                Date.now() + parseFloat(process.env.JWT_EXPIRE * 1000)
            ),
            httpOnly: true,
            domain: 'localhost',
            path: '/',
            sameSite: 'Lax'
        };

        res.status(200).cookie('token', token, options).send({
            success: true,
            data: {
                user: {
                    fullname: user.fullname,
                    email: user.email
                },
                tasks: user.tasks
            },
            error: null
        });
    } catch (err) {
        next(err);
    }
};

const signout = async (req, res, next) => {
    try {
        res.clearCookie('token').send({
            success: true,
        });
    } catch (err) {
        next(err);
    }
};

const gerUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).populate('tasks');
        res.status(200).send({
            success: true,
            data: {
                user: {
                    fullname: user.fullname,
                    email: user.email
                },
                tasks: user.tasks
            },
            error: null
        });
    } catch (err) {
        next(err);
    }
};

export { signup, signin, gerUser, signout };