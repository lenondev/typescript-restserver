import {Request, Response} from 'express';
import Usuario from '../models/usuario';


export const getUsuarios = async(req:Request, res:Response) => {

    const usuarios = await Usuario.findAll();


    return res.json({
        usuarios
    });

}

export const getUsuario = async(req:Request, res:Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        return res.status(404).json({
            msg: 'No existe usuario con el id indicado.'
        });
    }

    return res.json({
        usuario
    });

}

export const postUsuario = async(req:Request, res:Response) => {

    
    const { body } = req;
    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(404).json({
                msg: 'Ya existe un usuario con el email '+body.email
            });
        }
        
        const usuario = await new Usuario(body);
        await usuario.save();

        res.json(usuario);

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            msg: 'Error intentando crear un usuario. Hable con el administrador.'
        });
    }

}

export const putUsuario = async (req:Request, res:Response) => {

    const { id } = req.params;
    const { body } = req;


    try {

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id '+ id
            });
        }

        await usuario.update(body);

        return res.json(usuario);

        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            msg: 'Error intentando actualizar un usuario. Hable con el administrador.'
        });
        
    }


}

export const deleteUsuario = async(req:Request, res:Response) => {

    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id '+ id
            });
        }
        // Elliminación física
        // await usuario.destroy();

        //Eliminación lógica
        await usuario.update({estado: false});


        res.json({
            msg: 'Usuario borrado'
        });

        
    } catch (error) {
        
    }




    res.json({
        msg: 'deleteUsuario',
        id
    });

}