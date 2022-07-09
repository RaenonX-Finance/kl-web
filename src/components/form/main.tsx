import React, {FormEvent} from 'react';

import {AxiosError, AxiosResponse} from 'axios';
import Form from 'react-bootstrap/Form';

import {AjaxFormError} from './error';
import {AjaxFormData} from './type';


type Props<D extends AjaxFormData> = React.PropsWithChildren<{
  data: D,
  setData: React.Dispatch<React.SetStateAction<D>>,
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>,
  getError: (response: AxiosResponse) => string | null,
}>;

export const AjaxForm = <D extends AjaxFormData>({
  data, setData, onSubmit, getError, children,
}: Props<D>) => {
  const {error} = data;

  const onSubmitInternal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData({
      ...data,
      disabled: true,
      error: '',
    });

    try {
      await onSubmit(e);
    } catch (caughtError) {
      const isAxiosError = caughtError instanceof AxiosError;
      const response = isAxiosError ? caughtError.response : undefined;
      // Status could be `0` for network error
      const error = response && !!response.status ?
        (
          getError(response) ??
          `${response.status} ${response.statusText} - ${JSON.stringify(response.data)}`
        ) :
        (
          isAxiosError ?
            `${caughtError.code} - ${caughtError.message}` :
            '開啟開發者模式後，截圖錯誤資訊，然後聯繫客服。'
        );

      console.error(caughtError);
      setData({
        ...data,
        disabled: false,
        error,
      });
    }
  };

  return (
    <Form onSubmit={onSubmitInternal} className="mb-3">
      <AjaxFormError error={error}/>
      {children}
    </Form>
  );
};
