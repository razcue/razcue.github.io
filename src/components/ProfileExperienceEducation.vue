<template>
  <VRow justify="center" class="mt-6">
    <VCol cols="12" md="8">
      <VCard elevation="3" class="pa-6">
        <VExpansionPanels>
          <VExpansionPanel>
            <VExpansionPanelTitle>Experience</VExpansionPanelTitle>
            <VExpansionPanelText>
              <VContainer>
                <VRow>
                  <VCol cols="12">
                    <section>
                      <VCard outlined>
                        <header>
                          <h2>Lead Developer at Dejavu</h2>
                          <h3>Panama City, Panama | January 2024 – August 2024</h3>
                        </header>
                        <VCardText>
                          <p>
                            Led the development of an <strong>online store / CRM</strong>, integrating
                            a <strong>Woocomerce store</strong> and modules for consignment management, sales, logistics, roles, and reports.
                          </p>
                          <p>
                            Used <strong>Laravel 10</strong>, <strong>Vue 3 (Composition API)</strong>, and <strong>Vuetify</strong>.
                            Managed <strong>CI/CD pipelines</strong> with <strong>GitHub Actions</strong>, use <strong>AWS S3</strong>, and deployed to a <strong>VPS</strong>.
                            Mentored a junior developer and conducted code reviews while collaborating with product owners for feature planning.
                          </p>
                        </VCardText>
                      </VCard>
                    </section>
                  </VCol>

                  <VCol cols="12">
                    <section>
                      <VCard outlined>
                        <header>
                          <h2>Full-Stack Developer at First Due</h2>
                          <h3>New York, US | March 2021 – November 2023</h3>
                        </header>
                        <VCardText>
                          <p>
                            Worked as a <strong>Full-Stack Developer</strong> in a <strong>module-based startup environment</strong> on their primary product, using
                            <strong>Yii 1 and 2</strong>, and <strong>Vue 2</strong>. My work consist in resolve bugs and develop new features, including the
                            <strong>reporting module</strong>, also use <strong>Google Maps API</strong> and build a <strong>barcode/QR scanner component</strong>.
                          </p>
                          <p>
                            Here I get in touch with tools like <strong>Jira, Microsoft Teams, and Figma</strong>, and collaborated with cross-functional teams.
                            Learned a lot about team development, code reviews, product management, and bug tracking.
                          </p>
                        </VCardText>
                      </VCard>
                    </section>
                  </VCol>

                  <VCol cols="12">
                    <section id="experience">
                      <VCard outlined>
                        <header>
                          <h2>Full-Stack Developer at Grupo de Electrónica para el Turismo (GET)</h2>
                          <h3>Havana, Cuba | March 2019 – December 2020</h3>
                        </header>
                        <VCardText>
                          <p>
                            Worked as a <strong>Full-Stack Developer</strong> building a <strong>document management system</strong> using
                            <strong>Laravel 6</strong>, <strong>Vue 2</strong>, <strong>Vuetify</strong>, <strong>Webpack</strong>, <strong>SCSS</strong>,
                            <strong>PostgreSQL</strong>, and <strong>Elasticsearch</strong>. Managed deployments on <strong>Linux servers</strong> with
                            <strong>Nginx</strong>, and handled client communication, requirement gathering, and development from scratch.
                          </p>
                          <p>
                            Here I implemented a <strong>user-friendly logging system</strong>, utilizing asynchronous jobs and a middleware
                            for capturing user actions. This reduced response times while creating logs understandable by non-technical users.
                          </p>
                        </VCardText>
                      </VCard>
                    </section>
                  </VCol>
                </VRow>
              </VContainer>
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>Education & Certification</VExpansionPanelTitle>
            <VExpansionPanelText>
              <div class="mb-4">
                <div class="text-h6">Bachelor in Computer Science</div>
                <div class="text-body-2 text--secondary">University of Informatics Sciences, Havana, 2013 - 2018</div>
              </div>
              <div>
                <div class="text-h6">Web Responsive Design</div>
                <div class="text-body-2 text--secondary">
                  Free Code Camp Course - <a href="https://www.freecodecamp.org/certification/fcc0d66daac-ef4f-4e0e-9e60-d02d24f85508/responsive-web-design" target="_blank">link</a>, 2021
                </div>
              </div>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCard>
    </VCol>
  </VRow>
</template>
<script setup lang="ts">
</script>