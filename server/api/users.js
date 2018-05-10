const router = require('express').Router()
const { User, UserCategory } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only certain fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!

    attributes: ['id', 'email', 'username', 'level']

  })
    .then(users => res.json(users))
    .catch(next)
})

//***Test only works some of the time.  Could be some async issue or issue with test***
router.put('/:userId', (req, res, next) => {
  User.findById(+req.params.userId, {
    include: [UserCategory]
  })
    .then(user => {//if statement here based on req.body.action (where action is increment or decrement)
      let userCategory = user.userCategories.find(category => {
        return category.categoryId === +req.body.categoryId
      })
      userCategory.XP += +req.body.XP
      // userCategory.HP += +req.body.HP <-- Will want to increment and/or decrement based on logic that Ginny does
      return userCategory.save()
    })
    .then(() => {
      res.end()
    })
    .catch(next)
})

