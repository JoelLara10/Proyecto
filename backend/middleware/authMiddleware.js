const jwt = require( 'jsonwebtoken' );
const User = require( '../models/User' );

module.exports = async ( req, res, next ) => {
  try {
    const token = req.header( 'Authorization' )?.replace( 'Bearer ', '' );
    if ( !token ) {
      return res.status( 401 ).json( { message: 'Acceso denegado, token no proporcionado' } );
    }


    const decoded = jwt.verify( token, process.env.JWT_SECRET );
    const user = await User.findById( decoded.id );

    if ( !user ) {
      return res.status( 401 ).json( { message: 'Usuario no encontrado' } );
    }

    req.user = user;
    next();
  } catch ( error ) {
    res.status( 401 ).json( { message: 'Token no válido o expirado' } );
  }
};
