const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log del error para debugging
  const statusCode = err.statusCode || 500; // Si el error tiene un statusCode, úsalo. Si no, 500 (Internal Server Error).
  res.status(statusCode).json({ message: err.message || 'Internal Server Error' }); // Respuesta JSON con el mensaje de error
};


module.exports = errorHandler;
