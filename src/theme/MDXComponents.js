// Import the original mapper
import MDXComponents from "@theme-original/MDXComponents";
import InteractiveExample from "@site/src/components/InteractiveExample";
import ModifierPlayground from "@site/src/components/ModifierPlayground";
import Optional from "@site/src/components/Optional";

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "<Highlight>" tag to our Highlight component
  // `Highlight` will receive all props that were passed to `<Highlight>` in MDX
  InteractiveExample,
  ModifierPlayground,
  Optional,
};
