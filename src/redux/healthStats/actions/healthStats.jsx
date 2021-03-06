import { fireAjax } from '../../../services/index';
import { call, put } from 'redux-saga/effects';
import * as actions from '../../../redux/actions';

export function* healthStatsRequest(action) {
    try {
        const response = yield call(fireAjax, 'POST', '', {
            'action': 'get_stats_attendance_summary'
        });
        if (response.error === 0) {
            yield put(actions.successHealthStats(response.data));
        } else if (response.error === 1) {
            yield put(actions.errorHealthStats('API response error.'));
        }
    } catch (e) {
        yield put(actions.errorHealthStats('Error Occurs !!'));
    }
}

export function* healthStatsSecretKeyListRequest(action) {
    try {
        const response = yield call(fireAjax, 'POST', '', {
            'action': 'get_all_secret_keys'
        });
        if (response.error === 0) {
            yield put(actions.successHealthStatsSecretKeyList(response.data));
        } else if (response.error === 1) {
            yield put(actions.errorHealthStatsSecretKeyList(response.data.message));
        }
    } catch (e) {
        yield put(actions.errorHealthStatsSecretKeyList('Error Occurs !!'));
    }
}

export function* healthStatsAddSecretKeyRequest(action) {
    try {
        const response = yield call(fireAjax, 'POST', '', {
            'action': 'generate_secret_key',
            'app_name': action.payload
        });
        if (response.error === 0) {
            yield put(actions.successHealthStatsAddSecretKey(response.data.message));
            yield put(actions.requestHealthStatsSecretKeyList());
        } else if (response.error === 1) {
            yield put(actions.errorHealthStatsAddSecretKey(response.data.message));
        }
    } catch (e) {
        yield put(actions.errorHealthStatsAddSecretKey('Error Occurs !!'));
    }
}

export function* healthStatsDeleteSecretKeyRequest(action) {
    try {
        const response = yield call(fireAjax, 'POST', '', {
            'action': 'delete_secret_key',
            'app_id': action.payload
        });
        if (response.error === 0) {
            yield put(actions.successHealthStatsDeleteSecretKey(response.data.message));
            yield put(actions.requestHealthStatsSecretKeyList());
        } else if (response.error === 1) {
            yield put(actions.errorHealthStatsDeleteSecretKey(response.data.message));
        }
    } catch (e) {
        yield put(actions.errorHealthStatsDeleteSecretKey('Error Occurs !!'));
    }
}

export function* healthStatsRegenerateSecretKeyRequest(action) {
    try {
        const response = yield call(fireAjax, 'POST', '', {
            'action': 'regenerate_secret_key',
            'app_id': action.payload
        });
        if (response.error === 0) {
            yield put(actions.successHealthStatsRegenerateSecretKey(response.data.message));
            yield put(actions.requestHealthStatsSecretKeyList());
        } else if (response.error === 1) {
            yield put(actions.errorHealthStatsRegenerateSecretKey(response.data.message));
        }
    } catch (e) {
        yield put(actions.errorHealthStatsRegenerateSecretKey('Error Occurs !!'));
    }
}

export function* deleteHealthStats(action) {
    try {
        const response = yield call(fireAjax, 'POST', '', {
            'action': 'delete_attendance_stats_summary',
            'year' : action.payload
        });
        if (response.error === 0) {
            yield put(actions.successDeleteHealthStats(response.data.message));
            yield put(actions.requestHealthStats());
        } else if (response.error === 1) {
            yield put(actions.errorDeleteHealthStats(response.data.message));
        }
    } catch (e) {
        yield put(actions.errorDeleteHealthStats('Error Occurs !!'));
    }
}

export function* requestStatsHistory(action) {
    try {
        const response = yield call(fireAjax, 'POST', '', {
            'action': 'get_employees_history_stats'
        });
        if (response.error === 0) {
            yield put(actions.successStatsHistory(response.data));
        } else if (response.error === 1) {
            yield put(actions.errorStatsHistory('API response error.'));
        }
    } catch (e) {
        yield put(actions.errorStatsHistory('Error Occurs !!'));
    }
}

export function* requestStatsLeave(action) {
    try {
        const response = yield call(fireAjax, 'POST', '', {
            'action': 'get_employees_leaves_stats',
            'month' : action.payload.month,
            'year' : action.payload.year
            
        });
        if (response.error === 0) {
            yield put(actions.successStatsLeaveHistory(response.data));
        } else if (response.error === 1) {
            yield put(actions.errorStatsLeaveHistory('API response error.'));
        }
    } catch (e) {
        yield put(actions.errorStatsLeaveHistory('Error Occurs !!'));
    }
}