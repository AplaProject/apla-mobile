import { delay } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';

import { put, race, cancel, take, call, select } from 'redux-saga/effects';
import { ModalTypes, navTypes, MODAL_ANIMATION_TIME } from '../../constants';
import Keyring from 'utils/keyring';

import * as account from 'modules/account';
import * as application from 'modules/application';
import * as navigator from 'modules/navigator';
import { validatePassword } from './privateKey';
import { changePassword, cancelChangingPassword, confirmChangingPassword } from 'modules/account/actions';
import * as auth from 'modules/auth';

interface IExtendedAccount extends IAccount {
  ecosystemId: string;
}

export function* changePasswordWorker(action: Action<IAccount>) {
  yield put(application.actions.showModal({ type: ModalTypes.PASSWORD, params: { encKey: action.payload.encKey } }));

  const { cancel, confirm } = yield race({
    cancel: take(application.actions.closeModal),
    confirm: take(application.actions.confirmModal),
  });

  if (cancel) return;

  if (confirm) {
    const { privateKey } = confirm.payload;

    if (!!privateKey) {
      yield put(application.actions.closeModal());
      yield call(delay, MODAL_ANIMATION_TIME); // closing modal animation
      yield put(application.actions.toggleDrawer(false));
      yield call(delay, MODAL_ANIMATION_TIME); // closing drawer animation
      yield put(navigator.actions.navigate(navTypes.SIGN_UP_CONFIRM, { changePassword: true }));

      const { success, failure } = yield race({
        success: take(confirmChangingPassword),
        failure: take(cancelChangingPassword)
      });

      if (failure) {
        yield put(navigator.actions.back());
        return;
      }

      if (success) {
        const encKey = yield call(Keyring.encryptAES, privateKey, success.payload);
        const accountWithNewKey = {
          ...action.payload,
          encKey
        };

        yield put(changePassword.done({ params: '', result: accountWithNewKey }));

        yield put(navigator.actions.navigateWithReset([
          {
            routeName: navTypes.SIGN_IN,
            params: { uniqKey: accountWithNewKey.uniqKey, encKey }
          }
        ]));
      }

    }
  }
}

export default function* changePasswordSaga() {
  yield takeEvery(changePassword.started, changePasswordWorker)
}