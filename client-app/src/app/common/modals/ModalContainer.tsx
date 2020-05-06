import React, { useContext } from 'react';

import { RootStoreContext } from '../../stores/rootStore';
import { observer } from 'mobx-react-lite';

const ModalContainer = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    modal: { body },
    closeModal,
  } = rootStore.modalStore;

  return (
    <div className="modal" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {body}
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(ModalContainer);
