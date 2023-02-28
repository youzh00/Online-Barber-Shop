import React from 'react'
import { api } from '../utils/api'
import Header from '../components/Header'
import Section from '../components/Section'


const home = () => {
  return (
    <div>
      <Header/>
    </div>
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
