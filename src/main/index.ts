import CosmosApp from '@main/cosmos';
import configSchema from '@main/config-schema';

const app = new CosmosApp('Cosmos', '0.1.0', configSchema);
app.start();
