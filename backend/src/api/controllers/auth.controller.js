const { join } = require('path')
const User = require(join(__dirname, '..', 'models', 'user.model'))
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const createToken = async (user) => {
  const token = await jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_JWT, {
    expiresIn: 60 * 60 * 24
  })
  return token
}

exports.signup = async (req, res) => {
  const { email, password, name } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(409).json({
        success: false,
        error: 'Email already exists'
      })
    }
    user = await User.create({
      name,
      email,
      password,
    })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()
    const token = await createToken(user)
    console.log(token)
    return res.status(201).json({
      success: true,
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials or user not found'
      })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials or user not found'
      })
    }
    const token = await createToken(user)
    return res.status(200).json({
      success: true,
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

exports.getMe  = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}
