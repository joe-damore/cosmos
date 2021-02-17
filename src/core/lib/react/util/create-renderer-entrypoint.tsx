import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Renderer from '@lib/react/renderer';

const createRendererEntrypoint = (children: any) : any => {
    const root = document.querySelector('#root');
    ReactDOM.render(
        <Renderer>{ children }</Renderer>,
        root,
    );
};

export default createRendererEntrypoint;
