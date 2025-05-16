import type { NextFunction, Request, Response } from 'express';

export const wrapController = (controller) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(controller(req, res, next)).catch(next);
  };
};
