import checkToken from 'express-jwt';


export const checkTokenAuth = () => { 
    checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}) 
};