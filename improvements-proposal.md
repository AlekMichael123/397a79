# Alek Michael - Answers to Part 2

## Right now the data for the posts is coming from a json file. What changes would you have to make to the application if it came from an API? In what type of hook should you use to fetch the data and why? What other considerations would you have to make?

    Instead of already having access to the data, we would have to get this data from some kind of fetching method. Options would include an asyncronous function that would incorporate the global fetch method or perhaps using a useEffect hook that could fetch the data once. Fetching the data will take time, which is why we have to use an async within a useEffect to limit the number of times we access the API.

## Part of this application uses the package nanoid to generate keys. What issue would this cause for generating keys in React?

    In React, keys must be unique and stable. The problem with using a randomly generated key from a package like nanoid is that, although it may create unique keys for each item, The keys are unpredictable because if we go backwards in the list of users, it generates a brand new key for that item. This means that React will always identify the items as new, which could be bad for performance. In a case like the example given, we should use easy-to-predict methods for the keys, such as using the indices of the items in the list. This works because the blogs never change positions in the JSON.
