const { join } = require('path')
const express = require('express')

const router = express.Router()

const authRouter = require(join(__dirname, 'auth', 'auth.route'))
const quizRouter = require(join(__dirname, 'quiz', 'quiz.route'))

router.get('/', async (req, res) => {
  res.status(404).json({
    message: 'Welcome to Quiz API!',
    base_url: `${req.protocol}://${req.get('host')}`,
    endpoints: [
      'GET: /all'
    ]
  })
})

// router.use('/user', userRoute)
router.use('/user', authRouter)
router.use('/quiz', quizRouter)

module.exports = router
