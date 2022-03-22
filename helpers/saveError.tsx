import { requestHelper } from '../helpers/requestHelper'

export const saveError = (data, props) => requestHelper.post('/errors', { data }, props ?? {})
