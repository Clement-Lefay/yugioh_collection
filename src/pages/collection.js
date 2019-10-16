import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Collection = ({ data }) => {
  return (
    <Layout>
      <SEO title="collection"></SEO>
      <h1>il faut bien commencer quelque part</h1>
      <br></br>
      <>
        <p>{GetCardName(data)}</p>
      </>
      <Link to="/">homepage</Link>
    </Layout>
  )
}

function GetCardName(data) {
  const cardItemArray = []
  data.allDataJson.edges.forEach(item => {
    item.node.list.forEach(card => {
      cardItemArray.push(<li key={card.cardId}>{card.name}</li>)
    })
  })

  return cardItemArray
}

export const query = graphql`
  query giveMeMyCardsQuery {
    allDataJson {
      edges {
        node {
          id
          list {
            cardId
            category
            imageLink
            name
            totalQuantity
          }
        }
      }
    }
  }
`

export default Collection
