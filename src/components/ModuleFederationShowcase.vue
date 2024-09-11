<template>
  <VRow justify="center" class="mt-6">
    <VCol cols="12" md="8">
      <VCard elevation="3" class="pa-6">
        <div class="text-h5 mb-4">Module Federation</div>
        <div class="text-body-1 mb-4">
          Module Federation allows you to share code across different applications without requiring them to be bundled together. This is particularly useful for micro-frontends, where multiple applications can independently deploy, but share common components.
        </div>

        <div class="text-h6 mb-3">Importing Components</div>
        <VExpansionPanels>
          <VExpansionPanel>
            <VExpansionPanelTitle>Using Vite</VExpansionPanelTitle>
            <VExpansionPanelText>
              <pre>
                <code>
                  &lt;template&gt;
                  &lt;script setup&gt;
import { defineAsyncComponent } from 'vue'

const HelloWorld = defineAsyncComponent(() =>
  import('mf.razcue.github.io/HelloWorld')
)

// Use HelloWorld as a component in your Vue app
&lt;/script&gt;
export default {
  components: {
    HelloWorld
  }
}
                  &lt;/template&gt;
                </code>
              </pre>
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>Using Webpack</VExpansionPanelTitle>
            <VExpansionPanelText>
              <pre>
                <code>
                  &lt;React.Suspense fallback=&quot;Loading...&quot;&gt;
                    &lt;HelloWorld /&gt;
                  &lt;/React.Suspense&gt;

const HelloWorld = React.lazy(() =>
  import('mf.razcue.github.io/HelloWorld')
)

// Use HelloWorld as a component in your React app
export default function App() {
  return (
    &lt;React.Suspense fallback=&quot;Loading...&quot;&gt;
      &lt;HelloWorld /&gt;
    &lt;/React.Suspense&gt;
  );
}
                </code>
              </pre>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCard>
    </VCol>
  </VRow>
</template>
