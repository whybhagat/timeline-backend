import express from 'express'
import { Reigster, VerfiyEmail } from '../controllers/auth.js'

const AuthRoutes=express.Router()

AuthRoutes.post('/register',Reigster)
AuthRoutes.post('/verifyEmail',VerfiyEmail)
export default AuthRoutes
