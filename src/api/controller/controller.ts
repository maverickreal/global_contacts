import { Router } from 'express';
import { handleSignin, handleSignout, handleSignup } from '../../logic/handlers/registeration/registeration';
import { tokenToUserAuth } from '../../logic/services/middleware/middleware';
import { handleCreateContact, handleSearchContact } from '../../logic/handlers/contact/contact';

const router: Router = Router();

router.post('/signup', handleSignup);
router.post('/signin', handleSignin);
router.post('/signout', tokenToUserAuth, handleSignout);

router.post('/contact', tokenToUserAuth, handleCreateContact);
router.get('/search', tokenToUserAuth, handleSearchContact);

export default router;