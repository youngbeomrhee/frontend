import React, {useState, memo, useCallback} from "react";

const Cat = memo(({name, meow = f => f}) => {
  console.log(`rendering ${name}`);
  return (
    <p onClick={() => meow(name)}>{name}</p>
  )
})

// const PureCat = memo(Cat, (prevProps, nextProps) => prevProps.name === nextProps.name);

// export default function App() {
//   const [cats, setCats] = useState(["catA", "catB", "catC"]);
//
//   return (
//     <>
//       {
//         cats.map((name, i) => (
//           <PureCat key={i} name={name} meow={name => console.log(`${name} has meowed`)} />
//         ))
//       }
//       <button onClick={() => setCats([...cats, prompt("Name a cat")])}>Add a cat</button>
//     </>
//   );
// }

const PureCat = memo(Cat);

export default function App() {
  const [cats, setCats] = useState(["catA", "catB", "catC"]);
  const meow = useCallback(name => console.log(`${name} has meowed`), [])
  return (
    <>
      {
        cats.map((name, i) => (
          <PureCat key={i} name={name} meow={meow} />
        ))
      }
      <button onClick={() => setCats([...cats, prompt("Name a cat")])}>Add a cat</button>
    </>
  );
}