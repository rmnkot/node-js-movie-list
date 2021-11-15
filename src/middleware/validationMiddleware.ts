import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    res.status(422).json({ errors: validationErrors.array() });
    return;
  }

  next();
};
