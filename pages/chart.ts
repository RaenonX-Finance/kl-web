import dynamic from 'next/dynamic';


const PxDataMain = dynamic<{}>(
  () => import('../src/layout/pxData/main').then((lib) => lib.PxDataMain),
  {ssr: false},
);

export default PxDataMain;
