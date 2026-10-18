import { notFound } from 'next/navigation';
import { MISSIONS, getMissionBySlug } from '../../../data/cases';
import { MinigameExperience } from '../../../components/cases/MinigameExperience';

export function generateStaticParams() {
  return MISSIONS.map(({ slug }) => ({ slug }));
}

export default async function CaseSimPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mission = getMissionBySlug(slug);

  if (!mission) {
    notFound();
  }

  return <MinigameExperience mission={mission} />;
}
