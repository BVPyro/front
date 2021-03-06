import parse from 'html-react-parser'
import Head from '../components/head'
import NavBar from '../components/navbar'
import Newsletter from '../components/newsletter'
import Footer from '../components/footer'
import { getFromDirectus } from '../lib/api'

export default function UmweltBelastungFeuerwerk(props) {
  return (
    <>
      <Head />
      <NavBar />
      <div
        className="min-h-screen bg-purple-900 overflow-hidden break-words"
        style={{ hyphens: 'auto' }}
      >
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-on-purple-aktuelles pt-32 mx-auto">
            {parse(props.dataUmweltPage.text)}
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const dataUmweltPage = await getFromDirectus('/items/umwelt_page')
  return {
    props: {
      dataUmweltPage,
    },
    revalidate: 60,
  }
}
