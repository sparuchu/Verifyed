/**
 * Created by Srinivas Paruchuri on 8/8/2014.
 */
var config = {
    local: {
        mode: 'local',
        port: 3000,
        couch: {
            bucket: 'verifyed',
            host: '127.0.0.1',
            port: '8091'
        }
    },
    staging: {
        mode: 'staging',
        port: 4000,
        couch: {
            bucket: 'verifyed',
            host: '127.0.0.1',
            port: '8091'
        }
    },
    production: {
        mode: 'production',
        port: 5000,
        couch: {
            bucket: 'verifyed',
            host: '127.0.0.1',
            port: '8091'
        }
    }
}
module.exports = function(mode) {
    return config[mode || process.argv[2] || 'local'] || config.local;
}

