import {Router} from "express";
import {CreateUserController} from "./controllers/CreateUserController";
import {CreateTagController} from "./controllers/CreateTagController";
import {ensureAdmin} from "./middlewares/ensurmAdmin";
import {AuthenticationUserController} from "./controllers/AuthenticationUserController";
import {CreateComplimentsController} from "./controllers/ComplimentsController";
import {ensurmAuthencated} from "./middlewares/ensurmAuthencated";
import {ListUserSenderController} from "./controllers/ListUserSenderController";
import {ListUserReceiveController} from "./controllers/ListUserReceiverController";
import {ListTagsController} from "./controllers/ListsTagsController";
import {UsersController} from "./controllers/UsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createAuthentication = new AuthenticationUserController();
const createCompliments = new CreateComplimentsController();
const userSenderCompliments = new ListUserSenderController();
const userReiceiveCompliments = new ListUserReceiveController();
const listTags = new ListTagsController();
const users = new UsersController();

router.post("/tags", ensurmAuthencated, ensureAdmin, createTagController.handle);
router.get("/tags", ensurmAuthencated, ensureAdmin, listTags.handle);
router.get("/users", users.handle);
router.post("/users", createUserController.handle);
router.post("/auth", createAuthentication.handle);
router.post("/compliments", ensurmAuthencated, createCompliments.handle);
router.get("/users/compliments/sender", ensurmAuthencated, userSenderCompliments.handle);
router.get("/users/compliments/receiver", ensurmAuthencated, userReiceiveCompliments.handle);

export {router};