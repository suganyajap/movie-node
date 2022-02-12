import express from "express";
import { getAllUsers, deleteUserById, updateUserById ,createUser} from "../helper.js";

const router = express.Router();

router.route("/").get(async (request, response) => {
    const usersList = await getAllUsers();
    response.send(usersList);
}).post(async(request,response)=>{
    const data =request.body;
    
    const  result = await createUser(data);
    response.send(result);
});



router.route("/:id").delete(async (request, response) => {
    const { id } = request.params
    const result = await deleteUserById(id);
    response.send(result);
}).put(async (request, response) => {
    const { id } = request.params;                                  
    const { role } = request.body;
    try {
        const result = await updateUserById(id, role)
        response.send(result);
    }
    catch (err) {
        response.status(500).send(err)
    }

})

export const usersRouter = router;