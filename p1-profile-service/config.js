const config={
    production :{
        DATABASE: process.env.MONGODB_URI,
        APP: {
            HOST: process.env.APP_HOST,
            PORT: process.env.APP_PORT
        },
    },
    docker : {
        DATABASE: 'mongodb://mongodb:27017/Users',
        APP: {
            HOST: "0.0.0.0",
            PORT: 4000
        },
    },
    default : {
        DATABASE: 'mongodb://localhost:27017/Users',
        APP: {
            HOST: "127.0.0.1",
            PORT: 4000
        },
    }
}


exports.get = function get(env){
    return config[env] || config.default
}