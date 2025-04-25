import { expressjwt } from 'express-jwt';
import process from 'process';

export const requireAuth = expressjwt({
    secret: () => process.env.JWT_SECRET,
    algorithms: ['HS256'],
});
