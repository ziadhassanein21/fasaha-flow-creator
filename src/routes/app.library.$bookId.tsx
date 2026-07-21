import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Download, ExternalLink } from "lucide-react";
import { getBook } from "@/lib/mock/library";

export const Route = createFileRoute("/app/library/$bookId")({
  head: ({ params }) => {
    const b = getBook(params.bookId);
    return {
      meta: [{ title: b ? `${b.title} · فصاحة` : "الكتاب · فصاحة" }],
    };
  },
  loader: ({ params }) => {
    const book = getBook(params.bookId);
    if (!book) throw notFound();
    return { book };
  },
  component: BookReader,
  notFoundComponent: BookNotFound,
});

function BookReader() {
  const { book } = Route.useLoaderData() as { book: NonNullable<ReturnType<typeof getBook>> };

  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col">
      <div className="flex flex-wrap items-center gap-3 border-b border-border bg-card px-4 py-3 md:px-6">
        <Link
          to="/app/library"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-secondary"
        >
          <ArrowRight className="h-3.5 w-3.5" />
          المكتبة
        </Link>
        <div className="min-w-0">
          <div className="truncate text-sm font-bold">{book.title}</div>
          <div className="truncate text-xs text-muted-foreground">
            {book.author} · {book.era}
          </div>
        </div>
        <div className="ms-auto flex items-center gap-2">
          <a
            href={book.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-secondary"
          >
            <Download className="h-3.5 w-3.5" />
            تحميل
          </a>
          <a
            href={book.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-95"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            فتح في تبويب جديد
          </a>
        </div>
      </div>
      <div className="flex-1 bg-secondary/40">
        <iframe
          title={book.title}
          src={book.embedUrl}
          className="h-full w-full border-0"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}

function BookNotFound() {
  return (
    <div className="container-page py-16 text-center">
      <h1 className="text-2xl font-extrabold">لم نعثر على هذا الكتاب</h1>
      <p className="mt-2 text-muted-foreground">
        قد يكون الرابط قديمًا أو أزيل الكتاب من المكتبة.
      </p>
      <Link
        to="/app/library"
        className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
      >
        <ArrowRight className="h-4 w-4" />
        عودة إلى المكتبة
      </Link>
    </div>
  );
}
