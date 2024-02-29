const { Router, response } = require('express');
const User = require('../database/schemas/User');
const { hashPassword, comparePassword } = require('../utils/helpers');

const router = Router();
router.post('/logout', async (request, response) => {
    request.session.user = null;
    response.send(200);
});

router.get('/account', async (request, response) => {
    if (request.session.user) {
        const accountDB = await User.find({ "username": request.session.user.username });
        response.send(accountDB[0].accounts)
    } else {
        response.send('Not logged in');
    }
});

router.get('/check', async (request, response) => {
    console.log(request.session.user)
    if (request.session.user) {
        response.send(request.session.user);
    } else {
        response.status(400).send('Not logged in');
    }
});
router.post('/login', async (request, response) => {
    const { username, password } = request.body;
    if (username && password) {
        if (request.session.user) {
            response.send(request.session.user);
        } else {
            const passwordDB = await User.findOne({ username });
            if (passwordDB) {
                if (comparePassword(password, passwordDB.password)) {
                    request.session.user = {
                        username,
                    };
                    response.send(request.session.user);
                } else {
                    response.send(401);
                }
            } else {
                response.send(401);
            }
        }
    } else response.send(401);
});
router.put('/updateaccount', async (request, response) => {
    console.log(request.session.user.username);
    const result = await User.findOneAndUpdate(
        { username: request.session.user.username, "accounts.name": request.body.name },
        {
            $inc: { "accounts.$.amount": request.body.amount }
        },
    )
    response.status(200).send(result)
})
router.put('/deleteaccount', async (request, response) => {
    const result = await User.findOneAndUpdate(
        { username: request.session.user.username },
        {
            $pull: { accounts: { "name": request.body.name } }
        }
    )
    response.status(200).send(result)
})
router.put('/createaccount', async (request, response) => {
    if (request.body.name == "false" || request.body.amount == null || request.body.name == "") {
        response.status(401).send("Not Correct");
    } else {
        const result = await User.findOneAndUpdate(
            { username: request.session.user.username },
            {
                $push: {
                    "accounts": {
                        'name': request.body.name,
                        'amount': request.body.amount,
                    }
                }
            },
        )
        response.status(200).send(result)
    }
})
router.post('/register', async (request, response) => {
    const { username, email } = request.body;
    const userDB = await User.findOne({ $or: [{ username }, { email }] });
    if (userDB) {
        response.status(400).send({ msg: 'User already exists!' });
    } else {
        const password = hashPassword(request.body.password);
        console.log(password);
        const newUser = await User.create({ username, password, email, accounts: [] });
        response.status(201).send(newUser.createdAt);
    }
});
router.put('/accounts', async (request, response) => {
    const { username } = request.body;
    response.send(username)
})
module.exports = router;