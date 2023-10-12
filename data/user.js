import bcrypt from "bcryptjs"

const users=[

{
name:"Admin User",
email:"admin@gmail.com",
password: bcrypt.hashSync("123456", 10),
isAdmin:true
},


{
    name:"Princeley",
    email:"princeley@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin:false
    },

    
{
    name:"John",
    email:"john@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin:false
    },

]
 export default users;