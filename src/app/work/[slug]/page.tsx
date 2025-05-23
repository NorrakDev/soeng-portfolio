import { projects } from '@/app/data/projects'
import WorkDetailPage from './detail';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // ...

  return (
    <WorkDetailPage slug={slug} />
  )
}