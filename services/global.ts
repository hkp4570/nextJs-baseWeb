import {http} from '../utils/request'

export function getUser() {
    return http('/getUser', {
        method: 'POST',
    })
}
