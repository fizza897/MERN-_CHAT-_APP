        import express from "express"
        import { getMessage, sendMessage } from "../Controllers/messageControllers.js"
        import isAuthenticated from "../middleWare/isAuthenticated.js"
        const router =express.Router();
        router.route("/send/:id").post(isAuthenticated,sendMessage);
        router.route("/:id").get(isAuthenticated,getMessage);
        export default router;   