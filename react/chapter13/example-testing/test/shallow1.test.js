import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import App from '../app/components/App';

function shallowRender(Component) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Component/>);
  return renderer.getRenderOutput();
}

describe('浅渲染测试1', function () {
  it('App组件的标题应该是“消息列表”', function () {
    const app = shallowRender(App);
    expect(app.props.children[0].type).to.equal('h2');
    expect(app.props.children[0].props.children).to.equal('消息列表');
  });
});
