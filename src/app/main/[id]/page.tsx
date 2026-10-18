import { notFound, redirect } from 'next/navigation';
import { GameExperience } from '../../../components/GameExperience';
import { getCaseById } from '../../../data/cases';
import { GameChapter } from '../../../types/game';

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
}

export default async function Gameplay({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  const caseItem = getCaseById(id);
  if (!caseItem) notFound();

  // If chapter is 1-4, render legacy interactive comic flow, otherwise redirect to modern minigame
  if (id >= 1 && id <= 4) {
    return <GameExperience chapter={id as GameChapter} />;
  }

  redirect(`/kasus/${caseItem.slug}`);
}
