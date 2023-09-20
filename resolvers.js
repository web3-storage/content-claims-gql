import * as Link from 'multiformats/link'
import * as Claims from '@web3-storage/content-claims/client'
import { Assert } from '@web3-storage/content-claims/capability'

export const resolvers = {
  Query: {
    read: async (parent, args, contextValue, info) => {
      const content = Link.parse(args.content)
      const claims = await Claims.read(content)
      return claims.map(toGraphQLType)
    }
  },
  ContentClaim: {
    __resolveType: obj => {
      switch (obj.type) {
        case Assert.location.can:
          return 'LocationClaim'
        case Assert.partition.can:
          return 'PartitionClaim'
        case Assert.inclusion.can:
          return 'InclusionClaim'
        case Assert.relation.can:
          return 'RelationClaim'
        case Assert.equals.can:
          return 'EqualsClaim'
      }
    }
  },
  ContentLink: {
    claims: async (parent, args, contextValue, info) => {
      const content = Link.parse(parent.content)
      const claims = await Claims.read(content)
      return claims.map(toGraphQLType)
    }
  }
}

/**
 * @param {import('@web3-storage/content-claims/client/api').Claim} claim
 */
const toGraphQLType = claim => {
  switch (claim.type) {
    case Assert.location.can:
      return {
        type: claim.type,
        content: claim.content.toString(),
        location: claim.location.map(l => l.toString()),
        range: claim.range
      }
    case Assert.partition.can:
      return {
        type: claim.type,
        content: claim.content.toString(),
        blocks: claim.blocks ? claim.blocks.toString() : null,
        parts: claim.parts.map(p => ({ content: p.toString() }))
      }
    case Assert.inclusion.can:
      return {
        type: claim.type,
        content: claim.content.toString(),
        includes: { content: claim.includes.toString() },
        proof: claim.proof ? claim.proof.toString() : null
      }
    case Assert.relation.can:
      return {
        type: claim.type,
        content: claim.content.toString(),
        children: claim.children.map(c => c.toString()),
        parts: claim.parts.map(p => ({
          content: p.content.toString(),
          includes: p.includes
            ? {
                content: p.includes.content.toString(),
                parts: p.includes.parts ? p.includes.parts.map(p => ({ content: p.toString() })) : null
              }
            : null
        }))
      }
    case Assert.equals.can:
      return {
        type: claim.type,
        content: claim.content.toString(),
        equals: { content: claim.equals.toString() }
      }
    default:
      throw new Error(`unknown claim: ${claim.type}`)
  }
}
