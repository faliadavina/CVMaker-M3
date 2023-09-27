import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import SECRET from '../constant/index.js';
import Akun from '../models/akunModels.js';

const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(opts, async (jwtPayload, done) => {
    try {
      const user = await Akun.findByPk(jwtPayload.id_akun, {
        attributes: ['id_akun', 'email'],
      });

      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      return done(null, user);
    } catch (error) {
      console.error('Passport JWT error:', error.message);
      return done(null, false, { message: 'Internal server error' });
    }
  })
);

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: 'Validation failed',
    });
  }

  next();
};



export { passport, validationMiddleware};
