import { Request, Response, Router } from 'express';
import Tipo from '../repository/tipo.repository';
import AuthMiddleware from '../middleware/auth.middleware';
import Auth from '../repository/auth.repository';
import { create, findAll } from '../handlers/tipo.handlers';

const AuthMiddlewareInstance = new AuthMiddleware(new Auth());
export const router = Router();

router.use(AuthMiddlewareInstance.authorize);

router.get("/", findAll);

router.post("/", create);