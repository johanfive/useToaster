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

const Toast = ({ content, dispatch, id, delay }) => {
  const remove = () => dispatch({ type: 'remove', id });
  useEffect(() => {
    setTimeout(remove, delay);
  });
  return <div onClick={remove}>{content}</div>;
};

export default () => {
  const [toasts, dispatch] = useReducer(toastReducer, []);
  return [
    ({ delay, style, className }) => <div style={style} className={className}>
      {toasts.map(({id, content}) =>
        <Toast content={content} dispatch={dispatch} delay={delay || 15000} key={id} id={id} />
      )}
    </div>,
    content => dispatch({ type: 'add', content })
  ];
};