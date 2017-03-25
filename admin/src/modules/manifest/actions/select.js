/**
 * select manifest.
 */
import { SELECT_MANIFEST } from '../constants';

// 选择货单
const selectManifestAction = manifest_id => ({ type: SELECT_MANIFEST, manifest_id });
export const selectManifest = manifest_id => dispatch => dispatch(selectManifestAction(manifest_id));