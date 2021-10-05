import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  const blog = {
    url: 'andrew',
    author: 'andrew',
    likes: 0,
    id: 'id',
  };

  let blogComponent;

  const mockRemoveBlog = jest.fn();
  const mockLikeBlog = jest.fn();

  beforeEach(() => {
    blogComponent = render(
      <Blog onRemove={mockRemoveBlog} onLikeBlog={mockLikeBlog} key={blog.id} blog={blog} />
    );
  });

  test('at start the likes and url are not displayed', () => {
    const div = blogComponent.container.querySelector('.toggle__content');
    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, likes and url are displayed', () => {
    const button = blogComponent.container.querySelector('.btn-toggle');
    fireEvent.click(button);

    const div = blogComponent.container.querySelector('.toggle__content');
    expect(div).not.toHaveStyle('display: none');
  });

  test('check like button will be called twice if user clicks twice', () => {
    const btnClick = blogComponent.container.querySelector('.btn-click');
    fireEvent.click(btnClick);
    fireEvent.click(btnClick);

    expect(mockLikeBlog.mock.calls).toHaveLength(2);
  });
});