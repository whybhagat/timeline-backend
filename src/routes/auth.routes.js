import express from 'express'
import { Register, VerifyEmail } from '../controllers/auth.js'
const AuthRoutes=express.Router()

AuthRoutes.post('/register',Reigster)
AuthRoutes.post('/verifyEmail',VerfiyEmail)
export default AuthRoutes
