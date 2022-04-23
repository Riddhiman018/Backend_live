const cluster = require('cluster')
const os = require('os')
if(cluster.isMaster){
    for(var i=0;i<os.cpus().length;i++){
        cluster.fork()
    }
    cluster.on('exit',()=>{
        cluster.fork()
    })
}else{
    require('./server')
}