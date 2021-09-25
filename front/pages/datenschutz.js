import parse from 'html-react-parser'
import Head from '../components/head'
import NavBar from '../components/navbar'
import Newsletter from '../components/newsletter'
import Footer from '../components/footer'
import { getFromDirectus } from '../lib/api'

export default function Datenschutz(props) {
  return (
    <>
      <Head />
      <NavBar />
      <div className="min-h-screen bg-purple-900">
        <div className="prose prose-lg prose-on-purple-aktuelles pt-24 mx-auto">
          {parse(props.dataDatenschutzPage.text)}
        </div>
      </div>
      <Newsletter />
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const dataDatenschutzPage = await getFromDirectus('/items/datenschutz_page')
  return {
    props: {
      dataDatenschutzPage,
    },
    revalidate: 60,
  }
}
