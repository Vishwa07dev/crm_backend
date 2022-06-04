if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports = {
    PORT: process.env.PORT,
    NOTIFICATTION_PORT: process.env.PORT,
    NOTIFICATTION_IP: process.env.NOTIFICATTION_IP
    
}