import Image from 'next/image'
import { Inter } from 'next/font/google'
import axios from 'axios'
import { useState } from 'react'


const inter = Inter({ subsets: ['latin'] })

export default function Home(props: any) {

  const [counter, setCounter] = useState(0);

  console.log(props);
  
  return (
    <div>
      fjsdaif
      {counter}
      <button onClick={()=>{setCounter(counter+1)}}>+</button>
    </div>
  )
}

export const getServerSideProps = async () => {
  try {
    const { data } = await axios.get("https://uat.advancesuite.in:3071/api/v2/insta_settings/get_query_contact_details?setting_key=QUERY_CONTACT")

    return {
      props: {
        data
      },
    }
  } catch (err) {
    return {
      props: {
        data: []
      },
    }
  }
}
