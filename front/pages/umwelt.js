import parse from 'html-react-parser'
import Head from '../components/head'
import NavBar from '../components/navbar'
import Newsletter from '../components/newsletter'
import Footer from '../components/footer'
import { getUmweltPage } from '../lib/api'

export default function Positionen(props) {
  console.log(props)
  return (
    <>
      <Head />
      <NavBar />
      <div className="min-h-screen bg-purple-900">
        <div className="prose prose-lg prose-on-purple-aktuelles pt-32 mx-auto">
          {parse(props.dataUmweltPage.text)}
        </div>
      </div>
      <Newsletter />
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const dataUmweltPage = await getUmweltPage()
  return {
    props: {
      dataUmweltPage,
    },
    revalidate: 60,
  }
}