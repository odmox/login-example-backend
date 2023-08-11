import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    
    const  authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: "No authorization header" });
    }
    const token = authHeader.split(" ");
    if (!token[0].startsWith("Bearer")) {
        return res.status(401).send({ message: "Invalid authorization header" });
    }

    if (!token[1]) {
        return res.status(401).send({ message: "Invalid authorization header" });
    }
    
    jwt.verify(token[1], 'secret', (err, user) => {
        if (err) {
            return res.status(401).send({ message: "Invalid authorization header" });
        } 
        req.user = user;
        next();
    })
    
}