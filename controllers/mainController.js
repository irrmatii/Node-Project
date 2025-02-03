let users = [];
let pokes = []


module.exports = {

    getUsers: (req, res) => {

        res.send(users);
        console.log("usersinfo")
    },

    getPokes: (req, res) => {

        res.send(pokes);
        console.log("pokeinfo")
    },

    register: (req, res) => {

        const { username, password, password2 } = req.body;
        const userExists = users.find(user => user.username === username)

        if (username[0]!== username[0].toUpperCase()) return res.status(400).send({message: 'Username should start with upper letter', error: true});
        if (!username) return res.status(400).send({message: 'Username is required', error: true});
        if (!password  || !password2) return res.status(400).send({message: 'Password is required', error: true});
        if (username.length < 4) return res.status(400).send({message: 'Username is too short', error: true});
        if (username.length > 15) return res.status(400).send({message: 'Username is too long', error: true});
        if (password.length < 5) return res.status(400).send({message: 'Password is too short', error: true});
        if (password !== password2) return res.status(400).send({message: 'Passwords does not match', error: true});
        if (Object.keys(req.body).length > 3) return res.status(400).send({message: 'Object has too much keys', error: true});
        if (userExists) return res.status(400).send({message: 'User already exist', error: true});


        users.push(req.body);
        res.send({message: 'User registered successfully'});

    },

    logIn: (req, res) => {
        const { username, password} = req.body;
        const userExists = users.find(user => user.username === username)
        const userExistsPass = users.find(user => user.password === password)

        if (!userExists) return res.status(400).send({message: 'User does not exist', error: true});
        if (!userExistsPass) return res.status(400).send({message: 'Incorrect Password', error: true});

        res.send({message: 'User logIn successfully'});
    },

    poke: (req, res) => {
        pokes.push(req.body);
        res.send({message: `You poked ${req.body.pokedUser} `});
    },

    deleteUser: (req, res) => {
        const { username, password} = req.body;
        const findUser= users.find(user => user.username === username)

        if (!findUser) return res.status(400).send({ message: 'User not found', error: true });
        if (findUser.password !== password) res.status(400).send({message: 'Incorrect Password', error: true});

        users = users.filter(user => user.username !== username);
        pokes = pokes.filter(poke => poke.username !== username && poke.pokedUser !== username)

        res.send({message: `User was deleted successfully`});
        console.log(req.body);
    }

}