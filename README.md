# useToaster 🍞

The `useToaster` React Hook gives you a `Toaster` component, and a simple `toast` function.

Calling the function adds a toast in the Toaster :)
>It's as simple as that and there is no need for the context API or anything...

### Usage
```js
import useToaster from 'usetoaster';

const YourComponent = props => {
  const [ Toaster, toast ] = useToaster();
  return (
    <>
      <Toaster />
      <h1>Example</h1>
      <button onClick={() => toast('Champagne!')}>Toast</button>
    </>
  );
};
```

## Delay
By default, the Toasts will disappear by themselves after 15s.

You can control this by specifying a `delay`:
```js
<Toaster delay={5000} />
```
or
```js
<Toaster delay="5000" />
```

Note: Clicking a Toast that appears in the Toaster will make it disappear instantly regardless of the delay.

## Styling
### The Toaster
Style the Toaster like you would any other React component. It is not styled by default so you have full control over how it looks.
```js
// with a style object
<Toaster style={{ your: 'styles' }} />

// or simply adding a class
<Toaster className="your-class" />
```

### The Toasts
You can pass a class that will be applied to all Toasts in the Toaster
```js
<Toaster toastClass="toasts" />
// and then simply
toast('Plain text');
```

Alternatively, because the content of a Toast can be `anything`, you can style it however you want:
```js
toast(<AnyStyledComponent text="Some text" />);
```
If you are doing this, understand that your custom component will be wrapped in a div.
In this case, if you want control over the padding of each Toast, declare it like so:
```js
<Toaster toastPadding="5px 0" />
```