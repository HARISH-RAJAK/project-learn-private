var express = require('express');
var router = express.Router();
const { userModel, workerModel } = require('../routes/user');
const Question = require('../routes/question'); // ✅ Import this

const passport = require('passport');
const localStrategy = require('passport-local');
const upload = require('../routes/multer');
passport.use(new localStrategy(userModel.authenticate()));


router.get('/', (req, res) => res.render('landing'));


router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));


router.get('/profile', isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  if (!user) return res.status(404).send('User not found');


  const allQuestions = await Question.find({});
  let totalAnswers = 0;

  allQuestions.forEach(question => {
    question.answers.forEach(answer => {
      if (answer.author === user.username) {
        totalAnswers++;
      }
    });
  });

  res.render('profile', {
    user,
    totalAnswers
  });
});


// Edit Profile
router.post("/editProfile", isLoggedIn, async (req, res) => {
  const { username, email, phone, location, farmSize, experience, specialization } = req.body;
  const specializationArray = specialization ? specialization.split(",").map(s => s.trim()) : [];

  const user = await userModel.findOne({ username: req.session.passport.user });
  user.username = username;
  user.email = email;
  user.bio = {
    ...user.bio,
    phone,
    location,
    farmSize,
    experience,
    specialization: specializationArray
  };

  await user.save();
  res.redirect("/profile");
});

// index.js or questionRoutes.js
router.get('/questions', isLoggedIn, async (req, res) => {
  try {
    const questions = await Question.find({}).sort({ createdAt: -1 });
    res.render('questions', { questions });
  } catch (err) {
    console.error("❌ Error fetching questions:", err);
    res.status(500).send("Server Error");
  }
});


router.get('/askquestion', isLoggedIn, async (req, res) => {
  res.render('question');
});

router.get('/leaderboard', async (req, res) => {
  try {
    const users = await userModel.find({});

    const leaderboardData = await Promise.all(users.map(async user => {
      const questionCount = await Question.countDocuments({ author: user.username });

      return {
        username: user.username,
        fullname: user.fullname,
        questionCount,
      };
    }));

    // Sort by question count descending
    leaderboardData.sort((a, b) => b.questionCount - a.questionCount);
    console.log(leaderboardData);
    res.render('leaderboard', { leaderboard: leaderboardData });
  } catch (err) {
    console.error('❌ Error generating leaderboard:', err);
    res.status(500).send('Internal Server Error');
  }
});







router.get('/question/:id', isLoggedIn, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).send("Question not found");
    res.render('answer', { question, questionId: req.params.id });
  } catch (err) {
    console.error("❌ Error loading question:", err);
    res.status(500).send("Server Error");
  }
});

router.post('/question/:id', isLoggedIn, upload.single('image'), async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).send("Question not found");

    const loggedInUser = await userModel.findOne({ username: req.session.passport.user });

    const answer = {
      user: loggedInUser._id,
      content: req.body.description,
      image: req.file ? '/uploads/' + req.file.filename : null,
      createdAt: new Date(),
      likes: 0
    };

    question.answers.push(answer);
    await question.save();

    res.redirect(`/questions`);
  } catch (err) {
    console.error("❌ Error submitting answer:", err);
    res.status(500).send("Server Error while posting answer");
  }
});


router.get('/seeanswer/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).send('Question not found');
    }

    res.render('seeanswer', { question }); // Pass full question with answers
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get("/answer/:id", async (req, res) => {
  const question = await Question.findById(req.params.id)
    .populate("answers.user"); // ✅ Now this will work
  res.render("seeanswer", { question });
});


router.get('/postquestion', isLoggedIn, async (req, res) => {
  res.render('postquestion');
})

router.post('/postquestion', isLoggedIn, upload.single('image'), async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const author = req.session.passport?.user || 'Anonymous';

    const question = new Question({
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()),
      image: req.file ? '/uploads/' + req.file.filename : null,
      author
    });

    await question.save();
    res.redirect('/questions');
  } catch (err) {
    console.error("❌ Error posting question:", err);
    res.status(500).send("Server Error while posting question");
  }
});



// Register
router.post('/register', (req, res) => {
  const UserData = new userModel({
    username: req.body.username,
    email: req.body.email,
  });
  userModel.register(UserData, req.body.password)
    .then(() => passport.authenticate('local')(req, res, () => res.redirect('/profile')));
});

// Login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
}));

// Logout
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Auth middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;
