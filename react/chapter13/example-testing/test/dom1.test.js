import React from 'react';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';
import App from '../app/components/App';

describe('DOM渲染测试1', function () {
  it('点击“X”按钮，该条消息从列表中消失', function () {
    const app = TestUtils.renderIntoDocument(<App/>);
    let messageItems = TestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    let messageCount = messageItems.length;
    let deleteButton = messageItems[0].querySelector('button');
    TestUtils.Simulate.click(deleteButton);
    let todoItemsAfterClick = TestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    expect(todoItemsAfterClick.length).to.equal(messageCount - 1);
  });
});

