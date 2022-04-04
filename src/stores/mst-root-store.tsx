import { types, onSnapshot, addMiddleware } from "mobx-state-tree";
import { mstLog } from "mst-log";
// A tweet has a body (which is text) and whether it's read or not
const Tweet = types
  .model("Tweet", {
    body: types.string,
    read: false, // automatically inferred as type "boolean" with default "false"
  })
  .actions((tweet) => ({
    toggle() {
      tweet.read = !tweet.read;
    },
  }));

const RootStore = types.model("RootStore", {
  tweets: types.array(Tweet),
});

export const rootStore = RootStore.create({
  tweets: [
    {
      body: "Anyone tried MST?",
    },
  ],
});

// Listen to new snapshots, which are created anytime something changes
onSnapshot(rootStore, (snapshot) => {
  // console.log(snapshot)
});

// Let's mark the first tweet as "read" by invoking the "toggle" action
rootStore.tweets[0].toggle();

addMiddleware(rootStore, mstLog());

// In the console, you should see the result: `{ tweets: [{ body: "Anyone tried MST?", read: true }]}`
