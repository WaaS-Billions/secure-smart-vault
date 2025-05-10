
import { Express } from 'express';

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
    }
    
    interface Request {
      user?: User;
    }
  }
}
