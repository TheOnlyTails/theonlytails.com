export type Project = {
  name: string
  href: string
  description: string
}

export type BlogPost = {
  path: string
  metadata: PostData
}

export type PostData = {
  slug: string
  title: string
  author: string
  description: string
  date: string
  published: boolean
}