import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  let component;
  const blog = {
    title: 'andrew',
    url: 'andrew',
    author: 'andrew',
    likes: 0,
  };

  const mockSubmit = jest.fn();

  beforeEach(() => {
    component = render(
      <BlogForm onSubmit={mockSubmit} />
    );
  });

  test('<BlogForm /> calls onSubmit', () => {
    const author = component.container.querySelector('#author');
    const title = component.container.querySelector('#title');
    const url = component.container.querySelector('#url');

    const form = component.container.querySelector('form');

    fireEvent.change(author, {
      target: { value: blog.author },
    });

    fireEvent.change(title, {
      target: { value: blog.title },
    });

    fireEvent.change(url, {
      target: { value: blog.url },
    });

    fireEvent.submit(form);

    expect(mockSubmit.mock.calls).toHaveLength(1)
    expect(mockSubmit.mock.calls[0][0].author).toBe(blog.author);
    expect(mockSubmit.mock.calls[0][0].title).toBe(blog.title);
    expect(mockSubmit.mock.calls[0][0].url).toBe(blog.url);
  });
});