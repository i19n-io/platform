<template>
  <q-page class="row items-center justify-evenly">
    <ul>
      <li v-for="project in data?.projectList" :key="project.name">
        {{ project.name }} by {{ project.author.name }}
      </li>
    </ul>
  </q-page>
</template>

<script setup lang="ts">
import { useQuery } from 'villus'

import { graphql } from '~/core/graphql'

const { data } = useQuery({
  query: graphql(`
    query ProjectList {
      projectList {
        name
        author {
          name
        }
      }
    }
  `),
})
</script>
