import {GeneralPath} from '../const/path';


type UseNextRouterReturn = {
  pathname: string,
};

export const useNextRouter = (): UseNextRouterReturn => {
  return {
    pathname: GeneralPath.CHART,
  };
};
