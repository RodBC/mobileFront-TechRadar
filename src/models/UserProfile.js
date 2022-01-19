// const express = require("express");
// const axios = require("axios");
// const routes = express.Router();


// routes.post('/devs', async (req, res) => {
//     const {github_username} = req.body;
    
//     const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
//     const { name = login, avatar_url, bio } = apiResponse.data;
//     console.log({
//         github_username,
//         name,
//         avatar_url,
//         bio,
//     })
//     const user = ({
//         github_username,
//         name,
//         avatar_url,
//         bio,
//     })

//     return res.json(user);
// });

// module.exports = routes;