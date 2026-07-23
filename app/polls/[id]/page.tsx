// app/polls/[id]/page.tsx
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PollVoteContent } from '@/components/poll-vote-content';
import PollLoading from './loading'; // Your skeleton loader

export const experimental_ppr = true;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PollVotePage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-xl px-4 py-10 space-y-8 relative">
      {/* STATIC SHELL: Sent instantly to the user on request */}
      <div className="flex items-center justify-between">
        <Link 
          href="/polls" 
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground px-2 py-1.5 rounded-md hover:bg-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to polls</span>
        </Link>
      </div>

      {/* Streamed in via Suspense when DB/auth resolves */}
      <Suspense fallback={<PollLoading />}>
        <PollVoteContent id={id} />
      </Suspense>
    </div>
  );
}