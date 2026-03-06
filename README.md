1️⃣ What is the difference between var, let, and const?

Ans: var, let, and const are ways to declare variables in JavaScript, but they differ in scope, hoisting behavior, and mutability. var is function-scoped, can be redeclared and reassigned, and is hoisted with an initial value of undefined. Not block-scoped. let is block-scoped, can be reassigned but not redeclared in the same scope, and is hoisted into a temporal dead zone, meaning you cannot access it before declaration. const is also block-scoped and hoisted into a temporal dead zone, but it cannot be reassigned. However, objects or arrays declared with const can still have their contents mutated.

2️⃣ What is the spread operator (...)?

Ans: The spread operator ... allows an iterable like an array or object to be expanded into individual elements. It’s commonly used to copy, merge, or pass elements without mutating the original data.

3️⃣ What is the difference between map(), filter(), and forEach()?

Ans: forEach() – Iterates over an array and executes a callback for each element. It does not return a new array. Used for side effects like logging or updating values.

map() – Iterates and returns a new array where each element is the result of the callback. Use it when you want a transformed array.

filter() – Iterates and returns a new array containing only the elements that pass the test in the callback.

4️⃣ What is an arrow function?

Ans: An arrow function is a shorter syntax for writing functions in JavaScript and doesn’t have its own this, making it useful for callbacks.

5️⃣ What are template literals?

Ans: Template literals are strings wrapped in backticks (` `) that allow interpolation and multiline strings. You can embed expressions with ${}.