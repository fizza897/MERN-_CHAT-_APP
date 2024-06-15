import express from "express"
import { Register } from "../Controllers/userControllers.js"
import { getOtherUsers} from "../Controllers/userControllers.js"
import { Login } from "../Controllers/userControllers.js"
import { Logout } from "../Controllers/userControllers.js"
import isAuthenticated from "../middleWare/isAuthenticated.js"

const router =express.Router()
router.route("/register").post(Register)
router.route("/login").post(Login)
router.route("/logout").get(Logout)
router.route("/").get(isAuthenticated,getOtherUsers)
export default router;