import DrupalApiRequest from '../request';

import CI from './ci';
import Comments from './comments';
import Files from './files';
import Maintainers from './maintainers';
import Nodes from './nodes';
import Users from './users';

export class DrupalApiClient extends DrupalApiRequest {}
export interface DrupalApiClient extends Users, Nodes, Files, Maintainers, Comments, CI {}

export default { Users, Nodes, Files, Maintainers, Comments, CI }