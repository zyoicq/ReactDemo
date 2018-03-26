import React from 'react';
import {findDOMNode} from 'react-dom';
import jsdom from 'jsdom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

import App from '../app/components/App';

describe('DOM渲染测试2', function (done) {
  it('点击消息条目，消息变为已读', function () {
    const app = TestUtils.renderIntoDocument(<App/>);
    const appDOM = findDOMNode(app);
    const messageItem = appDOM.querySelector('li:first-child span');
    let hasRead = messageItem.classList.contains('message-read');
    TestUtils.Simulate.click(messageItem);
    expect(messageItem.classList.contains('message-read')).to.be.equal(!hasRead);
    TestUtils.Simulate.click(messageItem);
  });
});

