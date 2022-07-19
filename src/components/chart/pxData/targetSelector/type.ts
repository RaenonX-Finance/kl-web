import {PxData} from '../../../../types/pxData';


export type CommonSelectorProps = {
  pxData: PxData,
};

export type CommonSelectorModalProps = {
  show: boolean,
  setShow: (show: boolean) => void,
  pxData: PxData,
};
