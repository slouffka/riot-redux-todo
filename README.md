Todo App with Riot.js, Redux and Immutable
==========================================

This is a sample of SPA using Riot and Redux with Immutable state. It's
structure is similar to usual React application with Redux.

This is not production-ready app. I wrote it while learning Riot and Redux with
videos by
[Andrew Van Slaars](https://www.youtube.com/channel/UC1EPLJ19SMAUpu0LOt8a4IA)
which you can find at:
[RiotJS and Redux](https://www.youtube.com/watch?v=Y6vpKAGT2-8)

# Installation

I'm using Yarn package manager because it's modern, fast and secure. But you could
swap yarn command for npm and I think it will work fine. Though I didn't check it.

```
yarn install
```

# Running

First start webpack
```
yarn run dev
```

Then in a separate terminal window execute:
```
yarn run json-server db.json
```

# Viewing

Open your browser at http://localhost:8080 to see an app.
