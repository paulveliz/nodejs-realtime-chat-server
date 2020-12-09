const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        console.log('Init db config');
    } catch (error) {
       console.log(error); 
       throw new Error('Error detectado');
    }
}

module.exports ={
    dbConnection
}