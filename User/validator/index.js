exports.userSignupValidator = (req, res, next) => {
    //Name is not null
    req.check("name", "Name is required").notEmpty();
    //Email is not null and valid
    req.check("email", "Email is required").notEmpty();
    req.check('email')
    .matches(/.+\@.+\..+/)
    .withMessage("Email is not valid")

    //check for password
    req.check("password", "Password is required").notEmpty();
    req.check('password')
    .isLength({min: 6}) 
    .withMessage("Password must contain atleast 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain at least 1 numeric character")
    .matches(/[!@#\$%\^&\*]/)
    .withMessage("Password must contain at least one special character")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least 1 uppercase alphabetical character")

    //check for errors
    const errors = req.validationErrors();
    //if error, show the first error
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    //proceed to next middleware
    next();

}

exports.passwordResetValidator = (req, res, next) => {
    // check for password
    req.check("newPassword", "Password is required").notEmpty();
    req.check("newPassword")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 chars long")
        .matches(/\d/)
        .withMessage("must contain a number")
        .withMessage("Password must contain a number");
 
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware or ...
    next();
};
