"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
const PerfMonServiceFactory_1 = require("../build/PerfMonServiceFactory");
class PerfMonProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("perfmon", "Performance counters microservice");
        this._factories.add(new PerfMonServiceFactory_1.PerfMonServiceFactory);
        this._factories.add(new pip_services_rpc_node_1.DefaultRpcFactory);
    }
}
exports.PerfMonProcess = PerfMonProcess;
//# sourceMappingURL=PerfMonProcess.js.map