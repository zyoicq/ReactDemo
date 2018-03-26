import React from 'react';
import {findDOMNode} from 'react-dom';
import jsdom from 'jsdom';
import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import App from '../app/components/App';

describe('DOM渲染测试3', function (done) {
  it('点击“发送”按钮，输入的消息出现在消息列表中', function () {
    const app = TestUtils.renderIntoDocument(<App/>);
    const appDOM = findDOMNode(app);
    let messageItemsCount = appDOM.querySelectorAll('.message-content').length;
    let addInput = appDOM.querySelector('input');
    addInput.value = '新增的消息';
    let addButton = appDOM.querySelector('.add-message button');
    TestUtils.Simulate.click(addButton);
    expect(appDOM.querySelectorAll('.message-content').length).to.be.equal(messageItemsCount + 1);
  });
});

