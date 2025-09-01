import { defineBoot } from '#q-app/wrappers'
import { useClient } from 'villus'

export default defineBoot(({ app }) => {
  const client = useClient({
    // TODO: use `process.env`
    url: 'http://localhost:3000/gql',
  })

  app.use(client)
})
