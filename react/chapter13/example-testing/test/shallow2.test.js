import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import MessageItem from '../app/components/MessageItem';

function shallowRender(Component, props) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Component {...props}/>);
  return renderer.getRenderOutput();
}

describe('浅渲染测试2', function () {
  it('消息条目初始状态为“未读”', function () {
    const messageItemData = { id: 0, name: '第一条消息', hasRead: false };
    const messageItem = shallowRender(MessageItem, {message: messageItemData});
    expect(messageItem.props.children[0].props.className.indexOf('message-read')).to.equal(-1);
  });
});

