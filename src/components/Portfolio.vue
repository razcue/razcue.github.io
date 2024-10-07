<template>
  <VRow justify="center" class="mt-6">
    <VCol cols="12" md="8">
      <VCard elevation="3" class="pa-6">
        <div class="text-h5 mb-4">Portfolio</div>

        <VExpansionPanels variant="popout">
          <VExpansionPanel>
            <VExpansionPanelTitle>Shared Components</VExpansionPanelTitle>
            <VExpansionPanelText class="v-expansion-panel-text__wrapper-padding_0">
              <VContainer>
                <VRow>
                  <div class="text-subtitle-1 px-4">
                    I leverage Module Federation to export reusable components across different projects,
                    enabling micro-frontend architecture and reducing duplication.
                    These components are rigorously tested in isolation using Storybook,
                    ensuring functionality and visual consistency.
                    This combination enhances collaboration and streamlines the integration
                    of shared components into various applications.
                  </div>
                  <VCol cols="12">
                    <VCard elevation="3" class="pa-6">
                      <div class="text-h5 mb-4">Storybook</div>
                      <div class="text-body-1 mb-4">
                        Storybook is an excellent tool for developing and testing UI components in isolation.
                        It allows you to create stories for each component,
                        making it easier to ensure consistent behavior across your application.
                        You can view the live Storybook instance for this project by following the link below.
                      </div>

                      <div class="text-h6 mb-3">Explore the Storybook</div>
<!--                      <VBtn-->
<!--                          color="primary"-->
<!--                          href="https://razcue.github.io/storybook"-->
<!--                          target="_blank"-->
<!--                      >-->
<!--                        View Storybook-->
<!--                      </VBtn>-->

                      <VChip
                        class="ma-2"
                        color="primary"
                        label
                      >
                        Coming Soon
                        <VIcon icon="mdi-alert-rhombus-outline" end></VIcon>
                      </VChip>
                    </VCard>
                  </VCol>
                  <VCol cols="12">
                    <VCard elevation="3" class="pa-6">
                      <div class="text-h5 mb-4">Module Federation</div>
                      <div class="text-body-1 mb-4">
                        Module Federation allows you to share code across different applications
                        without requiring them to be bundled together.
                        This is particularly useful for micro-frontends,
                        where multiple applications can independently deploy,
                        but share common components.
                      </div>

                      <VChip
                          class="ma-2"
                          color="primary"
                          label
                      >
                        Coming Soon
                        <VIcon icon="mdi-alert-rhombus-outline" end></VIcon>
                      </VChip>

<!--                      <CodeShowcase :languages="languages" @copy="showSnackbarCodeCopy">-->
<!--                        &lt;!&ndash; Description Slot &ndash;&gt;-->
<!--                        <template #description>-->
<!--                          This example shows how to import this project components using-->
<!--                          <a href="https://module-federation.io/" target="_blank">modules federation</a> within your app.-->
<!--                        </template>-->

<!--                        &lt;!&ndash; Notes Slot &ndash;&gt;-->
<!--                        <template #notes>-->
<!--                          Note: You could customize this to only import specific components.-->
<!--                        </template>-->
<!--                      </CodeShowcase>-->
                    </VCard>
                  </VCol>
                </VRow>
              </VContainer>
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>Public Repositories</VExpansionPanelTitle>
            <VExpansionPanelText class="v-expansion-panel-text__wrapper-padding_0">
              <VContainer>
                <VRow class="d-flex justify-center">
                  <VCol cols="12" md="6">
                    <div class="repo-container" onclick="window.open('https://github.com/razcue/laravelBa', '_blank')">
                      <img src="../assets/dashboard_pic.png" alt="LaravelBa MVP Solution" class="repo-image">
                      <div class="repo-info">
                        <h3>LaravelBa MVP Solution</h3>
                        <p>
                          <strong>LaravelBa</strong> is a full-stack <strong>MVP solution</strong> built with <strong>Laravel 10</strong>,
                          <strong>InertiaJS</strong>, and <strong>Vue 3</strong>, powered by <strong>Vite</strong>, <strong>SCSS</strong>,
                          <strong>TailwindCSS</strong>, and <strong>PrimeVue</strong>. It supports <strong>authentication</strong>,
                          <strong>authorization</strong>, and includes <strong>user management</strong> and <strong>product management</strong> features,
                          making it a solid foundation for modern web applications.
                        </p>
                      </div>
                    </div>
                  </VCol>
                  <VCol cols="12" md="6">
                    <div class="repo-container" onclick="window.open('https://github.com/razcue/velaio.test', '_blank')">
                      <img src="../assets/dashboard_pic.png" alt="VELAIO Technical Assessment" class="repo-image">
                      <div class="repo-info">
                        <h3>VELAIO Technical Assessment Project</h3>
                        <p>
                          This project, created for the <strong>Frontend Developer position at VELAIO</strong>,
                          demonstrates a <strong>Clean Architecture</strong> approach using <strong>Angular 16</strong>.
                          The project is structured into three layers: <strong>Domain</strong>, <strong>Infrastructure</strong>,
                          and <strong>Presentation</strong>, ensuring <strong>scalability</strong>, <strong>testability</strong>,
                          and <strong>maintainability</strong>.
                        </p>
                      </div>
                    </div>
                  </VCol>
                </VRow>
              </VContainer>
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>GAAG CRM</VExpansionPanelTitle>
            <VExpansionPanelText class="v-expansion-panel-text__wrapper-padding_0">
              <VContainer>
                <VRow class="d-flex justify-center">
                  <VChip
                    class="ma-2"
                    color="primary"
                    label
                  >
                    Coming Soon
                    <VIcon icon="mdi-alert-rhombus-outline" end></VIcon>
                  </VChip>
                </VRow>
              </VContainer>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
// import CodeShowcase from "@/components/CodeShowcase.vue";
import { inject } from "vue";

const giveMeASnack = inject('Snackbar:giveMeASnack');

const languages = [
  { label: 'Vite', code: '<h1>Hello, world!</h1>' },
  { label: 'Webpack', code: 'h1 { color: red; font-size: 2rem; }' },
];

const showSnackbarCodeCopy = () => {
  giveMeASnack({
    message: 'Code copied to clipboard.',
    color: 'success',
    timeout: 3000,
  })
};
</script>

<style scoped>
.repo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  margin: 20px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  gap: 1rem;
}

.repo-container:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.repo-image {
  width: 180px;
  height: 140px;
  border-radius: 8px;
}

.repo-info h3 {
  font-size: 1.5em;
  margin-bottom: 8px;
}

.repo-info p {
  font-size: 1em;
  color: #333;
}
</style>