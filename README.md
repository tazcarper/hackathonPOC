## State Store Documentation

The provided code represents a state store implementation in React using the Context API and the `useReducer` hook. This state store is designed to manage the state of a quiz-like application, where users can answer questions organized into categories.

### Initial State

The state store has an initial state defined as follows:

```javascript
const initialState = {
  step: "intro",
  categories: [
    {
      title: "FAANG",
      activeCategory: false,
      questions: [
        {
          title: "FAANG Question 1",
          description: "This is a description",
          answer: "",
          feedback: "",
          state: "incomplete",
        },
        // Additional FAANG questions...
      ],
    },
    {
      title: "Management",
      activeCategory: false,
      questions: [
        {
          title: "Management Question 1",
          description: "This is a description",
          answer: "",
          feedback: "",
          state: "incomplete",
        },
        // Additional Management questions...
      ],
    },
  ],
  currentCategory: null,
  currentQuestion: null,
  currentQuestions: [],
};
```

The state consists of the following properties:

- `step`: Represents the current step in the quiz.
- `categories`: An array of category objects. Each category object has a `title` (category name), `activeCategory` (boolean indicating if the category is currently active), and an array of `questions`.
- `questions`: An array of question objects. Each question object has a `title` (question title), `description` (question description), `answer` (user's answer), `feedback` (feedback for the user's answer), and `state` (state of the question, such as "incomplete" or "complete").
- `currentCategory`: Represents the currently selected category.
- `currentQuestion`: Represents the currently selected question.
- `currentQuestions`: An array of questions specific to the current category.

### Reducer

The state updates are handled by the `reducer` function, which receives the current state and an action to perform. The reducer function determines how the state should be updated based on the action type.

The supported action types are:

- `SET_STEP`: Updates the `step` property of the state.
- `SET_CATEGORIES`: Updates the `categories` property of the state.
- `SET_CURRENT_CATEGORY`: Updates the `currentCategory` property of the state.
- `SET_CURRENT_QUESTION`: Updates the `currentQuestion` property of the state.
- `SET_CURRENT_QUESTIONS`: Updates the `currentQuestions` property of the state.
- `SET_QUESTION_ANSWER`: Updates the `answer` property of a question and its category in the state based on the provided question title.
- `RESET_CATEGORY_QUESTIONS`: Resets the `state`, `answer`, and `feedback` properties of all questions within a specific category in the state.
- `SET_QUESTION_FEEDBACK`: Updates the `feedback` property of a question and its category in the state based on the provided question title.
- `SET_QUESTION_STATE`: Updates the `state` property of a question and its category in the state based on the provided question title.

### Contexts

The state store utilizes React contexts to provide the state and dispatch functions to the components.

- `GlobalStateContext`: Provides the global state value to the components.
- `GlobalDispatchContext`: Provides the dispatch function to perform state updates.

### Store Provider

The `StoreProvider` component is responsible for initializing the state and providing the state and dispatch contexts to the child components. It uses the `useReducer` hook to manage the state updates based on the defined reducer function.

```javascript
const StoreProvider = ({ children })
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
