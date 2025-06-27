export const signup = async (req, res) => {
  res.json({
    status: "success",
    data: "You have hit the signup url"
  })
}

export const login = async (req, res) => {
  res.json({
    status: "success",
    data: "You hit the login endpoint"
  })
}

export const logout = async (req, res) => {
  res.json({
    status: "success",
    data: "You hit the logout endpoint"
  })
}