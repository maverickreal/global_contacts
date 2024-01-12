import { Router } from 'express';
import { handleSignup } from '../../../logic/handlers/registeration/registeration';

export const router: Router = Router();

router.post('/signup', handleSignup);