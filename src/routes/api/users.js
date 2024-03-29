const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/users");

router.get('/', async (req,res) => {
    
    const users = await User.find(); 
    res.json(users);
    
})
router.post('/getuser', async (req, res) => {
    const user = await User.findById(req.body.id);
    res.json(user);
  });

router.post("/validatetoken",(req,res)=>{
    
    if (req.body.token) {
        
        const token = req.body.token.split(' ')[1]; 

        try {
            var decoded = jwt.verify(token, 'secret', {expiresIn: 650});
            
            return res.status(200).json(decoded)
            
          } catch(err) {
            return res.status(401).json({error: "Token has expired"})
            
          }

    }
    else{
  
          return res.status(401).json({ error: "Authentication error. Token required" });
      
    }

})

router.post("/register", (req, res) => {
    
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    User.findOne({ username: req.body.username }).then(user => {
      if (user) {
        return res.status(400).json({ usernamer: "Username already exists" });
       } else {
            const newUser = new User({
            
            username: req.body.username,
            
            password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
     
        }
    });
});

router.post("/login", (req, res) => {
    
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const username = req.body.username;
    const password = req.body.password;// Find user by username
    User.findOne({ username }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ usernamenotfound: "Username not found" });
      }
      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    
                };
                // Sign token
                jwt.sign(
                    payload,
                    "secret",
                    {
                    expiresIn: 650 // 15 min
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token,
                            user: username
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

module.exports = router;