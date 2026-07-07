import Link from "next/link";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

export const mdxComponents: NonNullable<MDXRemoteProps["components"]> = {
  h2: (props) => (
    <h2
      className="mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 scroll-mt-24 text-xl font-semibold tracking-tight text-foreground"
      {...props}
    />
  ),
  p: (props) => <p className="mt-5 leading-7 text-foreground/85" {...props} />,
  a: ({ href = "", ...props }) => (
    <Link
      href={href}
      className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
      {...props}
    />
  ),
  ul: (props) => <ul className="mt-5 list-disc space-y-2 pl-6 text-foreground/85" {...props} />,
  ol: (props) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-foreground/85" {...props} />,
  li: (props) => <li className="leading-7" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-5 border-l-2 border-accent pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
  table: (props) => (
    <div className="mt-5 overflow-x-auto rounded-xl border border-border">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-surface-muted text-left" {...props} />,
  th: (props) => <th className="px-4 py-3 font-medium text-muted-foreground" {...props} />,
  td: (props) => <td className="border-t border-border px-4 py-3 text-foreground/85" {...props} />,
  pre: (props) => (
    <pre
      className="mt-5 overflow-x-auto rounded-xl border border-border bg-[#0d1117] p-4 text-[13px] leading-6 [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    />
  ),
  hr: (props) => <hr className="my-10 border-border" {...props} />,
};
