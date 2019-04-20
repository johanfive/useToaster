import React, { useReducer, useEffect } from 'react';

let uid = 0;

const toastReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      uid += 1;
      return [
        ...state,
        {
          id: uid,
          content: action.content
        }
      ];

    case 'remove':
      return [...state.filter(toast => toast.id !== action.id)];
  
    default:
    return state;
  }
};

const Toast = ({ content, dispatch, id, delay, className, padding }) => {
  const style = { padding };
  const remove = () => dispatch({ type: 'remove', id });
  useEffect(() => {
    setTimeout(remove, delay);
  });
  return <div onClick={remove} className={className} style={style}>{content}</div>;
};

export default () => {
  const [toasts, dispatch] = useReducer(toastReducer, []);
  return [
    ({ delay, style, className, toastClass, toastPadding }) => <div style={style} className={className}>
      {toasts.map(({id, content}) =>
        <Toast
          content={content}
          dispatch={dispatch}
          delay={delay || 15000}
          key={id}
          id={id}
          className={toastClass}
          padding={toastPadding}
        />
      )}
    </div>,
    content => dispatch({ type: 'add', content })
  ];
};