import React, { useReducer } from 'react';

const toastReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          id: action.id,
          content: action.content,
          metadata: action.metadata
        }
      ];

    case 'remove':
      return [...state.filter(toast => toast.id !== action.id)];
  
    default:
    return state;
  }
};

const timers = {};
const startTimer = (id, removeToast, delay) => {
  if (!timers[id]) {
    timers[id] = setTimeout(() => removeToast(id), delay);
  }
};
const dismiss = (id, removeToast) => {
  if (timers[id]) {
    clearTimeout(timers[id]);
    delete timers[id];
  }
  removeToast(id);
};

let uid = 0;

export default delay => {
  const [toastList, dispatch] = useReducer(toastReducer, []);
  const removeToast = id => dispatch({ type: 'remove', id });

  const addToast = (content, metadata) => {
    uid += 1;
    startTimer(uid, removeToast, delay || 15000);
    dispatch({ type: 'add', id: uid, content, metadata });
  };

  const Toaster = ({ style, className, toastClass, toastMargin }) => (
    <div style={style} className={className}>
      {toastList.map(({id, content}) => {
        const remove = () => dismiss(id, removeToast);
        return (
          <div
            key={id}
            style={{ margin: toastMargin }}
            className={toastClass}
            onClick={remove}
          >
            {content}
          </div>
          );
        }
      )}
    </div>
  );

  return [
    Toaster,
    addToast,
    toastList
  ];
};