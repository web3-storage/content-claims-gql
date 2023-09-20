# Content Claims GraphQL

A GraphQL API for content claims.

## Usage

The API can be queried at: https://graphql.claims.dag.haus

### Example

```graphql
query Query {
  read(content: "bafybeid5exh3blas6nac7pawnijonkuhfhm7rfmwkagj3nzs25c2xtvvqu") {
    __typename,
    ... on LocationClaim {
      # ...
    },
    ... on InclusionClaim {
      # ...
    },
    ... on PartitionClaim {
      # ...
    },
    ... on RelationClaim {
      # ...
    },
    ... on EqualsClaim {
      # ...
    }
  }
}
```

## Contributing

Feel free to join in. All welcome. Please [open an issue](https://github.com/web3-storage/content-claims-gql/issues)!

## License

Dual-licensed under [MIT + Apache 2.0](https://github.com/web3-storage/content-claims-gql/blob/main/LICENSE.md)
