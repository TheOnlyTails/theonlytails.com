export type Project = {
  name: string
  href: string
  description: string
}

export type PostData = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  published: boolean
}
