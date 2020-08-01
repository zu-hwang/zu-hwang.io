// pages/posts/[id].js
import { useRouter } from 'next/router'

const Compo ({ data }) {
  const router = useRouter()

  // 만약 정적생성되지 않은 페이지가 있다면, getStaticProps()가 실행이 끝날때 까지 'Loading' 요소를 반환한다.
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    // 여기에, 사전-렌더링-페이지 
  )
}

// 빌드시 동작
export async function getStaticPaths() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  const data = await response.json()

  const paths = data.map(({ id }) => ({
    params: { id: String(id) },
  }))

// paths = [
//   {params : {id:'1'} },
//   {params : {id:'2'} },
//   {params : {id:'3'} },
//   {params : {id:'4'} },
// ]



  return { paths, fallback: false }
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true,
  }
}

// 빌스 & 서비스
export async function getStaticProps({ params }) {
  const res = await fetch(`...url/${params.id}`)
  const data = await res.json()

// 데이터를 props로 전달 하며, 요청 시 1초에 한번 다시 패칭
  return {
    props: { data },
    revalidate: 1,
  }
}

export default Post