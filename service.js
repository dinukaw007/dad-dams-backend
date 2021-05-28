/**
 * Copyrights 2020 ImitiLabs Pvt Ltd.
 * All Rights Reserved.
 *
 * These material are unpublished, proprietary, confidential source
 * code of ImitiLabs and constitute a TRADE

 *
 .
 *
 */

"use strict";

/*
 |--------------------------------------------------------------------------
 | Application Process Handler
 |--------------------------------------------------------------------------
 |
 | This script is used to create application threads and initialize app on them.
 | Master process is responsible for managing forks, and export app metrics.
 |
 */

const os = require('os');
const app = require('./app');
const splash = require('./app/splash');


let isClusterMode = (process.env.APP_CLUSTER === 'true');

let info = `
${splash.Default}

Service started on port ${process.env.APP_PORT}
Service timezone is '${process.env.APP_TIMEZONE}'
Running on '${process.env.APP_DEBUG === 'true' ? "DEBUG" : "PRODUCTION"}' mode`;

// start the application in cluster mode.
//
// NOTE: The cluster mode's fork will create a new thread and initialize a
// new instance of the app in that thread. Which means every fork will run
// this entire script from beginning to end. That is why the cluster mode
// `if(isClusterMode)` block and `if(cluster.isMaster)` have returns.
if(isClusterMode) {
    const cluster = require('cluster');
    let numCPUs = os.cpus().length;

    if(cluster.isMaster) {
        // console.log(info);

        // fork workers
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        // handle exited worker processes
        cluster.on('exit', (worker) => {
            console.log(`Terminated worker, worker id: ${worker.id}`);
            // replace the terminated worker
            cluster.fork();
        });

        console.log("Cluster mode ENABLED");
        console.log(`Using ${numCPUs} CPUs`);
        console.log(`Started MASTER, process ID: ${process.pid}`);
        return;
    }

    // workers can share any TCP connection
    // listen for requests in worker mode
    app.listen(process.env.APP_PORT, () => {
        console.log(`Started WORKER, process ID: ${process.pid}`);
    });

    return;
}

// start application in single threaded mode
console.log(info);

// listen for requests in single threaded mode
app.listen(process.env.APP_PORT, () => {
    console.log(`Single thread mode,process id: ${process.pid}`);
});


