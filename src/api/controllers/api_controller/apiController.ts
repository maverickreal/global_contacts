import { Router } from 'express';
import { handleSignin, handleSignout, handleSignup } from '../../../logic/handlers/registeration/registeration';
import { tokenToUserAuth } from '../../../logic/services/middleware/middleware';

export const router: Router = Router();

router.post('/signup', handleSignup);
router.post('/signin', handleSignin);
router.post('/signout', tokenToUserAuth, handleSignout);