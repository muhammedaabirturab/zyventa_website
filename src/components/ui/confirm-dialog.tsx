"use client";

import { useRef, useState, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type ConfirmDialogProps = {
  title: string;
  description: ReactNode;
  confirmLabel?: string;
  /** Called when the user confirms. The dialog shows a spinner until it resolves. */
  onConfirm: () => Promise<void> | void;
  /** Renders the element that opens the dialog. */
  trigger: (open: () => void) => ReactNode;
};

/** Accessible confirmation step for destructive actions (built on the native <dialog>). */
export function ConfirmDialog({ title, description, confirmLabel = "Delete", onConfirm, trigger }: ConfirmDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [pending, setPending] = useState(false);

  async function confirm() {
    setPending(true);
    try {
      await onConfirm();
      ref.current?.close();
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      {trigger(() => ref.current?.showModal())}
      <dialog
        ref={ref}
        aria-labelledby="confirm-title"
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-lg border border-line bg-white p-0 text-ink shadow-xl"
        onCancel={(e) => pending && e.preventDefault()}
      >
        <div className="flex gap-4 p-6">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-danger-soft text-danger">
            <AlertTriangle className="size-5" aria-hidden />
          </div>
          <div>
            <h2 id="confirm-title" className="text-lg font-semibold">
              {title}
            </h2>
            <div className="mt-1.5 text-sm leading-relaxed text-muted">{description}</div>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-2 border-t border-line bg-surface/60 px-6 py-4 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={() => ref.current?.close()} disabled={pending}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirm} loading={pending}>
            {confirmLabel}
          </Button>
        </div>
      </dialog>
    </>
  );
}
