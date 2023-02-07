export const config = {
  point_of_interest: {
    graphQL: {
      queryRootIndex: 'pointsOfInterest',
      queryRootEntry: 'pointOfInterest'
    }
  },

  news_item: {
    graphQL: {
      queryRootIndex: 'newsItems',
      queryRootEntry: 'newsItem'
    }
  }
}

export const getConfig = (moduleName) => {
  return config[moduleName]
}
