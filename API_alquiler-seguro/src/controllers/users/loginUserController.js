import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import getPool from '../../db/getPool';
import generateErrorUtil from '../../utils/generateErrorUtil';

const loginUserController= async (req,res,next)=>{
      try{
            const {email, password}= req.body;
            if(!email || !password){
                  generateErrorUtil('faltan campos', 400)
            }
            
            const pool = await getPool(); 
            const [users]=await pool.query(
                  'SELECT id, password, active FROM users WHERE email = ?', //revisar la query si está bien
                  email,
            );
            const validPass= 
            users.length>0 && (await bcrypt.compare(password, users[0].password));

            if (!validPass){
                  generateErrorUtil('Credenciales inválidas', 401);
            }
            if(!users[0].active){
                  generateErrorUtil(
                        'Usuario pendiente de activar. Activa tu usuario accediendo al email de verificación que has recibido en tu correo',
                  403,);   
            }
            const tokenInfo={
                  id: users[0].id,
                  role: users[0].role,
            };
            const token = jwt.sign(tokenInfo, process.env.SECRET, {
                  expiresIn: '7d',
            });
            res.send({
                  status: 'ok',
                  data: {
                        token,
                  },
            });
      }catch(err){
            next(err);
      }
};

export default loginUserController;