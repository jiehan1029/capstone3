import React from 'react';
import { shallow, mount, render } from 'enzyme';
import RecordCollectionLightbox from './record-collection-lightbox';

const propsToTest={photos:[{src:'/fake-src.jpg', caption:""}]};

it('renders without crashing', () => {
  shallow(<RecordCollectionLightbox {...propsToTest}/>);
});
