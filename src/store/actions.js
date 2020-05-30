import * as types from '@/store/mutation-types';

export default {
    set_direction_state({ commit }, flag) {
        commit(types.SET_DIRECTION_STATE, flag)
    }
}
