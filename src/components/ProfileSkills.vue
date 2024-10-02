<template>
  <VRow justify="center" class="mt-6">
    <VCol cols="12" md="8">
      <VCard elevation="3" class="pa-6">
        <div class="text-h5 mb-4">Skills</div>
        <VRow class="justify-center py-2">
          <div class="d-flex justify-center align-center">
            <span class="font-italic">"Live as if you were to die tomorrow. Learn as if you were to live forever."</span>
            <span class="font-weight-bold ml-2">Mahatma Gandhi</span>
          </div>
        </VRow>
        <VRow>
          <!-- Soft Skills -->
          <VCol cols="12">
            <div class="text-h6">Soft Skills</div>

            <VExpansionPanels variant="popout">
              <VExpansionPanel>
                <VExpansionPanelTitle>Communication Skills</VExpansionPanelTitle>
                <VExpansionPanelText>
                  <span>Communication is one of the most essential soft skills for any developer, particularly in an environment where you interact with multiple stakeholders.</span>
                  <VList>
                    <VListItem>
                      <VListItemTitle>Client Communication</VListItemTitle>
                      <VListItemSubtitle class="v-list-item-subtitle_description-plain">
                        Being able to translate technical jargon into business terms and explain project needs or constraints clearly is key. For example, if you're working on a complex feature and the client or product manager doesn’t understand why it’s taking time, a calm, clear explanation goes a long way.
                      </VListItemSubtitle>
                    </VListItem>
                    <VListItem>
                      <VListItemTitle>Team Communication</VListItemTitle>
                      <VListItemSubtitle class="v-list-item-subtitle_description-plain">
                        Frontend developers often need to communicate with backend developers for API integration, ensuring that endpoints are structured properly. On the other hand, backend developers need to ensure they are communicating data structures, formats, and business logic requirements efficiently to frontend or fullstack colleagues.
                      </VListItemSubtitle>
                    </VListItem>
                    <VListItem>
                      <VListItemTitle>Remote Work Challenges</VListItemTitle>
                      <VListItemSubtitle class="v-list-item-subtitle_description-plain">
                        Misunderstandings can lead to delays, so proactive communication through Slack, emails, or task management systems (like Jira) is important. Asking for clarification, giving status updates, and documenting work are vital aspects of communication in remote settings.
                      </VListItemSubtitle>
                    </VListItem>
                  </VList>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel>
                <VExpansionPanelTitle>Problem-Solving Skills</VExpansionPanelTitle>
                <VExpansionPanelText>
                  <VList>
                    <VListItem>
                      <VListItemTitle>Debugging</VListItemTitle>
                      <VListItemSubtitle class="v-list-item-subtitle_description-plain">
                        As a developer, much of your time is spent solving problems, from debugging code to troubleshooting integration issues. The ability to think critically and work through challenges methodically is key. For example, if you're integrating a third-party payment gateway, you'll often run into unexpected issues, such as API limits, errors in webhook handling, or SSL-related problems. Knowing how to approach these systematically will save time.
                      </VListItemSubtitle>
                    </VListItem>
                    <VListItem>
                      <VListItemTitle>Cross-Disciplinary Thinking</VListItemTitle>
                      <VListItemSubtitle class="v-list-item-subtitle_description-plain">
                        As a developer, you’re responsible for both frontend performance (e.g., slow page loads) and backend efficiency (e.g., slow database queries). This requires a well-rounded problem-solving mindset, where you can troubleshoot both ends of the application. A frontend dev, for instance, might need to investigate whether performance issues are due to heavy JS bundles, while a backend dev would look into query optimizations.
                      </VListItemSubtitle>
                    </VListItem>
                  </VList>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel>
                <VExpansionPanelTitle>Time Management</VExpansionPanelTitle>
                <VExpansionPanelText>
                  <div class="v-list-item-title v-list-item-title_description-plain">Effective time management ensures project deadlines are met without sacrificing quality.</div>
                  <div class="v-list-item-subtitle v-list-item-subtitle_description-plain mt-2">
                    Prioritization is key. Successful developers break down large tasks into manageable steps and set clear goals for each sprint. Utilizing tools like Jira or Asana can streamline task assignment and ensure accountability. Furthermore, consistent reviews and reassessments allow for adaptive planning, ensuring potential blockers are addressed before they cause delays. A well-organized schedule also leaves room for unforeseen challenges and adjustments.
                  </div>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel>
                <VExpansionPanelTitle>Collaboration and Teamwork</VExpansionPanelTitle>
                <VExpansionPanelText>
                  <span>Collaboration is a fundamental part of development, especially as projects often require the expertise of frontend and backend developers, others specialists, and a lot of fireworks.</span>
                  <VList>
                    <VListItem>
                      <VListItemTitle>Pair Programming</VListItemTitle>
                      <VListItemSubtitle class="v-list-item-subtitle_description-plain">
                        Sometimes, you’ll work with another developer to tackle a challenging problem. As a fullstack dev, pairing with a frontend colleague when working on complex user interactions or with a backend dev for API issues fosters better collaboration.
                      </VListItemSubtitle>
                    </VListItem>
                    <VListItem>
                      <VListItemTitle>Code Reviews</VListItemTitle>
                      <VListItemSubtitle class="v-list-item-subtitle_description-plain">
                        Often developers need to engage in code reviews, which are not just about pointing out mistakes but providing constructive feedback. For example, a senior developer reviewing a junior’s code can share better practices or a better approach.
                      </VListItemSubtitle>
                    </VListItem>
                    <VListItem>
                      <VListItemTitle>Version Control Etiquette</VListItemTitle>
                      <VListItemSubtitle class="v-list-item-subtitle_description-plain">
                        Whether you’re using Git or another version control system, collaborating through well-written commit messages and proper branching strategies (e.g., feature branches, pull requests) will make teamwork smoother.
                      </VListItemSubtitle>
                    </VListItem>
                  </VList>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel>
                <VExpansionPanelTitle>Adaptability</VExpansionPanelTitle>
                <VExpansionPanelText>
                  <span>As a developer, you will constantly face changing requirements, new tools, and evolving technologies.</span>
                  <VList>
                    <VListItem>
                      <VListItemTitle>Tech Stack Adaptation</VListItemTitle>
                      <VListItemSubtitle class="v-list-item-subtitle_description-plain">
                        If you’re working as a fullstack dev, switching between PHP for backend and Vue.js/React for frontend requires adaptability. Being comfortable in shifting gears between various frameworks (like Laravel, Node.js, Express.js) is vital for a successful fullstack role.
                      </VListItemSubtitle>
                    </VListItem>
                    <VListItem>
                      <VListItemTitle>Willingness to Learn</VListItemTitle>
                      <VListItemSubtitle class="v-list-item-subtitle_description-plain">
                        Developers are lifelong learners. Adapting to new frameworks, languages, or tools is essential. Continuous learning can take many forms—whether through online courses, tutorials, or reading documentation. Developers who actively seek to learn and improve their craft stay relevant and contribute more effectively to the team.
                      </VListItemSubtitle>
                    </VListItem>
                  </VList>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel>
                <VExpansionPanelTitle>Attention to Detail</VExpansionPanelTitle>
                <VExpansionPanelText>
                  <div class="v-list-item-title v-list-item-title_description-plain">Precision and focus on small details can mean the difference between a smooth or buggy product.</div>
                  <div class="v-list-item-subtitle v-list-item-subtitle_description-plain mt-2">
                    Every piece of code matters. Whether it’s in writing precise SQL queries or ensuring pixel-perfect layouts, attention to detail is crucial. This involves not only spotting errors but also anticipating potential issues, like security vulnerabilities, performance bottlenecks, or accessibility concerns. Testing every edge case ensures the code is robust, scalable, and secure.
                  </div>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel>
                <VExpansionPanelTitle>Emotional Intelligence</VExpansionPanelTitle>
                <VExpansionPanelText>
                  <span>Emotional intelligence (EQ) helps you navigate interpersonal relationships at work, manage stress, and respond well to feedback.</span>
                  <VList>
                    <VListItem>
                      <VListItemTitle>Receiving Feedback</VListItemTitle>
                      <VListItemSubtitle class="v-list-item-subtitle_description-plain">
                        As a developer, your code will often be subject to review and critique. Whether you’re a junior or senior developer, being able to take feedback constructively, without taking it personally, shows high emotional intelligence.
                      </VListItemSubtitle>
                    </VListItem>
                    <VListItem>
                      <VListItemTitle>Handling Stress</VListItemTitle>
                      <VListItemSubtitle class="v-list-item-subtitle_description-plain">
                        Tight deadlines, bugs, or client expectations can lead to high stress in software development. Being able to stay calm under pressure and finding productive ways to deal with stress is crucial. For example, breaking down larger tasks into smaller achievable goals during crunch periods can reduce feelings of overwhelm.
                      </VListItemSubtitle>
                    </VListItem>
                  </VList>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel>
                <VExpansionPanelTitle>Creativity</VExpansionPanelTitle>
                <VExpansionPanelText>
                  <div class="quote">
                    <span class="quote__text">"Genius is one percent inspiration, ninety-nine percent perspiration."</span>
                    <span class="quote__author">Thomas Edison</span>
                  </div>
                  <VChip
                      class="ma-2"
                      color="primary"
                      label
                  >
                    Coming Soon
                    <VIcon icon="mdi-alert-rhombus-outline" end></VIcon>
                  </VChip>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel>
                <VExpansionPanelTitle>Mentoring and Leadership</VExpansionPanelTitle>
                <VExpansionPanelText>
                  <span>Leadership skills are particularly valuable as you gain experience. Even if you’re not in a formal leadership role, mentoring junior developers can help solidify your knowledge and improve team productivity.</span>
                  <VList>
                    <VListItem>
                      <VListItemTitle>Knowledge Sharing</VListItemTitle>
                      <VListItemSubtitle class="v-list-item-subtitle_description-plain">
                        As you build experience, sharing your insights with team members through code reviews, pair programming, or internal tech talks is a great way to demonstrate leadership without having a formal title
                      </VListItemSubtitle>
                    </VListItem>
                    <VListItem>
                      <VListItemTitle>Delegation</VListItemTitle>
                      <VListItemSubtitle class="v-list-item-subtitle_description-plain">
                        If you're leading a project or managing the tech stack, being able to delegate scope-specific tasks efficiently is critical to overall project success.
                      </VListItemSubtitle>
                    </VListItem>
                  </VList>
                </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </VCol>

          <!-- Languages -->
          <VCol cols="12" md="6">
            <div class="text-h6">Languages</div>
            <VRating :model-value="4" color="primary" class="mb-4" readonly />
            <VRow class="px-8 pb-4 justify-center" style="gap: 1rem;">
              <div>
                <VIcon left>mdi-language-html5</VIcon> HTML5
              </div>
              <div>
                <VIcon left>mdi-language-css3</VIcon> CSS3
              </div>
              <div>
                <VIcon left>mdi-language-php</VIcon> PHP 8.*
              </div>
              <div>
                <VIcon left>mdi-language-javascript</VIcon> JavaScript (ES6-ESNext)
              </div>
              <div>
                <VIcon left>mdi-language-typescript</VIcon> TypeScript
              </div>
              <div>
                <VIcon left>mdi-database</VIcon> SQL
              </div>
            </VRow>
          </VCol>

          <!-- Frontend -->
          <VCol cols="12" md="6">
            <div class="text-h6">Frontend Skills</div>
            <VRating :model-value="4" color="primary" class="mb-4" readonly />
            <VRow class="px-8 pb-4 justify-center" style="gap: 1rem;">
              <div>
                <VIcon left>mdi-vuejs</VIcon> Vue.js
              </div>
              <div>
                <VIcon left>mdi-react</VIcon> React.js
              </div>
              <div>
                <VIcon left>mdi-angularjs</VIcon> Angular.js
              </div>
              <div>
                <VIcon left>mdi-sass</VIcon> SASS
              </div>
              <div>
                <VIcon left>mdi-jquery</VIcon> JQuery
              </div>
              <div>
                <VIcon left>mdi-vuejs</VIcon> Vuex
              </div>
              <div>
                <VIcon left>mdi-vuejs</VIcon> Pinia
              </div>
              <div>
                <VIcon left>mdi-material-ui</VIcon> Vuetify
              </div>
              <div>
                <VIcon left>mdi-material-ui</VIcon> PrimeVue
              </div>
              <div>
                <VIcon left>mdi-material-ui</VIcon> PrimeReact
              </div>
              <div>
                <VIcon left>mdi-material-ui</VIcon> NgZorro
              </div>
              <div>
                <VIcon left>mdi-earth</VIcon> I18n
              </div>
              <div>
                <VIcon left>mdi-cog-box</VIcon> Modules Federation
              </div>
              <div>
                <VIcon left>mdi-history</VIcon> Storybook
              </div>
              <div>
                <VIcon left>mdi-cog-box</VIcon> Vite
              </div>
              <div>
                <VIcon left>mdi-webpack</VIcon> webpack
              </div>
              <div>
                <VIcon left>mdi-web</VIcon> Figma
              </div>
            </VRow>
          </VCol>

          <!-- Client-Server Communication -->
          <VCol cols="12" md="6">
            <div class="text-h6">Client-Server Communication</div>
            <VRating :model-value="4" color="primary" class="mb-4" readonly />
            <VRow class="px-8 pb-4 justify-center" style="gap: 1rem;">
              <div>
                <VIcon left>mdi-api</VIcon> RESTful APIs
              </div>
              <div>
                <VIcon left>mdi-cog-box</VIcon> WebSockets
              </div>
              <div>
                <VIcon left>mdi-cog-box</VIcon> Inertia.js
              </div>
              <div>
                <VIcon left>mdi-cog-box</VIcon> Laravel Echo
              </div>
              <div>
                <VIcon left>mdi-cloud-key-outline</VIcon> OAuth2
              </div>
              <div>
                <VIcon left>mdi-cloud-key-outline</VIcon> JWT
              </div>
            </VRow>
          </VCol>

          <!-- Backend -->
          <VCol cols="12" md="6">
            <div class="text-h6">Backend Skills</div>
            <VRating :model-value="4" color="primary" class="mb-4" readonly />
            <VRow class="px-8 pb-4 justify-center" style="gap: 1rem;">
              <div>
                <VIcon left>mdi-laravel</VIcon> Laravel
              </div>
              <div>
                <VIcon left>mdi-cog-box</VIcon> Yii
              </div>
              <div>
                <VIcon left>mdi-nodejs</VIcon> Node.js
              </div>
              <div>
                <VIcon left>mdi-nodejs</VIcon> Express.js
              </div>
              <div>
                <VIcon left>mdi-cog-box</VIcon> Vollager
              </div>
              <div>
                <VIcon left>mdi-laravel</VIcon> Laravel Sanctum
              </div>
              <div>
                <VIcon left>mdi-laravel</VIcon> Laravel Spatie Permissions
              </div>
              <div>
                <VIcon left>mdi-cog-box</VIcon> Swagger
              </div>
            </VRow>
          </VCol>

          <!-- DataBases -->
          <VCol cols="12" md="6">
            <div class="text-h6">Data Base</div>
            <VRating :model-value="4" color="primary" class="mb-4" readonly />
            <VRow class="px-8 pb-4 justify-center" style="gap: 1rem;">
              <div>
                <VIcon left>mdi-database</VIcon> MySQL
              </div>
              <div>
                <VIcon left>mdi-database</VIcon> PostgreSQL
              </div>
              <div>
                <VIcon left>mdi-database-outline</VIcon> ElasticSearch
              </div>
              <div>
                <VIcon left>mdi-database-outline</VIcon> Redis
              </div>
            </VRow>
          </VCol>

          <!-- CMS -->
          <VCol cols="12" md="6">
            <div class="text-h6">CMS</div>
            <VRating :model-value="2" color="primary" class="mb-4" readonly />
            <VRow class="px-8 pb-4 justify-center" style="gap: 1rem;">
              <div>
                <VIcon left>mdi-wordpress</VIcon> Wordpress
              </div>
              <div>
                <VIcon left>mdi-wordpress</VIcon> WooCommerce
              </div>
              <div>
                <VIcon left>mdi-wordpress</VIcon> Elementor
              </div>
            </VRow>
          </VCol>

          <!-- DevOps -->
          <VCol cols="12" md="6">
            <div class="text-h6">DevOps</div>
            <VRating :model-value="2" color="primary" class="mb-4" readonly />
            <VRow class="px-8 pb-4 justify-center" style="gap: 1rem;">
              <div>
                <VIcon left>mdi-penguin</VIcon> Linux Servers
              </div>
              <div>
                <VIcon left>mdi-cog-box</VIcon> ELK
              </div>
              <div>
                <VIcon left>mdi-aws</VIcon> AWS
              </div>
              <div>
                <VIcon left>mdi-github</VIcon> GitHub Actions
              </div>
              <div>
                <VIcon left>mdi-cog-box</VIcon> Nginx
              </div>
            </VRow>
          </VCol>

          <!-- Management -->
          <VCol cols="12" md="6">
            <div class="text-h6">Management</div>
            <VRating :model-value="3" color="primary" class="mb-4" readonly />
            <VRow class="px-8 pb-4 justify-center" style="gap: 1rem;">
              <div>
                <VIcon left>mdi-jira</VIcon> Jira
              </div>
              <div>
                <VIcon left>mdi-earth</VIcon> Zoho
              </div>
              <div>
                <VIcon left>mdi-github</VIcon> GitHub
              </div>
              <div>
                <VIcon left>mdi-microsoft-teams</VIcon> Microsoft Teams
              </div>
              <div>
                <VIcon left>mdi-slack</VIcon> Slack
              </div>
            </VRow>
          </VCol>

          <!-- Engineering Principles -->
          <VCol cols="12">
            <div class="text-h6">Engineering Principles</div>
            <VRating :model-value="4" color="primary" class="mb-4" readonly />
            <VRow class="px-8 pb-4 justify-center" style="gap: 1rem;">
              <div>
                <VIcon left>mdi-file-table-box-outline</VIcon> Agile Manifesto
              </div>
              <div>
                <VIcon left>mdi-file-table-box-outline</VIcon> SCRUM
              </div>
              <div>
                <VIcon left>mdi-file-table-box-outline</VIcon> KAMBAN
              </div>
              <div>
                <VIcon left>mdi-file-table-box-outline</VIcon> GoF Patterns
              </div>
              <div>
                <VIcon left>mdi-file-table-box-outline</VIcon> SOLID
              </div>
              <div>
                <VIcon left>mdi-file-table-box-outline</VIcon> KISS
              </div>
              <div>
                <VIcon left>mdi-file-table-box-outline</VIcon> DRY
              </div>
              <div>
                <VIcon left>mdi-file-table-box-outline</VIcon> YAGNI
              </div>
              <div>
                <VIcon left>mdi-file-table-box-outline</VIcon> The Rule of Least Power
              </div>
              <div>
                <VIcon left>mdi-file-table-box-outline</VIcon> Clean Code
              </div>
              <div>
                <VIcon left>mdi-file-table-box-outline</VIcon> Atomic Design
              </div>
              <div>
                <VIcon left>mdi-file-table-box-outline</VIcon> BEM
              </div>
              <div>
                <VIcon left>mdi-file-table-box-outline</VIcon> SMACSS
              </div>
              <div>
                <VIcon left>mdi-file-table-box-outline</VIcon> MVC
              </div>
              <div>
                <VIcon left>mdi-file-table-box-outline</VIcon> N-Layer Architecture
              </div>
              <div>
                <VIcon left>mdi-file-table-box-outline</VIcon> CI/CD
              </div>
            </VRow>
          </VCol>
        </VRow>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.text-h6 {
  font-weight: bold;
}

.v-list-item-title.v-list-item-title_description-plain,
.v-list-item-subtitle.v-list-item-subtitle_description-plain {
  overflow: auto;
  text-overflow: unset;
  overflow-wrap: unset;
  word-break: unset;
  display: block;
  text-align: justify;
  white-space: unset;
}
</style>
<script setup lang="ts">
</script>