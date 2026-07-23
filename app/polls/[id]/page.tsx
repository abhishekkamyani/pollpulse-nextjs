export const experimental_ppr = true;

import { getPollById } from '@/actions/poll.action'
import { checkVote } from '@/actions/vote.action';
import { PollVote } from '@/components/poll-vote';
import { auth } from '@/lib/auth';
import { PollDetails } from '@/lib/types';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PollVotePage({ params }: PageProps) {
  const { id } = await params;
  const session = await auth();

  const response = await getPollById(id);
  const poll = response?.data;

  if (!poll) notFound();

  const result = await checkVote(poll._id);

  if (!result.success) return <div>Error</div>

  const formattedPoll: PollDetails = {
    _id: poll._id,
    options: poll.options,
    question: poll.question,
    expiresAt: poll.expiresAt,
    createdAt: poll.createdAt,
    createdBy: poll.createdBy.name, 
    isCreator: session?.user?.id === poll.createdBy._id,
    pollVote: result.pollVote,
  };
  
  return (
    <PollVote poll={formattedPoll} />
  )
}
