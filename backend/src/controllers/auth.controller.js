export const signup = (req, res) =>  {
    const {fullName, email, password} = req.body
    try {
        //hasing the password
    } catch (error) {
        
    }
}

export const login = (req, res) =>  {
    res.send("Signup route");
}

export const logout = (req, res) =>  {
    res.send("Signup route");
}