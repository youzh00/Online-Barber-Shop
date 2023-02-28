import React from 'react'
import { api } from '../utils/api'
import Header from '../components/Header'


const home = () => {
  return (
    <Header/>
  )
}

// export async function getStaticProps() {
    
//     const shops=await api.shop.getAllShops.useQuery();
//     return {
//       props: {
//       },
//     }
//   }
export default home
