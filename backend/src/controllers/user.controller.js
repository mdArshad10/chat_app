import {User} from '../models/user.model.js'
import {StatusCodes} from 'http-status-codes'

// @DESC: create a new user
// @METHOD: POST   /api/v1/user/new
// @ACCESS: public

const createUser = async (req,res,next)=>{
    try {
        const {name, username, bio, password} = req.body;


    } catch (error) {
        
    }
}

export {createUser};