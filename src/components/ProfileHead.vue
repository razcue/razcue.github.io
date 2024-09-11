<template>
  <VRow justify="center">
    <VCol cols="12" md="8">
      <VCard elevation="3" class="pa-6">
        <VRow align="center">
          <VCol cols="12" class="text-center">
            <VAvatar size="120" class="mb-4">
              <img src="../assets/profile_pic.png" class="profile__pic" alt="Profile Picture">
            </VAvatar>
            <div class="text-h4">John Doe</div>
            <div class="text-h6 text--secondary mb-4">Software Engineer</div>
            <div class="text-subtitle-1">
              Accomplished, resourceful, results-driven, and highly motivated web developer with over 6 years of coding experience,
              including over 3 years in SaaS environments. Proven ability to build reusable components, core functionalities, and
              scalable solutions tailored to meet on-demand requirements.
            </div>
          </VCol>
        </VRow>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.text--secondary {
  color: #757575;
}

.profile__pic {
  width: 140px;
  padding: 30px 0 0 10px;
}
</style>
