const signup = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    console.log(name, email, password, confirmPassword);

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Every fild is required"
        })
    }    

    const validEmail = emailValidator.validate(email) 
    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email id'
        })
    }
    
    try {
        const userInfo = userModel(req.body);
        const result = await userInfo.save();

        return res.status(200).json({
            success: true,
            data: result
        })

    } catch (e) {
        if (e.code === 11000) { // for dublicate entry
            return res.status(400).json({
                success: false,
                message: e.message
            })
        }
    }
}

module.exports = {
    signup
}
