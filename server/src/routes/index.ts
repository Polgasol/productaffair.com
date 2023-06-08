import express from 'express';
import { authCheck } from '../middleware/authCheck/authCheck';
import localRegister from './register/register';
import verifyCode from './verify/verify';
import login from './login/login';
import upload from './upload/upload';
import logout from './logout/logout';
// import newUser from './newUser/newUser';
// import home from './home/home';
import profile from './profile/profile';
import search from './search/search';
import pages from './pages/pages';
import category from './category/category';
import post from './post/post';
import follow from './follow/follow';
import unfollow from './unfollow/unfollow';
import like from './like/like';
import unlike from './unlike/unlike';
import profileInfo from './profile-info/profileInfo';
import deletePost from './delete-post/deletePost';
import comments from './comments/comments';

const router = express.Router();

// router.use('/auth', googleAuth); // google authentication, will not be included in version 1
// router.use(
//   '/newuser',
//   (req: any, res, next) => {
//     if (req.user) {
//       if (
//         (req.user.authType === 'local' && req.user.verified === true) ||
//         (req.user.authType === 'google' && req.user.verified === true)
//       ) {
//         return res.redirect('/home');
//       }
//       if (req.user.authType === 'google' && req.user.verified === false) {
//         return next();
//         // if user did not create a username, he will be redirected to newuser route every time he loggged in using gmail
//       }
//       if (req.user.authType === 'local' && req.user.verified === false) {
//         req.session.destroy((err: Error) => {
//           if (err) next(ApiError.internalError('Error'));
//           res.redirect('/');
//         });
//         // if user did not verify and just proceed to other routes, he will be redirected to login route
//       }
//     }
//     return res.redirect('/');
//   },
//   newUser,
// ); // create new username for google authentication route
// every get request needs to check for authentication
// router.use("/comments", comments);
router.get('/', authCheck);
router.use('/pages', pages);
router.use('/search', search);
router.use('/category', category);
router.use('/post', post);
router.use('/register', localRegister);
router.use('/verify', verifyCode);
router.use('/login', login);
router.use('/upload', upload);
router.use('/logout', logout);
router.use('/like', like);
router.use('/unlike', unlike);
router.use('/logout', logout);
router.use('/follow', follow);
router.use('/unfollow', unfollow);
router.use('/profile', profile);
router.use('/profileinfo', profileInfo);
router.use('/deletepost', deletePost);
router.use('/comments', comments);

export default router;
