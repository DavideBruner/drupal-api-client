import services, { DrupalApiClient } from "./services";
import applyMixins from "./utils/applyMixins";

applyMixins(DrupalApiClient, Object.values(services));

export default DrupalApiClient;