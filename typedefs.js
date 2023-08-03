import fs from 'node:fs'
import { buildSchema } from 'graphql'

export const typeDefs = buildSchema(fs.readFileSync('./schema.graphql', { encoding: 'utf8' }))
